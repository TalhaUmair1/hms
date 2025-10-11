<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { navigateTo, useFetch } from '#app'
import { ref, computed, h, resolveComponent } from 'vue'
import patientsDeleteModal from '~/components/patients/DeleteModal.vue'

const UAvatar = resolveComponent('UAvatar')
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

type Doctor = {
  id: number
  name: string
  email: string
  specialization: string
  availability: string
  fees: number
  avatar?: { alt: string }
}

const isDeleteModalOpen = ref(false)
const selectedDoctor = ref<Doctor | null>(null)

// fetch patients
const { data: patients, status, refresh } = await useFetch<Doctor[]>('/api/patients', {
  key: 'table-patients',
  transform: (data) => {
    return (
      data?.map((doc) => ({
        ...doc,
        avatar: { alt: `${doc.name} avatar` }
      })) || []
    )
  },
  lazy: true
})

// search state
const search = ref('')

// computed filtered data
const filteredPatients = computed(() => {
  if (!search.value) return patients.value || []
  return (patients.value || []).filter((doc) =>
    doc.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

const columns: TableColumn<Doctor>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-3' }, [
        h(UAvatar, {
          ...row.original.avatar,
          size: 'lg'
        }),
        h('div', undefined, [
          h('p', { class: 'font-medium text-highlighted' }, row.original.name)
        ])
      ])
    }
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'dob',
    header: 'Date of Birth'
  },
  {
    accessorKey: 'gender',
    header: 'Gender'
  },
  {
    accessorKey: 'madical_history',
    header: 'Madical History'
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-3' },
        h(
          UDropdownMenu,
          {
            content: {
              align: 'end'
            },
            items: [
              {
                label: 'Details',
                icon: 'i-lucide-copy',
                onSelect() {
                  navigateTo(`/patients/details/${row.original.id}`)
                },
              },
              {
                label: 'Edit',
                icon: 'i-lucide-edit',
                onSelect() {
                  navigateTo(`/patients/${row.original.id}`)
                },
              },
              {
                label: 'Delete',
                icon: 'i-lucide-trash',
                color: 'error',
                onSelect() {
                  selectedDoctor.value = row.original
                  isDeleteModalOpen.value = true
                },
              },
            ]
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto'
            })
        )
      )
  }
]
</script>
<template>
    <UDashboardPanel id="patients">
    <template #header>
      <UDashboardNavbar title="patientsList">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <UDashboardToolbar>
        <template #left>
    
        </template>
      </UDashboardToolbar>
        <template #right>
         <ULink class="bg-primary px-2 py-1 text-white rounded-sm" to="/patients/createPatients">
            Create Patients
          </ULink>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
  <UContainer class="flex flex-col">
 <div class="m-6">
        <UInput
        v-model="search"
        placeholder="Search by name..."
        class="max-w-xs"
        icon="i-heroicons-magnifying-glass-20-solid"
      />
      </div>

      <!-- Table -->
      <UTable
        :data="filteredPatients"
        :columns="columns"
        :loading="status === 'pending'"
        class="w-full"
      />
     </UContainer>
  
      <patientsDeleteModal
      v-if="selectedDoctor"
      v-model:open="isDeleteModalOpen"
      :id="selectedDoctor.id"
      @deleted="refresh"
    />
    </template>
  </UDashboardPanel>
</template>




