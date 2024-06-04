import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import Home from './views/Home.vue';
import Tokens from "./views/Tokens.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/tokens',
    component: Tokens,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
