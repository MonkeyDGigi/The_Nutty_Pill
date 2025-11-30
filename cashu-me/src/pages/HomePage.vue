<template>
  <q-page class="q-pa-md">
    <!-- Header with Balance Info -->
    <div class="row items-center justify-between q-mb-lg">
      <div class="col-auto">
        <h4 class="q-ma-none">The Nutty Pill</h4>
        <div class="text-caption">Learn about Bitcoin and unlock your sats!</div>
      </div>
      <div class="col-auto">
        <q-card class="q-pa-md balance-card">
          <div class="text-body2">
            <div class="q-mb-sm">
              <strong>Unlocked:</strong> {{ totalUnlockedSats }} sats
              <div class="text-caption text-positive">Can be spent</div>
            </div>
            <div class="q-mt-sm q-pt-sm" style="border-top: 1px solid rgba(157, 78, 221, 0.2);">
              <div class="text-caption">Locked: {{ totalLockedSats }} sats</div>
              <div class="text-caption">Total: {{ totalWalletBalance }} sats</div>
            </div>
          </div>
        </q-card>
      </div>
    </div>

    <!-- Subjects -->
    <div class="row q-col-gutter-md justify-center">
      <div 
        v-for="subject in subjects" 
        :key="subject.id"
        class="col-12 col-sm-6 col-lg-3"
      >
        <q-card class="subject-card cursor-pointer" @click="selectedSubject = subject.id">
          <q-card-section>
            <div class="text-h5 q-mb-sm">{{ subject.icon }} {{ subject.name }}</div>
            <div class="text-caption q-mb-md">{{ subject.description }}</div>
            <div class="q-mt-md">
              <div class="text-body2 q-mb-xs">
                Lessons: {{ getLessonsBySubject(subject.id).length }}
              </div>
              <div class="text-body2 q-mb-sm">
                Completed: {{ getCompletedLessons(subject.id) }}
              </div>
              <div class="progress-container q-mt-sm" style="position: relative;">
                <q-linear-progress
                  :value="getSubjectProgress(subject.id)"
                  color="primary"
                  size="24px"
                  class="progress-bar"
                />
                <div class="progress-text">
                  {{ getCompletedLessons(subject.id) }}/{{ getLessonsBySubject(subject.id).length }}
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Lessons for Selected Subject -->
    <div v-if="selectedSubject" class="q-mt-lg">
      <div class="text-h6 q-mb-md">
        {{ getSubjectName(selectedSubject) }} Lessons
      </div>
      
      <div class="row q-col-gutter-md justify-center">
        <div
          v-for="lesson in getLessonsBySubject(selectedSubject)"
          :key="lesson.id"
          class="col-12 col-sm-6 col-lg-4"
        >
          <q-card 
            class="lesson-card"
            :class="{ 'lesson-locked': !lesson.unlocked, 'lesson-completed': lesson.completed }"
          >
            <q-card-section>
              <div class="row items-center justify-between q-mb-sm">
                <div>
                  <div class="text-caption text-grey-6 q-mb-xs">
                    Lesson {{ getLessonNumber(lesson.id) }}
                  </div>
                  <div class="text-h6">{{ lesson.title }}</div>
                </div>
                <q-icon 
                  v-if="lesson.completed" 
                  name="check_circle" 
                  color="positive" 
                  size="24px"
                />
                <q-icon 
                  v-else-if="!lesson.unlocked" 
                  name="lock" 
                  color="grey" 
                  size="24px"
                />
              </div>
              <div class="text-caption q-mb-sm">{{ lesson.description }}</div>
              <div class="row items-center justify-between">
                <div class="text-body2">
                  Reward: {{ getRewardForLesson(lesson.id) }} sats
                </div>
                <div class="text-caption" v-if="lesson.bestScore">
                  Best: {{ lesson.bestScore }}%
                </div>
              </div>
            </q-card-section>
            <q-card-actions>
              <q-btn
                v-if="lesson.unlocked"
                @click="startLesson(lesson.id)"
                :disable="!!educationStore.currentLesson"
                class="full-width"
              >
                {{ lesson.completed ? 'Review' : 'Start Lesson' }}
              </q-btn>
              <q-btn
                v-else
                disabled
                class="full-width"
              >
                Locked
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Capital Matching Game Dialog -->
    <q-dialog v-if="educationStore.currentLesson && educationStore.currentLesson.lessonType === 'capital-matching'" v-model="showLessonDialog" persistent>
      <q-card style="min-width: 90vw; max-width: 800px">
        <q-card-section class="row items-center justify-between">
          <div class="text-h6">{{ educationStore.currentLesson?.title }}</div>
          <q-btn
            flat
            round
            dense
            icon="close"
            @click="cancelLesson"
            class="q-ml-auto"
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <CapitalMatchingGame
            :lesson="educationStore.currentLesson"
            @complete="handleCapitalMatchingComplete"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Standard Lesson Progress Dialog -->
    <q-dialog v-else-if="educationStore.currentLesson && educationStore.currentLesson.lessonType !== 'capital-matching'" v-model="showLessonDialog" persistent>
      <q-card style="min-width: 90vw; max-width: 600px; max-height: 90vh">
        <q-card-section class="row items-center justify-between">
          <div class="text-h6">{{ educationStore.currentLesson.title }}</div>
          <q-btn
            flat
            round
            dense
            icon="close"
            @click="cancelLesson"
            class="q-ml-auto"
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="text-caption" v-if="educationStore.currentLesson.questions && !showReading && !showReview">
            Question {{ educationStore.currentQuestionIndex + 1 }} of 
            {{ educationStore.currentLesson.questions.length }}
          </div>
          <div class="text-caption" v-if="showReview">
            Review your answers - navigate through questions and make changes if needed
          </div>
          <div class="text-caption" v-if="showReading">
            Read the content below, then answer the questions
          </div>
        </q-card-section>

        <!-- Reading Content -->
        <q-card-section v-if="showReading && educationStore.currentLesson.readingContent" class="q-pt-none">
          <div class="reading-content q-pa-md" style="background: rgba(157, 78, 221, 0.05); border-radius: 8px; max-height: 50vh; overflow-y: auto;">
            <div v-html="formatReadingContent(educationStore.currentLesson.readingContent)"></div>
          </div>
          <div class="row q-gutter-sm q-mt-md">
            <q-btn
              @click="showReading = false"
              color="primary"
              class="col lesson-reading-start-btn"
            >
              I've Read This - Start Questions
            </q-btn>
          </div>
        </q-card-section>

        <!-- Review Mode: Navigable Questions -->
        <q-card-section v-if="!showReading && showReview && educationStore.currentLesson && currentQuestion">
          <div class="text-h6 q-mb-sm">Review Your Answers</div>
          <div class="text-caption q-mb-md">
            Question {{ educationStore.currentQuestionIndex + 1 }} of 
            {{ educationStore.currentLesson.questions.length }}
          </div>
          
          <div class="text-h6 q-mb-md">
            {{ currentQuestion.question }}
          </div>
          
          <div class="text-body2 q-mb-md" style="background: rgba(157, 78, 221, 0.1); padding: 8px; border-radius: 4px;">
            <strong>Your current answer:</strong> 
            <span :class="getAnswerClass(currentQuestion, educationStore.currentQuestionIndex)">
              {{ formatAnswer(educationStore.answers[educationStore.currentQuestionIndex], currentQuestion) }}
            </span>
          </div>

          <!-- Multiple Choice -->
          <div v-if="currentQuestion.type === 'multiple-choice' && currentQuestion.options">
            <q-btn
              v-for="(option, index) in currentQuestion.options"
              :key="index"
              @click="updateAnswer(educationStore.currentQuestionIndex, option)"
              class="full-width q-mb-sm"
              :color="selectedAnswer === option ? 'primary' : ''"
            >
              {{ option }}
            </q-btn>
          </div>

          <!-- True/False -->
          <div v-if="currentQuestion.type === 'true-false'">
            <q-btn
              @click="updateAnswer(educationStore.currentQuestionIndex, true)"
              class="full-width q-mb-sm"
              :color="selectedAnswer === true ? 'primary' : ''"
            >
              True
            </q-btn>
            <q-btn
              @click="updateAnswer(educationStore.currentQuestionIndex, false)"
              class="full-width"
              :color="selectedAnswer === false ? 'primary' : ''"
            >
              False
            </q-btn>
          </div>
        </q-card-section>

        <!-- Questions (Normal Mode) -->
        <q-card-section v-if="!showReading && !showReview && educationStore.currentLesson && currentQuestion">
          <div class="text-h6 q-mb-md">
            {{ currentQuestion.question }}
          </div>

          <!-- Multiple Choice -->
          <div v-if="currentQuestion.type === 'multiple-choice' && currentQuestion.options">
            <q-btn
              v-for="(option, index) in currentQuestion.options"
              :key="index"
              @click="submitAnswer(option)"
              class="full-width q-mb-sm"
              :color="selectedAnswer === option ? 'primary' : ''"
            >
              {{ option }}
            </q-btn>
          </div>

          <!-- True/False -->
          <div v-if="currentQuestion.type === 'true-false'">
            <q-btn
              @click="submitAnswer(true)"
              class="full-width q-mb-sm"
              :color="selectedAnswer === true ? 'primary' : ''"
            >
              True
            </q-btn>
            <q-btn
              @click="submitAnswer(false)"
              class="full-width"
              :color="selectedAnswer === false ? 'primary' : ''"
            >
              False
            </q-btn>
          </div>
        </q-card-section>

        <q-card-actions v-if="educationStore.currentLesson.questions && !showReview">
          <div class="row full-width q-gutter-sm">
            <q-btn
              v-if="educationStore.currentQuestionIndex < educationStore.currentLesson.questions.length - 1"
              @click="nextQuestion"
              :disable="selectedAnswer === null"
              class="col"
            >
              Next Question
            </q-btn>
            <q-btn
              v-else
              @click="goToReview"
              :disable="selectedAnswer === null"
              class="col"
              color="primary"
            >
              Review Answers
            </q-btn>
          </div>
        </q-card-actions>

        <!-- Review Mode Navigation -->
        <q-card-actions v-if="showReview && educationStore.currentLesson && educationStore.currentLesson.questions">
          <div class="row full-width q-gutter-sm">
            <q-btn
              v-if="educationStore.currentQuestionIndex > 0"
              @click="goToReviewQuestion(educationStore.currentQuestionIndex - 1)"
              class="col"
              outline
            >
              Previous
            </q-btn>
            <q-btn
              v-if="educationStore.currentQuestionIndex < educationStore.currentLesson.questions.length - 1"
              @click="goToReviewQuestion(educationStore.currentQuestionIndex + 1)"
              class="col"
              :disable="selectedAnswer === null"
            >
              Next
            </q-btn>
            <q-btn
              v-if="educationStore.currentQuestionIndex === educationStore.currentLesson.questions.length - 1"
              @click="completeLesson"
              class="col"
              color="positive"
            >
              Submit Answers
            </q-btn>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Lesson Complete Dialog -->
    <q-dialog v-model="showCompleteDialog">
      <q-card style="min-width: 300px">
        <q-card-section>
          <div class="text-h6">Lesson Complete! 🎉</div>
        </q-card-section>
        <q-card-section>
          <div class="text-body1 q-mb-sm">
            Score: {{ lessonResult?.score }}%
          </div>
          <div class="text-body1 q-mb-sm" v-if="lessonResult && lessonResult.unlocked > 0">
            You unlocked: {{ lessonResult.unlocked }} sats! 🎁
          </div>
          <div class="text-body2 q-mb-sm text-warning" v-else-if="lessonResult && lessonResult.score === 100">
            <div>Great job! You got 100%!</div>
            <div class="q-mt-xs text-caption">
              <span v-if="educationStore.totalRewardPool === 0">
                No reward pool set. Admin needs to set a reward pool in Settings.
              </span>
              <span v-else-if="educationStore.totalLockedSats === 0">
                No locked sats available. Make sure sats have been received and locked.
              </span>
              <span v-else>
                You've already completed this lesson and earned sats from it before.
              </span>
            </div>
          </div>
          <div class="text-body2 q-mb-sm text-negative" v-else-if="lessonResult && lessonResult.score < 100">
            You need 100% to unlock sats. You got {{ lessonResult.score }}%. Try again!
          </div>
          <div class="text-caption" v-else>
            Complete lessons with 100% to unlock sats!
          </div>
        </q-card-section>
        <q-card-actions>
          <q-btn @click="showCompleteDialog = false" class="full-width">Continue</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useEducationStore, type Subject } from "src/stores/education";
