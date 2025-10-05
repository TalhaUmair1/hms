<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Sign up',
  description: 'Create an account to get started'
})

const toast = useToast()

const fields = [{
  name: 'name',
  type: 'text' as const,
  label: 'Name',
  placeholder: 'Enter your name',
  size: 'xl'
}, {
  name: 'email',
  type: 'text' as const,
  label: 'Email',
  placeholder: 'Enter your email',
  size: 'xl'
}, {
  name: 'password',
  label: 'Password',
  type: 'password' as const,
  placeholder: 'Enter your password',
    size: 'xl',
}]

const providers = [{
  label: 'Google',
  icon: 'i-simple-icons-google',
    size: 'xl',
  onClick: () => {
    toast.add({ title: 'Google', description: 'Login with Google' })
  }
}, {
  label: 'Facebook',
  icon: 'i-simple-icons-facebook',
    size: 'xl',
  onClick: () => {
    toast.add({ title: 'Facebook', description: 'Login with Facebook' })
  }
}]



const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
    console.log('Submitted', payload)
 const { data, pending, error } = await useFetch('/api/auth/register', {
  method: 'POST',
  body: payload.data,
})
}
</script>

<template>
    <div class="w-full max-w-md px-6 mt-5">
  <UAuthForm
    :fields="fields"
    :schema="schema"
    :providers="providers"
    title="Create an account"
    separator=""
    :submit="{ label: 'Sign Up',
      color: 'primary',
      variant: 'subtle',
      size: 'xl', }"
    @submit="onSubmit"
    
  >
    <template #description>
      Already have an account? <ULink
        to="/login"
        class="text-primary font-medium"
      >Login</ULink>.
    </template>

    <template #footer>
      By signing up, you agree to our <ULink
        to="/"
        class="text-primary font-medium"
      >Terms of Service</ULink>.
    </template>
  </UAuthForm>
    </div>
</template>