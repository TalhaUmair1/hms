<script setup lang="ts">
import { useRoute, useFetch } from '#app'

const route = useRoute()
const appointmentId = route.params.id

// ✅ Fetch appointment details
const { data: appointment, pending, error } = await useFetch(`/api/oppointments/${appointmentId}`)
</script>

<template>
 <UDashboardPanel id="customers">
    <template #header>
      <UDashboardNavbar title="Details Appointment">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <UDashboardToolbar>
        <template #left>
    
        </template>
      </UDashboardToolbar>
        <template #right>
         <UColorModeButton />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
  <div class="flex flex-col items-center justify-center min-h-screen  p-6">
    <!-- Loading -->
    <div v-if="pending" class="flex justify-center items-center h-64">
      <ULoader size="lg" />
    </div>

    <!-- Error -->
    <UAlert
      v-else-if="error"
      color="red"
      variant="soft"
      title="Error loading appointment"
      description="Please try again later."
      class="max-w-md w-full"
    />

    <!-- Appointment Details -->
    <UCard
  v-else-if="appointment"
  class="max-w-md w-full shadow-xl rounded-2xl border border-secondary p-6"
>
  <div class="text-center mb-6">
    <h2 class="text-3xl font-semibold text-primary">Appointment Details</h2>
    <p class="text-secondary mt-1">View the full information below</p>
  </div>

  <div class="divide-y divide-secondary/50">
    <div class="flex justify-between py-3">
      <span class="font-medium text-secondary">ID:</span>
      <span>{{ appointment.id }}</span>
    </div>

    <div class="flex justify-between py-3">
      <span class="font-medium text-secondary">Patient ID:</span>
      <span>{{ appointment.patient_id }}</span>
    </div>

    <div class="flex justify-between py-3">
      <span class="font-medium text-secondary">Doctor ID:</span>
      <span>{{ appointment.doctor_id }}</span>
    </div>

    <div class="flex justify-between py-3">
      <span class="font-medium text-secondary">Date:</span>
      <span>{{ appointment.date }}</span>
    </div>

    <div class="flex justify-between items-center py-3">
      <span class="font-medium text-secondary">Status:</span>
      <UBadge color="primary" variant="subtle" size="lg" class="capitalize">
        {{ appointment.status }}
      </UBadge>
    </div>
  </div>

  <div class="mt-8 flex justify-center">
    <UButton
      color="primary"
      icon="i-heroicons-arrow-left"
      variant="soft"
      size="lg"
      @click="navigateTo('/dashboard/appointments')"
    >
      Back to Appointments
    </UButton>
  </div>
</UCard>

  </div>
    </template>
  </UDashboardPanel>
</template>

<script lang="ts">
function getStatusColor(status: string) {
  switch (status) {
    case 'pending': return 'yellow'
    case 'confirmed': return 'green'
    case 'completed': return 'blue'
    case 'canceled': return 'red'
    default: return 'gray'
  }
}
</script>
