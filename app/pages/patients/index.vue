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
          <ULink to="/patients/createPatients" class=" font-semibold bg-primary px-2 py-1 text-white rounded-sm">Create Patient</ULink>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
  <Patients/>
    </template>
  </UDashboardPanel>
</template>

<script setup>
import Patients from '~/components/Patients/Patients.vue'; 
</script>
