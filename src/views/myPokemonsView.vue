<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <div v-if="myPokemons.length === 0" class="col-span-full text-center text-gray-500">
            <p>No hay pokemones seleccionados en tu equipo.</p>
        </div>
        <div v-for="pokemon in myPokemons" :key="pokemon.id">
            <PokemonCard :pokemon="pokemon" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { usePokemonStore } from '@/service/stores/pokemonStore';
import PokemonCard from '@/components/element/PokemonCardComponent.vue';

export default defineComponent({
    name: 'MyPokemonsView',
    components: {
        PokemonCard
    },
    setup() {
        const pokemonStore = usePokemonStore();
        const { pokemons } = pokemonStore;
        const myPokemons = ref(pokemons);

        // Watch para actualizar la vista cuando los pokemons cambian
        watch(() => pokemonStore.pokemons, (newPokemons) => {
            myPokemons.value = newPokemons;
        });

        return {
            myPokemons,
        };
    },
});
</script>