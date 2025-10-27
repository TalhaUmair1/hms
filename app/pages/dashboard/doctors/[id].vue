

<script setup>
const route = useRoute()
const id = route.params.id
console.log(id);



const { data, pending, error, refresh } = useFetch('/api/doctors/' + id, {
  key: 'typicode-doctor',
  'method': 'GET',
  transform: (data) => ({ ...data, user: { id: data.user_id, name: data.name } }),
  lazy: true
})
console.log('appointment data',data.value);
</script>


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
    <div>
   <doctors-create-form :doctor="data" :key="data?.id" />
    </div>
    </template>
  </UDashboardPanel>
</template>

<script setup>

</script>


