<template>
    <UDashboardPanel id="Create">
    <template #header>
      <UDashboardNavbar title="Create Appointments">
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
       <CreateAppointments/>
    </template>
  </UDashboardPanel>
</template>

<script setup>
import CreateAppointments from '~/components/appointments/CreateAppoinment.vue'; 
</script>
