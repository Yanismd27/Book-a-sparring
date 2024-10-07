import { createRouter, createWebHistory } from 'vue-router'
import MainContent from '../components/maincontent.vue'
import BookingSparring from '../views/BookingSparring.vue'
import Contact from '../views/Contact.vue'
import About from '../views/About.vue'
import Services from '../views/Services.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainContent
  },
  {
    path: '/book-sparring',
    name: 'BookSparring',
    component: BookingSparring
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/services',
    name: 'Services',
    component: Services
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router