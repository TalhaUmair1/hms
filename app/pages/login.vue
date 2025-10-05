<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Login',
  description: 'Login to your account to continue'
})

const toast = useToast()

const fields = [{
  name: 'email',
  type: 'text' as const,
  label: 'Email',
  placeholder: 'Enter your email',
  required: true,
  size: 'xl'
}, {
  name: 'password',
  label: 'Password',
  type: 'password' as const,
  placeholder: 'Enter your password',
  size: 'xl',
}, {
  name: 'remember',
  label: 'Remember me',
  type: 'checkbox' as const,
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
  size: 'xl',
  icon: 'i-simple-icons-facebook',
  onClick: () => {
    toast.add({ title: 'Facebook', description: 'Login with Facebook' })
  }
}]

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
    console.log('Submitted', payload)
 const { data, pending, error } = await useFetch('/api/auth/login', {
  method: 'POST',
  body: payload.data,
})
  if (error.value) {
    toast.add({
      title: 'Error',
      description: error.value?.data?.message || 'Login failed',
      icon: 'i-lucide-alert-circle',
      color: 'danger'
    })
  } else {
    toast.add({
      title: 'Success',
      description: 'You are now logged in',
      icon: 'i-lucide-check',
      color: 'success'
    })
    // Redirect to dashboard or home page
    navigateTo('/')
  }
}
</script>

<template>
  <div class="flex flex-col justify-center items-center mt-5">
  <UAuthForm
    :fields="fields"
    :schema="schema"
    :providers="providers"
    separator=""
    title="Welcome back"
    icon="i-lucide-fingerprint"
    @submit="onSubmit"
  :ui="{
    root: 'space-y-4',
    input: 'h-12 text-base',
      password: 'h-12 text-base'
  }"
  :submit="{
      label: 'Login',
      color: 'primary',
      variant: 'subtle',
      size: 'xl',
    }"
  >
    <template #password-hint>
      <ULink
        to="/"
        class="text-primary font-medium"
        tabindex="-1"
      >Forgot password?</ULink>
    </template>

    <template #footer>
    <div>
        By signing in, you agree to our <ULink
        to="/"
        class="text-primary font-medium"
      >Terms of Service</ULink>.
    </div>
       <div class="mt-2">
      Don't have an account? <ULink
        to="/signup"
        class="text-primary font-medium "
      >Sign up</ULink>.
    </div>
    </template>
  </UAuthForm>
  </div>
</template>