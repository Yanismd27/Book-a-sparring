<template>
  <div class="relative min-h-screen">
    <Aurora />
    <main class="relative z-10 text-white font-serif py-16">
      <div class="container mx-auto px-4">
        <div class="bg-black/30 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl">
          <div class="relative">
            <img src="/sparring2.avif" alt="Fighters" class="w-full h-[70vh] object-cover object-center" />
            <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex items-center">
              <div class="p-8 md:p-16 max-w-4xl">
                <h1 class="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight whitespace-nowrap overflow-hidden" style="font-family: 'Playfair Display', serif;">
                  Book your sparring partner
                </h1>
                <p class="mb-8 text-xl text-white">
                  Elevate your skills with the perfect match. Book your session now and take your boxing to the next level!
                </p>
                <form @submit.prevent="submitEmail" class="flex max-w-md outline-none relative">
                  <input
                    v-model="email"
                    type="email"
                    placeholder="Mike.Tyson@example.com"
                    class="flex-grow p-4 rounded-l-full bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                  />
                  <button
                    type="submit"
                    class="bg-red-600 text-white p-4 rounded-r-full hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="my-16">
          <h2 class="text-4xl font-bold mb-12 text-center text-white" style="font-family: 'Playfair Display', serif;">Our sponsors</h2>
          <div class="bg-black/30 backdrop-blur-md p-8 rounded-lg shadow-lg overflow-hidden">
            <div class="flex animate-scroll">
              <div v-for="(logo, index) in [...partnerLogos, ...partnerLogos]" :key="index" class="flex-shrink-0 w-1/5 p-4">
                <img :src="logo.src" :alt="logo.name" class="w-full h-20 object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
              </div>
            </div>
          </div>
        </div>

        <section class="py-20">
          <h2 class="text-4xl md:text-5xl font-bold mb-8 text-center text-white" style="font-family: 'Playfair Display', serif;">
            What Our Fighters Say
          </h2>
          <div class="text-center mb-12">
            <span class="text-5xl font-bold text-white">4.8</span>
            <div class="flex justify-center mt-2">
              <svg v-for="_ in 5" :key="_" class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <p class="text-gray-300 mt-2">Over 10k user reviews</p>
          </div>
          
          <div class="relative overflow-hidden">
            <div class="flex transition-transform duration-300 ease-in-out" :style="{ transform: `translateX(-${currentTestimonialIndex * 33.333}%)` }">
              <div v-for="(testimonial, index) in testimonials" :key="index" class="w-full md:w-1/3 flex-shrink-0 px-4">
                <div class="bg-black/30 backdrop-blur-md p-6 rounded-lg shadow-lg h-full flex flex-col justify-between">
                  <div>
                    <h3 class="text-lg font-semibold mb-2 text-white">{{ testimonial.title }}</h3>
                    <p class="text-gray-300 mb-4 text-sm">« {{ testimonial.content }} »</p>
                  </div>
                  <div class="flex items-center">
                    <img :src="testimonial.avatar" :alt="testimonial.name" class="w-10 h-10 rounded-full mr-3">
                    <div>
                      <p class="font-semibold text-white text-sm">{{ testimonial.name }}</p>
                      <p class="text-gray-300 text-xs">{{ testimonial.role }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <button @click="prevTestimonial" class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black/30 backdrop-blur-md rounded-full p-2 shadow-lg focus:outline-none hover:bg-black/50 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button @click="nextTestimonial" class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black/30 backdrop-blur-md rounded-full p-2 shadow-lg focus:outline-none hover:bg-black/50 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div class="flex justify-center mt-8">
            <button v-for="(_, index) in Math.ceil(testimonials.length / 3)" :key="index" @click="goToTestimonial(index * 3)"
                    :class="['w-3 h-3 rounded-full mx-2 focus:outline-none transition duration-300',
                             Math.floor(currentTestimonialIndex / 3) === index ? 'bg-white' : 'bg-gray-500 hover:bg-gray-400']">
            </button>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import Aurora from './aurora.vue'

