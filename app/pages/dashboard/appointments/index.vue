<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { navigateTo, useFetch } from "#app";
import { ref, computed, h, resolveComponent } from "vue";
import DeleteOppointments from "~/components/appointments/DeleteOppointments.vue";
import { canCreateappointments } from "#shared/abilities/appointments";

const UAvatar = resolveComponent("UAvatar");
const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");

type Appointment = {
  id: number;
  patient_id: number;
  doctor_id: number;
  date: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
  patient_name: string;
  doctor_name: string;
};

/* ---------------- PAGINATION (Doctors jaisi) ---------------- */
const pagination = ref({
  page: 1,
  perPage: 10,
});

const { data, status, refresh } = await useFetch<{
  data: Appointment[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}>("/api/appointments", {
  key: "table-appointments",
  query: {
    page: computed(() => pagination.value.page),
    perPage: computed(() => pagination.value.perPage),
  },
  transform: (data) => ({
    data: data?.data || [],
    pagination: data?.pagination || { page: 1, perPage: 10, total: 0, totalPages: 0 },
  }),
  lazy: true,
});
/* ------------------------------------------------------------ */

// 🔍 Search
const search = ref("");

const filteredAppointments = computed(() => {
  if (!search.value) return data.value?.data || [];
  return (data.value?.data || []).filter(
    (a) =>
      a.patient_name?.toLowerCase().includes(search.value.toLowerCase()) ||
      a.doctor_name?.toLowerCase().includes(search.value.toLowerCase())
  );
});

// Columns (UNCHANGED)
const columns: TableColumn<Appointment>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "patient_name", header: "Patient Name" },
  { accessorKey: "doctor_name", header: "Doctor Name" },
  { accessorKey: "date", header: "Date" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      h(
        "span",
        {
          class: `px-2 py-1 rounded-full text-sm font-medium ${
            row.original.status === "confirmed"
              ? "bg-green-100 text-green-700"
              : row.original.status === "completed"
              ? "bg-blue-100 text-blue-700"
              : row.original.status === "canceled"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`,
        },
        row.original.status
      ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) =>
      h("div", { class: "flex items-center gap-3" }, [
        h(
          UDropdownMenu,
          {
            content: { align: "end" },
            items: [
              {
                label: "Details",
                icon: "i-lucide-copy",
                onSelect: () =>
                  navigateTo(`/dashboard/appointments/detail/${row.original.id}`),
              },
              {
                label: "Edit",
                icon: "i-lucide-edit",
                onSelect: () => navigateTo(`/dashboard/appointments/${row.original.id}`),
              },
              {
                label: "Delete",
                icon: "i-lucide-trash",
                color: "error",
                onSelect: () => {
                  selectedAppointment.value = row.original;
                  isDeleteModalOpen.value = true;
                },
              },
            ],
          },
          () =>
            h(UButton, {
              icon: "i-lucide-ellipsis-vertical",
              color: "neutral",
              variant: "ghost",
              class: "ml-auto",
            })
        ),
      ]),
  },
];
</script>

<template>
  <UDashboardPanel id="appointments">
    <!-- Header -->
    <template #header>
      <UDashboardNavbar title="Appointments List">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
        <template #right>
          <Can :ability="canCreateappointments">
            <ULink
              to="/dashboard/appointments/create"
              class="bg-primary text-white px-3 py-1.5 rounded-md"
            >
              Create Appointment
            </ULink>
          </Can>
        </template>
      </UDashboardNavbar>
    </template>

    <!-- Body -->
    <template #body>
      <UContainer class="flex flex-col">
        <div class="m-6">
          <UInput
            v-model="search"
            placeholder="Filter by name..."
            class="max-w-xs"
            icon="i-heroicons-magnifying-glass-20-solid"
          />
        </div>

        <UTable
          :data="filteredAppointments"
          :columns="columns"
          :loading="status === 'pending'"
          class="w-full"
        />

        <div class="flex justify-end border-t pt-4 px-4">
          <UPagination
            :page="pagination.page"
            :items-per-page="pagination.perPage"
            :total="data?.pagination?.total || 0"
            @update:page="(p) => (pagination.page = p)"
          />
        </div>
      </UContainer>

      <DeleteOppointments
        v-if="selectedAppointment"
        v-model:open="isDeleteModalOpen"
        :id="selectedAppointment.id"
        @deleted="refresh"
      />
    </template>
  </UDashboardPanel>
</template>
