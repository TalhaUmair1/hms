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
          class="relative max-w-lg w-full p-10 text-center rounded-xl "
        >
          <!-- Decorative Borders -->
          <div class="absolute top-4 left-4 w-10 h-10 border-t-4 border-l-4 border-primary rounded-tl-3xl"></div>
          <div class="absolute top-4 right-4 w-10 h-10 border-t-4 border-r-4 border-primary rounded-tr-3xl"></div>
          <div class="absolute bottom-4 left-4 w-10 h-10 border-b-4 border-l-4 border-primary rounded-bl-3xl"></div>
          <div class="absolute bottom-4 right-4 w-10 h-10 border-b-4 border-r-4 border-primary rounded-br-3xl"></div>

          <!-- Title -->
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-primary-700 dark:text-primary-400">
              Patient Details
            </h1>
            <p class="text-gray-500 dark:text-gray-400 text-sm">
              A gentle overview of patient information
            </p>
          </div>

          <!-- Divider -->
          <UDivider label="Information" class="my-6 text-primary" />

          <!-- Fields -->
          <div class="space-y-5 text-left">
            <div>
              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Patient ID
              </h3>
              <p class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {{ patient?.id }}
              </p>
            </div>

            <div>
              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
                User ID
              </h3>
              <p class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {{ patient?.user_id }}
              </p>
            </div>

            <div>
              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Date of Birth
              </h3>
              <p class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {{ patient?.dob }}
              </p>
            </div>

            <div>
              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Gender
              </h3>
              <UBadge
                :color="patient?.gender === 'Male' ? 'blue' : 'pink'"
                size="lg"
                variant="soft"
              >
                {{ patient?.gender }}
              </UBadge>
            </div>

            <div>
              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Medical History
              </h3>
              <p class="text-base leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-line">
                {{ patient?.medical_history }}
              </p>
            </div>
          </div>

          <UDivider class="my-8" />

          <!-- Footer -->
          <p class="text-sm text-gray-500 dark:text-gray-400 italic">
            “Wishing for their healthy and joyful life ahead.”
          </p>
        </UCard>
      </div>
    </template>
  </UDashboardPanel>
</template>
