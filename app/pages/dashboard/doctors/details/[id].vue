<script setup lang="ts">
import { useRoute, useFetch } from '#app'

const route = useRoute()
const doctorId = route.params.id

const { data: doctor, pending, error } = useFetch(`/api/doctors/${doctorId}`)
</script>

<template>
  <UDashboardPanel id="Doctor Details">
    <template #header>
      <UDashboardNavbar title="Doctor Details">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <UDashboardToolbar />

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
            <UIcon name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 class="text-lg font-semibold mb-2">Failed to Load Doctor Details</h3>
            <p class="opacity-80">Please try refreshing the page or contact support if the problem persists.</p>
            <UButton color="primary" variant="solid" class="mt-4" @click="$router.go(0)">
              Try Again
            </UButton>
          </div>
        </UCard>

        <!-- Doctor Profile -->
        <UCard v-else class="max-w-2xl mx-auto rounded-2xl overflow-hidden border border-secondary">
          <!-- Header -->
          <div class="p-8 text-center">
            <div class="flex justify-center mb-4">
              <UAvatar
                size="3xl"
                :src="`https://i.pravatar.cc/150?img=${doctor?.id}`"
                :alt="doctor?.name"
                class="ring-4 ring-white/20 shadow-2xl"
              />
            </div>
            <h1 class="text-4xl font-bold mb-2 ">{{ doctor?.name }}</h1>
            <p class="">{{ doctor?.email }}</p>
            <div class="mt-4">
              <UBadge variant="solid" color="secondary" class="text-base font-semibold">
                {{ doctor?.specialization }}
              </UBadge>
            </div>
          </div>

          <!-- Content -->
          <div class="p-8">
            <UStack direction="col" gap="6">
              <!-- Fees Card -->
              <div class="flex items-center justify-between my-4 p-4 bg-secondary/10 rounded-lg border border-secondary/30">
                <div class="flex items-center gap-3">
                  <UIcon name="i-heroicons-currency-dollar" class="w-6 h-6 text-secondary" />
                  <div>
                    <p class="font-semibold">Consultation Fees</p>
                    <p class="text-sm opacity-80">Per session</p>
                  </div>
                </div>
                <span class="text-2xl font-bold text-secondary">${{ doctor?.fees }}</span>
              </div>

              <!-- Availability Card -->
              <div class="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-primary/30">
                <div class="flex items-center gap-3">
                  <UIcon name="i-heroicons-clock" class="w-6 h-6 text-primary" />
                  <div>
                    <p class="font-semibold">Availability</p>
                    <p class="text-sm opacity-80">Current status</p>
                  </div>
                </div>
                <UBadge :color="doctor?.availability === 'Available' ? 'primary' : 'secondary'" variant="soft">
                  {{ doctor?.availability }}
                </UBadge>
              </div>

              <!-- Doctor ID Card -->
              <div class="flex items-center justify-between p-4 my-4 bg-secondary/10 rounded-lg border border-secondary/30">
                <div class="flex items-center gap-3">
                  <UIcon name="i-heroicons-identification" class="w-6 h-6 text-secondary" />
                  <div>
                    <p class="font-semibold">Doctor ID</p>
                    <p class="text-sm opacity-80">Unique identifier</p>
                  </div>
                </div>
                <span class="text-lg font-mono font-semibold">#{{ doctor?.id }}</span>
              </div>
            </UStack>
          </div>
        </UCard>
      </UContainer>
    </template>
  </UDashboardPanel>
</template>
