<script setup>
import AppIcon from './AppIcon.vue'
import TagPill from './TagPill.vue'

defineProps({
  item: { type: Object, required: true },
})
</script>

<template>
  <li data-reveal class="reveal relative pl-10 sm:pl-14">
    <!-- Node on the vertical rail -->
    <span
      :class="[
        'absolute left-2.5 top-2 grid size-4 place-items-center rounded-full ring-4 ring-surface sm:left-4.5',
        item.current ? 'bg-brand-400' : 'bg-line',
      ]"
    >
      <span v-if="item.current" class="absolute size-4 animate-ping rounded-full bg-brand-400/60" />
    </span>

    <div
      class="surface-card rounded-2xl p-5 transition-colors duration-300 hover:border-brand-400/40 sm:p-6"
    >
      <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h3 class="font-display text-lg font-semibold tracking-tight">{{ item.role }}</h3>
        <TagPill v-if="item.current" label="Current" tone="success" size="sm" />
      </div>

      <p class="mt-1 text-sm font-medium text-brand-600 dark:text-brand-300">{{ item.company }}</p>

      <div class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted">
        <span class="inline-flex items-center gap-1.5">
          <AppIcon name="briefcase" :size="14" />
          {{ item.start }} — {{ item.end }}
        </span>
        <span v-if="item.location" class="inline-flex items-center gap-1.5">
          <AppIcon name="pin" :size="14" />
          {{ item.location }}
        </span>
      </div>

      <p v-if="item.summary" class="mt-4 text-sm leading-relaxed text-muted">{{ item.summary }}</p>

      <ul v-if="item.highlights?.length" class="mt-4 space-y-2">
        <li
          v-for="highlight in item.highlights"
          :key="highlight"
          class="flex gap-2.5 text-sm leading-relaxed text-muted"
        >
          <span class="mt-2 size-1.5 shrink-0 rounded-full bg-brand-400/70" />
          <span>{{ highlight }}</span>
        </li>
      </ul>

      <div v-if="item.stack?.length" class="mt-5 flex flex-wrap gap-2">
        <TagPill v-for="tech in item.stack" :key="tech" :label="tech" size="sm" />
      </div>
    </div>
  </li>
</template>
