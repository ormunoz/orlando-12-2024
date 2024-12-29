<template>
    <div class="pokemon-stats-chart">
      <div class="mt-4">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Bar } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  
  // Registrar los componentes de Chart.js
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  
  export default defineComponent({
    name: 'PokemonStatsChart',
    components: {
      Bar,
    },
    props: {
      stats: {
        type: Array as PropType<{ name: string; value: number }[]>,
        required: true,
      },
    },
    computed: {
      chartData() {
        return {
          labels: this.stats.map(stat => stat.name),
          datasets: [
            {
              label: 'Estadísticas',
              data: this.stats.map(stat => stat.value),
              backgroundColor: '#4CAF50',
              borderColor: '#388E3C',
              borderWidth: 1,
            },
          ],
        };
      },
      chartOptions() {
        return {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Estadísticas del Pokémon',
            },
          },
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
        };
      },
    },
  });
  </script>
  
  <style scoped>
  .pokemon-stats-chart {
    width: 100%;
    height: 300px;
  }
  </style>
  