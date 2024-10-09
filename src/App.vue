<template>
  <div class="flex flex-col min-h-screen relative">
    <Aurora />
    <div class="flex flex-col min-h-screen relative z-10">
      <Header />
      <main class="flex-grow container mx-auto px-4 py-8">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
      <footer class="text-white py-4 bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg">
        <div class="container mx-auto px-4 text-center">
          <p>&copy; {{ currentYear }} Book Your Sparring. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import Header from './components/header.vue'
import Aurora from './components/aurora.vue'

export default {
  name: 'App',
  components: {
    Header,
    Aurora
  },
  setup() {
    const currentYear = computed(() => new Date().getFullYear())

    return {
      currentYear
    }
  }
}
</script>

<style>
@import './assets/style.css';

body {
  background-color: #000;
  color: #fff;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.container {
  position: relative;
  z-index: 1;
}

h1, h2, h3, h4, h5, h6 {
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

p {
  color: #e0e0e0;
}
</style>