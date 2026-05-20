import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
  { path: '/popular', name: 'popular', component: () => import('@/views/PopularView.vue') },
  { path: '/topics', name: 'topics', component: () => import('@/views/TopicsView.vue') },
  { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue') },
  {
    path: '/r/:subreddit',
    name: 'subreddit',
    component: () => import('@/views/SubredditView.vue'),
    props: true,
  },
  {
    path: '/post/:id',
    name: 'post',
    component: () => import('@/views/PostView.vue'),
    props: true,
  },
  {
    path: '/u/:username',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
    props: true,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
