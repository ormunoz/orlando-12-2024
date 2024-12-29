<template>
    <div class="bg-white rounded-lg shadow-lg p-4">
      <div class="text-center">
        <img :src="pokemon.image" alt="Imagen del Pokémon" class="w-32 h-32 mx-auto" />
        <h2 class="text-xl font-bold text-gray-800 mt-4">{{ pokemon.name }}</h2>
      </div>
      <div class="mt-4">
        <div class="flex justify-center gap-4 mt-2">
          <span v-for="type in pokemon.types" :key="type"
                class="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
            {{ type }}
          </span>
        </div>
      </div>
      <div class="mt-4 text-center">
        <h3 class="font-semibold text-gray-700">Sonido</h3>
        <button @click="playSound(pokemon.sound)" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-full mt-2">
          Reproducir
        </button>
      </div>
      <div class="mt-6">
        <div class="grid grid-cols-1 gap-4 mt-2">
          <PokemonStatsChart :stats="pokemon.stats" />
        </div>
        <ActionButtons :pokemon="pokemon" :deleteFromTeam="deleteFromTeam" />
      </div>
    </div>
  </template>
  
<script lang="ts">
  import { defineComponent } from 'vue';
  import PokemonStatsChart from '@/components/element/PokemonStatsChartComponent.vue';
  import ActionButtons from '@/components/element/ActionButtonsComponent.vue';
  import { usePokemonStore } from '@/service/stores/pokemonStore';
  import { toast } from 'vue3-toastify';
  
  export default defineComponent({
    name: 'PokemonCard',
    components: {
      PokemonStatsChart,
      ActionButtons
    },
    props: {
      pokemon: {
        type: Object,
        required: true,
      },
    },
    setup() {
        const pokemonStore = usePokemonStore();
        const {removePokemon, loadFromLocalStorage } = pokemonStore;

        const playSound = (sound: string) => {
            const audio = new Audio(sound);
            audio.play();
        };
      
        const deleteFromTeam = (pokemonId: number, pokemonName: string) => {
            removePokemon(pokemonId);
            toast.success(`${pokemonName} ha sido eliminado de tu equipo!`);
            loadFromLocalStorage();
        };

        return {
            playSound,
            deleteFromTeam,
        };
    },
  });
</script>
  