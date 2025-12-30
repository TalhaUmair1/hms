<script setup lang="ts">
import type { Period, Range, Stat } from '~/types'

const props = defineProps<{
  period: Period
  range: Range
}>()

function formatCurrency(value: number): string {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  })
}

const baseStats = [{
  key: 'patients',
  title: 'Patients',
  icon: 'i-lucide-users'
}, {
  key: 'doctors',
  title: 'Doctors',
  icon: 'i-lucide-stethoscope'
}, {
  key: 'bill',
  title: 'Bill',
  icon: 'i-lucide-circle-dollar-sign',
  formatter: formatCurrency
}, {
  key: 'medicines',
  title: 'Medicines',
  icon: 'i-lucide-pill'
}]

const { data: stats } = await useAsyncData<Stat[]>('stats', async () => {
  const data = await $fetch<Record<string, { value: number, variation: number }>>('/api/stats', {
    query: {
      period: props.period,
      range: props.range
    }
  })

  return baseStats.map((stat) => {
    const { value, variation } = data[stat.key] || { value: 0, variation: 0 }

    return {
      title: stat.title,
      icon: stat.icon,
      value: stat.formatter ? stat.formatter(value) : value,
      variation
    }
  })
}, {
  watch: [() => props.period, () => props.range],
  default: () => []
})
</script>

<template>
  <UPageGrid class="lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-px">
    <UPageCard
      v-for="(stat, index) in stats"
      :key="index"
      :icon="stat.icon"
      :title="stat.title"
      variant="subtle"
      :ui="{
        container: 'gap-y-1.5',
        wrapper: 'items-start',
        leading: 'p-2.5 rounded-full bg-primary/10 ring ring-inset ring-primary/25 flex-col',
        title: 'font-normal text-muted text-xs uppercase'
      }"
      class="lg:rounded-none first:rounded-l-lg last:rounded-r-lg hover:z-1"
    >
      <div class="flex items-center gap-2">
        <span class="text-2xl font-semibold text-highlighted">
          {{ stat.value }}
        </span>

        <UBadge
          :color="stat.variation > 0 ? 'success' : 'error'"
          variant="subtle"
          class="text-xs"
        >
          {{ stat.variation > 0 ? '+' : '' }}{{ stat.variation }}%
        </UBadge>
      </div>
    </UPageCard>
  </UPageGrid>
</template>
