import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { useMintsStore } from "./mints";
import { useProofsStore } from "./proofs";
import { getBitcoinLessons } from "./bitcoin-lessons";
import { useNostrStore } from "./nostr";
import { nip19 } from "nostr-tools";

export type Subject = "history" | "self-custody" | "protocols" | "economics";

export type Question = {
  id: string;
  type: "multiple-choice" | "true-false" | "fill-blank" | "match";
  question: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation?: string;
};

// Static lesson content (from bitcoin-lessons.ts)
export type LessonContent = {
  id: string;
  subject: Subject;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  readingContent?: string; // 5-7 min read content for Bitcoin education
  questions?: Question[]; // Optional for special lesson types
  lessonType?: "standard" | "capital-matching"; // Special lesson types
};

// User-specific lesson progress
export type LessonProgress = {
  unlocked: boolean;
  completed: boolean;
  bestScore?: number; // Percentage
  attempts: number;
};

// Combined lesson with content + progress (for internal use)
export type Lesson = LessonContent & LessonProgress;

export type LockedSat = {
  id: string;
  amount: number; // Amount in sats
  lockedAt: number; // Timestamp
  unlockedAt?: number; // Timestamp when unlocked
  lessonId?: string; // If unlocked by lesson
  parentNote?: string; // Optional note from parent
};

// Helper to get current user's pubkey (hex format)
function getCurrentUserPubkey(): string | null {
  const nostrStore = useNostrStore();
  return nostrStore.pubkey || null;
}

// Helper to get storage key for user-specific data
function getUserStorageKey(baseKey: string): string {
  const pubkey = getCurrentUserPubkey();
  if (pubkey) {
    // Use npub format for storage key (more readable)
    try {
      const npub = nip19.npubEncode(pubkey);
      return `${baseKey}.${npub}`;
    } catch {
      // Fallback to hex if encoding fails
      return `${baseKey}.${pubkey}`;
    }
  }
  // Fallback to default key if no pubkey (for backward compatibility)
  return baseKey;
}

