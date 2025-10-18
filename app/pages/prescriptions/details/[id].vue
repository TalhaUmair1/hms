<script setup lang="ts">
import { useRoute, useFetch, navigateTo } from '#app'

// ✅ Get prescription ID from the route
const route = useRoute()
const prescriptionId = route.params.id

// ✅ Fetch prescription details
const { data: prescription, pending, error } =  useFetch(`/api/prescriptions/${prescriptionId}`)
</script>



<template>
    <UDashboardPanel id="CreatePrescriptions">
    <template #header>
      <UDashboardNavbar title="Prescriptions">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <UDashboardToolbar>
        <template #left>
    
        </template>
      </UDashboardToolbar>
        <template #right>
        <u-color-mode-button/>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
   <div class="flex flex-col items-center justify-center min-h-screen p-6 ">
    <!-- Loading -->
    <div v-if="pending" class="flex justify-center items-center h-64">
      <ULoader size="lg" />
    </div>

    <!-- Error -->
    <UAlert
      v-else-if="error"
      color="error"
      variant="soft"
      title="Error loading prescription"
      description="Please try again later."
      class="max-w-md w-full"
    />

    <!-- Prescription Details -->
   <UCard
  v-else-if="prescription"
  class="max-w-md w-full shadow-xl rounded-md border border-(neutral-200 dark:neutral-700) p-6"
>
  <div class="text-center mb-6">
    <h2 class="text-3xl font-semibold text-primary">Prescription Details</h2>
    <p class="text-secondary mt-1">Below is the full prescription information</p>
  </div>

  <div class="divide-y divide-(neutral-200 dark:neutral-700)">
    <div class="flex justify-between py-3">
      <span class="font-medium text-neutral">ID:</span>
      <span>{{ prescription.id }}</span>
    </div>

    <div class="flex justify-between py-3">
      <span class="font-medium text-neutral">Appointment ID:</span>
      <span>{{ prescription.appointment_id }}</span>
    </div>

    <div class="flex justify-between py-3">
      <span class="font-medium text-neutral">Doctor ID:</span>
      <span>{{ prescription.doctor_id }}</span>
    </div>

    <div class="flex justify-between py-3">
      <span class="font-medium text-neutral">Patient ID:</span>
      <span>{{ prescription.patient_id }}</span>
    </div>

    <div class="py-3">
      <span class="font-medium text-neutral block mb-1">Medicine List:</span>
      <p class="text-primary whitespace-pre-line">
        {{ prescription.medicine_list }}
      </p>
    </div>

    <div class="py-3">
      <span class="font-medium text-neutral block mb-1">Notes:</span>
      <p class="text-secondary whitespace-pre-line">
        {{ prescription.notes || 'No additional notes' }}
      </p>
    </div>
  </div>
</UCard>

  </div>
    </template>
  </UDashboardPanel>
</template>



