<template>
  <q-card style="min-width: 90vw; max-width: 800px">
    <q-card-section>
      <div class="text-h6">{{ lesson.title }}</div>
      <div class="text-caption">
        Match {{ remainingMatches }} more pairs
      </div>
    </q-card-section>

    <q-card-section>
      <!-- Continent Selection (if not selected) -->
      <div v-if="!selectedContinent" class="text-center">
        <div class="text-h6 q-mb-md">Choose a Continent</div>
        <div class="row q-col-gutter-md">
          <div
            v-for="continent in continents"
            :key="continent.id"
            class="col-12 col-sm-6 col-md-4"
          >
            <q-btn
              @click="selectContinent(continent.id)"
              class="full-width"
              size="lg"
            >
              {{ continent.name }}
            </q-btn>
          </div>
        </div>
      </div>

      <!-- Matching Game -->
      <div v-else>
        <div class="text-h6 q-mb-md">
          Match countries to capitals in {{ getContinentName(selectedContinent) }}
        </div>

        <!-- Instructions -->
        <div class="text-body2 q-mb-md" style="border-left: 3px solid #9D4EDD; padding-left: 12px;">
          Click a country first, then click its matching capital city.
          <span v-if="selectedCountry" class="text-primary">
            <br />Selected: <strong>{{ selectedCountry }}</strong>
          </span>
        </div>

        <!-- Countries -->
        <div class="q-mb-lg">
          <div class="text-subtitle2 q-mb-sm">Countries</div>
          <div class="row q-col-gutter-sm">
            <div
              v-for="(country, index) in shuffledCountries"
              :key="index"
              class="col-6 col-sm-4 col-md-3"
            >
              <q-btn
                @click="selectCountry(country)"
                :class="getCountryClass(country)"
                class="full-width"
                :disable="isMatched(country)"
                size="sm"
              >
                {{ country }}
              </q-btn>
            </div>
          </div>
        </div>

        <!-- Capitals -->
        <div>
          <div class="text-subtitle2 q-mb-sm">Capitals</div>
          <div class="row q-col-gutter-sm">
            <div
              v-for="(capital, index) in shuffledCapitals"
              :key="index"
              class="col-6 col-sm-4 col-md-3"
            >
              <q-btn
                @click="selectCapital(capital)"
                :class="getCapitalClass(capital)"
                class="full-width"
                :disable="isCapitalMatched(capital)"
                size="sm"
              >
                {{ capital }}
              </q-btn>
            </div>
          </div>
        </div>

        <!-- Progress -->
        <div class="q-mt-md">
          <q-linear-progress
            :value="progress"
            color="primary"
            class="q-mt-sm"
          />
          <div class="text-caption q-mt-xs">
            {{ matchedPairs.length }} / {{ totalPairs }} matched
          </div>
        </div>
      </div>
    </q-card-section>

    <q-card-actions v-if="matchedPairs.length === totalPairs">
      <q-btn
        @click="completeMatching"
        class="full-width"
        color="positive"
        size="lg"
      >
        Complete Exercise! 🎉
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";

type Continent = "europe" | "asia" | "africa" | "americas" | "oceania";

type CountryCapital = {
  country: string;
  capital: string;
};

const continentData: Record<Continent, CountryCapital[]> = {
  europe: [
    { country: "France", capital: "Paris" },
    { country: "Germany", capital: "Berlin" },
    { country: "Italy", capital: "Rome" },
    { country: "Spain", capital: "Madrid" },
    { country: "United Kingdom", capital: "London" },
    { country: "Greece", capital: "Athens" },
    { country: "Poland", capital: "Warsaw" },
    { country: "Portugal", capital: "Lisbon" },
    { country: "Netherlands", capital: "Amsterdam" },
    { country: "Belgium", capital: "Brussels" },
  ],
  asia: [
    { country: "Japan", capital: "Tokyo" },
    { country: "China", capital: "Beijing" },
    { country: "India", capital: "New Delhi" },
    { country: "South Korea", capital: "Seoul" },
    { country: "Thailand", capital: "Bangkok" },
    { country: "Indonesia", capital: "Jakarta" },
    { country: "Philippines", capital: "Manila" },
    { country: "Vietnam", capital: "Hanoi" },
    { country: "Malaysia", capital: "Kuala Lumpur" },
    { country: "Singapore", capital: "Singapore" },
  ],
  africa: [
    { country: "Egypt", capital: "Cairo" },
    { country: "South Africa", capital: "Cape Town" },
    { country: "Nigeria", capital: "Abuja" },
    { country: "Kenya", capital: "Nairobi" },
    { country: "Morocco", capital: "Rabat" },
    { country: "Ghana", capital: "Accra" },
    { country: "Tanzania", capital: "Dodoma" },
    { country: "Ethiopia", capital: "Addis Ababa" },
    { country: "Algeria", capital: "Algiers" },
    { country: "Tunisia", capital: "Tunis" },
  ],
  americas: [
    { country: "United States", capital: "Washington D.C." },
    { country: "Canada", capital: "Ottawa" },
    { country: "Mexico", capital: "Mexico City" },
    { country: "Brazil", capital: "Brasília" },
    { country: "Argentina", capital: "Buenos Aires" },
    { country: "Chile", capital: "Santiago" },
    { country: "Colombia", capital: "Bogotá" },
    { country: "Peru", capital: "Lima" },
    { country: "Venezuela", capital: "Caracas" },
    { country: "Cuba", capital: "Havana" },
  ],
  oceania: [
    { country: "Australia", capital: "Canberra" },
    { country: "New Zealand", capital: "Wellington" },
    { country: "Fiji", capital: "Suva" },
    { country: "Papua New Guinea", capital: "Port Moresby" },
    { country: "Samoa", capital: "Apia" },
    { country: "Tonga", capital: "Nuku'alofa" },
    { country: "Vanuatu", capital: "Port Vila" },
    { country: "Solomon Islands", capital: "Honiara" },
    { country: "Micronesia", capital: "Palikir" },
    { country: "Palau", capital: "Ngerulmud" },
  ],
};

