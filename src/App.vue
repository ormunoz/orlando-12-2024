<template>
  <div class="app">
    <!-- NavBar -->
    <Navbar />
    <!-- router -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import Navbar from '@/components/layout/NavbarComponent.vue';

export default defineComponent({
  components: { Navbar },
 setup(props) {
    return {
      Navbar
    };
  }
});
</script>
