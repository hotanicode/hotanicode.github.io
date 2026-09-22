<script setup>
import { otherApps, showcasedApps } from '@/data/apps'
import AppShowcase from '@/components/ui/AppShowcase.vue'
import AppShowcaseCard from '@/components/ui/AppShowcaseCard.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
</script>

<template>
  <section id="apps" class="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
    <div
      class="pointer-events-none absolute top-1/4 -left-40 size-[30rem] rounded-full bg-brand-500/10 blur-[130px]"
      aria-hidden="true"
    />

    <div class="container-page relative">
      <SectionHeading
        eyebrow="Apps & side projects"
        title="Things I build after hours."
        description="Smaller builds where I try out ideas, new tooling and the occasional itch that needed scratching."
      />

      <div v-if="showcasedApps.length" class="mt-16 space-y-20 sm:space-y-24">
        <AppShowcase
          v-for="(app, index) in showcasedApps"
          :key="app.id"
          :app="app"
          :reverse="index % 2 === 1"
        />
      </div>

      <div v-if="otherApps.length" class="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <AppShowcaseCard v-for="app in otherApps" :key="app.id" :app="app" />
      </div>
    </div>
  </section>
</template>
