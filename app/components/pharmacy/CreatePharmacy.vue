<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { reactive } from 'vue'
import { useFetch } from '#app'
import { useToast } from '#imports'

const props = defineProps({
  pharmacy: {
    type: Object,
    default: null
  }
})

// ✅ Validation schema
const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  quantity: z.coerce.number().min(1, 'Quantity must be at least 1'),
  price: z.coerce.number().min(1, 'Price must be greater than 0'),
  expiryDate: z.string(),
  id: z.number().optional()
})
type Schema = z.output<typeof schema>

// ✅ Initial state
const initialState: Partial<Schema> = {
  name: '',
  quantity: undefined,
  price: undefined,
  expiryDate: ''
}

// ✅ Reactive form state (pre-filled for edit mode)
const state = reactive<Partial<Schema>>({
  ...initialState,
  ...props.pharmacy
})

const toast = useToast()

// ✅ Submit handler
async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log('💊 Submitted data:', event.data)

  const url = state.id ? `/api/pharmacy/${state.id}` : '/api/pharmacy'
  const method = state.id ? 'PUT' : 'POST'

  const { error } = await useFetch(url, { method, body: event.data })

  if (error.value) {
    toast.add({ title: 'Error', description: error.value.message })
  } else {
    toast.add({
      title: state.id ? 'Updated' : 'Created',
      description: `Pharmacy item ${state.id ? 'updated' : 'created'} successfully!`
    })
  }

  Object.assign(state, initialState)
}

// ✅ Reset form
const resetForm = () => Object.assign(state, initialState)
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="w-full max-w-md p-8">
      <h1 class="text-2xl font-bold mb-6 text-center">
        {{ state.id ? 'Edit Pharmacy Item' : 'Create Pharmacy Item' }}
      </h1>

      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <!-- 🧾 Name -->
        <UFormField label="Medicine Name" name="name">
          <UInput
            v-model="state.name"
            placeholder="Enter medicine name"
            class="w-full"
            size="xl"
          />
        </UFormField>

        <!-- 🔢 Quantity -->
        <UFormField label="Quantity" name="quantity">
          <UInput
            v-model="state.quantity"
            type="number"
            placeholder="Enter quantity"
            min="1"
            class="w-full"
            size="xl"
          />
        </UFormField>

        <!-- 💵 Price -->
        <UFormField label="Price (Rs)" name="price">
          <UInput
            v-model="state.price"
            type="number"
            placeholder="Enter price"
            min="1"
            class="w-full"
            size="xl"
          />
        </UFormField>

        <!-- 📅 Expiry Date -->
        <UFormField label="Expiry Date" name="expiryDate">
          <UInput
            v-model="state.expiryDate"
            type="date"
            placeholder="Select expiry date"
            class="w-full"
            size="xl"
          />
        </UFormField>

        <!-- Buttons -->
        <div class="flex justify-end gap-3 pt-4">
          <UButton label="Reset" color="error" variant="ghost" @click="resetForm" />
          <UButton
            :label="state.id ? 'Update Item' : 'Create Item'"
            type="submit"
            size="lg"
          />
        </div>
      </UForm>
    </div>
  </div>
</template>