export default {
  name: 'MainContent',
  components: {
    Aurora
  },
  setup() {
    const email = ref('')
    const isConfirmed = ref(false)

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
        title: "Progression Rapide",
        content: "Thanks to regular sparring sessions, my technique has improved considerably in just a few months.",
        name: "Melvin Alex",
        avatar: "/public/1.jpg",
        role: "Boxeur Amateur"
      },
      {
        title: "Quality Partners",
        content: "I found high-level sparring partners who really pushed me to surpass myself.",
        name: "Sarah Johnson",
        avatar: "/public/2.jpg",
        role: "MMA Fighter"
      },
      {
        title: "Incredible Flexibility",
        content: "The ability to book sessions whenever I want has made my training much more effective.",
        name: "Carlos Rodriguez",
        avatar: "/public/3.jpg",
        role: "Kickboxeur Pro"
      },
      {
        title: "Communauté Motivante",
        content: "I've met incredible people who share my passion. It's motivating to train together.",
        name: "Aisha Patel",
        avatar: "/public/4.jpg",
        role: "Pratiquante de Muay Thai"
      },
      {
        title: "Constant Evolution",
        content: "Each new session brings me new challenges and learning opportunities. I am constantly progressing.",
        name: "Lucas Dupont",
        avatar: "/public/5.jpg",
        role: "Jiu-Jitsu Brésilien"
      },
      {
        title: "Boost de Confiance",
        content: "Sparring with different partners has significantly boosted my confidence in the ring.",
        name: "Emma Thompson",
        avatar: "/public/6.jpg",
        role: "Boxeuse Amateur"
      },
      {
        title: "Technique Améliorée",
        content: "The variety of styles I've encountered has greatly improved my overall technique.",
        name: "Yuki Tanaka",
        avatar: "/public/7.jpg",
        role: "Karatéka"
      },
      {
        title: "Préparation Optimale",
        content: "This platform has been crucial in my preparation for competitions. Highly recommended!",
        name: "Alexandre Dubois",
        avatar: "/public/8.jpg",
        role: "Lutteur Olympique"
      }
    ]

    const currentTestimonialIndex = ref(0)

    const nextTestimonial = () => {
      currentTestimonialIndex.value = (currentTestimonialIndex.value + 3) % testimonials.length
    }

    const prevTestimonial = () => {
      currentTestimonialIndex.value = (currentTestimonialIndex.value - 3 + testimonials.length) % testimonials.length
    }

    const goToTestimonial = (index) => {
      currentTestimonialIndex.value = index
    }

    const partnerLogos = [
      { name: "Fitness Park", src: "FP.jpg" },
      { name: "MMAFactory", src: "Factory.jpg" },
      { name: "Basic Fit", src: "BF.png" },
      { name: "On Air", src: "Onair.png" },
      { name: "GigaGYM", src: "Giga.jpg"},
    ]
    return {
      email,
      isConfirmed,
      submitEmail,
      testimonials,
      currentTestimonialIndex,
      nextTestimonial,
      prevTestimonial,
      goToTestimonial,
      partnerLogos
    }
  }
}
</script>

<style scoped>
body {
  background-color: #000000;
  color: #ffffff;
}

h1, h2, h3 {
  font-family: 'Playfair Display', serif;
}

.shadow-modern {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
}

.animate-scroll {
  display: flex;
  animation: scroll 30s linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.bg-black\/30 {
  background-color: rgba(0, 0, 0, 0.3);
}

.backdrop-blur-md {
  backdrop-filter: blur(12px);
}

h1, h2, h3, p {
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

input, button {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.testimonial-card {
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.testimonial-nav-button {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}

.testimonial-nav-button:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

/* Styles pour les indicateurs de pagination */
.pagination-indicator {
  background-color: rgba(255, 255, 255, 0.3);
}

.pagination-indicator.active {
  background-color: white;
}
</style>