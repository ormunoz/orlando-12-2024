<template>
  <div class="flex justify-center gap-4 mt-12">
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ActionButtons',
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
    deleteFromTeam: {
      type: Function,
      required: true,
    },
  },
});
</script>