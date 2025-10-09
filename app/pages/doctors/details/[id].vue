<script setup lang="ts">
import { useRoute, useFetch } from '#app'

const route = useRoute()
const doctorId = route.params.id

const { data: doctor, pending, error } =  useFetch(`/api/doctors/${doctorId}`)
</script>


<template>
    <UDashboardPanel id="Doctor Details">
    <template #header>
      <UDashboardNavbar title="Doctor Details">
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
      <UContainer class="py-8">
    <!-- Loading -->
    <UCard v-if="pending" class="max-w-2xl mx-auto">
      <div class="p-8">
        <UStack justify="center" align="center" direction="col" gap="6">
          <USkeleton class="w-32 h-32 rounded-full" />
          <div class="w-full space-y-3">
            <USkeleton class="w-3/4 h-6 mx-auto" />
            <USkeleton class="w-1/2 h-4 mx-auto" />
            <USkeleton class="w-2/3 h-4 mx-auto" />
          </div>
          <div class="w-full space-y-2 mt-4">
            <USkeleton class="w-full h-4" />
            <USkeleton class="w-full h-4" />
            <USkeleton class="w-4/5 h-4" />
          </div>
        </UStack>
      </div>
    </UCard>

    <!-- Error -->
    <UCard v-else-if="error" class="max-w-2xl mx-auto">
      <div class="p-6 text-center">
        <UIcon name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Failed to Load Doctor Details
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          Please try refreshing the page or contact support if the problem persists.
        </p>
        <UButton 
          color="primary" 
          variant="solid" 
          class="mt-4"
          @click="$router.go(0)"
        >
          Try Again
        </UButton>
      </div>
    </UCard>

    <!-- Doctor Profile -->
    <UCard v-else class="max-w-2xl mx-auto  rounded-2xl overflow-hidden border-0">
      <!-- Header with gradient background -->
      <div class="bg-primary rounded-md p-8 text-center">
        <div class="flex justify-center mb-4">
          <UAvatar
            size="2xl"
            :src="`https://i.pravatar.cc/150?img=${doctor?.id}`"
            :alt="doctor?.name"
            class="ring-4 ring-white/20 shadow-2xl"
          />
        </div>
        <h1 class="text-2xl font-bold mb-2">{{ doctor?.name }}</h1>
        <p class="text-primary-100 opacity-90">{{ doctor?.email }}</p>
        <div class="mt-4">
          <UBadge  variant="solid" class="text-black text-2xl font-semibold">
            {{ doctor?.specialization }}
          </UBadge>
        </div>
      </div>

      <!-- Content -->
      <div class="p-8">
        <UStack direction="col" gap="6">
          <!-- Fees Card -->
          <div class="flex items-center justify-between my-4 p-4 bg-primary-50 dark:bg-primary-950 rounded-lg border border-primary-100 dark:border-primary-800">
            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-currency-dollar" class="w-6 h-6 text-primary-600" />
              <div>
                <p class="font-semibold text-primary-900 dark:text-primary-100">Consultation Fees</p>
                <p class="text-sm text-primary-600 dark:text-primary-400">Per session</p>
              </div>
            </div>
            <span class="text-2xl font-bold text-primary-700 dark:text-primary-300">
              ${{ doctor?.fees }}
            </span>
          </div>

          <!-- Availability Card -->
          <div class="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-100 dark:border-green-800">
            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-clock" class="w-6 h-6 text-green-600" />
              <div>
                <p class="font-semibold text-green-900 dark:text-green-100">Availability</p>
                <p class="text-sm text-green-600 dark:text-green-400">Current status</p>
              </div>
            </div>
            <UBadge :color="doctor?.availability === 'Available' ? 'green' : 'orange'" variant="soft">
              {{ doctor?.availability }}
            </UBadge>
          </div>

          <!-- Doctor ID Card -->
          <div class="flex items-center justify-between p-4 my-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-identification" class="w-6 h-6 text-gray-600 dark:text-gray-400" />
              <div>
                <p class="font-semibold text-gray-900 dark:text-gray-100">Doctor ID</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Unique identifier</p>
              </div>
            </div>
            <span class="text-lg font-mono font-semibold text-gray-700 dark:text-gray-300">
              #{{ doctor?.id }}
            </span>
          </div>
        </UStack>

        <!-- Action Buttons -->
       
      </div>
    </UCard>
  </UContainer>
    </template>
  </UDashboardPanel>
</template>

<script setup>

</script>
