<template>
  <div class="min-h-screen text-white">
    <div class="container mx-auto px-4 py-16">
      <h1 class="text-5xl font-bold mb-12 text-center text-white">About Us</h1>
      
      <div class="flex flex-col lg:flex-row gap-12 items-start">
        <div class="lg:w-1/2">
          <img src="/Fight.jpg" alt="Boxing gym" class="rounded-lg shadow-lg w-full h-auto object-cover">
        </div>
        
        <div class="lg:w-1/2 space-y-8">
          <section class="bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg p-6 rounded-lg">
            <h2 class="text-3xl font-semibold mb-4 text-white">Our Story</h2>
            <p class="mb-4 leading-relaxed text-gray-300">
              Founded in 2010, our boxing gym has been dedicated to helping individuals of all skill levels improve their boxing technique, fitness, and confidence. We believe in the transformative power of boxing, both physically and mentally.
            </p>
            <p class="leading-relaxed text-gray-300">
              Our experienced trainers are passionate about the sport and committed to providing personalized guidance to each of our members. Whether you're a beginner looking to learn the basics or an experienced boxer aiming to refine your skills, we have the expertise and facilities to support your journey.
            </p>
          </section>
          
          <section class="bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg p-6 rounded-lg">
            <h2 class="text-3xl font-semibold mb-4 text-white">Our Mission</h2>
            <p class="leading-relaxed text-gray-300">
              We strive to create a welcoming and inclusive environment where everyone can discover their potential through boxing. Our goal is to empower individuals, foster a sense of community, and promote a healthy, active lifestyle.
            </p>
          </section>
        </div>
      </div>
      
      <div class="mt-16 text-center">
        <a href="#contact" class="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out shadow-lg hover:shadow-xl">
          Get Started Today
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
h1, h2 {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

img {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.bg-black {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>