<template>
  <div class="fighter-selection max-w-6xl mx-auto mt-16 px-4">
    <h2 class="text-4xl font-bold mb-12 text-center text-red-500">
      Choisissez votre partenaire de sparring
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div
        v-for="(fighter, index) in fighters"
        :key="fighter.id"
        class="card-container"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: index * 100 } }"
      >
        <div
          ref="cards"
          class="card"
          @click="selectFighter(fighter)"
          @mousemove="onMouseMove"
          @mouseleave="onMouseLeave"
        >
          <div class="card-content">
            <img
              :src="fighter.avatar"
              :alt="fighter.name"
              class="card-image"
            />
            <div class="card-info" :style="{ background: `linear-gradient(to top, ${fighter.color}cc, transparent)` }">
              <h3 class="card-title">{{ fighter.name }}</h3>
              <p class="card-subtitle">{{ fighter.style }}</p>
            </div>
          </div>
          <div class="card-reflections">
            <div class="reflection-1"></div>
            <div class="reflection-2"></div>
            <div class="reflection-3"></div>
            <div class="reflection-4"></div>
          </div>
        </div>
      </div>
    </div>
    
    <fighter-availability
      v-if="selectedFighter"
      :fighter="selectedFighter"
      @close="selectedFighter = null"
      @book="handleBooking"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useMotion } from '@vueuse/motion'
import FighterAvailability from './FighterAvailability.vue'

export default {
  components: {
    FighterAvailability
  },
  setup() {
    const fighters = ref([
      { id: 1, name: 'Mike Tyson', style: 'Boxe', avatar: '/TYson.webp', color: '#e53e3e' },
      { id: 2, name: 'Amanda Nunes', style: 'MMA', avatar: '/nunes.jpg', color: '#38a169' },
      { id: 3, name: 'Buakaw', style: 'Muay Thai', avatar: '/buakaw.jpg', color: '#3182ce' },
      { id: 4, name: 'Teddy Riner', style: 'Judo', avatar: '/riner.jpg', color: '#805ad5' },
    ])

    const selectedFighter = ref(null)
    const cards = ref([])

    const selectFighter = (fighter) => {
      selectedFighter.value = fighter
    }

    const onMouseMove = (event) => {
      const card = event.currentTarget
      const rect = card.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 4
      const rotateY = (centerX - x) / 4

      card.style.transform = `
        perspective(1000px)
        scale3d(1.07, 1.07, 1.07)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `

      updateReflections(card, x, y)
    }

    const onMouseLeave = (event) => {
      const card = event.currentTarget
      card.style.transform = 'perspective(1000px) scale3d(1, 1, 1) rotateX(0) rotateY(0)'
      resetReflections(card)
    }

    const updateReflections = (card, x, y) => {
      const reflections = card.querySelectorAll('.card-reflections > div')
      reflections.forEach((reflection, index) => {
        const normalizedX = (x / card.offsetWidth) * 100
        const normalizedY = (y / card.offsetHeight) * 100
        reflection.style.backgroundImage = `
          radial-gradient(
            circle at ${normalizedX}% ${normalizedY}%,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0) 60%
          )
        `
      })
    }

    const resetReflections = (card) => {
      const reflections = card.querySelectorAll('.card-reflections > div')
      reflections.forEach(reflection => {
        reflection.style.backgroundImage = 'none'
      })
    }

    const handleBooking = (bookingInfo) => {
      console.log('Réservation effectuée:', bookingInfo)
     
    }

    onMounted(() => {
      cards.value = document.querySelectorAll('.card')
    })

    return {
      fighters,
      selectedFighter,
      selectFighter,
      onMouseMove,
      onMouseLeave,
      cards,
      handleBooking
    }
  }
}
</script>

<style scoped>
.card-container {
  perspective: 1000px;
}

.card {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 150%; 
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.card-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.card-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-info {
  position: relative;
  padding: 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  color: white;
  z-index: 1;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.card-subtitle {
  font-size: 1rem;
  opacity: 0.8;
}

.card-reflections {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.card-reflections > div {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover .card-reflections > div {
  opacity: 1;
}

.reflection-1 { background-color: rgba(255, 255, 255, 0.05); }
.reflection-2 { background-color: rgba(255, 255, 255, 0.03); }
.reflection-3 { background-color: rgba(255, 255, 255, 0.02); }
.reflection-4 { background-color: rgba(255, 255, 255, 0.01); }
</style>