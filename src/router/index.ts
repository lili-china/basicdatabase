import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import PersonalDatabase from '../views/PersonalDatabase.vue'
import VehicleDatabase from '../views/VehicleDatabase.vue'
import Analytics from '../views/Analytics.vue'
import Settings from '../views/Settings.vue'
import ErrorPage from '../views/ErrorPage.vue'
import LoginPage from '../views/LoginPage.vue'
import UserConfirmPage from '../views/UserConfirmPage.vue'
import ISPDatabase from '../views/ISPDatabase.vue'
import RelationGraphDemo from '../views/RelationGraphDemo.vue'
import SessionTest from '../views/SessionTest.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/personal-database',
      name: 'PersonalDatabase',
      component: PersonalDatabase
    },
    {
      path: '/vehicle-database',
      name: 'VehicleDatabase',
      component: VehicleDatabase
    },
    {
      path: '/isp-database',
      name: 'ISPDatabase',
      component: ISPDatabase
    },
    {
      path: '/analytics',
      name: 'Analytics',
      component: Analytics
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/error',
      name: 'Error',
      component: ErrorPage
    },
    {
      path: '/errorPage',
      name: 'ErrorPage',
      component: ErrorPage
    },
    {
      path: '/user-confirm',
      name: 'UserConfirm',
      component: UserConfirmPage
    },
    {
      path: '/relation-graph',
      name: 'RelationGraph',
      component: RelationGraphDemo
    },
    {
      path: '/sessionTest',
      name: 'SessionTest',
      component: SessionTest
    },

  ]
})

export default router 