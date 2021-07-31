import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import( '../views/Article.vue')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import( '../views/Message.vue')
  },
  {
    path: '/Link',
    name: 'Link',
    component: () => import( '../views/Link.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import( '../views/User.vue')
  },
  {
    path: '/pass',
    name: 'Pass',
    component: () => import( '../views/User.vue')
  },
  {
    path: "/article/:id",
    name: "ArticleID",
    component: () => import('../views/ArticleID')
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import('../views/Admin')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
