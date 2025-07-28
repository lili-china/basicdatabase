import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import PersonalDatabase from '../views/PersonalDatabase.vue'
import VehicleDatabase from '../views/VehicleDatabase.vue'
import EnterpriseDatabase from '../views/EnterpriseDatabase.vue'
import EnterpriseDetail from '@/components/EnterpriseDetail.vue'
import Analytics from '../views/Analytics.vue'
import Settings from '../views/Settings.vue'
import ErrorPage from '../views/ErrorPage.vue'
import LoginPage from '../views/LoginPage.vue'
import UserConfirmPage from '../views/UserConfirmPage.vue'
import ISPDatabase from '../views/ISPDatabase.vue'
import RelationGraphDemo from '../views/RelationGraphDemo.vue'
import SessionTest from '../views/SessionTest.vue'
import ApiTest from '../views/ApiTest.vue'
import LocationPage from '../views/LocationPage.vue'
import MapLayerDemo from '../views/MapLayerDemo.vue'
import FileManager from '../views/FileManager.vue'


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
      path: '/enterprise-database',
      name: 'EnterpriseDatabase',
      component: EnterpriseDatabase
    },
    {
      path: '/enterprise-detail/:id',
      name: 'EnterpriseDetail',
      component: EnterpriseDetail
    },
    {
      path: '/isp-database',
      name: 'ISPDatabase',
      component: ISPDatabase
    },
    {
      path: '/isp-detail/:id',
      name: 'isp-detail',
      component: () => import('@/components/isp-database/ISPDetailPage.vue')
    },
    {
      path: '/isp-detail-wrapper/:id',
      name: 'isp-detail-wrapper',
      component: () => import('@/components/isp-database/ISPDetailPageWrapper.vue')
    },
    {
      path: '/isp-detail-wrapper/search',
      name: 'isp-detail-search',
      component: () => import('@/components/isp-database/ISPDetailPageWrapper.vue')
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
    {
      path: '/api-test',
      name: 'ApiTest',
      component: ApiTest
    },
    {
      path: '/location',
      name: 'Location',
      component: LocationPage
    },
    {
      path: '/map-layer-demo',
      name: 'MapLayerDemo',
      component: MapLayerDemo
    },
    {
      path: '/user-profile/:id',
      name: 'UserProfilePage',
      component: () => import('@/components/user-database/UserDetailPage.vue')
    },
    {
      path: '/file-manager',
      name: 'FileManager',
      component: FileManager
    },

  ]
})

export default router 