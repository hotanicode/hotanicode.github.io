<script setup>
import { navLinks, profile, socials } from '@/data/profile'
import { scrollTo } from '@/composables/useLenis'
import AppIcon from '@/components/ui/AppIcon.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative border-t border-line py-12">
    <div class="container-page">
      <div class="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div class="max-w-sm">
          <a
            href="#home"
            class="inline-flex items-center gap-2.5 font-display text-base font-semibold tracking-tight"
            @click.prevent="scrollTo('#home')"
          >
            <span
              class="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-bold text-white"
            >
              {{ profile.initials }}
            </span>
            {{ profile.name }}
          </a>

          <p class="mt-4 text-sm leading-relaxed text-muted">
            {{ profile.role }} in {{ profile.location }}. Building reliable backends and the
            interfaces that sit on top of them.
          </p>

          <div class="mt-5 flex items-center gap-2">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.url"
              :target="social.icon === 'mail' ? undefined : '_blank'"
              rel="noopener noreferrer"
              :aria-label="social.name"
              class="grid size-10 place-items-center rounded-xl border border-line text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/60 hover:text-brand-500 dark:hover:text-brand-300"
            >
              <AppIcon :name="social.icon" :size="18" />
            </a>
          </div>
        </div>

        <nav class="grid grid-cols-2 gap-x-12 gap-y-2 sm:grid-cols-3" aria-label="Footer">
          <a
            v-for="link in navLinks"
            :key="link.hash"
            :href="link.hash"
            class="text-sm text-muted transition-colors hover:text-fg"
            @click.prevent="scrollTo(link.hash)"
          >
            {{ link.label }}
          </a>
        </nav>
      </div>

      <div
        class="mt-10 flex flex-col-reverse items-center gap-4 border-t border-line pt-6 sm:flex-row sm:justify-between"
      >
        <p class="text-xs text-muted">
          © {{ year }} {{ profile.name }}. Built with Vue 3, Tailwind CSS &amp; GSAP.
        </p>

        <button
          type="button"
          class="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-xs font-medium text-muted transition-colors hover:border-brand-400/60 hover:text-fg"
          @click="scrollTo('#home')"
        >
          Back to top
          <AppIcon name="arrowUpRight" :size="14" />
        </button>
      </div>
    </div>
  </footer>
</template>
