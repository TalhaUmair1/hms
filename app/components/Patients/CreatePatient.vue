<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { reactive } from 'vue'
import { useFetch } from '#app'
import { useToast } from '#imports'

const props = defineProps({
  patient: {
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
  dob: z.string().min(1, 'Date of Birth is required'),
  gender: z.string().min(1, 'Gender is required'),
  medical_history: z.string().min(1, 'Medical history is required'),
  id: z.number().optional()
})

type Schema = z.output<typeof schema>

const initialState: Partial<Schema> = {
  user_id: undefined,
  dob: '',
  gender: '',
  medical_history: '',
  id: undefined
}

const state = reactive<Partial<Schema>>(props.patient || { ...initialState })
const toast = useToast()

// 🚀 Handle create / update
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const url = state.id ? `/api/patients/${state.id}` : '/api/patients'
  const method = state.id ? 'PUT' : 'POST'
  const { error } = await useFetch(url, { method, body: event.data })

  if (error.value) {
    toast.add({ title: 'Error', description: error.value.message })
  } else {
    toast.add({
      title: state.id ? 'Updated' : 'Created',
      description: `Patient ${state.id ? 'updated' : 'created'} successfully!`
    })
  }

  Object.assign(state, initialState)
}

const resetForm = () => Object.assign(state, initialState)

const genderOptions = [
  { id: 1, name: 'Male' },
  { id: 2, name: 'Female' },
  { id: 3, name: 'Other' }
]
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="w-full max-w-md p-8">
      <h1 class="text-2xl font-bold mb-6 text-center">
        {{ state.id ? 'Edit Patient' : 'Create Patient' }}
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

        <UFormField label="Date of Birth" name="dob">
          <UInput v-model="state.dob" type="date" size="xl" class="w-full" />
        </UFormField>

        <UFormField label="Gender" name="gender">
          <USelectMenu
            v-model="state.gender"
            :items="genderOptions"
            value-key="name"
            label-key="name"
            placeholder="Select gender"
            size="xl"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Medical History" name="medical_history">
          <UTextarea
            v-model="state.medical_history"
            placeholder="Enter medical history details"
            :rows="4"
            size="xl"
            class="w-full"
          />
        </UFormField>

        <div class="flex justify-end gap-3 pt-4">
          <UButton label="Reset" color="error" variant="ghost" @click="resetForm" />
          <UButton :label="state.id ? 'Update Patient' : 'Create Patient'" type="submit" size="lg" />
        </div>
      </UForm>
    </div>
  </div>
</template>
