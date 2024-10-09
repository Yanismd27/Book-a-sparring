<template>
  <div class="fighter-selection max-w-6xl mx-auto mt-16 px-4 text-white py-16">
    <h2 class="text-5xl  mb-12 text-center text-slate-200 font-serif">
      <span class="block">Choose your</span>
      <span class="flip-word-wrapper block font-medium">
        <span v-for="(word, index) in flipWords" :key="index" class="flip-word">{{ word }}</span>
      </span>
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
              class="card-image grayscale hover:grayscale-0 transition-all duration-300"
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
    const flipWords = ref(['sparring partner', 'boxing champion', 'MMA fighter', 'judo master'])

    const fighters = ref([
      { id: 1, name: 'Mike Tyson', style: 'Boxe', avatar: '/TYson.webp', color: '#8B0000' },
      { id: 2, name: 'Amanda Nunes', style: 'MMA', avatar: '/nunes.jpg', color: '#8B4513' },
      { id: 3, name: 'Buakaw', style: 'Muay Thai', avatar: '/buakaw.jpg', color: '#556B2F' },
      { id: 4, name: 'Teddy Riner', style: 'Judo', avatar: '/riner.jpg', color: '#4B0082' },
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

      const rotateX = (y - centerY) / 6
      const rotateY = (centerX - x) / 6

      card.style.transform = `
        perspective(1000px)
        scale3d(1.05, 1.05, 1.05)
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
      handleBooking,
      flipWords
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
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  border: 2px solid #8B4513;
}

.card:hover {
  box-shadow: 0 10px 15px rgba(139, 69, 19, 0.4);
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
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
  z-index: 1;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 5px;
  font-family: 'Georgia', serif;
}

.card-subtitle {
  font-size: 1rem;
  opacity: 0.9;
  font-family: 'Arial', sans-serif;
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



.title-container {
  position: relative;
  overflow: visible;
}

.choose-text {
  background: linear-gradient(135deg, #2c3e50, #34495e);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #2c3e50; /* Fallback color */
  position: relative;
  z-index: 1;
}

.choose-text::before {
  content: 'Choose your';
  position: absolute;
  left: 0;
  top: 2px;
  z-index: -1;
  background: linear-gradient(135deg, #2c3e50, #34495e);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #2c3e50; 
  filter: blur(4px);
  opacity: 0.7;
}

.flip-word-wrapper {
  display: inline-block;
  position: relative;
  height: 1.2em;
  overflow: hidden;
  width: 100%;
}

.flip-word {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0;
  animation: flipWord 8s linear infinite 0s;
  background: linear-gradient(135deg, #34495e, #7f8c8d);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #34495e; /* Fallback color */
}

.flip-word:nth-child(2) {
  animation-delay: 2s;
}

.flip-word:nth-child(3) {
  animation-delay: 4s;
}

.flip-word:nth-child(4) {
  animation-delay: 6s;
}

@keyframes flipWord {
  0%, 100% { opacity: 0; transform: translateY(50%); }
  3%, 22% { opacity: 1; transform: translateY(0); }
  25%, 97% { opacity: 0; transform: translateY(-50%); }
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>