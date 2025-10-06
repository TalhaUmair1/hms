<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { reactive } from 'vue'
import { useFetch } from '#app'
import { useToast } from '#imports'



const toggle = () => {
  Object.assign(state, initialState)
}
// Zod schema for validation
const schema = z.object({
  user_id: z.coerce.number().min(1, 'User ID is required'),
  specialization: z.string().min(2, 'Specialization is required'),
  fees: z.coerce.number().min(0, 'Fees must be positive'),
  availability: z.string().min(2, 'Availability is required'),
  id: z.number().optional()
})

type Schema = z.output<typeof schema>

// Initial state
const initialState: Partial<Schema> = {
  user_id: undefined,
  specialization: undefined,
  fees: undefined,
  availability: undefined,
  id: undefined
}

let state = reactive<Partial<Schema>>({ ...initialState })

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log('Form submitted with data:', event.data)

  const { data, error } = await useFetch('/api/doctors', {
    method: 'POST',
    body: event.data
  })

  if (error.value) {
    toast.add({
      title: 'Error',
      description: error.value.message || 'Something went wrong',
    })
    return
  }

  toast.add({
    title: 'Success',
    description: `Doctor with specialization ${event.data.specialization} added`,
  })


  Object.assign(state, initialState)
}

const sep = [
  { "id": 1, "name": "Cardiologist" },
  { "id": 2, "name": "Dermatologist" },
  { "id": 3, "name": "Neurologist" },
  { "id": 4, "name": "Pediatrician" },
  { "id": 5, "name": "Orthopedic Surgeon" },
  { "id": 6, "name": "Psychiatrist" },
  { "id": 7, "name": "Radiologist" },
  { "id": 8, "name": "Oncologist" },
  { "id": 9, "name": "Gynecologist" },
  { "id": 10, "name": "General Surgeon" },
  { "id": 11, "name": "Endocrinologist" },
  { "id": 12, "name": "Nephrologist" },
  { "id": 13, "name": "Urologist" },
  { "id": 14, "name": "ENT Specialist" },
  { "id": 15, "name": "Pulmonologist" },
  { "id": 16, "name": "Rheumatologist" },
  { "id": 17, "name": "Gastroenterologist" },
  { "id": 18, "name": "Hematologist" },
  { "id": 19, "name": "Ophthalmologist" },
  { "id": 20, "name": "Family Medicine" },
  { "id": 21, "name": "Anesthesiologist" },
  { "id": 22, "name": "Pathologist" },
  { "id": 23, "name": "Plastic Surgeon" },
  { "id": 24, "name": "Vascular Surgeon" },
  { "id": 25, "name": "Allergist / Immunologist" },
  { "id": 26, "name": "Sports Medicine Specialist" },
  { "id": 27, "name": "Emergency Medicine Specialist" },
  { "id": 28, "name": "Occupational Medicine Specialist" },
  { "id": 29, "name": "Infectious Disease Specialist" },
  { "id": 30, "name": "Geriatrician" },
  { "id": 31, "name": "Palliative Care Specialist" },
  { "id": 32, "name": "Neonatologist" },
  { "id": 33, "name": "Medical Geneticist" },
  { "id": 34, "name": "Reproductive Endocrinologist" },
  { "id": 35, "name": "Sleep Medicine Specialist" },
  { "id": 36, "name": "Clinical Pharmacologist" },
  { "id": 37, "name": "Nuclear Medicine Specialist" },
  { "id": 38, "name": "Critical Care Specialist" },
  { "id": 39, "name": "Dentist" },
  { "id": 40, "name": "Chiropractor" }
]

</script>



<template>
 <div class="flex justify-center items-center min-h-screen ">
  
  <div class="w-full max-w-md p-8 ">
    <h1 class="text-2xl font-bold mb-6 text-center">Doctor Form</h1>

    <UForm 
      :schema="schema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormField label="User ID" name="user_id">
        <UInput v-model="state.user_id" type="number" size="xl" class="w-full" placeholder="Enter user ID" />
      </UFormField>

      <UFormField label="Specialization" name="specialization">
        <!-- <UInput v-model="state.specialization" size="xl" class="w-full" placeholder="e.g. Cardiologist" /> -->
          <USelectMenu v-model="state.specialization" labelKey="name" value-key="name"  :items="sep" size="xl" class="w-full" placeholder="e.g. Cardiologist" />
      </UFormField>

      <UFormField label="Fees" name="fees">
        <UInput v-model="state.fees" type="number" size="xl" class="w-full" placeholder="Enter fees" />
      </UFormField>

      <UFormField label="Availability" name="availability">
        <UInput v-model="state.availability" size="xl" class="w-full" placeholder="e.g. Mon-Fri 9AM-5PM" />
      </UFormField>

      <div class="flex justify-end gap-3 pt-4">
        <UButton @click="toggle" label="Cancel" color="error" variant="ghost" />
        <UButton label="Create" type="submit" size="lg" />
      </div>
    </UForm>
  </div>
</div>
</template>
