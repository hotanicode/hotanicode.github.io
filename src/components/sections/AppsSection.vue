<script setup>
import { miniBuilds, otherApps, showcasedApps } from '@/data/apps'
import AppShowcase from '@/components/ui/AppShowcase.vue'
import AppShowcaseCard from '@/components/ui/AppShowcaseCard.vue'
import MiniBuildCard from '@/components/ui/MiniBuildCard.vue'
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

      <!-- Weekend-sized frontend challenges -->
      <div v-if="miniBuilds.length" class="mt-20">
        <div data-reveal class="reveal flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <h3 class="font-display text-xl font-semibold tracking-tight">Small builds</h3>
          <p class="text-sm text-muted">
            Weekend frontend challenges I use to keep the fundamentals sharp.
          </p>
        </div>

        <div class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <MiniBuildCard v-for="build in miniBuilds" :key="build.id" :build="build" />
        </div>
      </div>
    </div>
  </section>
</template>
