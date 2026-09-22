<script setup>
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'
import PhoneMockup from './PhoneMockup.vue'
import TagPill from './TagPill.vue'

const props = defineProps({
  app: { type: Object, required: true },
  /** Flips the text/screenshots order on large screens. */
  reverse: { type: Boolean, default: false },
})

const STATUS_TONES = {
  Live: 'success',
  'In progress': 'brand',
  Concept: 'accent',
}

const statusTone = computed(() => STATUS_TONES[props.app.status] ?? 'neutral')

/** Fan the screenshots out slightly, with the middle one upright. */
const tiltFor = (index, total) => {
  if (total < 2) return 0
  const middle = (total - 1) / 2
  return (index - middle) * 4
}
</script>

<template>
  <article class="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
    <div
      data-reveal
      class="reveal space-y-5 lg:col-span-5"
      :class="reverse ? 'lg:order-2' : 'lg:order-1'"
    >
      <div class="flex items-center gap-4">
        <span
          class="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 text-brand-500 ring-1 ring-line dark:text-brand-300"
        >
          <AppIcon :name="app.icon" :size="22" />
        </span>
        <div>
          <h3 class="font-display text-2xl font-semibold tracking-tight">{{ app.name }}</h3>
          <p class="text-sm text-muted">{{ app.platform }} · {{ app.year }}</p>
        </div>
      </div>

      <p class="text-base font-medium text-brand-600 dark:text-brand-300">{{ app.tagline }}</p>
      <p class="text-sm leading-relaxed text-muted">{{ app.description }}</p>

      <ul v-if="app.highlights?.length" class="space-y-2">
        <li
          v-for="highlight in app.highlights"
          :key="highlight"
          class="flex gap-2.5 text-sm text-muted"
        >
          <AppIcon name="check" :size="16" class="mt-0.5 text-brand-400" />
          <span>{{ highlight }}</span>
        </li>
      </ul>

      <div class="flex flex-wrap items-center gap-2 pt-1">
        <TagPill :label="app.status" :tone="statusTone" size="sm" />
        <TagPill v-for="tag in app.tags" :key="tag" :label="tag" size="sm" />
      </div>

      <div v-if="app.links?.demo || app.links?.repo" class="flex items-center gap-5 pt-1 text-sm">
        <a
          v-if="app.links?.demo"
          :href="app.links.demo"
          target="_blank"
          rel="noopener noreferrer"
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

    <div
      data-reveal
      class="reveal relative lg:col-span-7"
      :class="reverse ? 'lg:order-1' : 'lg:order-2'"
    >
      <div
        class="pointer-events-none absolute inset-0 -z-10 rounded-full bg-accent-500/10 blur-[90px]"
        aria-hidden="true"
      />

      <div
        class="-mx-5 flex snap-x snap-mandatory items-center gap-5 overflow-x-auto px-5 pt-2 pb-8 sm:mx-0 sm:justify-center sm:overflow-visible sm:px-0"
      >
        <PhoneMockup
          v-for="(shot, index) in app.screenshots"
          :key="shot.src"
          :src="shot.src"
          :alt="`${app.name} — ${shot.caption}`"
          :tilt="tiltFor(index, app.screenshots.length)"
          class="w-40 sm:w-44 lg:w-48"
          :class="index === Math.floor(app.screenshots.length / 2) ? 'sm:z-10 sm:scale-105' : ''"
        />
      </div>
    </div>
  </article>
</template>
