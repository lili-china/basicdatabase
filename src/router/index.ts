import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import EmployeeDatabase from '../views/EmployeeDatabase.vue'
import VehicleDatabase from '../views/VehicleDatabase.vue'
import Analytics from '../views/Analytics.vue'
import Settings from '../views/Settings.vue'
import ErrorPage from '../views/ErrorPage.vue'
import LoginPage from '../views/LoginPage.vue'
import ISPDatabase from '../views/ISPDatabase.vue'
import RelationGraphDemo from '../views/RelationGraphDemo.vue'


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
      component: EmployeeDatabase
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
      path: '/relation-graph',
      name: 'RelationGraph',
      component: RelationGraphDemo
    },

  ]
})

export default router 