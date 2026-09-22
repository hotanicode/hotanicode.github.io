<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { gsap, refreshScrollTrigger } from '@/composables/useGsap'
import { projectCategories, projects } from '@/data/projects'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'

const activeCategory = ref('All')
const grid = ref(null)

const visibleProjects = computed(() =>
  activeCategory.value === 'All'
    ? projects
    : projects.filter((project) => project.category === activeCategory.value),
)

// Cards enter with the shared `reveal` class; after filtering they are fresh
// DOM nodes, so animate them in here instead of waiting for a ScrollTrigger.
watch(activeCategory, async () => {
  await nextTick()
  const cards = grid.value?.querySelectorAll('[data-reveal]') ?? []
  if (!cards.length) return

  cards.forEach((card) => card.classList.remove('reveal'))
  gsap.fromTo(
    cards,
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.06, overwrite: true },
  )
  refreshScrollTrigger()
})
</script>

<template>
  <section id="projects" class="relative scroll-mt-24 py-24 sm:py-32">
    <div
      class="pointer-events-none absolute top-24 -right-40 size-[30rem] rounded-full bg-brand-500/10 blur-[130px]"
      aria-hidden="true"
    />

    <div class="container-page relative">
      <SectionHeading
        eyebrow="Projects"
        title="Systems people use every day."
        description="Production platforms I have designed, migrated or rebuilt — most of them internal, all of them load-bearing."
      />

      <div
        data-reveal
        class="reveal mt-10 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter projects by category"
      >
        <button
          v-for="category in projectCategories"
          :key="category"
          type="button"
          role="tab"
          :aria-selected="activeCategory === category"
          :class="[
            'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300',
            activeCategory === category
              ? 'border-transparent bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/20'
              : 'border-line text-muted hover:border-brand-400/50 hover:text-fg',
          ]"
          @click="activeCategory = category"
        >
          {{ category }}
        </button>
      </div>

      <div ref="grid">
        <TransitionGroup
          tag="div"
          class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          move-class="transition-transform duration-500"
          leave-active-class="absolute opacity-0 scale-95 transition-all duration-200"
        >
          <ProjectCard v-for="project in visibleProjects" :key="project.id" :project="project" />
        </TransitionGroup>
      </div>
    </div>
  </section>
</template>
