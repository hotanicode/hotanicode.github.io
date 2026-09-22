<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import { profile, socials, stats } from '@/data/profile'
import { useThreeBackground } from '@/composables/useThreeBackground'
import { prefersReducedMotion } from '@/composables/useReducedMotion'
import { scrollTo } from '@/composables/useLenis'
import AppButton from '@/components/ui/AppButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const canvas = ref(null)
const root = ref(null)
const typed = ref(profile.roles[0])

useThreeBackground(canvas, { count: 900 })

let timeoutId = null
let ctx = null

/** Types and deletes each role in turn. */
function runTypewriter() {
  if (prefersReducedMotion()) return

  let roleIndex = 0
  let charIndex = profile.roles[0].length
  let deleting = false

  const step = () => {
    const word = profile.roles[roleIndex]
    charIndex += deleting ? -1 : 1
    typed.value = word.slice(0, charIndex)

    let delay = deleting ? 45 : 95

    if (!deleting && charIndex === word.length) {
      delay = 2100
      deleting = true
    } else if (deleting && charIndex === 0) {
      deleting = false
      roleIndex = (roleIndex + 1) % profile.roles.length
      delay = 320
    }

    timeoutId = window.setTimeout(step, delay)
  }

  timeoutId = window.setTimeout(step, 2100)
}

onMounted(() => {
  runTypewriter()

  const el = root.value
  // Skip the intro when motion is reduced or the node is detached (unit tests).
  if (!el?.isConnected || prefersReducedMotion()) return

  ctx = gsap.context(() => {
    gsap
      .timeline({ defaults: { ease: 'power3.out', duration: 0.9 } })
      .from('[data-hero="badge"]', { y: 18, opacity: 0 })
      .from('[data-hero="title"]', { y: 34, opacity: 0 }, '-=0.6')
      .from('[data-hero="role"]', { y: 24, opacity: 0 }, '-=0.65')
      .from('[data-hero="copy"]', { y: 22, opacity: 0 }, '-=0.65')
      .from('[data-hero="actions"] > *', { y: 20, opacity: 0, stagger: 0.09 }, '-=0.6')
      .from('[data-hero="stat"]', { y: 20, opacity: 0, stagger: 0.08 }, '-=0.55')
      .from('[data-hero="cue"]', { opacity: 0 }, '-=0.3')
  }, el)
})

onBeforeUnmount(() => {
  if (timeoutId) clearTimeout(timeoutId)
  ctx?.revert()
})
</script>

<template>
  <section
    id="home"
    ref="root"
    class="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20"
  >
    <!-- Layered background: particles, grid, glow -->
    <canvas ref="canvas" class="absolute inset-0 size-full opacity-70" aria-hidden="true" />
    <div class="grid-backdrop pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
    <div
      class="pointer-events-none absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-brand-500/15 blur-[120px]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-32 right-0 size-[30rem] rounded-full bg-accent-500/10 blur-[110px]"
      aria-hidden="true"
    />

    <div class="container-page relative">
      <div class="max-w-3xl">
        <p
          data-hero="badge"
          class="inline-flex items-center gap-2 rounded-full border border-line bg-elevated/60 px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur"
        >
          <span class="relative flex size-2">
            <span
              class="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75"
            />
            <span class="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          {{ profile.availability }}
        </p>

        <h1
          data-hero="title"
          class="mt-6 font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl"
        >
          Hi, I'm <span class="text-gradient">{{ profile.firstName }}</span
          >.<br />
          {{ profile.headline }}
        </h1>

        <p
          data-hero="role"
          class="mt-6 font-mono text-base text-brand-600 sm:text-lg dark:text-brand-300"
        >
          <span class="text-muted">&gt;</span> {{ typed
          }}<span class="ml-0.5 inline-block animate-blink">_</span>
        </p>

        <p data-hero="copy" class="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {{ profile.summary }}
        </p>

        <div data-hero="actions" class="mt-9 flex flex-wrap items-center gap-3">
          <AppButton size="lg" href="#projects" @click.prevent="scrollTo('#projects')">
            View my work
            <template #trailing><AppIcon name="arrowRight" :size="18" /></template>
          </AppButton>

          <AppButton size="lg" variant="secondary" :href="profile.resume" external>
            <template #leading><AppIcon name="download" :size="18" /></template>
            Résumé
          </AppButton>

          <div class="ml-1 flex items-center gap-1">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.url"
              :target="social.icon === 'mail' ? undefined : '_blank'"
              rel="noopener noreferrer"
              :aria-label="social.name"
              class="grid size-11 place-items-center rounded-full text-muted transition-all duration-300 hover:-translate-y-0.5 hover:bg-fg/5 hover:text-brand-500 dark:hover:text-brand-300"
            >
              <AppIcon :name="social.icon" :size="20" />
            </a>
          </div>
        </div>
      </div>

      <dl
        class="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4"
      >
        <div
          v-for="stat in stats"
          :key="stat.label"
          data-hero="stat"
          class="bg-surface/80 px-5 py-6 backdrop-blur"
        >
          <dt class="font-display text-2xl font-semibold text-gradient sm:text-3xl">
            {{ stat.value }}
          </dt>
          <dd class="mt-1 text-xs leading-snug text-muted sm:text-sm">{{ stat.label }}</dd>
        </div>
      </dl>
    </div>

    <button
      data-hero="cue"
      type="button"
      class="absolute inset-x-0 bottom-7 mx-auto flex w-fit flex-col items-center gap-1.5 text-muted transition-colors hover:text-brand-400"
      aria-label="Scroll to about section"
      @click="scrollTo('#about')"
    >
      <span class="font-mono text-[10px] tracking-[0.25em] uppercase">Scroll</span>
      <AppIcon name="chevronDown" :size="18" class="animate-float" />
    </button>
  </section>
</template>
