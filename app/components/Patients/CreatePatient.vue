<script setup lang="ts">
import { reactive, ref } from 'vue'
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useFetch, useToast } from '#imports'

const { data: users, pending } = useFetch('/api/users', {
  key: 'users-list',
  lazy: true
  
  
})

const toast = useToast()

// 🧩 Validation schema
const schema = z.object({
  user_id: z.number({ required_error: 'User ID is required' }).int(),
  dob: z.string().min(1, 'Date of Birth is required'),
  gender: z.string().min(1, 'Gender is required'),
  medical_history: z.string().min(1, 'Medical history is required')
})

// 🌱 Reactive state
const state = reactive({
  user_id: undefined,
  dob: '',
  gender: '',
  medical_history: ''
})

// 🧍 Gender options
const gender = ref(['Male', 'Female', 'Other'])

// 🚀 Submit handler
async function onSubmit(event: FormSubmitEvent<typeof schema>) {
  console.log('Submitted:', state)
  await useFetch('/api/patients', { method: 'POST', body: state })
  toast.add({
    title: 'Success',
    description: 'Patient data submitted successfully!',
    color: 'primary'
  })

  // ✅ Reset all fields
  state.user_id = undefined
  state.dob = ''
  state.gender = ''
  state.medical_history = ''
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <UCard class="w-full max-w-md p-6 space-y-4">
      <h2 class="text-2xl font-semibold text-center text-secondary mb-4">
        Patient Registration
      </h2>

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
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

        <UFormField label="Date of Birth" name="dob" label-class="text-secondary">
          <UInput
            v-model="state.dob"
            type="date"
            size="xl"
            class="w-full max-w-md"
          />
        </UFormField>

        <UFormField label="Gender" name="gender" label-class="text-secondary">
          <USelect
            v-model="state.gender"
            :items="gender"
            placeholder="Select gender"
            size="xl"
            class="w-full max-w-md"
          />
        </UFormField>

        <UFormField label="Medical History" name="medical_history" label-class="text-secondary">
          <UTextarea
            v-model="state.medical_history"
            placeholder="Enter medical history details"
            :rows="4"
            size="xl"
            class="w-full max-w-md"
          />
        </UFormField>

        <UButton type="submit" block size="lg" color="primary" class="mt-4">
          Submit
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>