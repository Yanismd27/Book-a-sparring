<template>
  <div v-if="fighter" class="mt-8 bg-white rounded-lg p-6 shadow-lg">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-2xl font-bold" :style="{ color: fighter.color }">Disponibilités de {{ fighter.name }}</h3>
      <button @click="$emit('close')" class="text-gray-600 hover:text-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div class="relative">
      <div class="flex justify-between items-center mb-4">
        <button @click="previousMonth" class="text-gray-600 hover:text-gray-800 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h4 class="text-lg font-semibold">{{ currentMonthName }}</h4>
        <button @click="nextMonth" class="text-gray-600 hover:text-gray-800 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div class="overflow-hidden">
        <div class="flex transition-transform duration-300 ease-in-out" :style="{ transform: `translateX(-${currentMonthIndex * 100}%)` }">
          <div v-for="(month, index) in months" :key="index" class="w-full flex-shrink-0">
            <div class="grid grid-cols-7 gap-2">
              <div v-for="day in 7" :key="day" class="text-center">
                <div class="font-semibold mb-2 text-sm text-gray-700">{{ getDayName(day) }}</div>
                <div v-for="week in getWeeksInMonth(month.date)" :key="week" class="mb-1">
                  <button 
                    v-if="isDateInFuture(getDate(month, day, week))"
                    @click="selectDay(getDate(month, day, week))"
                    :class="[
                      'py-1 px-2 rounded text-xs w-full',
                      isDateAvailable(getDate(month, day, week))
                        ? 'hover:bg-opacity-80'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed',
                      selectedDate && isSameDate(selectedDate, getDate(month, day, week))
                        ? 'ring-2 ring-offset-1 ring-black'
                        : ''
                    ]"
                    :style="isDateAvailable(getDate(month, day, week)) ? { backgroundColor: fighter.color, color: 'white' } : {}"
                    :disabled="!isDateAvailable(getDate(month, day, week))"
                  >
                    <span class="block">{{ formatDateWithMonth(getDate(month, day, week)) }}</span>
                  </button>
                  <div v-else class="py-1 px-2 text-xs text-gray-300">
                    {{ formatDateWithMonth(getDate(month, day, week)) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Box pour heure -->
    <div v-if="selectedDate" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-black p-6 rounded-lg shadow-xl max-w-md w-full">
        <h4 class="text-xl font-bold mb-4">Choisissez un créneau horaire</h4>
        <p class="mb-4">Date sélectionnée : {{ formatDate(selectedDate) }}</p>
        <div class="grid grid-cols-2 gap-2">
          <button 
            v-for="slot in getAvailableSlots(selectedDate)" 
            :key="slot.time"
            @click="selectSlot(selectedDate, slot.time)"
            :class="[
              'py-2 px-4 rounded',
              slot.isAvailable 
                ? 'bg-green-500 text-black hover:bg-green-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            ]"
            :disabled="!slot.isAvailable"
          >
            {{ slot.time }}
          </button>
        </div>
        <button @click="selectedDate = null" class="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
          Annuler
        </button>
      </div>
    </div>

    <!-- Confirmation box -->
    <div v-if="selectedSlot" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-black p-6 rounded-lg shadow-xl max-w-md w-full">
        <h4 class="text-xl font-bold mb-4">Confirmer la réservation</h4>
        <p>Vous avez sélectionné le créneau suivant :</p>
        <p class="font-semibold">{{ formatDate(selectedSlot.date) }} à {{ selectedSlot.time }}</p>
        <p class="mb-4">avec {{ fighter.name }}</p>
        
        <div class="mb-4">
          <label for="userEmail" class="block text-sm font-medium text-white">Votre email</label>
          <input type="email" id="userEmail" v-model="userEmail" class="mt-1 block w-full rounded-md text-black border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>
        
        <div class="flex justify-end space-x-3">
          <button @click="cancelSelection" class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            Annuler
          </button>
          <button @click="confirmBooking" :disabled="!userEmail" class="px-4 py-2 bg-green-500 text-black rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed">
            Confirmer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'

export default {
  name: 'FighterAvailability',
  props: {
    fighter: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'book'],
  setup(props, { emit }) {
    const allSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00']
    const bookedSlots = ref({})
    const selectedDate = ref(null)
    const selectedSlot = ref(null)
    const userEmail = ref('')
    const currentMonthIndex = ref(0)
    const currentDate = ref(new Date())

 // Dates
    const updateCurrentDate = () => {
      currentDate.value = new Date()
    }
    const intervalId = setInterval(updateCurrentDate, 60000)

    onUnmounted(() => {
      clearInterval(intervalId)
    })

    const months = computed(() => {
      const result = []
      for (let i = 0; i < 3; i++) {
        const date = new Date(currentDate.value)
        date.setMonth(date.getMonth() + i)
        result.push({
          date: new Date(date.getFullYear(), date.getMonth(), 1)
        })
      }
      return result
    })

    const currentMonthName = computed(() => {
      const date = months.value[currentMonthIndex.value].date
      return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    })

    const formatDate = (date) => {
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' })
    }

    const formatDateWithMonth = (date) => {
      return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
    }

    const getDayName = (day) => {
      const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
      return days[day % 7]
    }

    const getDate = (month, day, week) => {
      const date = new Date(month.date)
      date.setDate(1 + (week - 1) * 7 + (day - date.getDay() + 7) % 7)
      return date
    }

    const getWeeksInMonth = (date) => {
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      const daysInMonth = lastDay.getDate()
      const weeksInMonth = Math.ceil((daysInMonth + firstDay.getDay()) / 7)
      return weeksInMonth
    }

    const isSameDate = (date1, date2) => {
      return date1.toDateString() === date2.toDateString()
    }

    const isDateInFuture = (date) => {
      return date >= currentDate.value
    }

    const isDateAvailable = (date) => {
      if (!isDateInFuture(date)) return false
      const dateString = date.toISOString().split('T')[0]
      if (!bookedSlots.value[dateString]) {
        bookedSlots.value[dateString] = allSlots.filter(() => Math.random() > 0.7)
      }
      return bookedSlots.value[dateString].length < allSlots.length
    }

    const getAvailableSlots = (date) => {
      const dateString = date.toISOString().split('T')[0]
      if (!bookedSlots.value[dateString]) {
        bookedSlots.value[dateString] = allSlots.filter(() => Math.random() > 0.7)
      }
      return allSlots.map(slot => ({
        time: slot,
        isAvailable: !bookedSlots.value[dateString].includes(slot) && isSlotInFuture(date, slot)
      }))
    }

    const isSlotInFuture = (date, slot) => {
      const [hours, minutes] = slot.split(':')
      const slotDate = new Date(date)
      slotDate.setHours(parseInt(hours), parseInt(minutes), 0, 0)
      return slotDate > currentDate.value
    }

    const selectDay = (date) => {
      selectedDate.value = date
    }

    const selectSlot = (date, time) => {
      selectedSlot.value = { date, time }
      selectedDate.value = null
    }

    const cancelSelection = () => {
      selectedSlot.value = null
      userEmail.value = ''
    }

    const confirmBooking = () => {
      if (selectedSlot.value && userEmail.value) {
        const bookingInfo = {
          fighter: props.fighter,
          date: formatDate(selectedSlot.value.date),
          time: selectedSlot.value.time,
          userEmail: userEmail.value
        }
        emit('book', bookingInfo)
        
        const dateString = selectedSlot.value.date.toISOString().split('T')[0]
        if (!bookedSlots.value[dateString]) {
          bookedSlots.value[dateString] = []
        }
        bookedSlots.value[dateString].push(selectedSlot.value.time)
        
        cancelSelection()
      }
    }

    const previousMonth = () => {
      if (currentMonthIndex.value > 0) {
        currentMonthIndex.value--
      }
    }

    const nextMonth = () => {
      if (currentMonthIndex.value < months.value.length - 1) {
        currentMonthIndex.value++
      }
    }

    return {
      months,
      currentMonthIndex,
      currentMonthName,
      formatDate,
      formatDateWithMonth,
      getDayName,
      getDate,
      getWeeksInMonth,
      isSameDate,
      isDateInFuture,
      isDateAvailable,
      getAvailableSlots,
      selectDay,
      selectSlot,
      selectedDate,
      selectedSlot,
      userEmail,
      cancelSelection,
      confirmBooking,
      previousMonth,
      nextMonth
    }
  }
}
</script>