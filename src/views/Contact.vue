<template>
  <div class="contact-page max-w-4xl mx-auto mt-16 px-4">
    <h1 class="text-5xl font-bold mb-12 text-center text-red-500 animate-fade-in-down">
      Contact us
    </h1>
    <div class="bg-white text-black p-8 rounded-lg shadow-2xl animate-fade-in-up">
      <form @submit.prevent="submitForm" class="space-y-6">
        <div class="form-group">
          <label for="name" class="block text-gray-700 mb-2 font-semibold">Name</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            :class="{'border-red-500': errors.name}"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            required
          >
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
        </div>
        <div class="form-group">
          <label for="email" class="block text-gray-700 mb-2 font-semibold">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            :class="{'border-red-500': errors.email}"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            required
          >
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>
        <div class="form-group">
          <label for="message" class="block text-gray-700 mb-2 font-semibold">Message</label>
          <textarea
            id="message"
            v-model="form.message"
            :class="{'border-red-500': errors.message}"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            rows="5"
            required
          ></textarea>
          <p v-if="errors.message" class="text-red-500 text-sm mt-1">{{ errors.message }}</p>
        </div>
        <button
          type="submit"
          :disabled="isSubmitting"
          :class="{'opacity-50 cursor-not-allowed': isSubmitting}"
          class="w-full bg-red-500 text-black py-3 px-4 rounded-lg hover:bg-red-600 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          <span v-if="!isSubmitting">Send</span>
          <span v-else class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Envoi en cours...
          </span>
        </button>
      </form>
    </div>
    <div v-if="showNotification" class="fixed bottom-5 right-5 bg-green-500 text-black px-6 py-3 rounded-lg shadow-lg animate-fade-in">
      Message envoyé avec succès !
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'ContactPage',
  setup() {
    const form = reactive({
      name: '',
      email: '',
      message: ''
    })

    const errors = reactive({
      name: '',
      email: '',
      message: ''
    })

    const isSubmitting = ref(false)
    const showNotification = ref(false)

    const validateForm = () => {
      let isValid = true
      errors.name = ''
      errors.email = ''
      errors.message = ''

      if (!form.name.trim()) {
        errors.name = 'Le nom est requis'
        isValid = false
      }

      if (!form.email.trim()) {
        errors.email = 'L\'email est requis'
        isValid = false
      } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
        errors.email = 'L\'email n\'est pas valide'
        isValid = false
      }

      if (!form.message.trim()) {
        errors.message = 'Le message est requis'
        isValid = false
      }

      return isValid
    }

    const submitForm = async () => {
      if (!validateForm()) return

      isSubmitting.value = true

      try {
        await new Promise(resolve => setTimeout(resolve, 2000))

        form.name = ''
        form.email = ''
        form.message = ''

        // Notif
        showNotification.value = true
        setTimeout(() => {
          showNotification.value = false
        }, 3000)
      } catch (error) {
        console.error('Erreur lors de l\'envoi du formulaire:', error)
      } finally {
        isSubmitting.value = false
      }
    }

    return {
      form,
      errors,
      isSubmitting,
      showNotification,
      submitForm
    }
  }
}
</script>

<style scoped>
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in-down {
  animation: fadeInDown 0.5s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
</style>