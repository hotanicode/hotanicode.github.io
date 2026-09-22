<script setup>
import { skillGroups, techMarquee } from '@/data/skills'
import AppIcon from '@/components/ui/AppIcon.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import SkillMeter from '@/components/ui/SkillMeter.vue'
</script>

<template>
  <section id="skills" class="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
    <div
      class="pointer-events-none absolute top-1/3 -left-40 size-[28rem] rounded-full bg-accent-500/10 blur-[120px]"
      aria-hidden="true"
    />

    <div class="container-page relative">
      <SectionHeading
        eyebrow="Skills"
        title="The stack I reach for."
        description="Languages, frameworks and infrastructure I use to take an idea from a schema sketch to a deployed service."
      />

      <div class="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="group in skillGroups"
          :key="group.title"
          data-reveal
          class="reveal surface-card rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand-400/50"
        >
          <span
            class="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 text-brand-500 ring-1 ring-line dark:text-brand-300"
          >
            <AppIcon :name="group.icon" :size="20" />
          </span>

          <h3 class="mt-4 font-display text-lg font-semibold tracking-tight">{{ group.title }}</h3>
          <p class="mt-1 text-sm text-muted">{{ group.blurb }}</p>

          <ul class="mt-6 space-y-4">
            <SkillMeter
              v-for="skill in group.skills"
              :key="skill.name"
              :name="skill.name"
              :level="skill.level"
            />
          </ul>
        </article>
      </div>
    </div>

    <!-- Infinite tech marquee -->
    <div
      class="relative mt-16 flex overflow-hidden border-y border-line py-5 select-none [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
      aria-hidden="true"
    >
      <div class="flex shrink-0 animate-marquee items-center gap-10 pr-10">
        <template v-for="pass in 2" :key="pass">
          <span
            v-for="tech in techMarquee"
            :key="`${pass}-${tech}`"
            class="font-display text-lg font-medium whitespace-nowrap text-muted/70 sm:text-xl"
          >
            {{ tech }}
            <span class="ml-10 text-brand-400">/</span>
          </span>
        </template>
      </div>
    </div>
  </section>
</template>
