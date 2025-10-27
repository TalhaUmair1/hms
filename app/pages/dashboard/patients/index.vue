<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { navigateTo, useFetch } from '#app'
import { ref, computed, h, resolveComponent, onMounted } from 'vue'
import DeletePatients from '~/components/Patients/DeletePatients.vue'
import { canDeletePatients, canUpdatePatients } from '~~/shared/abilities/patients'


const UAvatar = resolveComponent('UAvatar')
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

type Patient = {
  id: number
  patient_name: string
  dob: string
  gender: string
  medical_history: string
  avatar?: { alt: string }
}

const isDeleteModalOpen = ref(false)
const selectedPatient = ref<Patient | null>(null)

// 🩺 Fetch patients
const { data: patients, status, refresh } = await useFetch<Patient[]>('/api/patients', {
  key: 'table-patients',
  transform: (data) =>
    data?.map((p) => ({
      ...p,
      avatar: { alt: `${p.name} avatar` },
    })) || [],
  lazy: true,
})
console.log('patients with namerrr',patients.value);

// 🔍 Search state
const search = ref('')

// 🔢 Computed filtered data (by ID)
const filteredPatients = computed(() => {
  if (!search.value) return patients.value || []
  return (patients.value || []).filter((p) =>
    p.name.toString().includes(search.value.trim())
  )
})
 // Resolve permission once and keep as boolean for UI bindings
 const canDelete = ref(true)
 const canUpdate = ref(true)
 onMounted(async () => {
   try {
     const deleteResult = await Promise.resolve(denies(canDeletePatients))
     canDelete.value = Boolean(deleteResult)
   } catch {
     canDelete.value = true
   }
   try {
     const updateResult = await Promise.resolve(denies(canUpdatePatients))
     canUpdate.value = Boolean(updateResult)
   } catch {
     canUpdate.value = true
   }
 })
// 🧩 Table columns
const columns =computed<TableColumn<Patient>[]>(() => [
  { accessorKey: 'id', header: 'ID' },
  {
    accessorKey: 'patient_name',
    header: 'Name',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-3' }, [
        h(UAvatar, { ...row.original.avatar, size: 'lg' }),
        h('div', undefined, [
          h('p', { class: 'font-medium text-highlighted' }, row.original.patient_name),
        ]),
      ]),
  },
  { accessorKey: 'dob', header: 'Date of Birth' },
  { accessorKey: 'gender', header: 'Gender' },
  { accessorKey: 'medical_history', header: 'Medical History' },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-3' }, [
        h(
          UDropdownMenu,
          {
            content: { align: 'end' },
            items: [
              {
                label: 'Details',
                icon: 'i-lucide-copy',
                onSelect: () => navigateTo(`/dashboard/patients/details/${row.original.id}`),
              },
              {
                label: 'Edit',
                icon: 'i-lucide-edit',
                disabled: canUpdate.value,
                onSelect: () => navigateTo(`/dashboard/patients/${row.original.id}`),
              },
              {
                label: 'Delete',
                icon: 'i-lucide-trash',
                color: 'error',
                disabled: canDelete.value,
                onSelect: () => {
                  selectedPatient.value = row.original
                  isDeleteModalOpen.value = true
                },
              },
            ],
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto',
            })
        ),
      ]),
  },
])
</script>

<template>
  <UDashboardPanel id="patients">
    <!-- 🧭 Header -->
    <template #header>
      <UDashboardNavbar title="Patients List">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <ULink
            to="/dashboard/patients/createPatients"
            class="bg-primary text-white px-3 py-1.5 rounded-md"
          >
            Create Patient
          </ULink>
        </template>
      </UDashboardNavbar>
    </template>

    <!-- 📄 Body -->
    <template #body>
      <UContainer class="flex flex-col">
        <div class="m-6">
          <UInput
            v-model="search"
            placeholder="Filter by Name"
            class="max-w-xs"
            icon="i-heroicons-magnifying-glass-20-solid"
            type="text"
          />
        </div>

        <!-- 🧾 Table -->
        <UTable
          :data="filteredPatients"
          :columns="columns"
          :loading="status === 'pending'"
          class="w-full"
        />
      </UContainer>

      <!-- 🗑 Delete Modal -->
      <DeletePatients
        v-if="selectedPatient"
        v-model:open="isDeleteModalOpen"
        :id="selectedPatient.id"
        @deleted="refresh"
      />
    </template>
  </UDashboardPanel>
</template>
