<template>
    <div class="bg-gray-50 p-2 rounded-lg shadow-sm flex justify-between">
      <span class="text-gray-600 font-medium">{{ label }}</span>
      <span class="text-gray-800 font-semibold">{{ value }}</span>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'PokemonInfoCard',
    props: {
      label: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
  });
  </script>
  