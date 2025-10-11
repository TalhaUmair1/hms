<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { useRouter } from 'vue-router'
import { h, resolveComponent } from 'vue'

const UDropdownMenu = resolveComponent('UDropdownMenu')
const UButton = resolveComponent('UButton')
const router = useRouter()

type MedicalRecord = {
  id: number
  user_id: number
  dob: string
  gender: string
  medical_history: string
}

// 🧠 Mock data — replace with your real API call
const { data, status } = await useFetch<MedicalRecord[]>('/api/patients', {
  key: 'medical-records',
  lazy: true,
  default: () => [
    {
      id: 1,
      user_id: 10,
      dob: '1990-03-15',
      gender: 'Male',
      medical_history: 'Allergic to penicillin'
    },
    {
      id: 2,
      user_id: 12,
      dob: '1995-07-22',
      gender: 'Female',
      medical_history: 'Diabetic, under control'
    }
  ]
})

// 🧱 Table columns
const columns: TableColumn<MedicalRecord>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'user_id', header: 'User ID' },
  { accessorKey: 'dob', header: 'Date of Birth' },
  { accessorKey: 'gender', header: 'Gender' },
  {
    accessorKey: 'medical_history',
    header: 'Medical History',
    cell: ({ row }) =>
      h('span', { class: 'truncate block max-w-[180px]' }, row.original.medical_history)
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) =>
      h(
        UDropdownMenu,
        {
          items: [
            [
              {
                label: 'View Details',
                icon: 'i-heroicons-eye',
                click: () => router.push(`/records/${row.original.id}`)
              },
              {
                label: 'Edit Record',
                icon: 'i-heroicons-pencil-square',
                click: () => router.push(`/records/${row.original.id}/edit`)
              }
            ]
          ],
          class: 'flex justify-center'
        },
        {
          default: () =>
            h(
              UButton,
              {
                icon: 'i-heroicons-ellipsis-vertical',
                variant: 'ghost',
                size: 'sm'
              },
              {}
            )
        }
      )
  }
]
</script>

<template>
  <div class="p-6">
    <UTable
      :data="data"
      :columns="columns"
      :loading="status === 'pending'"
      class="w-full "
    />
  </div>
</template>
