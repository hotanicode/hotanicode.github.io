<script setup>
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'
import CoverImage from './CoverImage.vue'
import TagPill from './TagPill.vue'

const props = defineProps({
  app: { type: Object, required: true },
})

const STATUS_TONES = {
  Live: 'success',
  'In progress': 'brand',
  Concept: 'accent',
}

const statusTone = computed(() => STATUS_TONES[props.app.status] ?? 'neutral')
</script>

<template>
  <article
    data-reveal
    class="reveal surface-card group flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1.5 hover:border-accent-400/50 hover:glow-brand"
  >
    <CoverImage
      :src="app.image"
      :alt="`${app.name} preview`"
      :seed="app.name"
      ratio="16 / 9"
      class="order-first"
    />

    <div class="flex flex-1 flex-col gap-4 p-6">
      <div class="flex items-start gap-4">
        <span
          class="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 text-brand-500 ring-1 ring-line dark:text-brand-300"
        >
          <AppIcon :name="app.icon" :size="20" />
        </span>

        <div class="min-w-0 flex-1">
          <h3 class="font-display text-lg font-semibold tracking-tight">{{ app.name }}</h3>
          <p class="truncate text-sm text-muted">{{ app.platform }} · {{ app.year }}</p>
        </div>

        <TagPill :label="app.status" :tone="statusTone" size="sm" />
      </div>

      <p class="text-sm leading-relaxed text-muted">{{ app.description }}</p>

      <div class="mt-auto space-y-4 pt-2">
        <div class="flex flex-wrap gap-2">
          <TagPill v-for="tag in app.tags" :key="tag" :label="tag" size="sm" />
        </div>

        <div
          v-if="app.links?.demo || app.links?.repo"
          class="flex items-center gap-4 border-t border-line pt-4 text-sm"
        >
          <a
            v-if="app.links?.demo"
            :href="app.links.demo"
            class="inline-flex items-center gap-1.5 font-medium text-brand-600 transition-colors hover:text-brand-400 dark:text-brand-300"
          >
            Open
            <AppIcon name="arrowUpRight" :size="15" />
          </a>
          <a
            v-if="app.links?.repo"
            :href="app.links.repo"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 font-medium text-muted transition-colors hover:text-fg"
          >
            Source
            <AppIcon name="github" :size="15" />
          </a>
        </div>
      </div>
    </div>
  </article>
</template>
