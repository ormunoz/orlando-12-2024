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
    component: () => import('@/views/pokemonInfoView.vue'),
    props: true,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
