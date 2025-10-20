


<template>
    <UDashboardPanel id="CreatePatients">
    <template #header>
      <UDashboardNavbar title="CreatePatients">
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
     <CreatePatient/>
    </template>
  </UDashboardPanel>
</template>

<script setup>
import CreatePatient from '~/components/Patients/CreatePatient.vue'; 
</script>

