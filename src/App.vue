<template>
  <div class="flex flex-col min-h-screen bg-zinc-900">
    <Header />
    <main class="flex-grow container mx-auto px-4 py-8">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <footer class="bg-zinc-900 text-white py-4">
      <div class="container mx-auto px-4 text-center">
        <p>&copy; {{ currentYear }} Book Your Sparring. Tous droits réservés.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { computed } from 'vue'
import Header from './components/header.vue'

export default {
  name: 'App',
  components: {
    Header
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Vous pouvez ajouter d'autres styles globaux ici si nécessaire */
</style>