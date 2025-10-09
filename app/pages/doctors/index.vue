<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { navigateTo, useFetch } from '#app'
import { ref, computed, h, resolveComponent } from 'vue'
import DoctorsDeleteModal from '~/components/doctors/DeleteModal.vue'

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

// fetch doctors
const { data: doctors, status, refresh } = await useFetch<Doctor[]>('/api/doctors', {
  key: 'table-doctors',
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
const filteredDoctors = computed(() => {
  if (!search.value) return doctors.value || []
  return (doctors.value || []).filter((doc) =>
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
                  navigateTo(`/doctors/details/${row.original.id}`)
                },
              },
              {
                label: 'Edit',
                icon: 'i-lucide-edit',
                onSelect() {
                  navigateTo(`/doctors/${row.original.id}`)
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
        :data="filteredDoctors"
        :columns="columns"
        :loading="status === 'pending'"
        class="w-full"
      />
     </UContainer>
  
      <DoctorsDeleteModal
      v-if="selectedDoctor"
      v-model:open="isDeleteModalOpen"
      :id="selectedDoctor.id"
      @deleted="refresh"
    />

</template>

