<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <div v-for="pokemon in myPokemons" :key="pokemon.id" class="bg-white rounded-lg shadow-lg p-4">
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
            </div>
            <div class="flex justify-center gap-4 ">
                <!-- Botón para eliminar -->
                <button @click="deleteFromTeam(pokemon.id, pokemon.name)"
                    class="bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                    Eliminar de mi Equipo
                </button>

                <!-- Botón para ver detalles -->
                <router-link :to="'/team/' + pokemon.id"
                    class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    <button
                        class="bg-gray-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
                        Ver Detalles
                    </button>
                </router-link>
            </div>

        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { usePokemonStore } from '@/service/stores/pokemonStore';
import PokemonStatsChart from '@/components/element/PokemonStatsChartComponent.vue';
import { toast } from 'vue3-toastify';
import { useRoute } from 'vue-router';

export default defineComponent({
    name: 'myPokemonsView',
    components: {
        PokemonStatsChart
    },
    setup() {
        const route = useRoute();
        const pokemonStore = usePokemonStore();
        const { pokemons, removePokemon, loadFromLocalStorage } = pokemonStore;

        const myPokemons = ref<any>(pokemons);

        watch(() => pokemonStore.pokemons, (newPokemons) => {
            myPokemons.value = newPokemons;
        }, { immediate: true });

        const playSound = (sound: string) => {
            const audio = new Audio(sound);
            audio.play();
        };

        const deleteFromTeam = (pokemonId: number, pokemonName: string) => {
            removePokemon(pokemonId);
            loadFromLocalStorage();
            toast.success(`${pokemonName} ha sido eliminado de tu equipo!`);
        };

        return {
            myPokemons,
            playSound,
            deleteFromTeam
        };
    }
});
</script>
