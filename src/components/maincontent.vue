<template>
  <main class="container mx-auto mt-10 px-4">
    <div class="relative rounded-lg overflow-hidden">
      <img src="/sparring2.avif" alt="Fighters" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-end">
        <div class="p-8 md:p-16 max-w-3xl text-right">
          <h1 class="text-4xl md:text-5xl font-bold mb-4 text-white">Book your partner</h1>
          <p class="mb-6 text-lg whitespace-nowrap overflow-hidden text-ellipsis text-white">Book your sparring session now and take your boxing skills to the next level!</p>
          <form @submit.prevent="submitEmail" class="flex max-w-md ml-auto relative">
            <div class="relative flex-grow overflow-hidden">
              <div class="absolute inset-0 rounded-lg overflow-hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  class="absolute h-full w-full"
                  width="100%"
                  height="100%">
                  <rect ref="pathRef" fill="none" width="100%" height="100%" rx="30%" ry="30%" />
                </svg>
                <div
                  class="absolute h-20 w-20 opacity-80 bg-gradient-radial from-red-500 to-transparent"
                  :style="{ transform: borderTransform }">
                </div>
              </div>
              <input
                v-model="email"
                type="email"
                placeholder="Mike.Tyson@example.com"
                :class="['relative w-full p-3 rounded-l bg-white text-black placeholder-gray-400 focus:outline-none z-10 transition-all duration-300 ease-in-out', 
                         {'opacity-0 transform translate-y-full': isConfirmed}]"
                :disabled="isConfirmed"
              />
              <div 
                :class="['absolute inset-0 flex items-center justify-center bg-green-500 text-white rounded-l transition-all duration-300 ease-in-out transform', 
                         {'translate-y-full': !isConfirmed}]"
              >
                <span class="ml-2">Enregistré !</span>
              </div>
            </div>
            <button
              type="submit"
              :class="['bg-red-900 text-white p-3 rounded-r transition duration-300', 
                       {'bg-green-500': isConfirmed, 'hover:bg-green-500': !isConfirmed}]"
              :disabled="isConfirmed"
            >
              <svg v-if="!isConfirmed" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>

    <div class="logo-carousel my-16">
      <h2 class="text-3xl font-bold mb-8 text-center">Our sponsors</h2>
      <div 
        ref="logoContainerRef"
        @mouseenter="pauseScroll"
        @mouseleave="resumeScroll"
        class="overflow-hidden"
      >
        <div 
          class="flex transition-transform duration-[30000ms] ease-linear"
          :style="{ transform: `translateX(${scrollPosition}px)` }"
        >
          <div 
            v-for="(logo, index) in duplicatedLogos" 
            :key="index"
            class="flex-shrink-0 mx-4"
          >
            <img :src="logo.src" :alt="logo.name" class="h-20 object-contain" />
          </div>
        </div>
      </div>
    </div>

    <!-- Carrousel d'avis -->
    <section class="testimonial-carousel mb-16">
      <div class="relative max-w-6xl mx-auto px-4">
        <div class="overflow-hidden">
          <div class="flex transition-transform duration-300 ease-in-out" :style="{ transform: `translateX(-${currentTestimonialIndex * 100}%)` }">
            <div v-for="(testimonial, index) in testimonials" :key="index" class="w-full flex-shrink-0 px-4">
              <div class="bg-white rounded-lg shadow-lg p-8">
                <h3 class="text-2xl font-bold mb-4 text-red-500">{{ testimonial.title }}</h3>
                <p class="mb-6 text-gray-600">{{ testimonial.content }}</p>
                <div class="flex items-center text-black">
                  <img :src="testimonial.avatar" :alt="testimonial.name" class="w-12 h-12 rounded-full mr-4">
                  <div>
                    <p class="font-semibold">{{ testimonial.name }}</p>
                    <p class="text-sm text-gray-500">{{ testimonial.role }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button @click="prevTestimonial" class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button @click="nextTestimonial" class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div class="flex justify-center mt-4">
        <button v-for="(_, index) in testimonials" :key="index" @click="goToTestimonial(index)" :class="['w-3 h-3 rounded-full mx-1 focus:outline-none', currentTestimonialIndex === index ? 'bg-red-500' : 'bg-gray-300']"></button>
      </div>
    </section>
  </main>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue'

export default {
  name: 'MainContent',
  setup() {
    const pathRef = ref(null)
    const progress = ref(0)
    const duration = 2000
    let animationFrame

    const email = ref('')
    const isConfirmed = ref(false)

    const animate = (time) => {
      const length = pathRef.value?.getTotalLength()
      if (length) {
        const pxPerMillisecond = length / duration
        progress.value = (time * pxPerMillisecond) % length
      }
      animationFrame = requestAnimationFrame(animate)
    }

    onMounted(() => {
      animationFrame = requestAnimationFrame(animate)
    })

    onUnmounted(() => {
      cancelAnimationFrame(animationFrame)
    })

    const borderTransform = computed(() => {
      if (!pathRef.value) return ''
      const point = pathRef.value.getPointAtLength(progress.value)
      return `translateX(${point.x}px) translateY(${point.y}px) translateX(-50%) translateY(-50%)`
    })

    const submitEmail = () => {
      if (validateEmail(email.value)) {
        console.log('Email valide soumis:', email.value)
        isConfirmed.value = true
        setTimeout(() => {
          isConfirmed.value = false
          email.value = ''
        }, 3000)
      } else {
        alert('Veuillez entrer un email valide')
      }
    }

    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return re.test(email)
    }

    const testimonials = [
      {
        title: "Encompassing both training and nutrition",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id posuere lectus, sed elementum metus. Vestibulum vitae tellus ex. Ut efficitur justo vitae velit ornare lacinia. Duis vulputate posuere blandit. Integer ac quam nec nisi aliquet pellentesque. Nunc sit amet dui ex. Nulla facilisi. Etiam laoreet luctus purus. Etiam commodo mi nec leo vulputate egestas. Proin eget commodo ligula. Aliquam vitae nunc imperdiet, elementum nunc nec, posuere odio. In massa elit, feugiat sit amet maximus non, posuere at nisi. Suspendisse dictum convallis massa id pellentesque. Integer nec condimentum risus, vel ultrices quam. Phasellus molestie leo mauris, nec bibendum eros faucibus quis.",
        name: "Melvin Alex",
        avatar: "/public/1.jpg",
        role: "Sparring JJB"
      },
      {
        title: "Mike has an excellent right hook !",
        content: "Lorem ipsum dolor sit amet,nteger nec condimentum risus, vel ultrices quam. Phasellus molestie leo mauris, nec bibendum eros faucibus quis.",
        name: "Adolfo Quiroz",
        avatar: "/public/2.jpg",
        role: "Sparring MMA"
      },
      {
        title: "Awesome !",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id posuere lectus, sed elementum metus. Vestibulum vitae tellus ex. Ut efficitur justo vitae velit ornare lacinia. Duis vulputate posuere blandit. Integer ac quam nec nisi aliquet pellentesque. Nunc sit amet dui ex. Nulla facilisi. Etiam laoreet luctus purus. Etiam commodo mi nec leo vulputate egestas. Proin eget commodo ligula. Aliquam vitae nunc imperdiet, elementum nunc nec, posuere odio. In massa elit, feugiat sit amet maximus non, posuere at nisi. Suspendisse dictum convallis massa id pellentesque. Integer nec condimentum risus, vel ultrices quam. Phasellus molestie leo mauris, nec bibendum eros faucibus quis.",
        name: "Paula Rodrigues",
        avatar: "/public/3.jpg",
        role: "Sparring Muay Thai"
      },
      {
        title: "Teddy is a great teacher!",
        content: "Lorem ipsum dolor sit amet,nteger nec condimentum risus, vel ultrices quam. Phasellus molestie leo mauris, nec bibendum eros faucibus quis.",
        name: "Adolfo Quiroz",
        avatar: "/public/4.jpg",
        role: "Sparring MMA"
      },
      {
        title: "Great so far",
        content: "Lorem ipsum dolor sit amet,nteger nec condimentum risus, vel ultrices quam. Phasellus molestie leo mauris, nec bibendum eros faucibus quis.",
        name: "Adolfo Quiroz",
        avatar: "/public/5.jpg",
        role: "Sparring boxe"
      },
    ]

    const currentTestimonialIndex = ref(0)

    const nextTestimonial = () => {
      currentTestimonialIndex.value = (currentTestimonialIndex.value + 1) % testimonials.length
    }

    const prevTestimonial = () => {
      currentTestimonialIndex.value = (currentTestimonialIndex.value - 1 + testimonials.length) % testimonials.length
    }

    const goToTestimonial = (index) => {
      currentTestimonialIndex.value = index
    }

    const logoContainerRef = ref(null)
    const scrollPosition = ref(0)
    const isScrollPaused = ref(false)

    const partnerLogos = [
      { name: "Fitness Park", src: "FP.jpg" },
      { name: "MMAFactory", src: "Factory.jpg" },
      { name: "Basic Fit", src: "BF.png" },
      { name: "On Air", src: "Onair.png" },
      { name: "GigaGYM", src: "Giga.jpg"},
    ]

    const duplicatedLogos = computed(() => [...partnerLogos, ...partnerLogos])

    const scrollLogos = () => {
      if (!isScrollPaused.value) {
        scrollPosition.value -= 1
        if (Math.abs(scrollPosition.value) >= logoContainerRef.value.offsetWidth / 2) {
          scrollPosition.value = 0
        }
      }
    }

    const pauseScroll = () => {
      isScrollPaused.value = true
    }

    const resumeScroll = () => {
      isScrollPaused.value = false
    }

    let scrollInterval

    onMounted(() => {
      animationFrame = requestAnimationFrame(animate)
      scrollInterval = setInterval(scrollLogos, 10)
    })

    onUnmounted(() => {
      cancelAnimationFrame(animationFrame)
      clearInterval(scrollInterval) 
    })

return {
  pathRef,
  borderTransform,
  email,
  isConfirmed,
  submitEmail,
  testimonials,
  currentTestimonialIndex,
  nextTestimonial,
  prevTestimonial,
  goToTestimonial,
  logoContainerRef,
  scrollPosition,
  duplicatedLogos,
  pauseScroll,
  resumeScroll,
  partnerLogos
}
}
}
</script>

<style scoped>
@keyframes rotate {
from {
transform: rotate(0deg);
}
to {
transform: rotate(360deg);
}
}

.bg-gradient-radial {
background: radial-gradient(circle, var(--tw-gradient-from) 40%, var(--tw-gradient-to) 60%);
}



.logo-carousel {
overflow: hidden;
}

.logo-carousel img {
transition: transform 0.3s ease-in-out;
}

.logo-carousel img:hover {
transform: scale(1.1);
}
</style>