<template>
  <div v-if="isOpen && pokemon" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
      <!-- Botón de cerrar -->
      <button class="absolute top-3 right-3 text-gray-500 hover:text-gray-700" @click="$emit('close')">
        ✖
      </button>
      <!-- Contenido del modal -->
      <div class="text-center">
        <img v-if="pokemon" :src="pokemon.image" alt="Imagen del Pokémon" class="w-32 h-32 mx-auto" />
        <h2 class="text-2xl font-bold text-gray-800 mt-4">{{ pokemon.name }}</h2>

        <div class="mt-4">
          <h3 class="font-semibold text-gray-700">Tipos</h3>
          <div class="flex justify-center gap-4 mt-2">
            <span v-for="type in pokemon.types" :key="type"
              class="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              {{ type }}
            </span>
          </div>
        </div>

        <!-- Estadísticas (tarjetas) -->
        <div class="mt-6">
          <h3 class="font-semibold text-gray-700">Estadísticas</h3>
          <div class="grid grid-cols-2 gap-4 mt-2">
            <div v-for="stat in pokemon.stats" :key="stat.name"
              class="bg-gray-50 p-2 rounded-lg shadow-sm flex justify-between">
              <span class="text-gray-600 font-medium">{{ stat.name }}</span>
              <span class="text-gray-800 font-semibold">{{ stat.value }}</span>
            </div>
          </div>
        </div>
        <div class="mt-6">
          <button @click="addToTeam"
            class="bg-green-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
            Agregar a mi equipo
          </button>
        </div>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ShowPokemon } from '@/service/pokemon/types'
import { usePokemonStore } from '@/service/stores/pokemonStore'
import { toast } from 'vue3-toastify';

export default defineComponent({
  name: 'PokemonModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    pokemon: {
      type: Object as PropType<ShowPokemon | undefined>,
      required: true,
    },
  },

  setup(props, { emit }) {
    const pokemonStore = usePokemonStore();
    const { addPokemon } = pokemonStore;

    const addToTeam = () => {
      if (props.pokemon && pokemonStore.pokemons.length < 6) {
        addPokemon(props.pokemon);
        toast.success(`${props.pokemon.name} ha sido agregado a tu equipo!`);
        emit('close')
      } else if (pokemonStore.pokemons.length >= 6) {
        toast.error('No puedes agregar más de 6 Pokémon.');
      }
    };
    return {
      addToTeam
    };
  }
});
</script>
