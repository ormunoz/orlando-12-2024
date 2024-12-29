<template>
    <div class="bg-white shadow rounded-lg p-10">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">{{ details.name }}</h2>
      <img :src="details.image" :alt="details.name" class="w-32 h-32 mx-auto mb-4" />
      <div class="mt-4">
        <div class="flex justify-center gap-4 mt-2">
          <span v-for="type in details.types" :key="type"
            class="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
            {{ type }}
          </span>
          <button @click="playSound(details.sound)" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-full">
            Reproducir
          </button>
        </div>
      </div>
      <div class="mt-6">
        <h3 class="font-semibold text-gray-700">Descripción:</h3>
        <p class="text-gray-600 mt-2">{{ details.description }}</p>
      </div>
      <div class="mt-6">
        <h3 class="font-semibold text-gray-700">Información:</h3>
        <div class="grid grid-cols-2 gap-4 mt-2">
          <PokemonInfoCard label="Peso" :value="`${details.weight} kg`" />
          <PokemonInfoCard label="Altura" :value="`${details.height}`" />
        </div>
      </div>
      <ul class="list-disc pl-6 text-gray-600 mt-4">
        <PokemonStatsChart :stats="details.stats" />
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import PokemonInfoCard from './PokemonInfoCardComponent.vue';
  import PokemonStatsChart from './PokemonStatsChartComponent.vue';
  
  export default defineComponent({
    name: 'PokemonDetails',
    components: { PokemonInfoCard, PokemonStatsChart },
    props: {
      details: {
        type: Object,
        required: true,
      },
      playSound: {
        type: Function,
        required: true,
      },
    },
  });
  </script>
  