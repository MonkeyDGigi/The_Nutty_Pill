import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { nip19 } from "nostr-tools";
import { useNostrStore } from "./nostr";
import { axios } from "src/boot/axios";

export type GameScore = {
  id: string;
  gameType: string;
  npub: string; // Nostr public key (npub format)
  gamerTag?: string; // Optional gamer tag
  score: number;
  timestamp: number;
  gameData?: any; // Game-specific data (time, attempts, etc.)
};

export type LeaderboardEntry = {
  npub: string;
  gamerTag?: string;
  bestScore: number;
  gamesPlayed: number;
  lastPlayed: number;
  gameType: string;
};

// API base URL - defaults to localhost in development
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// Helper function to get current user's npub
function getCurrentUserNpub(): string | null {
  const nostrStore = useNostrStore();
  if (!nostrStore.pubkey) return null;
  try {
    return nip19.npubEncode(nostrStore.pubkey);
  } catch {
    return null;
  }
}

export const useLeaderboardStore = defineStore("leaderboard", {
  state: () => {
    return {
      scores: useLocalStorage<GameScore[]>("cashu.games.scores", []),
      gamerTags: useLocalStorage<Record<string, string>>("cashu.games.gamerTags", {}), // npub -> gamerTag mapping
      serverScores: [] as GameScore[], // Scores fetched from server
      serverGamerTags: {} as Record<string, string>, // Gamer tags from server
      lastFetchTime: 0,
      fetching: false,
    };
  },
  getters: {
    // Get current user's npub
    currentUserNpub: (): string | null => {
      return getCurrentUserNpub();
    },
    
    // Get current user's gamer tag
    currentUserGamerTag: (state): string | null => {
      const npub = getCurrentUserNpub();
      if (!npub) return null;
      return state.gamerTags[npub] || null;
    },
    
    // Get leaderboard for a specific game type (from server)
    getLeaderboard: (state) => (gameType: string, limit: number = 10): LeaderboardEntry[] => {
      // Combine local and server scores
      const allScores = [...state.scores, ...state.serverScores].filter(s => s.gameType === gameType);
      
      // Group by npub and find best score for each
      const entriesMap = new Map<string, LeaderboardEntry>();
      
      allScores.forEach(score => {
        const existing = entriesMap.get(score.npub);
        const gamerTag = score.gamerTag || 
                        state.gamerTags[score.npub] || 
                        state.serverGamerTags[score.npub];
        
        if (!existing || score.score > existing.bestScore) {
          entriesMap.set(score.npub, {
            npub: score.npub,
            gamerTag: gamerTag,
            bestScore: score.score,
            gamesPlayed: (existing?.gamesPlayed || 0) + 1,
            lastPlayed: Math.max(existing?.lastPlayed || 0, score.timestamp),
            gameType: gameType,
          });
        } else if (existing) {
          existing.gamesPlayed++;
          existing.lastPlayed = Math.max(existing.lastPlayed, score.timestamp);
        }
      });
      
      // Convert to array and sort by best score (descending)
      const entries = Array.from(entriesMap.values())
        .sort((a, b) => b.bestScore - a.bestScore);
      
      return entries;
    },
    
    // Get user's personal best for a game type
    getUserBestScore: (state) => (gameType: string, npub?: string): number | null => {
      const userNpub = npub || getCurrentUserNpub();
      if (!userNpub) return null;
      
      const userScores = state.scores
        .filter(s => s.gameType === gameType && s.npub === userNpub)
        .map(s => s.score);
      
      return userScores.length > 0 ? Math.max(...userScores) : null;
    },
    
    // Get user's rank for a game type (from server leaderboard)
    getUserRank: (state) => (gameType: string, npub?: string): number | null => {
      const userNpub = npub || getCurrentUserNpub();
      if (!userNpub) return null;
      
      // Get full leaderboard (not limited)
      const allScores = [...state.scores, ...state.serverScores].filter(s => s.gameType === gameType);
      const entriesMap = new Map<string, LeaderboardEntry>();
      
      allScores.forEach(score => {
        const existing = entriesMap.get(score.npub);
        const gamerTag = score.gamerTag || 
                        state.gamerTags[score.npub] || 
                        state.serverGamerTags[score.npub];
        
        if (!existing || score.score > existing.bestScore) {
          entriesMap.set(score.npub, {
            npub: score.npub,
            gamerTag: gamerTag,
            bestScore: score.score,
            gamesPlayed: (existing?.gamesPlayed || 0) + 1,
            lastPlayed: Math.max(existing?.lastPlayed || 0, score.timestamp),
            gameType: gameType,
          });
        } else if (existing) {
          existing.gamesPlayed++;
          existing.lastPlayed = Math.max(existing.lastPlayed, score.timestamp);
        }
      });
      
      const leaderboard = Array.from(entriesMap.values())
        .sort((a, b) => b.bestScore - a.bestScore);
      
      const rank = leaderboard.findIndex(e => e.npub === userNpub);
      return rank >= 0 ? rank + 1 : null;
    },
  },
  actions: {
    // Set gamer tag for current user and save to server
    async setGamerTag(gamerTag: string) {
      const npub = getCurrentUserNpub();
      if (!npub) {
        throw new Error("No Nostr pubkey available");
      }
      this.gamerTags[npub] = gamerTag;
      
      // Save to server
      try {
        await axios.post(`${API_BASE_URL}/api/gamer-tags`, {
          npub,
          gamerTag,
        });
        this.serverGamerTags[npub] = gamerTag;
      } catch (error) {
        console.error("Error saving gamer tag to server:", error);
        // Continue even if save fails
      }
    },
    
    // Get gamer tag for a npub
    getGamerTag(npub: string): string | null {
      return this.gamerTags[npub] || null;
    },
    
    // Submit a score and save to server
    async submitScore(gameType: string, score: number, gameData?: any) {
      const npub = getCurrentUserNpub();
      if (!npub) {
        throw new Error("No Nostr pubkey available. Please initialize Nostr signer.");
      }
      
      const gamerTag = this.gamerTags[npub] || undefined;
      
      const gameScore: GameScore = {
        id: `score-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        gameType,
        npub,
        gamerTag,
        score,
        timestamp: Date.now(),
        gameData,
      };
      
      this.scores.push(gameScore);
      
      // Keep only last 1000 scores to prevent storage bloat
      if (this.scores.length > 1000) {
        this.scores = this.scores.slice(-1000);
      }
      
      // Save to server
      try {
        await axios.post(`${API_BASE_URL}/api/scores`, {
          gameType,
          npub,
          gamerTag,
          score,
          timestamp: gameScore.timestamp,
          gameData,
        });
      } catch (error) {
        console.error("Error saving score to server:", error);
        // Continue even if save fails
      }
      
      return gameScore;
    },
    
    // Fetch scores from server (only called on page load/refresh)
    async fetchGlobalScores(gameType?: string) {
      if (this.fetching) return;
      
      this.fetching = true;
      
      try {
        // Always fetch all scores from server, then filter client-side
        // This ensures we have all data for ranking calculations
        const response = await axios.get(`${API_BASE_URL}/api/scores`);
        
        if (response.data.scores) {
          // Store all scores from server
          this.serverScores = response.data.scores;
        }
        
        // Fetch gamer tags
        try {
          const tagsResponse = await axios.get(`${API_BASE_URL}/api/gamer-tags`);
          if (tagsResponse.data.gamerTags) {
            this.serverGamerTags = tagsResponse.data.gamerTags;
          }
        } catch (error) {
          console.warn("Error fetching gamer tags from server:", error);
        }
        
        this.lastFetchTime = Date.now();
        console.log(`[Leaderboard] Server scores updated. Total: ${this.serverScores.length}`);
      } catch (error) {
        console.error("Error fetching scores from server:", error);
      } finally {
        this.fetching = false;
      }
    },
    
    // Get user's recent scores
    getUserRecentScores(gameType?: string, limit: number = 10): GameScore[] {
      const npub = getCurrentUserNpub();
      if (!npub) return [];
      
      let userScores = this.scores.filter(s => s.npub === npub);
      
      if (gameType) {
        userScores = userScores.filter(s => s.gameType === gameType);
      }
      
      return userScores
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, limit);
    },
    
    // Clear all scores (for testing/reset)
    clearScores() {
      this.scores = [];
    },
  },
});