export default defineComponent({
  name: "CapitalMatchingGame",
  props: {
    lesson: {
      type: Object,
      required: true,
    },
  },
  emits: ["complete"],
  setup(props, { emit }) {
    const selectedContinent = ref<Continent | null>(null);
    const selectedCountry = ref<string | null>(null);
    const matchedPairs = ref<Array<{ country: string; capital: string }>>([]);
    const incorrectAttempts = ref(0);
    const shuffledCountries = ref<string[]>([]);
    const shuffledCapitals = ref<string[]>([]);

    const continents = [
      { id: "europe" as Continent, name: "Europe" },
      { id: "asia" as Continent, name: "Asia" },
      { id: "africa" as Continent, name: "Africa" },
      { id: "americas" as Continent, name: "Americas" },
      { id: "oceania" as Continent, name: "Oceania" },
    ];

    const totalPairs = computed(() => {
      if (!selectedContinent.value) return 0;
      return continentData[selectedContinent.value].length;
    });

    const remainingMatches = computed(() => {
      return totalPairs.value - matchedPairs.value.length;
    });

    const progress = computed(() => {
      if (totalPairs.value === 0) return 0;
      return matchedPairs.value.length / totalPairs.value;
    });

    const selectContinent = (continent: Continent) => {
      selectedContinent.value = continent;
      const data = continentData[continent];
      
      // Shuffle countries and capitals
      shuffledCountries.value = [...data.map(d => d.country)].sort(() => Math.random() - 0.5);
      shuffledCapitals.value = [...data.map(d => d.capital)].sort(() => Math.random() - 0.5);
    };

    const getContinentName = (continent: Continent | null) => {
      if (!continent) return "";
      return continents.find(c => c.id === continent)?.name || continent;
    };

    const selectCountry = (country: string) => {
      if (isMatched(country)) return;
      selectedCountry.value = country;
    };

    const selectCapital = (capital: string) => {
      if (!selectedCountry.value) {
        // Show message: select country first
        return;
      }

      if (isCapitalMatched(capital)) return;

      // Check if this is a correct match
      const data = continentData[selectedContinent.value!];
      const correctPair = data.find(
        d => d.country === selectedCountry.value && d.capital === capital
      );

      if (correctPair) {
        // Correct match!
        matchedPairs.value.push(correctPair);
        selectedCountry.value = null;
      } else {
        // Incorrect match
        incorrectAttempts.value++;
        selectedCountry.value = null;
        // Could add visual feedback here
      }
    };

    const isMatched = (country: string): boolean => {
      return matchedPairs.value.some(p => p.country === country);
    };

    const isCapitalMatched = (capital: string): boolean => {
      return matchedPairs.value.some(p => p.capital === capital);
    };

    const getCountryClass = (country: string) => {
      if (selectedCountry.value === country) {
        return "bg-primary text-white";
      }
      if (isMatched(country)) {
        return "bg-positive text-white";
      }
      return "";
    };

    const getCapitalClass = (capital: string) => {
      if (isCapitalMatched(capital)) {
        return "bg-positive text-white";
      }
      return "";
    };

    const completeMatching = () => {
      // Calculate score based on correct matches and attempts
      const totalQuestions = totalPairs.value;
      const correct = matchedPairs.value.length;
      const score = Math.round((correct / totalQuestions) * 100);
      
      emit("complete", {
        score,
        correct,
        total: totalQuestions,
        incorrectAttempts: incorrectAttempts.value,
      });
    };

    return {
      selectedContinent,
      selectedCountry,
      matchedPairs,
      shuffledCountries,
      shuffledCapitals,
      continents,
      totalPairs,
      remainingMatches,
      progress,
      selectContinent,
      getContinentName,
      selectCountry,
      selectCapital,
      isMatched,
      isCapitalMatched,
      getCountryClass,
      getCapitalClass,
      completeMatching,
    };
  },
});
</script>

<style scoped>
</style>

