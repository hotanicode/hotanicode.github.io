<script setup>
import AppIcon from './AppIcon.vue'
import CoverImage from './CoverImage.vue'
import TagPill from './TagPill.vue'

defineProps({
  project: { type: Object, required: true },
})
</script>

<template>
  <article
    data-reveal
    class="reveal surface-card group flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-400/50 hover:glow-brand"
  >
    <CoverImage :src="project.image" :alt="`${project.title} preview`" :seed="project.title" />

    <div class="flex flex-1 flex-col gap-4 p-6">
      <div class="flex items-center justify-between gap-3">
        <TagPill :label="project.category" tone="brand" size="sm" />
        <span class="font-mono text-xs text-muted">{{ project.year }}</span>
      </div>

      <div class="space-y-2">
        <h3 class="font-display text-xl font-semibold tracking-tight">{{ project.title }}</h3>
        <p class="text-sm font-medium text-brand-600 dark:text-brand-300">
          {{ project.tagline }}
        </p>
        <p class="text-sm leading-relaxed text-muted">{{ project.description }}</p>
      </div>

      <ul v-if="project.highlights?.length" class="space-y-2">
        <li
          v-for="highlight in project.highlights"
          :key="highlight"
          class="flex gap-2.5 text-sm text-muted"
        >
          <AppIcon name="check" :size="16" class="mt-0.5 text-brand-400" />
          <span>{{ highlight }}</span>
        </li>
      </ul>

      <div class="mt-auto space-y-4 pt-2">
        <div class="flex flex-wrap gap-2">
          <TagPill v-for="tag in project.tags" :key="tag" :label="tag" size="sm" />
        </div>

        <div class="flex items-center gap-4 border-t border-line pt-4 text-sm">
          <span v-if="project.role" class="text-xs text-muted">{{ project.role }}</span>

          <div class="ml-auto flex items-center gap-3">
            <a
              v-if="project.links?.demo"
              :href="project.links.demo"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 font-medium text-brand-600 transition-colors hover:text-brand-400 dark:text-brand-300"
            >
              Live
              <AppIcon name="arrowUpRight" :size="15" />
            </a>
            <a
              v-if="project.links?.repo"
              :href="project.links.repo"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 font-medium text-muted transition-colors hover:text-fg"
            >
              Code
              <AppIcon name="github" :size="15" />
            </a>
            <span
              v-if="project.internal"
              class="inline-flex items-center gap-1.5 text-xs text-muted"
              title="Internal system — source and demo are not public"
            >
              <AppIcon name="lock" :size="14" />
              Internal
            </span>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
