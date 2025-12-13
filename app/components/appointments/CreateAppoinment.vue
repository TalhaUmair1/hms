<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { reactive, computed } from 'vue'
import { useFetch } from '#app'
import { useToast } from '#imports'

const props = defineProps({
  appointment: {
    type: Object,
    default: () => null
  }
})


const { user: currentUser } = useUserSession()
const patients = ref([])
const loadingPatients = ref(false)
console.log('currentUser',currentUser);
// @ts-ignore
if(currentUser.value?.role === 'patient')
 {
    patients.value = [currentUser.value as never]
 }
 else{
  // ✅ Fetch patients and transform data
const { data, pending } = useFetch('/api/patients', {
  key: 'patients-list',
  lazy: true
})
loadingPatients.value = pending as unknown as boolean
patients.value = (data.value as any) || []
 }




// ✅ Fetch doctors (no change)
const { data: doctors, pending: loadingDoctors } = useFetch('/api/doctors', {
  key: 'doctors-list',
  lazy: true
})

// ✅ Validation schema
const schema = z.object({
  patient_id: z.coerce.number().min(1, 'Patient is required'),
  doctor_id: z.coerce.number().min(1, 'Doctor is required'),
  date: z.string().min(1, 'Date is required'),
  status: z.enum(['pending', 'confirmed', 'completed', 'canceled']),
  id: z.number().optional()
})
type Schema = z.output<typeof schema>

// ✅ Initial state
const initialState: Partial<Schema> = {
  patient_id: undefined,
  doctor_id: undefined,
  date: undefined,
  status: 'pending',
  id: undefined
}

const state = reactive<Partial<Schema>>({
  ...initialState,
  ...props.appointment,
  status: props.appointment?.status || 'pending'
})

const toast = useToast()

// ✅ Submit handler
async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log('🟡 Submitted data:', event.data)

  const url = state.id ? `/api/oppointments/${state.id}` : '/api/oppointments'
  const method = state.id ? 'PUT' : 'POST'

  const { error } = await useFetch(url, { method, body: event.data })

  if (error.value) {
    toast.add({ title: 'Error', description: error.value.message })
  } else {
    toast.add({
      title: state.id ? 'Updated' : 'Created',
      description: `Appointment ${state.id ? 'updated' : 'created'} successfully!`
    })
  }

  Object.assign(state, initialState)
}

// ✅ Reset form
const resetForm = () => Object.assign(state, initialState)

// ✅ Status options
const statuses = ['pending', 'confirmed', 'completed', 'canceled']
</script>


<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="w-full max-w-md p-8">
      <h1 class="text-2xl font-bold mb-6 text-center">
        {{ state.id ? 'Edit Appointment' : 'Create Appointment' }}
      </h1>

      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <!-- Patient -->
        <UFormField label="Patient" name="patient_id">
          <USelectMenu
            v-model="state.patient_id"
            :items="patients"
          value-key="id"
            label-key="name"
            :loading="loadingPatients"
            placeholder="Select patient"
            class="w-full"
            size="xl"
          />
        </UFormField>

        <!-- Doctor -->
        <UFormField label="Doctor" name="doctor_id">
          <USelectMenu
            v-model="state.doctor_id"
            :items="doctors"
            value-key="id"
            label-key="name"
            :loading="loadingDoctors"
            placeholder="Select doctor"
            class="w-full"
            size="xl"
          />
        </UFormField>

        <!-- Date -->
        <UFormField label="Date" name="date">
          <UInput v-model="state.date" type="date" size="xl" class="w-full" />
        </UFormField>

        <!-- ✅ Status -->
        <UFormField label="Status" name="status">
          <USelectMenu
            v-model="state.status"
            :items="statuses"
            placeholder="Select status"
            class="w-full"
            size="xl"
          >
            <template #option="{ option }">
              <span class="capitalize">{{ option }}</span>
            </template>
            <template #label>
              <span class="capitalize">{{ state.status || 'Select status' }}</span>
            </template>
          </USelectMenu>
        </UFormField>

        <!-- Buttons -->
        <div class="flex justify-end gap-3 pt-4">
          <UButton label="Reset" color="error" variant="ghost" @click="resetForm" />
          <UButton
            :label="state.id ? 'Update Appointment' : 'Create Appointment'"
            type="submit"
            size="lg"
          />
        </div>
      </UForm>
    </div>
  </div>
</template>
