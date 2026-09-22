<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  level: { type: Number, required: true },
})

const width = ref('0%')

// Animate from zero on mount so the meter fills as the card reveals.
onMounted(() => {
  requestAnimationFrame(() => {
    width.value = `${Math.min(100, Math.max(0, props.level))}%`
  })
})
</script>

<template>
  <li class="space-y-1.5">
    <div class="flex items-baseline justify-between gap-3">
      <span class="text-sm font-medium">{{ name }}</span>
      <span class="font-mono text-[11px] text-muted">{{ level }}%</span>
    </div>

    <div
      class="h-1.5 w-full overflow-hidden rounded-full bg-fg/[0.07]"
      role="progressbar"
      :aria-label="name"
      :aria-valuenow="level"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        class="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-400 transition-[width] duration-1000 ease-out"
        :style="{ width }"
      />
    </div>
  </li>
</template>
