<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useFetch } from 'nuxt/app'
import { ref } from 'vue'

// ✅ Zod schema for validation
const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  address: z.string().optional()
})

type ProfileSchema = z.output<typeof profileSchema>

// ✅ Fetch existing profile
const { data: profile, pending, error, refresh } = useFetch('/api/auth/profile')

// ✅ Local state so we can edit safely
const state = ref<ProfileSchema>({
  name: '',
  email: '',
  phone: '',
  address: ''
})

watchEffect(() => {
  if (profile.value) {
    state.value = { ...profile.value }
  }
})

const toast = useToast()

// ✅ Submit updates
async function onSubmit(event: FormSubmitEvent<ProfileSchema>) {
  await $fetch('/api/auth/profile', {
    method: 'PUT',
    body: event.data
  })

  toast.add({
    title: 'Success',
    description: 'Your profile has been updated.',
    icon: 'i-lucide-check',
    color: 'success'
  })

  refresh() // refresh profile after save
}
</script>

<template>
  <div>
    <UForm
      id="settings"
      :schema="profileSchema"
      :state="state"
      @submit="onSubmit"
    >
      <UPageCard
        title="Profile"
        description="These informations will be displayed publicly."
        variant="naked"
        orientation="horizontal"
        class="mb-4"
      >
        <UButton
          form="settings"
          label="Save changes"
          color="neutral"
          type="submit"
          class="w-fit lg:ms-auto"
        />
      </UPageCard>

      <UPageCard variant="subtle">
        <UFormField
          name="name"
          label="Name"
          description="Will appear on receipts, invoices, and other communication."
          required
          class="flex max-sm:flex-col justify-between items-start gap-4"
        >
          <UInput v-model="state.name" autocomplete="off" />
        </UFormField>

        <USeparator />

        <UFormField
          name="email"
          label="Email"
          description="Used to sign in, for email receipts and product updates."
          required
          class="flex max-sm:flex-col justify-between items-start gap-4"
        >
          <UInput v-model="state.email" type="email" autocomplete="off" />
        </UFormField>

        <USeparator />

        <UFormField
          name="phone"
          label="Phone"
          description="Your unique phone number."
          class="flex max-sm:flex-col justify-between items-start gap-4"
        >
          <UInput v-model="state.phone" type="text" autocomplete="off" />
        </UFormField>

        <USeparator />

        <UFormField
          name="address"
          label="Address"
          description="Brief description Address for your profile."
          class="flex max-sm:flex-col justify-between items-start gap-4"
          :ui="{ container: 'w-full' }"
        >
          <UTextarea v-model="state.address" :rows="4" autoresize class="w-full" />
        </UFormField>
      </UPageCard>
    </UForm>
  </div>
</template>
