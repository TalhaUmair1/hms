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
  <CreatePharmacy/>
    </template>
  </UDashboardPanel>
</template>

<script setup>
import CreatePharmacy from '~/components/pharmacy/CreatePharmacy.vue'; 
</script>
