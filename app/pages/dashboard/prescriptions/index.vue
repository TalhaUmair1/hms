<template>
  <UDashboardPanel id="Prescriptions">
    <template #header>
      <UDashboardNavbar title="Prescriptions">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
        <Can
            :ability="canCreatePrescription"
          >
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

        <!-- 📋 Table -->
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

const { data: prescriptions, status, refresh } = useFetch<Prescription[]>(
  () => (currentUser.value as any)?.role === 'patient' 
        ? `/api/prescriptions/me`
        : '/api/prescriptions',     
  {
    key: 'table-prescriptions2',
    lazy: true,
    default: () => [],
  }
)

console.log(prescriptions.value, 'Fetched prescriptions');
// conditoins from shared abilities

const canDelete = ref(true)
 const canUpdate = ref(true)
 onMounted(async () => {
   try {
     const deleteResult = await Promise.resolve(denies(canDeletePrescription))
     canDelete.value = Boolean(deleteResult)
   } catch {
     canDelete.value = true
   }
   try {
     const updateResult = await Promise.resolve(denies(canDeletePrescription))
     canUpdate.value = Boolean(updateResult)
   } catch {
     canUpdate.value = true
   }
 })



const search = ref('')

const filteredPrescriptions = computed(() => {
  if (!prescriptions.value) return []
  if (!search.value) return prescriptions.value

  const keyword = search.value?.toLowerCase().trim()
  return prescriptions.value?.filter((p) =>
    p.medicine_list?.toLowerCase().includes(keyword)
  )
})

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'completed':
      return 'primary'
    case 'cancelled':
      return 'error'
    case 'pending':
      return 'orange'
    default:
      return 'gray'
  }
}

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
