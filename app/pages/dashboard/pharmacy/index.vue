<template>
  <UDashboardPanel id="pharmacy">
  
    <template #header>
      <UDashboardNavbar title="Pharmacy">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <UDashboardToolbar>
          <template #left></template>
        </UDashboardToolbar>

        <template #right>
        
          
                              <Can
    :ability="canCreatePharmacy"
    
  >
     <ULink
            to="/dashboard/pharmacy/create"
            class="bg-primary px-3 py-1.5 text-white rounded-md"
          >
            Create Pharmacy
          </ULink>        
  </Can>
        </template>
      </UDashboardNavbar>
    </template>

    <!-- 📦 Body -->
    <template #body>
      <UContainer class="flex flex-col">
        <!-- 🔍 Search -->
        <div class="m-6">
          <UInput
            v-model="search"
            placeholder="Filter by Name"
            class="max-w-xs"
            icon="i-heroicons-magnifying-glass-20-solid"
            type="text"
          />
        </div>

        <!-- 💊 Table -->
        <UTable
          :data="filteredPharmacy"
          :columns="columns"
          :loading="status === 'pending'"
          class="w-full"
        />

        <!-- 🗑 Delete Modal -->
        <DeletePharmacy
          v-if="selectedPharmacy"
          v-model:open="isDeleteModalOpen"
          :id="selectedPharmacy.id"
          @deleted="refresh"
        />
      </UContainer>
    </template>
  </UDashboardPanel>
</template>

<script setup lang="ts">
import { ref, computed, h, resolveComponent } from 'vue'
import { navigateTo, useFetch } from '#app'
import type { TableColumn } from '@nuxt/ui'
import DeletePharmacy from '~/components/pharmacy/DeletePharmacy.vue'
import { canCreatePharmacy } from '#shared/abilities/pharmacy'

// Nuxt UI components
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

// 💊 Pharmacy type (based on your schema)
type Pharmacy = {
  id: number
  name: string
  quantity: number
  price: number
  expiry_date: string | null
}

// 🗑 Delete modal state
const isDeleteModalOpen = ref(false)
const selectedPharmacy = ref<Pharmacy | null>(null)

// 📦 Fetch pharmacies
const { data: pharmacy, status, refresh } = useFetch<Pharmacy[]>('/api/pharmacy', {
  key: 'table-pharmacy',
  lazy: true,
})
console.log(pharmacy.value);

// 🔍 Search
const search = ref('')

// 🔢 Filtered Data
const filteredPharmacy = computed(() => {
  if (!search.value) return pharmacy.value || []
  return (pharmacy.value || []).filter((p) =>
    p.name.toLowerCase().includes(search.value.trim().toLowerCase())
  )
})

// 🧩 Table Columns
const columns: TableColumn<Pharmacy>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'quantity', header: 'Quantity' },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => `Rs. ${row.original.price.toFixed(2)}`,
  },
  {
    accessorKey: 'expiryDate',
    header: 'Expiry Date',
    cell: ({ row }) =>
      row.original.expiry_date
        ? new Date(row.original.expiry_date).toLocaleDateString()
        : 'N/A',
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
                onSelect: () => navigateTo(`/dashboard/pharmacy/details/${row.original.id}`),
              },
              {
                label: 'Edit',
                icon: 'i-lucide-edit',
                onSelect: () => navigateTo(`/dashboard/pharmacy/${row.original.id}`),
              },
              {
                label: 'Delete',
                icon: 'i-lucide-trash',
                color: 'error',
                onSelect: () => {
                  selectedPharmacy.value = row.original
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
