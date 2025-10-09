<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { reactive, watch } from 'vue'
import { useFetch } from '#app'
import { useToast } from '#imports'

const props = defineProps({
  doctor: {
    type: Object,
    default: null
  }
})

const { data: users, pending } = useFetch('/api/users', {
  key: 'users-list',
  lazy: true
})

const schema = z.object({
  user_id: z.coerce.number().min(1, 'User ID is required'),
  specialization: z.string().min(2, 'Specialization is required'),
  fees: z.coerce.number().min(0, 'Fees must be positive'),
  availability: z.string().min(2, 'Availability is required'),
  id: z.number().optional()
})

type Schema = z.output<typeof schema>

const initialState: Partial<Schema> = {
  user_id: undefined,
  specialization: undefined,
  fees: undefined,
  availability: undefined,
  id: undefined
}

const state = reactive<Partial<Schema>>(props.doctor||{ ...initialState })
const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const url = state.id ? `/api/doctors/${state.id}` : '/api/doctors'
  const method = state.id ? 'PUT' : 'POST'
  const { error } = await useFetch(url, { method, body: event.data })

  if (error.value) {
    toast.add({ title: 'Error', description: error.value.message })
  } else {
    toast.add({
      title: state.id ? 'Updated' : 'Created',
      description: `Doctor ${state.id ? 'updated' : 'created'} successfully!`
    })
  }

  Object.assign(state, initialState)
}

const resetForm = () => Object.assign(state, initialState)

const sep = [
  { id: 1, name: 'Cardiologist' },
  { id: 2, name: 'Dermatologist' },
  { id: 3, name: 'Neurologist' },
  { id: 4, name: 'Pediatrician' }
]
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="w-full max-w-md p-8">
      <h1 class="text-2xl font-bold mb-6 text-center">
        {{ state.id ? 'Edit Doctor' : 'Create Doctor' }}
      </h1>

      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="User" name="user_id">
          <USelectMenu
            v-model="state.user_id"
            :items="users"
            value-key="id"
            label-key="name"
            :loading="pending"
            placeholder="Select user"
            class="w-full"
            size="xl"
          />
        </UFormField>

        <UFormField label="Specialization" name="specialization">
          <USelectMenu
            v-model="state.specialization"
            labelKey="name"
            value-key="name"
            :items="sep"
            size="xl"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Fees" name="fees">
          <UInput v-model="state.fees" type="number" size="xl" class="w-full" placeholder="Enter fees" />
        </UFormField>

        <UFormField label="Availability" name="availability">
          <UInput v-model="state.availability" type="date" size="xl" class="w-full" />
        </UFormField>

        <div class="flex justify-end gap-3 pt-4">
          <UButton label="Reset" color="error" variant="ghost" @click="resetForm" />
          <UButton :label="state.id ? 'Update Doctor' : 'Create Doctor'" type="submit" size="lg" />
        </div>
      </UForm>
    </div>
  </div>
</template>
