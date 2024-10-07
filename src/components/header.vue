<template>
  <header class="text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div>
        <router-link to="/" class="text-2xl font-bold text-red-500">{{ t('bookPartner') }}</router-link>
      </div>
      <nav class="relative z-10">
        <ul class="hidden md:flex items-end justify-end space-x-6">
          <li><router-link to="/about"class="text-white hover:text-red-500 transition duration-300 text-xl">{{ t('about') }}</router-link></li>
          <li><router-link to="/services" class="text-white hover:text-red-500 transition duration-300 text-xl">{{ t('services') }}</router-link></li>
          <li><router-link to="/contact" class="text-white hover:text-red-500 transition duration-300 text-xl">{{ t('contact') }}</router-link></li>
         <!-- <li>
            <button @click="toggleLanguage" class="text-white hover:text-red-500 transition duration-300 text-xs">
              {{ currentLanguage === 'en' ? 'FR' : 'EN' }}
            </button>
          </li>-->
        </ul>
      </nav>
      <router-link to="/book-sparring" class="bg-red-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-red-800 transition duration-300">
        {{ t('bookPartner') }}
      </router-link>
    </div>
  </header>
</template>

<script>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'Header',
  setup() {
    const { t, locale } = useI18n()
    
    const currentLanguage = computed(() => locale.value)

    const toggleLanguage = () => {
      locale.value = locale.value === 'en' ? 'fr' : 'en'
    }

    return {
      t,
      currentLanguage,
      toggleLanguage
    }
  }
}
</script>