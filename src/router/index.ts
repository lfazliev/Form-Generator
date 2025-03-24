import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/contact-form',
    name: 'ContactForm',
    component: () => import('@/views/ContactFormDemo.vue'),
  },
  {
    path: '/registration-form',
    name: 'RegistrationForm',
    component: () => import('@/views/RegistrationFormDemo.vue'),
  },
  {
    path: '/product-form',
    name: 'ProductForm',
    component: () => import('@/views/ProductFormDemo.vue'),
  },
  {
    path: '/custom-form',
    name: 'CustomForm',
    component: () => import('@/views/CustomFormDemo.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
