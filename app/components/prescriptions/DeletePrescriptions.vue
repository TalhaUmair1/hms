
<script setup lang="ts">
import { computed } from "vue"
const props = defineProps<{
  id: number
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'deleted'): void
}>()

const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
})

async function deletePrescriptions() {
  if (!props.id) return
  try {
    await $fetch(`/api/prescriptions/${props.id}`, { method: 'DELETE' })
    emit('deleted')
    isOpen.value = false
  } catch (error) {
    console.error('Error deleting prescriptions:', error)
  }
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    title="Delete prescriptions"
    description="Are you sure you want to delete this prescriptions? This action cannot be undone."
  >
    <div class="p-4">
      <slot />
    </div>

    <template #footer>
      <div class="flex justify-end gap-2">
        <UButton
          label="Cancel"
          color="neutral"
          variant="subtle"
          @click="isOpen = false"
        />
        <UButton
          label="Delete"
          color="error"
          variant="solid"
          @click="deletePrescriptions"
        />
      </div>
    </template>
  </UModal>
</template>
