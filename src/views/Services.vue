<template>
  <div class="min-h-screen text-white py-16">
    <div class="container mx-auto px-4">
      <h1 class="text-5xl font-bold mb-12 text-left text-white">
        Get to know our services.
      </h1>
      
      <div class="relative overflow-hidden" style="height: 500px;">
        <div 
          class="flex absolute transition-transform duration-500 ease-out"
          :style="{ transform: `translateX(-${currentIndex * 33.33}%)` }"
        >
          <div 
            v-for="(service, index) in services" 
            :key="service.title"
            class="w-1/3 flex-shrink-0 px-2"
          >
            <div 
              class="relative rounded-lg overflow-hidden shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-xl bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg group"
              style="height: 450px;"
            >
              <img :src="service.image" :alt="service.title" class="w-full h-full object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
              <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div class="absolute bottom-0 left-0 p-6 transform transition-transform duration-300 group-hover:translate-y-[-10px]">
                <h3 class="text-sm font-semibold mb-2 text-gray-300">{{ service.category }}</h3>
                <h2 class="text-2xl font-bold mb-2 text-white">{{ service.title }}</h2>
                <p class="text-base text-gray-200">{{ service.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <button @click="prevCard" class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 text-white rounded-full p-2 focus:outline-none shadow-md hover:bg-opacity-30 transition duration-300 backdrop-filter backdrop-blur-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button @click="nextCard" class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 text-white rounded-full p-2 focus:outline-none shadow-md hover:bg-opacity-30 transition duration-300 backdrop-filter backdrop-blur-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div class="mt-16 text-center">
        <router-link to="/book-sparring" class="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out shadow-lg hover:shadow-xl">
          Book Your Sparring Session
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Services',
  setup() {
    const services = [
      {
        category: 'Fight Training',
        title: 'Train with the best',
        description: 'Get better by training with experts in their martials arts.',
        image: '/public/training.avif',
      },
      {
        category: 'Gym session',
        title: 'Strenght and core',
        description: 'Strengthen your body with the best advice.',
        image: '/public/muscu.avif',
      },
      {
        category: 'Personal Training',
        title: 'Expert guidance.',
        description: 'Get one-on-one attention with certified trainers.',
        image: '/public/judo.avif',
      },
      {
        category: 'Virtual Reality',
        title: 'Immersive training.',
        description: 'Experience boxing in virtual environments.',
        image: '/public/run.avif',
      },
    ]

    const currentIndex = ref(0)

    const nextCard = () => {
      if (currentIndex.value < services.length - 3) {
        currentIndex.value++
      }
    }

    const prevCard = () => {
      if (currentIndex.value > 0) {
        currentIndex.value--
      }
    }

    return {
      services,
      currentIndex,
      nextCard,
      prevCard,
    }
  },
})
</script>

<style scoped>
h1 {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.group:hover .group-hover\:opacity-90 {
  opacity: 0.9;
}

.group:hover .group-hover\:translate-y-\[-10px\] {
  transform: translateY(-10px);
}
</style>