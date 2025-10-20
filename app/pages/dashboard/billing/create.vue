<template>
    <UDashboardPanel id="Create">
    <template #header>
      <UDashboardNavbar title="Bill">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <UDashboardToolbar>
        <template #left>
    
        </template>
      </UDashboardToolbar>
        <template #right>
        <UColorModeButton />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
   <CreateBill/>
    </template>
  </UDashboardPanel>
</template>

<script setup>
import CreateBill from '~/components/billing/CreateBill.vue'; 
</script>
