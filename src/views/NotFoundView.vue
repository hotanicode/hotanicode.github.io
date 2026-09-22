<script setup>
import { RouterLink } from 'vue-router'
import AppButton from '@/components/ui/AppButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
</script>

<template>
  <section class="relative grid min-h-[100svh] place-items-center overflow-hidden px-6 py-24">
    <div class="grid-backdrop pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
    <div
      class="pointer-events-none absolute top-0 left-1/2 size-[34rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[120px]"
      aria-hidden="true"
    />

    <div class="relative text-center">
      <p class="font-display text-7xl font-semibold text-gradient sm:text-9xl">404</p>
      <h1 class="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        This page took a wrong turn.
      </h1>
      <p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
        The link is broken or the page has moved. Everything worth seeing lives on the home page.
      </p>

      <AppButton :as="RouterLink" to="/" size="lg" class="mt-8">
        <template #leading><AppIcon name="arrowRight" :size="18" class="rotate-180" /></template>
        Back home
      </AppButton>
    </div>
  </section>
</template>
