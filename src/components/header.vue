<template>
  <header class="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300"
          :class="{'bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg': isScrolled, 'bg-transparent': !isScrolled}">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <router-link to="/" class="text-2xl font-bold text-white hover:text-red-400 transition-colors duration-300">
          BookPartner
        </router-link>
        
        <nav class="hidden md:flex space-x-8">
          <router-link
            v-for="item in navItems"
            :key="item.route"
            :to="item.route"
            class="text-white hover:text-red-400 transition-colors duration-300"
          >
            {{ item.name }}
          </router-link>
        </nav>
        
        <div class="hidden md:flex items-center space-x-4">
          <router-link
            to="/book-sparring"
            class="px-6 py-2 text-white bg-red-600 bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Book your sparring
          </router-link>
        </div>
        
        <button @click="toggleMenu" class="md:hidden text-white focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </div>

    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div v-if="isMenuOpen" class="md:hidden absolute top-full left-0 w-full bg-black bg-opacity-70 backdrop-filter backdrop-blur-lg">
        <div class="px-4 py-2 space-y-2">
          <router-link
            v-for="item in navItems"
            :key="item.route"
            :to="item.route"
            class="block py-2 text-white hover:text-red-400 transition-colors duration-300"
            @click="toggleMenu"
          >
            {{ item.name }}
          </router-link>
          <router-link
            to="/book-sparring"
            class="block w-full px-6 py-2 text-center text-white bg-red-600 bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all duration-300"
            @click="toggleMenu"
          >
            Book your sparring
          </router-link>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'Header',
  setup() {
    const isMenuOpen = ref(false)
    const isScrolled = ref(false)

    const navItems = [
      { name: 'About', route: '/about' },
      { name: 'Services', route: '/services' },
      { name: 'Contact', route: '/contact' }
    ]

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
    }

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 0
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      isMenuOpen,
      isScrolled,
      navItems,
      toggleMenu
    }
  }
}
</script>