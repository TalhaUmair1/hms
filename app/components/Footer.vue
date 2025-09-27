<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[] = [
  {
    label: 'About Us',
    to: '/about'
  },
  {
    label: 'Departments',
    to: '/departments'
  },
  {
    label: 'Doctors',
    to: '/doctors'
  },
  {
    label: 'Contact',
    to: '/contact'
  }
]
</script>

<template>
  <UFooter>
    <!-- Left Section -->
    <template #left>
      <p class="text-muted text-sm">
        © {{ new Date().getFullYear() }} Shaukat Khanum Hospital. All rights reserved.
      </p>
    </template>

    <!-- Center Navigation -->
    <UNavigationMenu :items="items" variant="link" />

    <!-- Right Section -->
    <template #right>
      <UButton
        icon="i-simple-icons-facebook"
        color="neutral"
        variant="ghost"
        to="https://facebook.com"
        target="_blank"
        aria-label="Facebook"
      />
      <UButton
        icon="i-simple-icons-instagram"
        color="neutral"
        variant="ghost"
        to="https://instagram.com"
        target="_blank"
        aria-label="Instagram"
      />
      <UButton
        icon="i-simple-icons-twitter"
        color="neutral"
        variant="ghost"
        to="https://twitter.com"
        target="_blank"
        aria-label="Twitter"
      />
    </template>
  </UFooter>
</template>
