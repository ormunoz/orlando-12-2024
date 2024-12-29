<template>
    <div class="max-w-sm border rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300"
        @click="showPokemonModal">
        <img :src="data.image" class="mt-5 h-20 mx-auto block" alt="PokeAPI Logo" />
        <div class="p-5">
            <!-- Mostrar el nombre del Pokémon -->
            <h5 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white text-center">
                {{ data.name }}
            </h5>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import pokeApiLogo from '@/assets/img/pokeApiLogo.png';

export default defineComponent({
    props: {
        data: {
            type: Object,
            required: true,
        }
    },
    setup(props, { emit }) {
        const showPokemonModal = () => {
            emit('showPokemonModal', props.data);
        };

        return {
            showPokemonModal,
            pokeApiLogo,
        };
    }
});
</script>
