<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { navigateTo, useFetch } from '#app'
import { ref, computed, h, resolveComponent } from 'vue'
import DoctorsDeleteModal from '~/components/doctors/DeleteModal.vue'
import { canUpdateDoctor, canDeleteDoctor, canCreateDoctor } from '#shared/abilities/doctors'

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


// conditoins from shared abilities

const canDelete = ref(true)
 const canUpdate = ref(true)
 onMounted(async () => {
   try {
     const deleteResult = await Promise.resolve(denies(canDeleteDoctor))
     canDelete.value = Boolean(deleteResult)
   } catch {
     canDelete.value = true
   }
   try {
     const updateResult = await Promise.resolve(denies(canUpdateDoctor))
     canUpdate.value = Boolean(updateResult)
   } catch {
     canUpdate.value = true
   }
 })
const table = useTemplateRef('table')
const pagination = ref({
  page: 1,
  perPage: 2
})
// fetch doctors
const { data, status, refresh } = await useFetch<{data:Doctor[], pagination: { page: number, perPage: number, total: number, totalPages: number } }>('/api/doctors', {
  key: 'table-doctors',
  query: {
    perPage: computed(() => pagination.value.perPage),
    page: computed(() => pagination.value.page)
  },
  transform: (data) => {
    return {
      data: data?.data.map((doc) => ({
          ...doc,
          avatar: { alt: `${doc.name} avatar` }
        })) || [],
      pagination: data?.pagination || { page: 1, perPage: 2, total: 0, totalPages: 0 }
    }
  },
  lazy: true
})
console.log(data.value)
// search state
const search = ref('')

// computed filtered data
const filteredDoctors = computed(() => {
  if (!search.value) return data.value?.data || []
  return (data.value?.data || []).filter((doc) =>
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
    accessorKey: 'specialization',
    header: 'Specialization'
  },
  {
    accessorKey: 'availability',
    header: 'Availability'
  },
  {
    accessorKey: 'fees',
    header: 'Fees'
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
                  navigateTo(`/dashboard/doctors/details/${row.original.id}`)
                },
              },
              {
                label: 'Edit',
                icon: 'i-lucide-edit',
                
                   class: { 'hidden': canUpdate.value },
                onSelect() {
                  navigateTo(`/dashboard/doctors/${row.original.id}`)
                },
              },
              {
                label: 'Delete',
                icon: 'i-lucide-trash',
                color: 'error',
              
                  class: { 'hidden': canDelete.value },
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
    <UDashboardPanel id="Doctors">
    <template #header>
      <UDashboardNavbar title="DoctorsList">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <UDashboardToolbar>
        <template #left>
    
        </template>
      </UDashboardToolbar>
        <template #right>

            <Can
    :ability="canCreateDoctor"
    
  >
             <ULink class="bg-primary px-2 py-1 text-white rounded-sm" to="/dashboard/doctors/create">
            Create Doctor
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
        placeholder="Search by name..."
        class="max-w-xs"
        icon="i-heroicons-magnifying-glass-20-solid"
      />
      </div>

      <!-- Table -->
      <UTable
       ref="table"
        :data="filteredDoctors"
        :columns="columns as any"
        :loading="status === 'pending'"
        class="w-full"
      />
        <div class="flex justify-end border-t border-default pt-4 px-4">
      <UPagination
        :page="pagination.page"
        :items-per-page="pagination.perPage"
        :total="data?.pagination?.total || 0"
        @update:page="(p: number) => pagination.page = p"
      />
    </div>
     </UContainer>
  
      <DoctorsDeleteModal
      v-if="selectedDoctor"
      v-model:open="isDeleteModalOpen"
      :id="selectedDoctor.id"
      @deleted="refresh"
    />
    </template>
  </UDashboardPanel>
</template>
