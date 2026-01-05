<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

defineProps<{
  collapsed?: boolean
}>()

const teams = ref([{
  label: 'S-K Hospital',
  avatar: {
    icon: 'i-lucide-hospital',
    alt: '/dashboard'
  }
}, {
  label: 'About Us',
   icon:'i-lucide-newspaper',
    to: '/dashboard/optional/about'
}, {
  label: 'How It’s Sustained',
   icon:'i-lucide-hand-heart',
    to: '/dashboard/optional/sustained'
}])
const selectedTeam = ref(teams.value[0])

const items = computed<DropdownMenuItem[][]>(() => {
  return [teams.value.map(team => ({
    ...team,
    onSelect() {
      selectedTeam.value = team
    }
  })), [{
    label: 'Medical & Staff',
    icon: 'i-lucide-store',
    to: '/dashboard/optional/store'
  }, {
    label: 'Cleaing',
    icon: 'i-lucide-brush-cleaning',
    to: '/dashboard/optional/cleaning'
  }]]
})
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{ content: collapsed ? 'w-40' : 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <UButton
      v-bind="{
        ...selectedTeam,
        label: collapsed ? undefined : selectedTeam?.label,
        trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down'
      }"
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-elevated"
      :class="[!collapsed && 'py-2']"
      :ui="{
        trailingIcon: 'text-dimmed'
      }"
    />
  </UDropdownMenu>
</template>
