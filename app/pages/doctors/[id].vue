<template>
    <div>
   <doctors-create-form />
    </div>
</template>

<script setup>
const route = useRoute()
const id = route.params.id
console.log(id);



const { data: doctor, pending, error, refresh } = useFetch('/api/doctors/' + id, {
  key: 'typicode-doctor',
  'method': 'GET',
  lazy: true
})
console.log(doctor);

</script>

