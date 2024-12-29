<template>
  <div class="bg-white shadow rounded-lg p-6">
    <h3 class="text-xl font-semibold text-gray-700 mb-4">Cadena de Evolución:</h3>
    <div class="flex flex-col items-center space-y-6">
      <div v-for="evolution in chain" :key="evolution.name" class="text-center">
        <img :src="evolution.image" :alt="evolution.name" class="w-24 h-24 mx-auto mb-2" />
        <p class="text-gray-800 font-semibold">{{ evolution.name }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {Evolution} from "@/service/pokemon/types";

export default defineComponent({
  name: 'PokemonEvolutionChain',
  props: {
    chain: {
      type: Array as () => Evolution[],
      required: true,
    },
  },
});
</script>
