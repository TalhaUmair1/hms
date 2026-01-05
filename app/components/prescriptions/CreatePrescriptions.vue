<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { reactive, ref } from 'vue'
import { useFetch } from '#app'
import { useToast } from '#imports'
import { refDebounced } from '@vueuse/core'
import type { prescriptions } from '~~/server/database/schema'

const props = defineProps({
  prescriptions: { // renamed for clarity
    type: Object,
    default: null
  }
})

// ✅ Search terms
const searchTermPatient = ref('')
const searchTermPatientDebounced = refDebounced(searchTermPatient, 200)
const searchTermDoctor = ref('')
const searchTermDoctorDebounced = refDebounced(searchTermDoctor, 200)
const searchTermAppointment = ref('')
const searchTermAppointmentDebounced = refDebounced(searchTermAppointment, 200)

// ✅ Fetch lists (for selection)
const { data: patients, pending: loadingPatients } = useFetch('/api/patients', {
  key: 'patients-list',
  lazy: true,
  params: {
    q: searchTermPatientDebounced
  },
  transform: (res: any) => res.data || []
})
// console.log(patients,'patients in prescription');



const { data: doctors, pending: loadingDoctors } = useFetch('/api/doctors', {
  key: 'table-doctors',
  lazy: true,
  params: {
    q: searchTermDoctorDebounced
  }
})

const { data: appointments, pending: loadingAppointments } =  useFetch('/api/appointments', {
  key: 'appointments-list',
  lazy: true,
  params: {
    q: searchTermAppointmentDebounced
  },
  transform: (res: any) => (res.data || []).map((item: any) => ({ ...item, label: `#${item.id} - ${item.patient_name} - ${item.date}` }))
})
// console.log(appointments,'appointments in prescription');

// ✅ Zod validation schema
const schema = z.object({
  id: z.number().optional(),
  appointment_id: z.coerce.number().min(1, 'Appointment is required'),
  doctor_id: z.coerce.number().min(1, 'Doctor is required'),
  patient_id: z.coerce.number().min(1, 'Patient is required'),
  medicine_list: z.string().min(1, 'Medicine list is required'),
  notes: z.string().optional()
})
type Schema = z.output<typeof schema>

// ✅ Initial state
const initialState: Partial<Schema> = {
  id: undefined,
  appointment_id: undefined,
  doctor_id: undefined,
  patient_id: undefined,
  medicine_list: '',
  notes: ''
}

const state = reactive<Partial<Schema>>(props.prescriptions || { ...initialState })
const toast = useToast()

// ✅ Submit handler
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const url = state.id ? `/api/prescriptions/${state.id}` : '/api/prescriptions'
  const method = state.id ? 'PUT' : 'POST'
console.log(event.data);

  try {
    await useFetch(url, { method, body: event.data })

    toast.add({
      title: state.id ? 'Updated' : 'Created',
      description: `Record ${state.id ? 'updated' : 'created'} successfully!`
    })

    Object.assign(state, initialState)
  } catch (err: any) {
    toast.add({
      title: 'Error',
      description: err?.data?.message || 'Something went wrong'
    })
  }
}

const resetForm = (event: Event) => {
  event.preventDefault()
  Object.assign(state, initialState)
}
</script>

<template>
  <div class="flex justify-center  min-h-screen">
    <div class="w-full max-w-lg  p-8 ">
      <h1 class="text-2xl font-bold mb-6 text-center">
        {{ state.id ? 'Edit Record' : 'Create Record' }}
      </h1>

      <UForm :schema="schema" :state="state" class="space-y-5 my-4" @submit="onSubmit">
        <!-- Appointment -->
        <UFormField label="Appointment" name="appointment_id">
          <USelectMenu
            v-model="state.appointment_id"
            v-model:search-term="searchTermAppointment"
            :items="appointments"
            value-key="id"
            label-key="label"
            :loading="loadingAppointments"
            ignore-filter
            placeholder="Select appointment"
            class="w-full"
            size="xl"
          />
        </UFormField>

        <!-- Doctor -->
        <UFormField label="Doctor" name="doctor_id">
          <USelectMenu
            v-model="state.doctor_id"
            v-model:search-term="searchTermDoctor"
            :items="doctors?.data || []"
            value-key="id"
            label-key="name"
            :loading="loadingDoctors"
            ignore-filter
            placeholder="Select doctor"
            class="w-full"
            size="xl"
          />
        </UFormField>

        <!-- Patient -->
        <UFormField label="Patient" name="patient_id">
          <USelectMenu
            v-model="state.patient_id"
            v-model:search-term="searchTermPatient"
            :items="patients"
            value-key="id"
            label-key="patient_name"
            :loading="loadingPatients"
            ignore-filter
            placeholder="Select patient"
            class="w-full"
            size="xl"
          />
        </UFormField>

        <!-- Medicine List -->
        <UFormField label="Medicine List" name="medicine_list">
          <UTextarea
            v-model="state.medicine_list"
            placeholder="Enter prescribed medicines"
            class="w-full"
            size="xl"
          />
        </UFormField>

        <!-- Notes -->
        <UFormField label="Notes" name="notes">
          <UTextarea
            v-model="state.notes"
            placeholder="Additional notes"
            class="w-full"
            size="xl"
          />
        </UFormField>

        <!-- Buttons -->
        <div class="flex justify-end gap-2 ">
          <UButton label="Reset" color="error" variant="ghost" @click="() => resetForm({} as Event)" />
          <UButton
            :label="state.id ? 'Update Record' : 'Create Record'"
            type="submit"
            size="lg"
          />
        </div>
      </UForm>
    </div>
  </div>
</template>
