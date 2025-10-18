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
        <ULink to="/billing/create" class="bg-primary text-white px-3 py-1.5 rounded-md">
            Create Bill
          </ULink>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
    hello
    </template>
  </UDashboardPanel>
</template>

<script setup>

</script>
