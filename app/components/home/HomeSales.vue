<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { navigateTo, useFetch } from '#app'
import { ref, computed, h, resolveComponent } from 'vue'


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
console.log(patients.value);

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
    accessorKey: 'dob',
    header: 'Date of Birth'
  },
  {
    accessorKey: 'gender',
    header: 'Gender'
  },
  {
    accessorKey: 'medical_history',
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

      <!-- Table -->
      <UTable
        :data="filteredPatients"
        :columns="columns"
        :loading="status === 'pending'"
        class="w-full"
      />
     </UContainer>
</template>




