<script setup lang="ts">
import { useRoute, useFetch, navigateTo } from '#app'

// ✅ Get pharmacy ID from route
const route = useRoute()
const pharmacyId = route.params.id

// ✅ Fetch pharmacy details
const { data: pharmacy, pending, error } = await useFetch(`/api/pharmacy/${pharmacyId}`)

// ✅ Status color helper
function getStatusColor(status: string) {
  switch (status) {
    case 'available':
      return 'green'
    case 'out_of_stock':
      return 'red'
    case 'expired':
      return 'yellow'
    default:
      return 'gray'
  }
}
</script>

<template>
  <UDashboardPanel id="pharmacy-details">
    <!-- 🧭 Header -->
    <template #header>
      <UDashboardNavbar title="Pharmacy Details">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
         <template #right>
          <UColorModeButton />
        </template>
      </UDashboardNavbar>
    </template>

    <!-- 📦 Body -->
    <template #body>
      <div class="flex flex-col items-center justify-center min-h-screen p-6">
        <!-- ⏳ Loading -->
        <div v-if="pending" class="flex justify-center items-center h-64">
          <ULoader size="lg" />
        </div>

        <!-- ❌ Error -->
        <UAlert
          v-else-if="error"
          color="error"
          variant="soft"
          title="Error loading pharmacy details"
          description="Please try again later."
          class="max-w-md w-full"
        />

        <!-- ✅ Pharmacy Details -->
<UCard
  v-else-if="pharmacy"
  class="max-w-md w-full shadow-xl rounded-2xl border border-secondary p-6"
>
  <div class="text-center mb-6">
    <h2 class="text-3xl font-semibold text-primary">Pharmacy Details</h2>
    <p class="text-secondary mt-1">Complete pharmacy record below</p>
  </div>

  <div class="divide-y divide-secondary/50">
    <div class="flex justify-between py-3">
      <span class="font-medium text-secondary">Medicine Name:</span>
      <span class="text-primary">{{ pharmacy.name }}</span>
    </div>

    <div class="flex justify-between py-3">
      <span class="font-medium text-secondary">Quantity:</span>
      <span class="text-primary">{{ pharmacy.quantity }}</span>
    </div>

    <div class="flex justify-between items-center py-3">
      <span class="font-medium text-secondary">Price:</span>
      <span class="text-primary">{{ pharmacy.price }}</span>
    </div>

    <div class="flex justify-between py-3">
      <span class="font-medium text-secondary">Expiry Date:</span>
      <span class="text-primary">{{ pharmacy.expiry_date }}</span>
    </div>
  </div>

  <div class="mt-8 flex justify-center">
    <UButton
      color="primary"
      icon="i-heroicons-arrow-left"
      variant="soft"
      size="lg"
      @click="navigateTo('/dashboard/pharmacy')"
    >
      Back to Pharmacy
    </UButton>
  </div>
</UCard>

      </div>
    </template>
  </UDashboardPanel>
</template>
