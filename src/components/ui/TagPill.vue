<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  tone: {
    type: String,
    default: 'neutral',
    validator: (v) => ['neutral', 'brand', 'accent', 'success'].includes(v),
  },
  size: { type: String, default: 'md', validator: (v) => ['sm', 'md'].includes(v) },
})

const TONES = {
  neutral: 'border-line bg-fg/[0.04] text-muted',
  brand: 'border-brand-400/30 bg-brand-400/10 text-brand-600 dark:text-brand-300',
  accent: 'border-accent-400/30 bg-accent-400/10 text-accent-600 dark:text-accent-300',
  success: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-600 dark:text-emerald-300',
}

const classes = computed(() => [
  'inline-flex items-center gap-1.5 rounded-full border font-medium whitespace-nowrap',
  props.size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs',
  TONES[props.tone],
])
</script>

<template>
  <span :class="classes">
    <slot name="icon" />
    {{ label }}
  </span>
</template>
