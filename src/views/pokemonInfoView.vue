<template>
  <div class="min-h-screen flex flex-col items-center bg-gray-100" v-if="pokemonDetails">
    <div class="w-full max-w-6xl px-4 mb-8 mt-12">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">Detalles del Pokémon</h1>
      <p class="text-gray-600 text-lg">
        Detalles del Pokémon seleccionado, aquí visualizaremos las estadísticas generales y la cadena de
        evolución de dicho pokémon.
      </p>
    </div>

    <div class="w-full max-w-6xl grid grid-cols-12 gap-8">
      <PokemonDetails :details="pokemonDetails" :playSound="playSound" class="col-span-8" />
      <PokemonEvolutionChain :chain="pokemonDetails.evolutionChain" class="col-span-4" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { PokemonServices } from "@/service/pokemon/pokemonServices";
import { ShowPokemon } from "@/service/pokemon/types"
import PokemonDetails from '@/components/element/PokemonDetailsComponent.vue';
import PokemonEvolutionChain from '@/components/element/PokemonEvolutionChainComponent.vue';


export default defineComponent({
  name: 'PokemonsInfoView',
  components: {
    PokemonDetails,
    PokemonEvolutionChain
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const pokemonServices = new PokemonServices();

    const pokemonDetails = ref<ShowPokemon>()

    const loadPokemons = async () => {
      try {
        const details = await pokemonServices.showPokemonId(Number(props.id));
        pokemonDetails.value = details;
        console.log(pokemonDetails.value);
      } catch (error) {
        console.error('Error loading pokemons:', error);
      }
    };

    const playSound = (sound: string) => {
      const audio = new Audio(sound);
      audio.play();
    };

    onMounted(loadPokemons);

    return {
      pokemonDetails,
      playSound
    };
  },
});
</script>
