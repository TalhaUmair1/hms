<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Dashboard',
    to: '/dashboard',
    active: route.path === '/dashboard' || route.path.startsWith('/dashboard')
  },
  {
    label: 'Patients',
    to: '/patients',
    active: route.path.startsWith('/patients')
  },
  {
    label: 'Appointments',
    to: '/appointments',
    active: route.path.startsWith('/appointments')
  },
  {
    label: 'Doctors',
    to: '/doctors',
    active: route.path.startsWith('/doctors')
  },
  {
    label: 'Billing',
    to: '/billing',
    active: route.path.startsWith('/billing')
  }
])
</script>

<template>
  <UHeader>
    <template #title>
      <div class="flex items-center space-x-2 text-lg font-bold">
        <UIcon name="i-lucide-hospital" class="w-6 h-6" />
        <span>Shoukat Khanam Hospital</span>
      </div>
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />
    </template>
  </UHeader>
</template>