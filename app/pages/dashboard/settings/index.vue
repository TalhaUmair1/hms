<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useFetch } from 'nuxt/app'
import type { Ref } from 'vue'

const profileSchema = z.object({
  id: z.number().min(1, 'ID is required'),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(1, 'Phone is required'),
  address: z.string().min(1, 'Address is required'),
})
type ProfileSchema = z.output<typeof profileSchema>

const profile = ref<ProfileSchema>({
  id: 0,
  name: '',
  email: '',
  phone: '',
  address: '',
})

  const { user: u } = useUserSession()
console.log(u.value);

const { data, pending, error, refresh } = await useFetch<ProfileSchema>('/api/auth/profile')
console.log(data.value);

if (data.value) {
  profile.value = data.value
}



const toast = useToast()
async function onSubmit(event: FormSubmitEvent<ProfileSchema>) {
  console.log('Submitted', event.data)
  const userSession = useUserSession() as {
    user: Ref<{ id?: number, name?: string, email?: string, role?: string } | null>
  }
  
  if (!userSession.user?.value?.id) {
    toast.add({
      title: 'Error',
      description: 'User not authenticated',
      color: 'error',
    })
    return
  }
  
  try {
    const { data: response, error: apiError } = await useFetch(`/api/auth/${userSession.user.value.id}`, {
      method: 'PUT',
      body: event.data,
    })
    
    if (apiError.value) {
      console.error('Update error:', apiError.value)
      toast.add({
        title: 'Error',
        description: 'Failed to update profile',
        color: 'error',
      })
      return
    }
    
    toast.add({
      title: 'Success',
      description: 'Profile updated successfully',
      color: 'success',
    })
    
    // Update the profile with the response data
    profile.value = response.value as ProfileSchema
    
  } catch (err) {
    console.error('Submission error:', err)
    toast.add({
      title: 'Error',
      description: 'An unexpected error occurred',
      color: 'error',
    })
  }
}


</script>

<template>
  <UForm
    id="settings"
    :schema="profileSchema"
    :state="profile"
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
        <UInput
          v-model="profile.name"
          autocomplete="off"
        />
      </UFormField>
      <USeparator />
      <UFormField
        name="email"
        label="Email"
        description="Used to sign in, for email receipts and product updates."
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <UInput
          v-model="profile.email"
          type="email"
          autocomplete="off"
        />
      </UFormField>
      <USeparator />
      <UFormField
        name="Phone"
        label="Phone"
        description="Your unique phone number. Used for logging in and your profile URL."
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <UInput
          v-model="profile.phone"
          type="username"
          autocomplete="off"
        />
      </UFormField>
      <USeparator />
   
      <UFormField
        name="address"
        label="Address"
        description="Brief description Address for your profile."
        class="flex max-sm:flex-col justify-between items-start gap-4"
        :ui="{ container: 'w-full' }"
      >
        <UTextarea
          v-model="profile.address"
          :rows="4"
          autoresize
          class="w-full"
        />
      </UFormField>
    </UPageCard>
  </UForm>
</template>
