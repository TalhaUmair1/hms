<template>
  <UDashboardPanel id="billing">
    <!-- 🧭 Header -->
    <template #header>
      <UDashboardNavbar title="Billing">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <Can
            :ability="canCreateBilling"
          >
          <ULink
            to="/dashboard/billing/create"
            class="bg-primary text-white px-3 py-1.5 rounded-md"
          >
            Create Bill
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
    placeholder="Filter by method"
    class="max-w-xs"
    icon="i-heroicons-magnifying-glass-20-solid"
    type="text"
  />
</div>

        <!-- 🧾 Table -->
        <UTable
          :data="filteredBills"
          :columns="columns"
          :loading="status === 'pending'"
          class="w-full"
        />
      </UContainer>

      <!-- 🗑 Delete Modal -->
      <DeleteBill
        v-if="selectedBill"
        v-model:open="isDeleteModalOpen"
        :id="selectedBill.id"
        @deleted="refresh"
      />
    </template>
  </UDashboardPanel>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { ref, computed, h, resolveComponent } from 'vue'
import { navigateTo, useFetch } from '#app'
import DeleteBill from '~/components/billing/DeleteBill.vue'
import { canCreateBilling,canUpdateBilling,canDeleteBilling } from '#shared/abilities/billing'




definePageMeta({
   middleware: 'auth'
})


// 🔗 Nuxt UI components
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

// 💰 Bill type
type Bill = {
  id: number
  appointment_id: number
  patient_id: number
  amount: number
  status: string
  payment_method: string
}

// 🗑 Delete Modal State
const isDeleteModalOpen = ref(false)
const selectedBill = ref<Bill | null>(null)

// 📦 Fetch bills
// const { data: bills, status, refresh } = useFetch<Bill[]>('/api/billing', {
//   key: 'table-billing',
//   lazy: true,
// })

// console.log(bills.value, 'Fetched bills')

const { user: currentUser } = useUserSession()

const { data: bills, status, refresh } = useFetch<Bill[]>(() => (currentUser.value as any)?.role === 'patient' ? '/api/billing/me' : '/api/billing', {
  key: 'table-billing',
  lazy: true,
  default: () => []
})
console.log(bills.value, 'Fetched bills');

// conditoins from shared abilities

const canDelete = ref(true)
 const canUpdate = ref(true)
 onMounted(async () => {
   try {
     const deleteResult = await Promise.resolve(denies(canDeleteBilling))
     canDelete.value = Boolean(deleteResult)
   } catch {
     canDelete.value = true
   }
   try {
     const updateResult = await Promise.resolve(denies(canUpdateBilling))
     canUpdate.value = Boolean(updateResult)
   } catch {
     canUpdate.value = true
   }
 })



// 🔍 Search
const search = ref('')

// 🔢 Filtered Data
const filteredBills = computed(() => {
  if (!search.value) return bills.value || []
  return (bills.value || []).filter((b) =>
    b.payment_method.toLowerCase().includes(search.value.trim().toLowerCase())
  )
})

// 🧩 Table Columns
const columns: TableColumn<Bill>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'date', header: 'Appointment Date' },
  { accessorKey: 'patient_name', header: 'Patient Name' },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => `Rs. ${row.original.amount.toFixed(2)}`,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) =>
      h(
        'span',
        {
          class: `px-2 py-1 rounded-full text-sm font-medium ${
            row.original.status === 'paid'
              ? 'bg-green-100 text-green-700'
              : row.original.status === 'pending'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-red-100 text-red-700'
          }`,
        },
        row.original.status.charAt(0).toUpperCase() +
          row.original.status.slice(1)
      ),
  },
  { accessorKey: 'payment_method', header: 'Payment Method' },
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
                onSelect: () => navigateTo(`/dashboard/billing/details/${row.original.id}`),
              },
              {
                label: 'Edit',
                icon: 'i-lucide-edit',
               
                 class: { 'hidden': canUpdate.value },
                onSelect: () => navigateTo(`/dashboard/billing/${row.original.id}`),
              },
              {
                label: 'Delete',
                icon: 'i-lucide-trash',
                color: 'error',
           
                class: { 'hidden': canDelete.value },
                onSelect: () => {
                  selectedBill.value = row.original
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
