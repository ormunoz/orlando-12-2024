<template>
    <nav aria-label="Page navigation" class="mt-8">
      <ul class="inline-flex -space-x-px text-sm">
        <!-- Botón Anterior -->
        <li>
          <button 
            @click="$emit('changePage', currentPage - 1)" 
            :disabled="currentPage === 1"
            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <<
          </button>
        </li>
        <!-- Botones de Páginas -->
        <li v-for="page in totalPages" :key="page">
          <button 
            @click="$emit('changePage', page)" 
            :class="['flex items-center justify-center px-3 h-8 leading-tight', page === currentPage ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white hover:bg-gray-100']"
            class="border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            {{ (page - 1) * limit + 1 }}-{{ Math.min(page * limit, maxItems) }}
          </button>
        </li>
        <!-- Botón Siguiente -->
        <li>
          <button 
            @click="$emit('changePage', currentPage + 1)" 
            :disabled="currentPage === totalPages"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            >>
          </button>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    props: {
      currentPage: {
        type: Number,
        required: true,
      },
      totalPages: {
        type: Number,
        required: true,
      },
      limit: {
        type: Number,
        required: true,
      },
      maxItems: {
        type: Number,
        default: 151,
      },
    },
  };
  </script>
  