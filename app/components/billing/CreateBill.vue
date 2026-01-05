<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { reactive, ref } from 'vue'
import { useFetch } from '#app'
import { useToast } from '#imports'
import { refDebounced } from '@vueuse/core'

const props = defineProps({
  billing: {
    type: Object,
    default: null
  }
})

// ✅ Search terms
const searchTermPatient = ref('')
const searchTermPatientDebounced = refDebounced(searchTermPatient, 200)
const searchTermAppointment = ref('')
const searchTermAppointmentDebounced = refDebounced(searchTermAppointment, 200)

// 📋 Fetch patients and appointments lists
const { data: patients, pending: loadingPatients } = useFetch('/api/patients', {
  key: 'patients-list',
  lazy: true,
  params: {
    q: searchTermPatientDebounced
  },
  transform: (res: any) => res.data || []
})
// console.log(patients, "this get from patients");

const { data: appointments, pending: loadingAppointments } = useFetch('/api/appointments', {
  key: 'appointments-list',
  lazy: true,
  params: {
    q: searchTermAppointmentDebounced
  },
  transform: (res: any) => (res.data || []).map((appt: any) => ({
      ...appt,
      label: `#${appt.id} - ${appt.date} (${appt.patient_name})`
    }))
})
// console.log(appointments, "this get from appointments");
// ✅ Validation schema
const schema = z.object({
  appointment_id: z.coerce.number().min(1, 'Appointment is required'),
  patient_id: z.coerce.number().min(1, 'Patient is required'),
  amount: z.coerce.number().min(1, 'Amount must be greater than 0'),
  status: z.enum(['paid', 'pending', 'failed']),
  payment_method: z.enum(['cash', 'credit_card', 'bank_transfer']),
  id: z.number().optional(),
  name: z.string().optional()
})
type Schema = z.output<typeof schema>

// ✅ Initial state
const initialState: Partial<Schema> = {
  appointment_id: undefined,
  patient_id: undefined,
  amount: undefined,
  status: 'pending',
  payment_method: undefined,
  id: undefined,
  name: undefined
}

const state = reactive<Partial<Schema>>({
  ...initialState,
  ...props.billing,
  status: props.billing?.status || 'pending'
})

const toast = useToast()

// ✅ Submit handler
async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log('🧾 Submitted data:', event.data)

  const url = state.id ? `/api/billing/${state.id}` : '/api/billing'
  const method = state.id ? 'PUT' : 'POST'

  const { error } = await useFetch(url, { method, body: event.data })

  if (error.value) {
    toast.add({ title: 'Error', description: error.value.message })
  } else {
    toast.add({
      title: state.id ? 'Updated' : 'Created',
      description: `Bill ${state.id ? 'updated' : 'created'} successfully!`
    })
  }

  Object.assign(state, initialState)
}

// ✅ Reset form
const resetForm = (event: Event) => {
  event.preventDefault()
  Object.assign(state, initialState)
}

// ✅ Options
const statuses = ['paid', 'pending', 'failed']
const paymentMethods = ['cash', 'credit_card', 'bank_transfer']
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="w-full max-w-md p-8">
      <h1 class="text-2xl font-bold mb-6 text-center">
        {{ state.id ? 'Edit Bill' : 'Create Bill' }}
      </h1>

      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
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

        <!-- Amount -->
        <UFormField label="Amount" name="amount">
          <UInput class="w-full" v-model="state.amount" type="number" placeholder="Enter amount" size="xl" />
        </UFormField>

        <!-- Status -->
        <UFormField label="Status" name="status">
          <USelectMenu
            v-model="state.status"
            :items="statuses"
            placeholder="Select status"
            class="w-full"
            size="xl"
          />
        </UFormField>

        <!-- Payment Method -->
        <UFormField label="Payment Method" name="payment_method">
          <USelectMenu
            v-model="state.payment_method"
            :items="paymentMethods"
            placeholder="Select payment method"
            class="w-full"
            size="xl"
          />
        </UFormField>

        <!-- Buttons -->
        <div class="flex justify-end gap-3 pt-4">
          <UButton label="Reset" color="error" variant="ghost" @click="() => resetForm({} as Event)" />
          <UButton
            :label="state.id ? 'Update Bill' : 'Create Bill'"
            type="submit"
            size="lg"
          />
        </div>
      </UForm>
    </div>
  </div>
</template>
