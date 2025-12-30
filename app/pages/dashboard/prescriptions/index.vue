<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { navigateTo, useFetch } from '#app'
import { ref, computed, h, resolveComponent, onMounted } from 'vue'
import DeletePrescriptions from '~/components/prescriptions/DeletePrescriptions.vue'
import { canCreatePrescription, canUpdatePrescription, canDeletePrescription } from '#shared/abilities/prescriptions'

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UBadge = resolveComponent('UBadge')

type Prescription = {
  id: number
  appointment_id: number
  doctor_id: number
  date: string
  status: string
  medicine_list: string
  notes: string
  patient_name?: string
  doctor_name?: string
}

const isDeleteModalOpen = ref(false)
const selectedPrescription = ref<Prescription | null>(null)

const { user: currentUser } = useUserSession()

/* ---------------- PAGINATION (Doctors jaisi) ---------------- */
const pagination = ref({
  page: 1,
  perPage: 2
})

const { data, status, refresh } = await useFetch<{
  data: Prescription[]
  pagination: {
    page: number
    perPage: number
    total: number
    totalPages: number
  }
}>(() => {
  const url = (currentUser.value as any)?.role === 'patient' ? `/api/prescriptions/me` : '/api/prescriptions'
  console.log('Prescriptions API URL:', url)
  return url
}, {
  key: 'table-prescriptions2',
  query: {
    page: computed(() => pagination.value.page),
    perPage: computed(() => pagination.value.perPage)
  },
  transform: (data) => ({
    data: data?.data || [],
    pagination: data?.pagination || { page: 1, perPage: 2, total: 0, totalPages: 0 }
  }),
  lazy: true,
})
/* ------------------------------------------------------------ */

const search = ref('')

const filteredPrescriptions = computed(() => {
  if (!data.value) return []
  if (!search.value) return data.value.data
  const keyword = search.value?.toLowerCase().trim()
  return data.value.data.filter((p) =>
    p.medicine_list?.toLowerCase().includes(keyword)
  )
})

// Permissions
const canDelete = ref(true)
const canUpdate = ref(true)
onMounted(async () => {
  try {
    canDelete.value = Boolean(await Promise.resolve(denies(canDeletePrescription)))
  } catch {
    canDelete.value = true
  }
  try {
    canUpdate.value = Boolean(await Promise.resolve(denies(canUpdatePrescription)))
  } catch {
    canUpdate.value = true
  }
})

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'completed': return 'primary'
    case 'cancelled': return 'error'
    case 'pending': return 'orange'
    default: return 'gray'
  }
}

// Columns (UNCHANGED)
const columns: TableColumn<Prescription>[] = [
  { accessorKey: 'id', header: 'ID' },
  {
    accessorKey: 'date',
    header: 'Appointment',
    cell: ({ row }) => {
      const item = row.original
      return h('div', { class: 'flex items-center gap-3' }, [
        h('div', undefined, [
          h('p', { class: 'font-medium text-highlighted' }, item.date || '—'),
          h(
            UBadge,
            {
              label: item.status,
              color: getStatusColor(item.status),
              variant: 'subtle',
              class: 'mt-1 w-fit text-xs capitalize',
            },
            {},
          ),
        ]),
      ])
    },
  },
  { accessorKey: 'patient_name', header: 'Patient Name' },
  { accessorKey: 'doctor_name', header: 'Doctor Name' },
  {
    accessorKey: 'medicine_list',
    header: 'Medicine List',
    cell: ({ row }) => h('div', { class: 'truncate max-w-[200px]' }, row.original.medicine_list || '-'),
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    cell: ({ row }) => h('div', { class: 'truncate max-w-[200px]' }, row.original.notes || '-'),
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
                  navigateTo(`/dashboard/prescriptions/details/${row.original.id}`),
              },
              {
                label: 'Edit',
                icon: 'i-lucide-edit',
                class: { 'hidden': canUpdate.value },
                onSelect: () =>
                  navigateTo(`/dashboard/prescriptions/${row.original.id}`),
              },
              {
                label: 'Delete',
                icon: 'i-lucide-trash',
                color: 'error',
                class: { 'hidden': canDelete.value },
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

<template>
  <UDashboardPanel id="Prescriptions">
    <template #header>
      <UDashboardNavbar title="Prescriptions">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <Can :ability="canCreatePrescription">
            <ULink
              class="bg-primary px-2 py-1 text-white rounded-sm"
              to="/dashboard/prescriptions/create"
            >
              Create Prescription
            </ULink>
          </Can>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UContainer class="flex flex-col">
        <div class="m-6">
          <UInput
            v-model="search"
            placeholder="Search by medicine name"
            class="max-w-xs"
            icon="i-heroicons-magnifying-glass-20-solid"
          />
        </div>

        <UTable
          :data="filteredPrescriptions"
          :columns="columns"
          :loading="status === 'pending'"
          class="w-full"
        />

        <div class="flex justify-end border-t pt-4 px-4">
          <UPagination
            :page="pagination.page"
            :items-per-page="pagination.perPage"
            :total="data?.pagination?.total || 0"
            @update:page="(p) => pagination.page = p"
          />
        </div>

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
