<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { navigateTo, useFetch } from '#app'
import { ref, computed, h, resolveComponent } from 'vue'
import DeleteOppointments from '~/components/appointments/DeleteOppointments.vue'


const UAvatar = resolveComponent('UAvatar')


const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

type Appointment = {
  id: number
  patient_id: number
  doctor_id: number
  date: string
  status: 'pending' | 'confirmed' | 'completed' | 'canceled'
}

// 🗑 Modal
const isDeleteModalOpen = ref(false)
const selectedAppointment = ref<Appointment | null>(null)

// 📦 Fetch appointments (moved inside onMounted or setup function)
const { data: appointments, status, refresh } = useFetch<Appointment[]>(
  '/api/oppointments',
  {
    key: 'table-appointments',
    lazy: true,
  },
)
console.log(appointments.value,"data is fetching");

// 🔍 Search
const search = ref('')

// 🔢 Filtered data
const filteredAppointments = computed(() => {
  if (!search.value) return appointments.value || []
  return (appointments.value || []).filter((a) =>
    a.id.toString().includes(search.value.trim())
  )
})

// 🧩 Table columns
const columns: TableColumn<Appointment>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'patient_id', header: 'Patient ID' },
  { accessorKey: 'doctor_id', header: 'Doctor ID' },
  { accessorKey: 'date', header: 'Date' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) =>
      h(
        'span',
        {
          class: `px-2 py-1 rounded-full text-sm font-medium ${
            row.original.status === 'confirmed'
              ? 'bg-green-100 text-green-700'
              : row.original.status === 'completed'
              ? 'bg-blue-100 text-blue-700'
              : row.original.status === 'canceled'
              ? 'bg-red-100 text-red-700'
              : 'bg-yellow-100 text-yellow-700'
          }`,
        },
        row.original.status
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
                onSelect: () => navigateTo(`/appointments/detail/${row.original.id}`),
              },
              {
                label: 'Edit',
                icon: 'i-lucide-edit',
                onSelect: () => navigateTo(`/appointments/${row.original.id}`),
              },
              {
                label: 'Delete',
                icon: 'i-lucide-trash',
                color: 'error',
                onSelect: () => {
                  selectedAppointment.value = row.original
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
]
</script>

<template>
  <UDashboardPanel id="appointments">
    <!-- 🧭 Header -->
    <template #header>
      <UDashboardNavbar title="Appointments List">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <ULink
            to="/appointments/create"
            class="bg-primary text-white px-3 py-1.5 rounded-md"
          >
            Create Appointment
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
            placeholder="Filter by ID"
            class="max-w-xs"
            icon="i-heroicons-magnifying-glass-20-solid"
            type="number"
          />
        </div>

        <!-- 🧾 Table -->
        <UTable
          :data="filteredAppointments"
          :columns="columns"
          :loading="status === 'pending'"
          class="w-full"
        />
      </UContainer>

      <!-- 🗑 Delete Modal -->
      <DeleteOppointments
        v-if="selectedAppointment"
        v-model:open="isDeleteModalOpen"
        :id="selectedAppointment.id"
        @deleted="refresh"
      />
    </template>
  </UDashboardPanel>
</template>
