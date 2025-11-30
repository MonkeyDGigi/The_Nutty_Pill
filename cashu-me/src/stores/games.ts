import { defineStore } from "pinia";
import { ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { useWalletStore } from "./wallet";
import { useMintsStore } from "./mints";
import { useProofsStore } from "./proofs";

export type GameType = "rock-paper-scissors" | "tic-tac-toe" | "number-guess" | "reaction-time";

export type GameStatus = "waiting" | "matched" | "playing" | "finished" | "cancelled";

export type Player = {
  id: string;
  name?: string;
  pubkey?: string;
};

export type GameMatch = {
  id: string;
  gameType: GameType;
  status: GameStatus;
  player1: Player;
  player2?: Player;
  betAmount: number; // in sats
  unit: string; // "sat", "usd", etc.
  player1Proofs?: string; // locked proofs from player1
  player2Proofs?: string; // locked proofs from player2
  winner?: string; // player id of winner
  createdAt: number;
  startedAt?: number;
  finishedAt?: number;
  gameData?: any; // game-specific data
};

export const useGamesStore = defineStore("games", {
  state: () => {
    return {
      activeMatch: null as GameMatch | null,
      matchHistory: useLocalStorage("cashu.games.matchHistory", [] as GameMatch[]),
      pendingBets: useLocalStorage("cashu.games.pendingBets", [] as GameMatch[]),
      searchingForMatch: false,
      searchGameType: null as GameType | null,
      searchBetAmount: 0,
    };
  },
  getters: {
    hasActiveMatch: (state) => state.activeMatch !== null,
    canStartNewMatch: (state) => !state.activeMatch || state.activeMatch.status === "finished" || state.activeMatch.status === "cancelled",
  },
  actions: {
    // Create a new match (player creates a game)
    async createMatch(gameType: GameType, betAmount: number, unit: string = "sat"): Promise<GameMatch> {
      const walletStore = useWalletStore();
      const mintsStore = useMintsStore();
      const proofsStore = useProofsStore();

      // Check if user has enough balance
      const activeProofs = mintsStore.activeProofs;
      const balance = proofsStore.sumProofs(activeProofs);
      
      if (balance < betAmount) {
        throw new Error("Insufficient balance");
      }

      // Lock the proofs for the bet
      const spendableProofs = walletStore.spendableProofs(activeProofs, betAmount);
      const wallet = walletStore.wallet;
      if (!wallet) {
        throw new Error("Wallet not initialized");
      }
      const proofsToLock = walletStore.coinSelect(spendableProofs, wallet, betAmount, false);
      
      if (proofsToLock.length === 0) {
        throw new Error("Could not select proofs for bet");
      }
      
      // Reserve the proofs
      await proofsStore.setReserved(proofsToLock, true, `game-bet-${Date.now()}`);

      const match: GameMatch = {
        id: `match-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        gameType,
        status: "waiting",
        player1: {
          id: `player-${Date.now()}`,
        },
        betAmount,
        unit,
        player1Proofs: JSON.stringify(proofsToLock),
        createdAt: Date.now(),
      };

      this.pendingBets.push(match);
      return match;
    },

    // Join an existing match (player2 joins)
    async joinMatch(matchId: string): Promise<GameMatch> {
      const match = this.pendingBets.find((m) => m.id === matchId);
      if (!match) {
        throw new Error("Match not found");
      }

      if (match.status !== "waiting") {
        throw new Error("Match is no longer available");
      }

      const walletStore = useWalletStore();
      const mintsStore = useMintsStore();
      const proofsStore = useProofsStore();

      // Check if user has enough balance
      const activeProofs = mintsStore.activeProofs;
      const balance = proofsStore.sumProofs(activeProofs);
      
      if (balance < match.betAmount) {
        throw new Error("Insufficient balance");
      }

      // Lock the proofs for the bet
      const spendableProofs = walletStore.spendableProofs(activeProofs, match.betAmount);
      const wallet = walletStore.wallet;
      if (!wallet) {
        throw new Error("Wallet not initialized");
      }
      const proofsToLock = walletStore.coinSelect(spendableProofs, wallet, match.betAmount, false);
      
      if (proofsToLock.length === 0) {
        throw new Error("Could not select proofs for bet");
      }
      
      // Reserve the proofs
      await proofsStore.setReserved(proofsToLock, true, `game-bet-${match.id}`);

      match.player2 = {
        id: `player-${Date.now()}`,
      };
      match.player2Proofs = JSON.stringify(proofsToLock);
      match.status = "matched";
      match.startedAt = Date.now();

      // Remove from pending, set as active
      this.pendingBets = this.pendingBets.filter((m) => m.id !== matchId);
      this.activeMatch = match;

      return match;
    },

    // Start searching for a random match
    startSearching(gameType: GameType, betAmount: number, unit: string = "sat") {
      this.searchingForMatch = true;
      this.searchGameType = gameType;
      this.searchBetAmount = betAmount;
      
      // In a real implementation, this would connect to a matchmaking service
      // For now, we'll simulate finding a match
      this.findRandomMatch();
    },

    // Find a random match to join
    async findRandomMatch() {
      // Look for an existing match with same game type and bet amount
      const availableMatch = this.pendingBets.find(
        (m) => m.gameType === this.searchGameType && 
               m.betAmount === this.searchBetAmount && 
               m.status === "waiting"
      );

      if (availableMatch) {
        await this.joinMatch(availableMatch.id);
        this.searchingForMatch = false;
      } else {
        // Create a new match and wait for someone to join
        const match = await this.createMatch(this.searchGameType!, this.searchBetAmount);
        this.activeMatch = match;
        this.searchingForMatch = false;
      }
    },

    // Cancel searching
    stopSearching() {
      this.searchingForMatch = false;
      this.searchGameType = null;
      this.searchBetAmount = 0;
    },

    // Finish a game and distribute winnings
    async finishGame(winnerId: string) {
      if (!this.activeMatch) {
        throw new Error("No active match");
      }

      const walletStore = useWalletStore();
      const proofsStore = useProofsStore();

      this.activeMatch.status = "finished";
      this.activeMatch.winner = winnerId;
      this.activeMatch.finishedAt = Date.now();

      // Unlock the losing player's proofs (they stay reserved/locked)
      // Winner gets both sets of proofs
      if (winnerId === this.activeMatch.player1.id) {
        // Player 1 wins - unlock player2's proofs and give to player1
        if (this.activeMatch.player2Proofs) {
          const player2Proofs = JSON.parse(this.activeMatch.player2Proofs);
          // In a real implementation, you'd send these proofs to player1
          // For now, we'll just unlock player2's proofs
          await proofsStore.setReserved(player2Proofs, false);
        }
      } else if (this.activeMatch.player2 && winnerId === this.activeMatch.player2.id) {
        // Player 2 wins - unlock player1's proofs and give to player2
        if (this.activeMatch.player1Proofs) {
          const player1Proofs = JSON.parse(this.activeMatch.player1Proofs);
          await proofsStore.setReserved(player1Proofs, false);
        }
      }

      // Move to history
      this.matchHistory.push(this.activeMatch);
      this.activeMatch = null;
    },

    // Cancel a match and refund bets
    async cancelMatch(matchId: string) {
      const match = this.pendingBets.find((m) => m.id === matchId) || this.activeMatch;
      
      if (!match || match.id !== matchId) {
        throw new Error("Match not found");
      }

      const proofsStore = useProofsStore();

      // Unlock all proofs
      if (match.player1Proofs) {
        const player1Proofs = JSON.parse(match.player1Proofs);
        await proofsStore.setReserved(player1Proofs, false);
      }
      if (match.player2Proofs) {
        const player2Proofs = JSON.parse(match.player2Proofs);
        await proofsStore.setReserved(player2Proofs, false);
      }

      match.status = "cancelled";
      
      if (this.activeMatch?.id === matchId) {
        this.activeMatch = null;
      } else {
        this.pendingBets = this.pendingBets.filter((m) => m.id !== matchId);
      }
    },
  },
});

