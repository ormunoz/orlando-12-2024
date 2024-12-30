<template>
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex items-center justify-between mx-auto p-4">
            <!-- Logo (izquierda) -->
            <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img :src="pokeApiLogo" class="h-8" alt="PokeAPI Logo" />
            </router-link>

            <!-- Menú (derecha) -->
            <div class="flex space-x-8">
                <ul class="font-medium flex items-center space-x-4">
                    <li>
                        <router-link to="/"
                            class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            active-class="text-blue-700">
                            Pokemones
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/team"
                            class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            active-class="text-blue-700">
                            Mis Pokemones
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import pokeApiLogo from '@/assets/img/pokeApiLogo.png';

export default defineComponent({
    setup() {
        return {
            pokeApiLogo,
        };
    },
});
</script>

<style scoped>
.text-blue-700 {
    color: #1e4ac4;
    font-weight: bold;
}
</style>
