<template>
    <div class="min-h-screen flex flex-col items-center bg-gray-100">
        <!-- Contenedor del título y descripción -->
        <div class="w-full max-w-6xl px-4 mb-8 mt-12">
            <h1 class="text-3xl font-bold text-gray-800 mb-4">Listado Pokemon</h1>
            <p class="text-gray-600 text-lg">
                Una lista de los primeros 151 Pokémon, de los cuales puedes seleccionar uno para ver sus estadísticas y
                agregarlo a tu equipo.
            </p>
        </div>
        <!-- Contenedor de las tarjetas -->
        <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-7xl px-4">
            <CardBoard v-for="pokemon in pokemons" :key="pokemon.id" :data="pokemon"
                @showPokemonModal="showModalPokemon" />
        </div>
        <!-- Paginación -->
        <Pagination :currentPage="currentPage" :totalPages="totalPages" :limit="limit" :maxItems="151"
            @changePage="changePage" />

        <!-- Modal show pokemon -->
        <PokemonModal :isOpen="isModalOpen" :pokemon="selectedPokemon" @close="isModalOpen = false" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { PokemonServices } from "@/service/pokemon/pokemonServices"
import { ShowPokemon } from "@/service/pokemon/types"
import CardBoard from '@/components/element/CardBoardComponent.vue'
import Pagination from '@/components/element/PaginationComponent.vue'
import PokemonModal from '@/components/element/PokemonModalComponent.vue';

export default defineComponent({
    name: 'PokemonList',
    components: {
        CardBoard,
        Pagination,
        PokemonModal
    },
    setup() {
        const pokemonServices = new PokemonServices()
        const pokemons = ref<ShowPokemon[]>([])
        const selectedPokemon = ref<ShowPokemon>()
        const limit = ref<number>(25)
        const totalPokemons = ref<number>(151)
        const totalPages = Math.ceil(totalPokemons.value / limit.value)
        const currentPage = ref<number>(1)
        const isModalOpen = ref<boolean>(false)


        const loadPokemons = async () => {
            try {
                const offset = (currentPage.value - 1) * limit.value
                const adjustedLimit = Math.min(limit.value, totalPokemons.value - offset)

                const response = await pokemonServices.getPokemonList(adjustedLimit, offset)
                if (response.code === 200) {
                    const data = response.data.results
                    const detailedPokemons = await Promise.all(
                        data.map(async (pokemon: any) => {
                            const details = await pokemonServices.getPokemonDetails(pokemon.url)
                            return details
                        })
                    )
                    pokemons.value = detailedPokemons
                }
            } catch (error) {
                console.error('Error loading pokemons:', error)
            }
        }

        const changePage = (page: number) => {
            if (page >= 1 && page <= totalPages) {
                currentPage.value = page
                loadPokemons()
            }
        }

        const showModalPokemon = (pokemon: ShowPokemon) => {
            selectedPokemon.value = pokemon
            isModalOpen.value = true
        }

        onMounted(loadPokemons)

        return {
            pokemons,
            currentPage,
            totalPages,
            changePage,
            showModalPokemon,
            limit,
            isModalOpen,
            selectedPokemon
        }
    },
})
</script>

<style>
/* Añade tus estilos aquí */
</style>
