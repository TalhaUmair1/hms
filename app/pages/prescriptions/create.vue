
<template>
    <UDashboardPanel id="CreatePrescriptions">
    <template #header>
      <UDashboardNavbar title="Prescriptions">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <UDashboardToolbar>
        <template #left>
    
        </template>
      </UDashboardToolbar>
        <template #right>
        <u-color-mode-button/>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
   <CreatePrescriptions/>
    </template>
  </UDashboardPanel>
</template>

<script setup>
import CreatePrescriptions from '~/components/prescriptions/CreatePrescriptions.vue'; 
</script>

