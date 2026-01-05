<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

interface Patient {
  id: number;
  user_id: number;
  dob: string;
  gender: string;
  medical_history: string;
  patient_name: string;
}

defineProps<{
  patients: Patient[];
}>();

const router = useRouter();

const navigateToPatientDetails = (patientId: number) => {
  router.push(`/dashboard/patients/details/${patientId}`);
};
</script>

<template>
  <ul role="list" class="divide-y divide-default">
    <li
      v-for="(patient, index) in patients"
      :key="patient.id"
      class="flex items-center justify-between gap-3 py-3 px-4 sm:px-6"
    >
      <div class="flex items-center gap-3 min-w-0">
        <UAvatar :alt="patient.patient_name" size="md" />

        <div class="text-sm min-w-0">
          <p class="text-highlighted font-medium truncate">
            {{ patient.patient_name }}
          </p>
          <p class="text-muted truncate">Patient Identit NO: {{ patient.id }}</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="text-sm text-muted">
          <p>{{ patient.gender }}, {{ patient.dob }}</p>
        </div>

        <UDropdownMenu
          :items="[
            {
              label: 'View details',
              onSelect: () => navigateToPatientDetails(patient.id),
            },
          ]"
          :content="{ align: 'end' }"
        >
          <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" />
        </UDropdownMenu>
      </div>
    </li>
  </ul>
</template>
