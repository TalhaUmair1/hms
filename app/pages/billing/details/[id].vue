<script setup lang="ts">
import { useRoute, useFetch, navigateTo } from '#app'

const route = useRoute()
const billId = route.params.id

// ✅ Fetch bill details
const { data: bill, pending, error } = await useFetch(`/api/billing/${billId}`)
</script>

<template>
  <UDashboardPanel id="billing-details">
    <!-- 🧭 Header -->
    <template #header>
      <UDashboardNavbar title="Billing Details">
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
        <!-- Loading -->
        <div v-if="pending" class="flex justify-center items-center h-64">
          <ULoader size="lg" />
        </div>

        <!-- Error -->
        <UAlert
          v-else-if="error"
          color="error"
          variant="soft"
          title="Error loading bill"
          description="Please try again later."
          class="max-w-md w-full"
        />

        <!-- ✅ Bill Details -->
        <UCard
          v-else-if="bill"
          class="max-w-md w-full shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
        >
          <div class="text-center mb-6">
            <h2 class="text-3xl font-semibold text-primary">Bill Details</h2>
            <p class="text-gray-500 mt-1">Below is the full billing information</p>
          </div>

          <div class="divide-y divide-gray-200 dark:divide-gray-700">
            <div class="flex justify-between py-3">
              <span class="font-medium text-gray-600">ID:</span>
              <span>{{ bill.id }}</span>
            </div>

            <div class="flex justify-between py-3">
              <span class="font-medium text-gray-600">Appointment ID:</span>
              <span>{{ bill.appointment_id }}</span>
            </div>

            <div class="flex justify-between py-3">
              <span class="font-medium text-gray-600">Patient ID:</span>
              <span>{{ bill.patient_id }}</span>
            </div>

            <div class="flex justify-between py-3">
              <span class="font-medium text-gray-600">Amount:</span>
              <span>Rs. {{ bill.amount.toFixed(2) }}</span>
            </div>

            <div class="flex justify-between items-center py-3">
              <span class="font-medium text-gray-600">Status:</span>
              <UBadge
                :color="getStatusColor(bill.status)"
                variant="subtle"
                size="lg"
                class="capitalize"
              >
                {{ bill.status }}
              </UBadge>
            </div>

            <div class="flex justify-between py-3">
              <span class="font-medium text-gray-600">Payment Method:</span>
              <span class="capitalize">{{ bill.payment_method.replace('_', ' ') }}</span>
            </div>
          </div>

          <div class="mt-8 flex justify-center">
            <UButton
              color="primary"
              icon="i-heroicons-arrow-left"
              variant="soft"
              size="lg"
              @click="navigateTo('/billing')"
            >
              Back to Billing
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
    case 'paid':
      return 'green'
    case 'pending':
      return 'yellow'
    case 'failed':
      return 'red'
    default:
      return 'gray'
  }
}
</script>