import { useMintsStore } from "src/stores/mints";
import CapitalMatchingGame from "src/components/CapitalMatchingGame.vue";

export default defineComponent({
  name: "HomePage",
  setup() {
    const educationStore = useEducationStore();
    const mintsStore = useMintsStore();
    const selectedSubject = ref<Subject | null>(null);
    const showLessonDialog = ref(false);
    const showCompleteDialog = ref(false);
    const showReading = ref(false);
    const showReview = ref(false);
    const selectedAnswer = ref<string | number | boolean | null>(null);
    const lessonResult = ref<{ score: number; unlocked: number } | null>(null);

    const subjects = [
      {
        id: "history" as Subject,
        name: "Bitcoin History",
        icon: "📜",
        description: "From the whitepaper to today",
      },
      {
        id: "protocols" as Subject,
        name: "The Tech",
        icon: "⚙️",
        description: "How Bitcoin works under the hood",
      },
      {
        id: "economics" as Subject,
        name: "21M/∞",
        icon: "💰",
        description: "Hard money vs infinite fiat",
      },
      {
        id: "self-custody" as Subject,
        name: "Stay Sovereign",
        icon: "🔐",
        description: "Hold your own keys, stay in control",
      },
    ];

    const totalWalletBalance = computed(() => {
      return educationStore.totalWalletBalance;
    });

    const totalLockedSats = computed(() => {
      return educationStore.totalLockedSats;
    });

    const totalUnlockedSats = computed(() => {
      return educationStore.totalUnlockedSats;
    });

    const rewardPerLesson = computed(() => {
      return educationStore.rewardPerLesson;
    });
    
    const getRewardForLesson = (lessonId: string) => {
      return educationStore.getRewardForLesson(lessonId);
    };

    const getLessonsBySubject = (subject: Subject) => {
      return educationStore.getLessonsBySubject(subject);
    };

    const getCompletedLessons = (subject: Subject) => {
      return getLessonsBySubject(subject).filter((l) => l.completed).length;
    };

    const getSubjectProgress = (subject: Subject): number => {
      const lessons = getLessonsBySubject(subject);
      if (lessons.length === 0) return 0;
      const completed = lessons.filter((l) => l.completed).length;
      return completed / lessons.length;
    };

    const getSubjectName = (subject: Subject) => {
      return subjects.find((s) => s.id === subject)?.name || subject;
    };

    const getLessonNumber = (lessonId: string): number => {
      const match = lessonId.match(/-(\d+)$/);
      return match ? parseInt(match[1], 10) : 0;
    };

    const currentQuestion = computed(() => {
      if (!educationStore.currentLesson || !educationStore.currentLesson.questions) return null;
      return educationStore.currentLesson.questions[educationStore.currentQuestionIndex];
    });

    const startLesson = (lessonId: string) => {
      try {
        educationStore.startLesson(lessonId);
        // Show reading content first if it exists
        const lesson = educationStore.lessons.find(l => l.id === lessonId);
        if (lesson && lesson.readingContent) {
          showReading.value = true;
        } else {
          showReading.value = false;
        }
        showReview.value = false;
        showLessonDialog.value = true;
        selectedAnswer.value = null;
      } catch (error: any) {
        console.error("Error starting lesson:", error);
      }
    };

    const cancelLesson = () => {
      // Reset lesson state
      educationStore.currentLesson = null;
      educationStore.currentQuestionIndex = 0;
      educationStore.answers = [];
      showLessonDialog.value = false;
      showReading.value = false;
      showReview.value = false;
      selectedAnswer.value = null;
    };

    const formatReadingContent = (content: string) => {
      if (!content) return '';
      
      // Split content into lines
      const lines = content.split('\n');
      let result = '';
      let currentParagraph = '';
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip empty lines
        if (!line) {
          // If we have accumulated paragraph content, close it
          if (currentParagraph) {
            result += `<p style="margin: 0.5em 0; line-height: 1.6;">${currentParagraph}</p>`;
            currentParagraph = '';
          }
          continue;
        }
        
        // Check for headers
        if (line.startsWith('## ')) {
          // Close any open paragraph first
          if (currentParagraph) {
            result += `<p style="margin: 0.5em 0; line-height: 1.6;">${currentParagraph}</p>`;
            currentParagraph = '';
          }
          // Add h3 header
          result += `<h3 style="font-size: 1.2em; font-weight: bold; margin-top: 0.8em; margin-bottom: 0.4em;">${line.substring(3)}</h3>`;
        } else if (line.startsWith('# ')) {
          // Close any open paragraph first
          if (currentParagraph) {
            result += `<p style="margin: 0.5em 0; line-height: 1.6;">${currentParagraph}</p>`;
            currentParagraph = '';
          }
          // Add h2 header
          result += `<h2 style="font-size: 1.5em; font-weight: bold; margin-top: 1em; margin-bottom: 0.5em;">${line.substring(2)}</h2>`;
        } else {
          // Regular text - add to current paragraph
          if (currentParagraph) {
            currentParagraph += ' ';
          }
          currentParagraph += line;
        }
      }
      
      // Close any remaining paragraph
      if (currentParagraph) {
        result += `<p style="margin: 0.5em 0; line-height: 1.6;">${currentParagraph}</p>`;
      }
      
      return result;
    };

    const formatAnswer = (answer: string | number | boolean | undefined, question: any): string => {
      if (answer === undefined || answer === null) return "Not answered";
      if (typeof answer === "boolean") return answer ? "True" : "False";
      return String(answer);
    };

    const getAnswerClass = (question: any, index: number): string => {
      const userAnswer = educationStore.answers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      return isCorrect ? "text-positive" : "text-negative";
    };

    const submitAnswer = (answer: string | number | boolean) => {
      selectedAnswer.value = answer;
      
      // Check if this is the last question before submitting
      const isLastQuestion = educationStore.currentLesson && 
        educationStore.currentLesson.questions && 
        educationStore.currentQuestionIndex === educationStore.currentLesson.questions.length - 1;
      
      educationStore.submitAnswer(answer);
      
      // If this is the last question, show review instead of moving to next
      if (isLastQuestion) {
        showReview.value = true;
      }
    };

    const nextQuestion = () => {
      if (selectedAnswer.value !== null) {
        selectedAnswer.value = null;
      }
    };


    const goToReview = () => {
      // Start review from first question
      educationStore.currentQuestionIndex = 0;
      selectedAnswer.value = educationStore.answers[0] ?? null;
      showReview.value = true;
    };

    const goToReviewQuestion = (questionIndex: number) => {
      educationStore.currentQuestionIndex = questionIndex;
      selectedAnswer.value = educationStore.answers[questionIndex] ?? null;
    };

    const updateAnswer = (questionIndex: number, answer: string | number | boolean) => {
      // Update the answer in the store
      if (educationStore.answers.length > questionIndex) {
        educationStore.answers[questionIndex] = answer;
      } else {
        // If answer doesn't exist yet, pad the array
        while (educationStore.answers.length < questionIndex) {
          educationStore.answers.push(null as any);
        }
        educationStore.answers.push(answer);
      }
      selectedAnswer.value = answer;
    };

    const completeLesson = () => {
      try {
        const result = educationStore.completeLesson();
        lessonResult.value = result;
        showLessonDialog.value = false;
        showReview.value = false;
        showCompleteDialog.value = true;
        selectedAnswer.value = null;
      } catch (error: any) {
        console.error("Error completing lesson:", error);
      }
    };

    const handleCapitalMatchingComplete = (result: { score: number; correct: number; total: number; incorrectAttempts: number }) => {
      try {
        // Complete the capital matching lesson
        const lesson = educationStore.currentLesson;
        if (!lesson) return;

        // Update lesson progress in store
        const progress = educationStore.lessonProgress[lesson.id] || {
          unlocked: false,
          completed: false,
          attempts: 0,
        };
        const wasAlreadyCompleted = progress.completed;
        
        // Always allow re-taking the lesson for review, but track attempts
        progress.attempts++;
        if (!progress.bestScore || result.score > progress.bestScore) {
          progress.bestScore = result.score;
        }
        
        // Only mark as completed if not already completed (first completion)
        if (!wasAlreadyCompleted) {
          progress.completed = true;
          
          // Always unlock next lesson on first completion (regardless of score)
          // Score only affects sats unlocking, not lesson progression
          const lessonContent = educationStore.lessonContent.find((l) => l.id === lesson.id);
          if (lessonContent) {
            const combinedLesson = { ...lessonContent, ...progress };
            educationStore.unlockNextLesson(combinedLesson);
            console.log(`[HomePage] Capital matching lesson ${lesson.id} marked as completed. Unlocking next lesson.`);
          }
        }
        
        // Update progress in store
        educationStore.lessonProgress[lesson.id] = progress;

        // Only unlock sats if:
        // 1. Score is 100%
        // 2. Lesson wasn't already completed (first time completing)
        const unlocked = (result.score === 100 && !wasAlreadyCompleted)
          ? educationStore.unlockSatsFromLesson(lesson.id, result.score)
          : 0;
        
        if (wasAlreadyCompleted && result.score === 100) {
          console.log(`[HomePage] Capital matching lesson already completed previously. Score: ${result.score}%, but no sats unlocked (already earned).`);
        } else {
          console.log(`[HomePage] Capital matching lesson completed. Score: ${result.score}%, Unlocked: ${unlocked} sats (only unlocks at 100% on first completion)`);
        }
        
        // Reset current lesson
        educationStore.currentLesson = null;
        educationStore.currentQuestionIndex = 0;
        educationStore.answers = [];

        lessonResult.value = { score: result.score, unlocked };
        showLessonDialog.value = false;
        showCompleteDialog.value = true;
      } catch (error: any) {
        console.error("Error completing capital matching lesson:", error);
      }
    };

    // Initialize lessons on mount
    onMounted(() => {
      educationStore.initializeLessons();
      console.log("[HomePage] Lessons initialized. Total lessons:", educationStore.lessons.length);
      console.log("[HomePage] Lessons by subject:", {
        history: educationStore.getLessonsBySubject("history").length,
        "self-custody": educationStore.getLessonsBySubject("self-custody").length,
        protocols: educationStore.getLessonsBySubject("protocols").length,
        economics: educationStore.getLessonsBySubject("economics").length,
      });
      // Auto-select first subject if none selected
      if (!selectedSubject.value && subjects.length > 0) {
        selectedSubject.value = subjects[0].id;
      }
    });

    return {
      educationStore,
      subjects,
      selectedSubject,
      showLessonDialog,
      showCompleteDialog,
      showReading,
      showReview,
      selectedAnswer,
      lessonResult,
      totalWalletBalance,
      totalLockedSats,
      totalUnlockedSats,
      rewardPerLesson,
      getRewardForLesson,
      getLessonsBySubject,
      getCompletedLessons,
      getSubjectProgress,
      getSubjectName,
      getLessonNumber,
      currentQuestion,
      startLesson,
      formatReadingContent,
      formatAnswer,
      getAnswerClass,
      submitAnswer,
      updateAnswer,
      nextQuestion,
      goToReview,
      goToReviewQuestion,
      completeLesson,
      cancelLesson,
      handleCapitalMatchingComplete,
    };
  },
  components: {
    CapitalMatchingGame,
  },
});
</script>

<style scoped>
.subject-card {
  transition: transform 0.2s ease;
}

.subject-card:hover {
  transform: translateY(-2px);
}

.lesson-card {
  transition: all 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.lesson-card:hover {
  transform: translateY(-2px);
}

.lesson-card .q-card-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.lesson-card .q-card-actions {
  margin-top: auto;
}

.lesson-locked {
  opacity: 0.6;
}

.lesson-completed {
  border: 2px solid rgba(76, 175, 80, 0.5);
}

.balance-card {
  min-width: 200px;
}

@media (max-width: 600px) {
  .balance-card {
    min-width: 180px;
    max-width: 100%;
  }
}

.progress-container {
  position: relative;
  width: 100%;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  pointer-events: none;
  z-index: 1;
}
</style>
