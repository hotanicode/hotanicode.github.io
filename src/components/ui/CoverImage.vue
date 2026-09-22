<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  src: { type: String, default: null },
  alt: { type: String, default: '' },
  /** Text used to derive the fallback gradient and monogram. */
  seed: { type: String, default: '' },
  ratio: { type: String, default: '16 / 10' },
})

const failed = ref(false)
watch(
  () => props.src,
  () => (failed.value = false),
)

const GRADIENTS = [
  'from-brand-500/35 via-accent-500/20 to-transparent',
  'from-accent-500/35 via-brand-400/20 to-transparent',
  'from-emerald-500/30 via-brand-500/20 to-transparent',
  'from-sky-500/30 via-accent-400/20 to-transparent',
  'from-fuchsia-500/25 via-brand-400/20 to-transparent',
]

/** Deterministic pick so a card always renders the same cover. */
const gradient = computed(() => {
  const seed = props.seed || props.alt || ''
  const sum = [...seed].reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return GRADIENTS[sum % GRADIENTS.length]
})

const monogram = computed(() =>
  (props.seed || props.alt || '?')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join(''),
)

const showImage = computed(() => Boolean(props.src) && !failed.value)
</script>

<template>
  <div class="relative overflow-hidden bg-surface" :style="{ aspectRatio: ratio }">
    <img
      v-if="showImage"
      :src="src"
      :alt="alt"
      loading="lazy"
      decoding="async"
      class="size-full object-cover transition-transform duration-700 group-hover:scale-105"
      @error="failed = true"
    />

    <!-- Fallback cover: keeps layout intact before screenshots are added. -->
    <div
      v-else
      :class="['absolute inset-0 bg-gradient-to-br', gradient]"
      role="img"
      :aria-label="alt"
    >
      <div class="grid-backdrop absolute inset-0 opacity-40" />
      <div class="absolute inset-0 grid place-items-center">
        <span class="font-display text-4xl font-semibold tracking-tight text-fg/25">
          {{ monogram }}
        </span>
      </div>
    </div>

    <div class="pointer-events-none absolute inset-0 ring-1 ring-line ring-inset" />
  </div>
</template>
