

<script setup>
import CreateAppoinment from '~/components/appointments/CreateAppoinment.vue';

const route = useRoute()
const id = route.params.id
console.log(id);



const { data, pending, error, refresh } = useFetch('/api/oppointments/' + id, {
  key: 'typicode-doctor',
  'method': 'GET',
  transform: (data) => ({ ...data, patient: { id: data.patient_id, name: data.patient_name }, doctor: { id: data.doctor_id, name: data.doctor_name } }),
  lazy: true
})
console.log('this is data',data.value);
</script>


<template>
    <UDashboardPanel id="customers">
    <template #header>
      <UDashboardNavbar title="Edit Appointment">
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
   <CreateAppoinment :appointment="data" :key="data?.id" />
    </div>
    </template>
  </UDashboardPanel>
</template>

<script setup>

</script>


