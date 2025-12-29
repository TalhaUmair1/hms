<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { ref, computed, h, resolveComponent, onMounted } from 'vue'
import { navigateTo, useFetch } from '#app'
import DeleteBill from '~/components/billing/DeleteBill.vue'
import { canCreateBilling, canUpdateBilling, canDeleteBilling } from '#shared/abilities/billing'

definePageMeta({
  middleware: 'auth'
})

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
  date: string
  name: string
}

// 🗑 Delete Modal State
const isDeleteModalOpen = ref(false)
const selectedBill = ref<Bill | null>(null)

// 🔗 Current user
const { user: currentUser } = useUserSession()

/* ---------------- PAGINATION (Doctors style) ---------------- */
const pagination = ref({
  page: 1,
  perPage: 2
})

const { data, status, refresh } = await useFetch<{
  data: Bill[]
  pagination: {
    page: number
    perPage: number
    total: number
    totalPages: number
  }
}>(() => (currentUser.value as any)?.role === 'patient'
    ? '/api/billing/me'
    : '/api/billing', {
  key: 'table-billing',
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

// Permissions
const canDelete = ref(true)
const canUpdate = ref(true)
onMounted(async () => {
  try { canDelete.value = Boolean(await Promise.resolve(denies(canDeleteBilling))) } catch { canDelete.value = true }
  try { canUpdate.value = Boolean(await Promise.resolve(denies(canUpdateBilling))) } catch { canUpdate.value = true }
})

// 🔍 Search
const search = ref('')
const filteredBills = computed(() => {
  if (!data.value) return []
  if (!search.value) return data.value.data
  return data.value.data.filter((b) =>
    b.payment_method.toLowerCase().includes(search.value.trim().toLowerCase())
  )
})

// 🧩 Table Columns
const columns: TableColumn<Bill>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'date', header: 'Appointment Date' },
  { accessorKey: 'name', header: 'Patient Name' },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => `Rs. ${row.original.amount.toFixed(2)}`,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) =>
      h('span', {
        class: `px-2 py-1 rounded-full text-sm font-medium ${
          row.original.status === 'paid'
            ? 'bg-green-100 text-green-700'
            : row.original.status === 'pending'
            ? 'bg-yellow-100 text-yellow-700'
            : 'bg-red-100 text-red-700'
        }`,
      }, row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)),
  },
  { accessorKey: 'payment_method', header: 'Payment Method' },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-3' }, [
        h(UDropdownMenu, {
          content: { align: 'end' },
          items: [
            { label: 'Details', icon: 'i-lucide-copy', onSelect: () => navigateTo(`/dashboard/billing/details/${row.original.id}`) },
            { label: 'Edit', icon: 'i-lucide-edit', class: { 'hidden': canUpdate.value }, onSelect: () => navigateTo(`/dashboard/billing/${row.original.id}`) },
            { label: 'Delete', icon: 'i-lucide-trash', color: 'error', class: { 'hidden': canDelete.value }, onSelect: () => { selectedBill.value = row.original; isDeleteModalOpen.value = true } },
          ],
        }, () => h(UButton, { icon: 'i-lucide-ellipsis-vertical', color: 'neutral', variant: 'ghost', class: 'ml-auto' })),
      ]),
  },
]
</script>

<template>
  <UDashboardPanel id="billing">
    <template #header>
      <UDashboardNavbar title="Billing">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <Can :ability="canCreateBilling">
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

    <template #body>
      <UContainer class="flex flex-col">
        <div class="m-6">
          <UInput
            v-model="search"
            placeholder="Filter by method"
            class="max-w-xs"
            icon="i-heroicons-magnifying-glass-20-solid"
          />
        </div>

        <UTable
          :data="filteredBills"
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

        <DeleteBill
          v-if="selectedBill"
          v-model:open="isDeleteModalOpen"
          :id="selectedBill.id"
          @deleted="refresh"
        />
      </UContainer>
    </template>
  </UDashboardPanel>
</template>
