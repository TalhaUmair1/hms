<template>
    <UDashboardPanel id="customers">
    <template #header>
      <UDashboardNavbar title="Customers">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <UDashboardToolbar>
        <template #left>
    
        </template>
      </UDashboardToolbar>
        <template #right>
          <CustomersAddModal />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
     <CreateForm />
    </template>
  </UDashboardPanel>
</template>

<script setup>
import CreateForm from '~/components/doctors/CreateForm.vue';

           
</script>
