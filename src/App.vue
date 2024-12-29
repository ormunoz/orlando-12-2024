<template>
  <div class="app">
    <!-- Sidebar -->
    <!-- Content -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';

export default defineComponent({
  // components: { SideBar },
 setup(props) {
    return {
    };
  }
});
</script>

<!-- <style>
:root {
  --primary: rgb(255, 255, 255);
  --primary-alt: #22c55e;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #94aac0;
  --sidebar-width: 300px;
}



* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira sans', sans-serif;
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  display: flex;
}
</style> -->