<script setup lang="ts">
import { ref, computed } from 'vue'

const { data, status, refresh } = await useFetch<{ data: Patient[], pagination: { page: number, perPage: number, total: number, totalPages: number } }>(
  '/api/patients', 
  { 
    default: () => ({ data: [], pagination: { page: 1, perPage: 10, total: 0, totalPages: 0 } }),
    query: {
      page: 1,
      perPage: 10
    }
  }
)

interface Patient {
  id: number
  user_id: number
  dob: string
  gender: string
  medical_history: string
  patient_name: string
}

const q = ref('')
const pagination = ref({
  page: 1,
  perPage: 10,
  totalPages: data.value?.pagination.totalPages || 0,
  total: data.value?.pagination.total || 0
})

const filteredPatients = computed(() => {
  if (!q.value) return data.value?.data || []
  return (data.value?.data || []).filter((patient) => {
    return patient.patient_name.toLowerCase().includes(q.value.toLowerCase()) || 
           patient.id.toString().includes(q.value)
  })
})

async function updatePagination(page: number) {
  pagination.value.page = page
  const { data: newData } = await useFetch<{ data: Patient[], pagination: { page: number, perPage: number, total: number, totalPages: number } }>(
    '/api/patients', 
    { 
      query: {
        page: page,
        perPage: pagination.value.perPage
      }
    }
  )
  
  if (newData.value) {
    data.value = newData.value
    pagination.value.totalPages = newData.value.pagination.totalPages
    pagination.value.total = newData.value.pagination.total
  }
}

</script>

<template>
  <div>
    <UPageCard
      title="Patients"
      description="Here you can see all the patients in the system."
      variant="naked"
      orientation="horizontal"
      class="mb-4"
    >
   
    </UPageCard>

    <UPageCard variant="subtle" :ui="{ container: 'p-0 sm:p-0 gap-y-0', wrapper: 'items-stretch', header: 'p-4 mb-0 border-b border-default' }">
      <template #header>
        <UInput
          v-model="q"
          icon="i-lucide-search"
          placeholder="Search patients"
          autofocus
          class="w-full"
        />
      </template>

      <SettingsPatientsList :patients="filteredPatients" />
    </UPageCard>
    
    <div class="flex justify-end mt-4 p-4">
      <UPagination
        :page="pagination.page"
        :items-per-page="pagination.perPage"
        :total="pagination.total"
        @update:page="updatePagination"
      />
    </div>
  </div>
</template>
