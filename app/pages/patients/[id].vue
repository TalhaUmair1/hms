

<script setup>
import CreatePatient from '~/components/Patients/CreatePatient.vue';

const route = useRoute()
const id = route.params.id
console.log(id);



const { data, pending, error, refresh } = useFetch('/api/patients/' + id, {
  key: 'typicode-doctor',
  'method': 'GET',
  transform: (data) => ({ ...data, user: { id: data.user_id, name: data.name } }),
  lazy: true
})
console.log(data.value);
</script>


<template>
    <UDashboardPanel id="patients">
    <template #header>
      <UDashboardNavbar title="Patients">
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
    <div>
   <CreatePatient :patient="data" :key="data?.id" />
    </div>
    </template>
  </UDashboardPanel>
</template>

<script setup>

</script>