export const useEducationStore = defineStore("education", {
  state: () => {
    // Store lesson progress keyed by user pubkey
    const progressKey = getUserStorageKey("cashu.education.lessonProgress");
    const lockedSatsKey = getUserStorageKey("cashu.education.lockedSats");
    const passwordKey = getUserStorageKey("cashu.education.parentPassword");
    const rewardPoolKey = getUserStorageKey("cashu.education.totalRewardPool");
    
    return {
      // Static lesson content (loaded from bitcoin-lessons.ts)
      lessonContent: [] as LessonContent[],
      // User-specific progress: lessonId -> LessonProgress
      lessonProgress: useLocalStorage<Record<string, LessonProgress>>(progressKey, {}),
      lockedSats: useLocalStorage<LockedSat[]>(lockedSatsKey, []),
      currentLesson: null as Lesson | null,
      currentQuestionIndex: 0,
      answers: [] as (string | number | boolean)[],
      parentPasswordHash: useLocalStorage<string | null>(passwordKey, null),
      totalRewardPool: useLocalStorage<number>(rewardPoolKey, 0), // Total sats to be distributed across all lessons
    };
  },
  getters: {
    // Combine lesson content with user progress
    lessons: (state): Lesson[] => {
      return state.lessonContent.map((content) => {
        const progress = state.lessonProgress[content.id] || {
          unlocked: false,
          completed: false,
          attempts: 0,
        };
        return { ...content, ...progress };
      });
    },
    
    // Get lessons by subject, sorted by lesson number
    getLessonsBySubject: (state) => (subject: Subject): Lesson[] => {
      // Combine content with progress
      const allLessons = state.lessonContent.map((content) => {
        const progress = state.lessonProgress[content.id] || {
          unlocked: false,
          completed: false,
          attempts: 0,
        };
        return { ...content, ...progress };
      });
      
      const lessons = allLessons.filter((l) => l.subject === subject);
      // Sort by extracting the number from the ID (e.g., "history-1" -> 1, "history-12" -> 12)
      return lessons.sort((a, b) => {
        const aMatch = a.id.match(/-(\d+)$/);
        const bMatch = b.id.match(/-(\d+)$/);
        const aNum = aMatch ? parseInt(aMatch[1], 10) : 0;
        const bNum = bMatch ? parseInt(bMatch[1], 10) : 0;
        return aNum - bNum;
      });
    },
    
    // Get total wallet balance (all sats in wallet from all mints)
    totalWalletBalance: (state): number => {
      const proofsStore = useProofsStore();
      // Use all proofs from all mints, not just active ones
      return proofsStore.proofs
        .filter((p) => !p.reserved) // Exclude reserved proofs
        .reduce((sum, proof) => sum + proof.amount, 0);
    },
    
    // Get locked sats (difference between total wallet balance and unlocked sats)
    totalLockedSats(state): number {
      const total = this.totalWalletBalance;
      const unlocked = this.totalUnlockedSats;
      return Math.max(0, total - unlocked);
    },
    
    // Get unlocked sats (earned by completing lessons, can be spent)
    totalUnlockedSats: (state): number => {
      return state.lockedSats
        .filter((s) => s.unlockedAt)
        .reduce((sum, s) => sum + s.amount, 0);
    },
    
    // Get available balance for locking (total - locked - unlocked = free sats)
    // This is sats that haven't been locked yet
    availableBalance(state): number {
      const mintsStore = useMintsStore();
      const total = mintsStore.activeProofs
        .flat()
        .reduce((sum, proof) => sum + proof.amount, 0);
      const locked = state.lockedSats
        .filter((s) => !s.unlockedAt)
        .reduce((sum, s) => sum + s.amount, 0);
      const unlocked = state.lockedSats
        .filter((s) => s.unlockedAt)
        .reduce((sum, s) => sum + s.amount, 0);
      // Available = total - (locked + unlocked)
      // This represents sats that are free to lock
      return Math.max(0, total - locked - unlocked);
    },
    
    // Calculate reward for a specific lesson based on difficulty and lesson number
    getRewardForLesson: (state) => (lessonId: string): number => {
      if (state.totalRewardPool === 0 || state.lessonContent.length === 0) {
        return 0;
      }
      
      const lesson = state.lessonContent.find((l) => l.id === lessonId);
      if (!lesson) {
        return 0;
      }
      
      // Calculate weights for all lessons
      const lessonWeights = state.lessonContent.map((l) => {
        // Extract lesson number from ID (e.g., "history-1" -> 1, "history-12" -> 12)
        const match = l.id.match(/-(\d+)$/);
        const lessonNum = match ? parseInt(match[1], 10) : 0;
        
        // Difficulty weights: beginner=1, intermediate=2, advanced=3
        const difficultyWeight = l.difficulty === "beginner" ? 1 : 
                                 l.difficulty === "intermediate" ? 2 : 3;
        
        // Combine: lesson number weight (higher = more) + difficulty weight
        // Lesson number gets more weight as it increases (multiply by 1.5 for progression)
        const weight = (lessonNum * 1.5) + (difficultyWeight * 2);
        
        return { id: l.id, weight };
      });
      
      // Find this lesson's weight
      const thisLessonWeight = lessonWeights.find((w) => w.id === lessonId)?.weight || 0;
      
      // Calculate total weight
      const totalWeight = lessonWeights.reduce((sum, w) => sum + w.weight, 0);
      
      if (totalWeight === 0) {
        return 0;
      }
      
      // Calculate reward: (lesson weight / total weight) * total pool
      const reward = Math.floor((thisLessonWeight / totalWeight) * state.totalRewardPool);
      
      return Math.max(1, reward); // Ensure at least 1 sat
    },
    
    // Calculate average reward per lesson (for display purposes)
    rewardPerLesson(state): number {
      const totalLessons = state.lessonContent.length;
      if (totalLessons === 0 || state.totalRewardPool === 0) {
        return 0;
      }
      // Return average for display
      return Math.floor(state.totalRewardPool / totalLessons);
    },
  },
  actions: {
    // Initialize default lessons if none exist, or add missing lessons
    initializeLessons() {
      const defaultLessons = this.getDefaultLessons();
      console.log("[Education] getDefaultLessons returned", defaultLessons.length, "lessons");
      
      // Load static lesson content
      if (this.lessonContent.length === 0) {
        console.log("[Education] No lesson content found, loading from bitcoin-lessons.ts");
        this.lessonContent = defaultLessons;
        console.log("[Education] Lesson content loaded. Total:", this.lessonContent.length);
      } else {
        console.log("[Education] Existing lesson content found:", this.lessonContent.length);
        // Check if all default lessons exist, add any missing ones
        defaultLessons.forEach((defaultLesson) => {
          const exists = this.lessonContent.find((l) => l.id === defaultLesson.id);
          if (!exists) {
            console.log("[Education] Adding missing lesson content:", defaultLesson.id);
            this.lessonContent.push(defaultLesson);
          }
        });
      }
      
      // Initialize progress for lessons that don't have it yet
      this.lessonContent.forEach((content) => {
        if (!this.lessonProgress[content.id]) {
          this.lessonProgress[content.id] = {
            unlocked: false,
            completed: false,
            attempts: 0,
          };
        }
      });
      
      // Ensure first lesson in each subject is unlocked
      const subjects: Subject[] = ["history", "self-custody", "protocols", "economics"];
      subjects.forEach((subject) => {
        const subjectLessons = this.lessonContent
          .filter((l) => l.subject === subject)
          .sort((a, b) => {
            // Sort by extracting the number from the ID (e.g., "history-1" -> 1, "history-12" -> 12)
            const aMatch = a.id.match(/-(\d+)$/);
            const bMatch = b.id.match(/-(\d+)$/);
            const aNum = aMatch ? parseInt(aMatch[1], 10) : 0;
            const bNum = bMatch ? parseInt(bMatch[1], 10) : 0;
            return aNum - bNum;
          });
        if (subjectLessons.length > 0) {
          const firstLessonId = subjectLessons[0].id;
          if (!this.lessonProgress[firstLessonId]) {
            this.lessonProgress[firstLessonId] = {
              unlocked: false,
              completed: false,
              attempts: 0,
            };
          }
          if (!this.lessonProgress[firstLessonId].unlocked) {
            this.lessonProgress[firstLessonId].unlocked = true;
            console.log("[Education] Unlocked first lesson in", subject, ":", firstLessonId, "(", subjectLessons[0].title, ")");
          }
        }
      });
    },
    // Get default lessons for each subject (returns LessonContent only)
    getDefaultLessons(): LessonContent[] {
      // Import Bitcoin lessons
      try {
        const lessons = getBitcoinLessons();
        // getBitcoinLessons already returns LessonContent[], so no need to filter
        return lessons;
      } catch (e) {
        console.error("[Education] Could not load Bitcoin lessons:", e);
        // Fallback: return empty array, lessons will be added via initializeLessons
        return [];
      }
    },
    
    lockSats(amount: number, note?: string): string {
      // Check if we have enough available balance to lock
      const available = this.availableBalance;
      if (amount > available) {
        throw new Error(`Not enough available balance. Available: ${available} sats, trying to lock: ${amount} sats`);
      }
      
      const lockedSat: LockedSat = {
        id: `locked-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        amount,
        lockedAt: Date.now(),
        parentNote: note,
      };
      this.lockedSats.push(lockedSat);
      console.log(`[Education] Locked ${amount} sats. Total locked: ${this.totalLockedSats}, Total unlocked: ${this.totalUnlockedSats}`);
      return lockedSat.id;
    },
    
    // Unlock sats based on lesson completion
    unlockSatsFromLesson(lessonId: string, score: number): number {
      // Only unlock sats if score is 100%
      if (score !== 100) {
        console.log(`[Education] Score is ${score}%, not 100%. No sats unlocked.`);
        return 0;
      }
      
      const lessonContent = this.lessonContent.find((l) => l.id === lessonId);
      if (!lessonContent) {
        console.warn(`[Education] Lesson ${lessonId} not found`);
        return 0;
      }
      
      // Check if reward pool is set FIRST (before other checks)
      if (this.totalRewardPool === 0) {
        console.warn(`[Education] Total reward pool is 0. Admin needs to set a reward pool in Settings.`);
        return 0;
      }
      
      // Calculate reward amount
      const rewardAmount = this.getRewardForLesson(lessonId);
      console.log(`[Education] Unlocking sats for lesson ${lessonId}. Score: ${score}%, Difficulty: ${lessonContent.difficulty}, Reward: ${rewardAmount} sats (from pool of ${this.totalRewardPool} sats)`);
      
      if (rewardAmount === 0) {
        console.warn(`[Education] Reward amount is 0 for lesson ${lessonId}. Cannot unlock sats.`);
        return 0;
      }
      
      // Check if sats were already unlocked from this lesson
      // Look for any locked sat entry that was unlocked by this specific lesson
      const alreadyUnlocked = this.lockedSats.some(
        (s) => s.lessonId === lessonId && s.unlockedAt && s.unlockedAt > 0
      );
      
      if (alreadyUnlocked) {
        console.log(`[Education] Lesson ${lessonId} already unlocked sats previously. No sats unlocked this time.`);
        return 0;
      }
      
      console.log(`[Education] Current locked sats array:`, this.lockedSats);
      console.log(`[Education] Total locked sats (getter): ${this.totalLockedSats} sats`);
      
      // Check if there are locked sats available to unlock
      const allLockedSats = Array.isArray(this.lockedSats) ? [...this.lockedSats] : [];
      const lockedToUnlock = allLockedSats
        .filter((s) => !s.unlockedAt)
        .sort((a, b) => a.lockedAt - b.lockedAt); // Oldest first
      
      console.log(`[Education] All locked sats: ${allLockedSats.length}, Unlocked entries: ${allLockedSats.filter(s => s.unlockedAt).length}, Locked entries: ${lockedToUnlock.length}`);
      console.log(`[Education] Locked entries details:`, lockedToUnlock);
      
      if (lockedToUnlock.length === 0) {
        const totalBalance = this.totalWalletBalance;
        const unlocked = this.totalUnlockedSats;
        const locked = this.totalLockedSats;
        console.warn(`[Education] No locked sats available to unlock.`);
        console.warn(`[Education] Wallet status: Total=${totalBalance}, Unlocked=${unlocked}, Locked=${locked}, Available=${this.availableBalance}`);
        console.warn(`[Education] If you have sats in your wallet, they need to be locked. Set the reward pool in Settings to auto-lock available sats.`);
        return 0;
      }
      
      // Now proceed with unlocking
      if (rewardAmount > 0) {
        let remainingToUnlock = rewardAmount;
        let totalUnlocked = 0;
        
        // Process locked sats by finding them in the actual array (not the copy)
        for (const lockedRef of lockedToUnlock) {
          if (remainingToUnlock <= 0) break;
          
          // Find the actual entry in the store's array
          const lockedIndex = this.lockedSats.findIndex(s => s.id === lockedRef.id);
          if (lockedIndex === -1) {
            console.warn(`[Education] Locked sat ${lockedRef.id} not found in array, skipping`);
            continue;
          }
          
          const locked = this.lockedSats[lockedIndex];
          if (locked.unlockedAt) {
            console.warn(`[Education] Locked sat ${locked.id} already unlocked, skipping`);
            continue;
          }
          
          console.log(`[Education] Processing locked sat: ${locked.id}, amount: ${locked.amount}, remaining to unlock: ${remainingToUnlock}`);
          
          if (locked.amount <= remainingToUnlock) {
            // Unlock entire locked amount
            locked.unlockedAt = Date.now();
            locked.lessonId = lessonId;
            totalUnlocked += locked.amount;
            remainingToUnlock -= locked.amount;
            console.log(`[Education] Unlocked entire amount: ${locked.amount} sats`);
          } else {
            // Split: unlock only the needed amount, keep the rest locked
            const remainingAmount = locked.amount - remainingToUnlock;
            const unlockedAmount = remainingToUnlock;
            
            // Update current locked sat to be the unlocked portion
            locked.amount = unlockedAmount;
            locked.unlockedAt = Date.now();
            locked.lessonId = lessonId;
            totalUnlocked += unlockedAmount;
            
            console.log(`[Education] Split unlock: ${unlockedAmount} unlocked, ${remainingAmount} remains locked`);
            
            // Create a new locked sat for the remaining amount
            if (remainingAmount > 0) {
              const newLockedSat: LockedSat = {
                id: `locked-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                amount: remainingAmount,
                lockedAt: locked.lockedAt, // Keep original lock time
                parentNote: locked.parentNote,
              };
              this.lockedSats.push(newLockedSat);
              console.log(`[Education] Created new locked sat entry: ${newLockedSat.id} with ${remainingAmount} sats`);
            }
            
            remainingToUnlock = 0;
          }
        }
        
        console.log(`[Education] Successfully unlocked ${totalUnlocked} sats out of ${rewardAmount} requested`);
        return totalUnlocked;
      }
      
      console.log(`[Education] Reward amount is 0 (score: ${score}%, lesson: ${lessonId})`);
      return 0;
    },
    
    // Start a lesson
    startLesson(lessonId: string) {
      const lessonContent = this.lessonContent.find((l) => l.id === lessonId);
      if (!lessonContent) throw new Error("Lesson not found");
      
      const progress = this.lessonProgress[lessonId] || {
        unlocked: false,
        completed: false,
        attempts: 0,
      };
      
      if (!progress.unlocked) throw new Error("Lesson is locked");
      
      // Combine content with progress for currentLesson
      this.currentLesson = { ...lessonContent, ...progress };
      // Only set question index if it's a standard lesson with questions
      if (lessonContent.lessonType !== "capital-matching" && lessonContent.questions) {
        this.currentQuestionIndex = 0;
        this.answers = [];
      }
    },
    
    // Submit answer for current question
    submitAnswer(answer: string | number | boolean) {
      if (!this.currentLesson || !this.currentLesson.questions) return;
      
      this.answers.push(answer);
      
      if (this.currentQuestionIndex < this.currentLesson.questions.length - 1) {
        this.currentQuestionIndex++;
      }
    },
    
    // Complete lesson and calculate score
    completeLesson(): { score: number; unlocked: number } {
      if (!this.currentLesson) {
        throw new Error("No lesson in progress");
      }
      
      // Check if this is a special lesson type (like capital-matching)
      if (this.currentLesson.lessonType === "capital-matching") {
        throw new Error("Capital matching lessons should use handleCapitalMatchingComplete");
      }
      
      // Calculate score
      if (!this.currentLesson.questions || this.currentLesson.questions.length === 0) {
        throw new Error("Lesson has no questions");
      }
      
      let correct = 0;
      this.currentLesson.questions.forEach((q, index) => {
        if (this.answers[index] === q.correctAnswer) {
          correct++;
        }
      });
      
      const score = Math.round((correct / this.currentLesson.questions.length) * 100);
      
      // Update lesson progress
      const lessonId = this.currentLesson!.id;
      const progress = this.lessonProgress[lessonId] || {
        unlocked: false,
        completed: false,
        attempts: 0,
      };
      const wasAlreadyCompleted = progress.completed;
      
      // Always allow re-taking the lesson for review, but track attempts
      progress.attempts++;
      if (!progress.bestScore || score > progress.bestScore) {
        progress.bestScore = score;
      }
      
      // Only mark as completed if not already completed (first completion)
      if (!wasAlreadyCompleted) {
        progress.completed = true;
      }
      
      // Update progress in store
      this.lessonProgress[lessonId] = progress;
      
      // Always unlock next lesson when completing a lesson (even if already completed before)
      // This ensures progression works even if lesson was completed with low score previously
      // Score only affects sats unlocking, not lesson progression
      const lessonContent = this.lessonContent.find((l) => l.id === lessonId);
      if (lessonContent) {
        // Create a combined lesson object for unlockNextLesson
        const combinedLesson: Lesson = { ...lessonContent, ...progress };
        this.unlockNextLesson(combinedLesson);
        console.log(`[Education] Lesson ${lessonId} completed. Score: ${score}%. Unlocking next lesson.`);
      } else {
        console.error(`[Education] Could not find lesson content ${lessonId}`);
      }
      
      // Unlock sats if:
      // 1. Score is 100%
      // 2. Sats haven't been unlocked from this lesson before (check inside unlockSatsFromLesson)
      // Note: We allow unlocking even if lesson was completed before, as long as sats weren't unlocked
      const unlocked = (score === 100) 
        ? this.unlockSatsFromLesson(this.currentLesson.id, score) 
        : 0;
      
      if (score === 100 && unlocked === 0) {
        console.log(`[Education] Lesson ${this.currentLesson.id} completed with 100% score, but no sats unlocked. This may be because sats were already unlocked from this lesson, or no locked sats are available.`);
      } else if (score === 100 && unlocked > 0) {
        console.log(`[Education] ✓ Lesson ${this.currentLesson.id} completed with 100% score. Unlocked ${unlocked} sats!`);
      } else {
        console.log(`[Education] Lesson ${this.currentLesson.id} completed. Score: ${score}%. Sats only unlock at 100% score.`);
      }
      
      // Reset current lesson
      this.currentLesson = null;
      this.currentQuestionIndex = 0;
      this.answers = [];
      
      return { score, unlocked };
    },
    
    // Unlock next lesson in sequence
    unlockNextLesson(completedLesson: Lesson) {
      // Get all lessons for the same subject and sort them numerically
      const sameSubjectLessons = this.lessonContent
        .filter((l) => l.subject === completedLesson.subject)
        .sort((a, b) => {
          // Sort by extracting the number from the ID (e.g., "history-1" -> 1, "history-12" -> 12)
          const aMatch = a.id.match(/-(\d+)$/);
          const bMatch = b.id.match(/-(\d+)$/);
          const aNum = aMatch ? parseInt(aMatch[1], 10) : 0;
          const bNum = bMatch ? parseInt(bMatch[1], 10) : 0;
          const result = aNum - bNum;
          return result;
        });
      
      console.log(`[Education] unlockNextLesson called for: ${completedLesson.id} (${completedLesson.title})`);
      console.log(`[Education] Same subject lessons (${completedLesson.subject}) sorted:`, sameSubjectLessons.map(l => `${l.id} (${l.title})`));
      
      // Find the current lesson in the sorted array
      const currentIndex = sameSubjectLessons.findIndex((l) => l.id === completedLesson.id);
      console.log(`[Education] Current lesson index: ${currentIndex} out of ${sameSubjectLessons.length - 1}`);
      
      if (currentIndex < 0) {
        console.error(`[Education] ✗ Could not find completed lesson ${completedLesson.id} in sorted array!`);
        return;
      }
      
      if (currentIndex < sameSubjectLessons.length - 1) {
        const nextLesson = sameSubjectLessons[currentIndex + 1];
        console.log(`[Education] Next lesson should be: ${nextLesson.id} (${nextLesson.title})`);
        
        // Find and unlock the next lesson in progress
        if (!this.lessonProgress[nextLesson.id]) {
          this.lessonProgress[nextLesson.id] = {
            unlocked: false,
            completed: false,
            attempts: 0,
          };
        }
        this.lessonProgress[nextLesson.id].unlocked = true;
        console.log(`[Education] ✓ Successfully unlocked next lesson: ${nextLesson.id} (${nextLesson.title})`);
      } else {
        console.log(`[Education] No next lesson available - this is the last lesson in the subject`);
      }
    },
    
    // Password management
    async hashPassword(password: string): Promise<string> {
      // Simple hash using Web Crypto API
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    },
    
    async verifyPassword(password: string): Promise<boolean> {
      if (!this.parentPasswordHash) return false;
      const hash = await this.hashPassword(password);
      return hash === this.parentPasswordHash;
    },
    
    async setParentPassword(password: string) {
      this.parentPasswordHash = await this.hashPassword(password);
    },
    
    // Set the total reward pool (distributed evenly across all lessons)
    setTotalRewardPool(amount: number) {
      if (amount < 0) {
        throw new Error("Reward pool cannot be negative");
      }
      this.totalRewardPool = amount;
      console.log(`[Education] Total reward pool set to ${amount} sats. Reward per lesson: ${this.rewardPerLesson} sats`);
      
      // Automatically lock all available balance when reward pool is set
      // This ensures existing sats are locked and can be unlocked through lessons
      try {
        const available = this.availableBalance;
        if (available > 0) {
          this.lockSats(available, `Auto-locked when reward pool was set`);
          console.log(`[Education] ✓ Automatically locked ${available} available sats when reward pool was set`);
        }
      } catch (e) {
        console.warn(`[Education] Could not auto-lock available sats when setting reward pool:`, e);
        // Don't fail the operation if locking fails
      }
    },
  },
});

