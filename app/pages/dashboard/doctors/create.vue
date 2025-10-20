<template>
    <UDashboardPanel id="CreateDoctor">
    <template #header>
      <UDashboardNavbar title="CreateDoctor">
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
     <CreateForm />
    </template>
  </UDashboardPanel>
</template>

<script setup>
import CreateForm from '~/components/doctors/CreateForm.vue'; 
</script>
