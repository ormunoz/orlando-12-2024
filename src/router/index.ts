import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Pokemons',
    component: () => import('@/views/pokemonsListView.vue')
  },
  {
    path: '/team',
    name: 'team',
    component: () => import('@/views/myPokemonsView.vue')
  },
  {
    path: '/team/:id',
    name: 'Pokemon',
    component: () => import('@/views/pokemonInfoView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
})

export default router
