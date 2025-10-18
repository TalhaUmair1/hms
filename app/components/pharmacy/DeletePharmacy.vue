
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

async function deletePharmacy() {
  if (!props.id) return
  try {
    await $fetch(`/api/pharmacy/${props.id}`, { method: 'DELETE' })
    emit('deleted')
    isOpen.value = false
  } catch (error) {
    console.error('Error deleting Pharmacy:', error)
  }
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    title="Delete Appoinment"
    description="Are you sure you want to delete this Bill? This action cannot be undone."
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
          @click="deletePharmacy"
        />
      </div>
    </template>
  </UModal>
</template>
