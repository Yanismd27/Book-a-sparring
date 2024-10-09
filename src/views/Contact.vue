<template>
  <div class="contact-page min-h-screen flex items-center justify-center p-4">
    <v-motion
      :initial="{ opacity: 0, y: 50 }"
      :enter="{ opacity: 1, y: 0 }"
      :transition="{ duration: 800, delay: 200 }"
    >
      <div class="max-w-4xl w-full bg-white rounded-lg overflow-hidden shadow-md">
        <div class="md:flex">
          <div class="md:w-1/2 p-8">
            <v-motion
              :initial="{ opacity: 0, x: -50 }"
              :enter="{ opacity: 1, x: 0 }"
              :transition="{ duration: 600, delay: 400 }"
            >
              <h1 class="text-4xl font-bold mb-4 text-gray-800">Contact Us</h1>
              <p class="text-gray-600 mb-6">We're here to help. Feel free to reach out with any questions.</p>
            </v-motion>
            <v-motion
              :initial="{ opacity: 0, scale: 0.9 }"
              :enter="{ opacity: 1, scale: 1 }"
              :transition="{ duration: 500, delay: 600 }"
            >
              <form @submit.prevent="submitForm" class="space-y-4">
                <div class="form-group">
                  <input
                    type="text"
                    v-model="form.name"
                    placeholder="Your name"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300"
                    required
                  >
                </div>
                <div class="form-group">
                  <input
                    type="email"
                    v-model="form.email"
                    placeholder="Your email"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300"
                    required
                  >
                </div>
                <div class="form-group">
                  <textarea
                    v-model="form.message"
                    placeholder="Your message"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <v-motion
                  :initial="{ opacity: 0, y: 20 }"
                  :enter="{ opacity: 1, y: 0 }"
                  :transition="{ duration: 400, delay: 800 }"
                >
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    <span v-if="!isSubmitting">Send</span>
                    <span v-else class="flex items-center justify-center">
                      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  </button>
                </v-motion>
              </form>
            </v-motion>
          </div>
          <div class="md:w-1/2 bg-gray-50 p-8 flex items-center justify-center">
            <v-motion
              :initial="{ opacity: 0, scale: 0.8 }"
              :enter="{ opacity: 1, scale: 1 }"
              :transition="{ duration: 700, delay: 500 }"
            >
              <div class="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-red-600 mb-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h2 class="text-2xl font-bold text-gray-800 mb-2">Let's Stay in Touch</h2>
                <p class="text-gray-600">We'll get back to you as soon as possible.</p>
              </div>
            </v-motion>
          </div>
        </div>
      </div>
    </v-motion>
    <v-motion
      v-if="showNotification"
      :initial="{ opacity: 0, y: 50 }"
      :enter="{ opacity: 1, y: 0 }"
      :leave="{ opacity: 0, y: 50 }"
      :transition="{ duration: 300 }"
      class="fixed bottom-5 right-5 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg"
    >
      Message sent successfully!
    </v-motion>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useMotion } from '@vueuse/motion'

export default {
  name: 'ContactPage',
  setup() {
    const form = reactive({
      name: '',
      email: '',
      message: ''
    })

    const isSubmitting = ref(false)
    const showNotification = ref(false)

    const submitForm = async () => {
      isSubmitting.value = true

      try {
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000))

        form.name = ''
        form.email = ''
        form.message = ''

        showNotification.value = true
        setTimeout(() => {
          showNotification.value = false
        }, 3000)
      } catch (error) {
        console.error('Error submitting form:', error)
      } finally {
        isSubmitting.value = false
      }
    }

    return {
      form,
      isSubmitting,
      showNotification,
      submitForm
    }
  }
}
</script>