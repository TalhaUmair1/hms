<script setup lang="ts">
import { useRoute, useFetch } from '#app'

const route = useRoute()
const patientId = route.params.id

const { data: patient, pending, error } = useFetch(`/api/patients/${patientId}`)
</script>

<template>
  <UDashboardPanel id="Patient Details">
    <!-- Header -->
    <template #header>
      <UDashboardNavbar title="Patient Details">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
        <template #right>
          <UColorModeButton />
        </template>
      </UDashboardNavbar>
    </template>

    <!-- Body -->
    <template #body>
      <div
        class="min-h-screen flex items-center justify-center"
      >
        <!-- Loading -->
        <UCard v-if="pending" class="max-w-lg w-full p-10 text-center">
          <USkeleton class="h-8 mb-4" v-for="i in 5" :key="i" />
        </UCard>

        <!-- Error -->
        <UAlert
          v-else-if="error"
          color="error"
          title="Failed to load patient details"
          description="Please try again later."
          class="max-w-lg w-full"
        />

        <!-- Marriage-style Patient Card -->
      <UCard
  v-else
  class="max-w-md w-full shadow-xl rounded-2xl border border-secondary p-6"
>
  <div class="text-center mb-6">
    <h2 class="text-3xl font-semibold text-primary">Patient Details</h2>
    <p class="text-secondary mt-1">A gentle overview of patient information</p>
  </div>

  <div class="divide-y divide-secondary/50">
    <div class="flex justify-between py-3">
      <span class="font-medium text-secondary">Patient Name:</span>
      <span class="text-primary">{{ patient?.patient_name }}</span>
    </div>

    <div class="flex justify-between py-3">
      <span class="font-medium text-secondary">Date of Birth:</span>
      <span class="text-primary">{{ patient?.dob }}</span>
    </div>

    <div class="flex justify-between items-center py-3">
      <span class="font-medium text-secondary">Gender:</span>
      <UBadge
        :color="patient?.gender === 'Male' ? 'primary' : 'secondary'"
        size="lg"
        variant="soft"
      >
        {{ patient?.gender }}
      </UBadge>
    </div>

    <div class="flex justify-between py-3">
      <span class="font-medium text-secondary">Medical History:</span>
      <span class="text-primary text-right whitespace-pre-line">
        {{ patient?.medical_history }}
      </span>
    </div>
  </div>

  <div class="mt-8 flex justify-center">
    <UButton
      color="primary"
      icon="i-heroicons-arrow-left"
      variant="soft"
      size="lg"
      @click="navigateTo('/dashboard/patients')"
    >
      Back to Patients
    </UButton>
  </div>
</UCard>

      </div>
    </template>
  </UDashboardPanel>
</template>
