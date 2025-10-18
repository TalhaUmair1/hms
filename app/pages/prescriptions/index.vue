<template>
  <UDashboardPanel id="Prescriptions">
    <!-- 🧭 Header -->
    <template #header>
      <UDashboardNavbar title="Prescriptions">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <ULink
            class="bg-primary px-2 py-1 text-white rounded-sm"
            to="/prescriptions/create"
          >
            Create Prescription
          </ULink>
        </template>
      </UDashboardNavbar>
    </template>

    <!-- 📄 Body -->
    <template #body>
      <UContainer class="flex flex-col">
        <!-- 🔍 Search -->
        <div class="m-6">
      <UInput
  v-model="search"
  placeholder="Search by medicine name"
  class="max-w-xs"
  icon="i-heroicons-magnifying-glass-20-solid"
  type="text"
/>
        </div>

        <!-- 🧾 Table -->
        <UTable
          :data="filteredPrescriptions"
          :columns="columns"
          :loading="status === 'pending'"
          class="w-full"
        />

        <!-- 🗑 Delete Modal -->
        <DeletePrescriptions
          v-if="selectedPrescription"
          v-model:open="isDeleteModalOpen"
          :id="selectedPrescription.id"
          @deleted="refresh"
        />
      </UContainer>
    </template>
  </UDashboardPanel>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { navigateTo, useFetch } from '#app'
import { ref, computed, h, resolveComponent } from 'vue'
import DeletePrescriptions from '~/components/prescriptions/DeletePrescriptions.vue'

/* -------------------------
  🧩 Register Nuxt UI components
------------------------- */
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

/* -------------------------
  🧠 Type Definition
------------------------- */
type Prescription = {
  id: number
  appointment_id: number
  doctor_id: number
  patient_id: number
  medicine_list: string
  notes: string
}

/* -------------------------
  🗑 Delete Modal
------------------------- */
const isDeleteModalOpen = ref(false)
const selectedPrescription = ref<Prescription | null>(null)

/* -------------------------
  📦 Fetch Prescriptions
------------------------- */
const { data: prescriptions, status, refresh } = useFetch<Prescription[]>(
  '/api/prescriptions',
  {
    key: 'table-prescriptions',
    lazy: true,
  },
)

/* -------------------------
  🔍 Search Functionality
------------------------- */
const search = ref('')

const filteredPrescriptions = computed(() => {
  if (!prescriptions.value) return []
  if (!search.value) return prescriptions.value

  const keyword = search.value.toLowerCase().trim()
  return prescriptions.value.filter((p) =>
    p.medicine_list.toLowerCase().includes(keyword)
  )
})

/* -------------------------
  📋 Table Columns
------------------------- */
const columns: TableColumn<Prescription>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'appointment_id', header: 'Appointment ID' },
  { accessorKey: 'doctor_id', header: 'Doctor ID' },
  { accessorKey: 'patient_id', header: 'Patient ID' },
  {
    accessorKey: 'medicine_list',
    header: 'Medicine List',
    cell: ({ row }) =>
      h(
        'div',
        { class: 'truncate max-w-[200px]' },
        row.original.medicine_list || '-',
      ),
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    cell: ({ row }) =>
      h(
        'div',
        { class: 'truncate max-w-[200px]' },
        row.original.notes || '-',
      ),
  },
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
                onSelect: () =>
                  navigateTo(`/prescriptions/detail/${row.original.id}`),
              },
              {
                label: 'Edit',
                icon: 'i-lucide-edit',
                onSelect: () =>
                  navigateTo(`/prescriptions/${row.original.id}`),
              },
              {
                label: 'Delete',
                icon: 'i-lucide-trash',
                color: 'error',
                onSelect: () => {
                  selectedPrescription.value = row.original
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
            }),
        ),
      ]),
  },
]
</script>
