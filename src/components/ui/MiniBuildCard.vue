<script setup>
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  build: { type: Object, required: true },
})

/** Prefer the live demo; fall back to the repo only when one is public. */
const href = computed(() => props.build.demo || props.build.repo || null)
</script>

<template>
  <component
    :is="href ? 'a' : 'div'"
    :href="href ?? undefined"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener noreferrer' : undefined"
    data-reveal
    class="reveal group surface-card flex flex-col gap-3 rounded-2xl p-5 transition-all duration-300"
    :class="href ? 'hover:-translate-y-1 hover:border-brand-400/50' : ''"
  >
    <div class="flex items-start justify-between gap-3">
      <h4 class="font-display text-base font-semibold tracking-tight">{{ build.name }}</h4>
      <AppIcon
        v-if="href"
        name="arrowUpRight"
        :size="16"
        class="mt-0.5 text-muted transition-colors group-hover:text-brand-400"
      />
    </div>

    <p class="text-sm leading-relaxed text-muted">{{ build.blurb }}</p>

    <div
      class="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 font-mono text-[11px] text-muted"
    >
      <span v-for="tag in build.tags" :key="tag">{{ tag }}</span>
      <span class="ml-auto">{{ build.date }}</span>
    </div>
  </component>
</template>
