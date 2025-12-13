<script setup lang="ts">
import { useToast } from '#imports'
import type { NavigationMenuItem } from '@nuxt/ui'
import { useCookie } from 'nuxt/app'
import { ref, computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { canReadDoctor } from '#shared/abilities/doctors'
import { canReadPersonalppointments } from '#shared/abilities/appointments'
import { canReadPersonalBilling } from '#shared/abilities/billig'
import { canReadPatients } from '#shared/abilities/patients'
import { canReadPharmacy } from '#shared/abilities/pharmacy'
import { canReadPrescription } from '#shared/abilities/prescriptions'
import { canReadUsers } from '#shared/abilities/user'

const route = useRoute()
const toast = useToast()

const open = ref(false)

// Centralized permissions map
const perms = reactive({
  // hidden by default to avoid flicker until permissions resolve
  users: true,
  doctors: true,
  appointments: true,
  patients: true,
  prescriptions: true,
  billing: true,
  pharmacy: true,
})

async function resolvePermissions() {
  const permissionChecks: [keyof typeof perms, () => Promise<boolean>][] = [
    ['users', () => denies(canReadUsers)],
    ['doctors', () => denies(canReadDoctor)],
    ['appointments', () => denies(canReadPersonalppointments)],
    ['patients', () => denies(canReadPatients)],
    ['prescriptions', () => denies(canReadPrescription)],
    ['billing', () => denies(canReadPersonalBilling)],
    ['pharmacy', () => denies(canReadPharmacy)],
  ]
  const results = await Promise.all(permissionChecks.map(([, check]) => check()))
  permissionChecks.forEach(([key], i) => {
    perms[key] = results[i]!
  })
}
console.log(perms.pharmacy, "get from pharmacy");


const links = computed(() => [
  [
    {
      id: 'home',
      label: 'Home',
      icon: 'i-lucide-house',
      to: '/dashboard',
      onSelect: () => {
        open.value = false
      },
    },
    {
      id: 'inbox',
      label: 'Inbox',
      icon: 'i-lucide-inbox',
      to: '/dashboard/inbox',
      badge: '4',
      onSelect: () => {
        open.value = false
      },
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: 'i-lucide-users',
      to: '/dashboard/customers',
      onSelect: () => {
        open.value = false
      },
      hidden: perms.users,
    },
    {
      id: 'doctors',
      label: 'Doctors',
      icon: 'i-lucide-stethoscope',
      to: '/dashboard/doctors',
      hidden: perms.doctors,
      onSelect: () => {
        open.value = false
      },
    },
    {
      id: 'appointments',
      label: 'Appointments',
      icon: 'i-lucide-watch',
      to: '/dashboard/appointments',
      hidden: perms.appointments,
      onSelect: () => {
        open.value = false
      },
    },
    {
      id: 'patients',
      label: 'Patients',
      icon: 'i-lucide-person-standing',
      to: '/dashboard/patients',
      hidden: perms.patients,
      onSelect: () => {
        open.value = false
      },
    },
    {
      id: 'prescriptions',
      label: 'prescriptions',
      icon: 'i-lucide-scroll',
      to: '/dashboard/prescriptions',
      hidden: perms.prescriptions,
      onSelect: () => {
        open.value = false
      },
    },
    {
      id: 'billing',
      label: 'Billing',
      icon: 'i-lucide-circle-dollar-sign',
      to: '/dashboard/billing',
      hidden: perms.billing,
      onSelect: () => {
        open.value = false
      },
    },
    {
      id: 'pharmacy',
      label: 'Pharmacy',
      icon: 'i-lucide-pill',
      to: '/dashboard/pharmacy',
      hidden: perms.pharmacy,
      onSelect: () => {
        open.value = false
      },
    },
    {
      id: 'settings',
      label: 'Settings',
      to: '/settings',
      icon: 'i-lucide-settings',
      defaultOpen: true,
      type: 'trigger',
      children: [
        {
          id: 'settings-general',
          label: 'General',
          to: '/dashboard/settings',
          exact: true,
          onSelect: () => {
            open.value = false
          },
        },
        {
          id: 'settings-members',
          label: 'Members',
          to: '/dashboard/settings/members',
          onSelect: () => {
            open.value = false
          },
        },
        {
          id: 'settings-notifications',
          label: 'Notifications',
          to: '/dashboard/settings/notifications',
          onSelect: () => {
            open.value = false
          },
        },
        {
          id: 'settings-security',
          label: 'Security',
          to: '/dashboard/settings/security',
          onSelect: () => {
            open.value = false
          },
        },
      ],
    },
  ],
] satisfies NavigationMenuItem[][])

const groups = computed(() => [
  {
    id: 'links',
    label: 'Go to',
    items: links.value.flat().filter(link => !link.hidden),
  },
])

// Only pass visible items to menus to guarantee hidden entries are not rendered
const visibleLinks0 = computed(() => links.value[0]?.filter(l => !l.hidden) ?? [])
const visibleLinks1 = computed(() => links.value[1]?.filter(l => !l.hidden) ?? [])

onMounted(async () => {
  await resolvePermissions()

  const cookie = useCookie('cookie-consent')
  if (cookie.value === 'accepted') {
    return
  }

  toast.add({
    title: 'We use first-party cookies to enhance your experience on our website.',
    duration: 0,
    close: false,
    actions: [
      {
        label: 'Accept',
        color: 'neutral',
        variant: 'outline',
        onClick: () => {
          cookie.value = 'accepted'
        },
      },
      {
        label: 'Opt out',
        color: 'neutral',
        variant: 'ghost',
      },
    ],
  })
})
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #header="{ collapsed }">
        <TeamsMenu :collapsed="collapsed" />
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="visibleLinks0"
          orientation="vertical"
          tooltip
          popover
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="visibleLinks1"
          orientation="vertical"
          tooltip
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups" />

    <slot />

    <NotificationsSlideover />
  </UDashboardGroup>
</template>
