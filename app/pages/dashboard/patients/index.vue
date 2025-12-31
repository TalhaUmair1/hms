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

/* ---------------- PAGINATION (Doctors jaisi) ---------------- */
const pagination = ref({
  page: 1,
  perPage: 2
})
const { user: currentUser } = useUserSession() as {
  user: Ref<{ id?: number, name?: string, email?: string, role?: string } | null>
}
const { data, status, refresh } = await useFetch<{
  data: Patient[]
  pagination: {
    page: number
    perPage: number
    total: number
    totalPages: number
  }
}>(() => {
  // Dynamic URL based on user role (example, adjust if needed)
  const url = (currentUser?.value as any)?.role === 'patient' 
    ? `/api/patients/me` 
    : '/api/patients'

  console.log('Patients dfsd API fetched:', url)
  return url
}, {
  key: 'table-patients',
  query: {
    page: computed(() => pagination.value.page),
    perPage: computed(() => pagination.value.perPage)
  },
  transform: (data) => ({
    data: data?.data.map((p) => ({
      ...p,
      avatar: { alt: `${p.patient_name} avatar` }
    })) || [],
    pagination: data?.pagination || { page: 1, perPage: 2, total: 0, totalPages: 0 }
  }),
  lazy: true,
})

/* ------------------------------------------------------------ */

// 🔍 Search
const search = ref('')

const filteredPatients = computed(() => {
  if (!search.value) return data.value?.data || []
  return (data.value?.data || []).filter((p) =>
    p.patient_name.toLowerCase().includes(search.value.toLowerCase())
  )
})

// Permissions
const canDelete = ref(true)
const canUpdate = ref(true)

onMounted(async () => {
  try {
    canDelete.value = Boolean(await Promise.resolve(denies(canDeletePatients)))
  } catch {
    canDelete.value = true
  }

  try {
    canUpdate.value = Boolean(await Promise.resolve(denies(canUpdatePatients)))
  } catch {
    canUpdate.value = true
  }
})

const truncateWords = (text: string, limit = 5) => {
  if (!text) return ''
  const words = text.split(' ')
  return words.length > limit
    ? words.slice(0, limit).join(' ') + '...'
    : text
}

// Columns (UNCHANGED)
const columns = computed<TableColumn<Patient>[]>(() => [
  { accessorKey: 'id', header: 'ID' },
  {
    accessorKey: 'patient_name',
    header: 'Name',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-3' }, [
        h(UAvatar, { ...row.original.avatar, size: 'lg' }),
        h('p', { class: 'font-medium text-highlighted' }, row.original.patient_name),
      ]),
  },
  { accessorKey: 'dob', header: 'Date of Birth' },
  { accessorKey: 'gender', header: 'Gender' },
  {
    accessorKey: 'medical_history',
    header: 'Medical History',
    cell: ({ row }) =>
      h('p', { class: 'text-sm text-muted' }, truncateWords(row.original.medical_history)),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) =>
      h(UDropdownMenu, {
        content: { align: 'end' },
        items: [
          {
            label: 'Details',
            onSelect: () => navigateTo(`/dashboard/patients/details/${row.original.id}`),
          },
          {
            label: 'Edit',
            disabled: canUpdate.value,
            onSelect: () => navigateTo(`/dashboard/patients/${row.original.id}`),
          },
          {
            label: 'Delete',
            color: 'error',
            disabled: canDelete.value,
            onSelect: () => {
              selectedPatient.value = row.original
              isDeleteModalOpen.value = true
            },
          },
        ],
      }, () =>
        h(UButton, {
          icon: 'i-lucide-ellipsis-vertical',
          variant: 'ghost',
          color: 'neutral',
        })
      ),
  },
])
</script>

<template>
  <UDashboardPanel id="patients">
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

    <template #body>
      <UContainer class="flex flex-col">
        <div class="m-6">
          <UInput
            v-model="search"
            placeholder="Filter by Name"
            class="max-w-xs"
            icon="i-heroicons-magnifying-glass-20-solid"
          />
        </div>

        <UTable
          :data="filteredPatients"
          :columns="columns"
          :loading="status === 'pending'"
        />

        <div class="flex justify-end border-t pt-4 px-4">
          <UPagination
            :page="pagination.page"
            :items-per-page="pagination.perPage"
            :total="data?.pagination?.total || 0"
            @update:page="(p) => pagination.page = p"
          />
        </div>
      </UContainer>

      <DeletePatients
        v-if="selectedPatient"
        v-model:open="isDeleteModalOpen"
        :id="selectedPatient.id"
        @deleted="refresh"
      />
    </template>
  </UDashboardPanel>
</template>
