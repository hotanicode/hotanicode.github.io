<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLenis } from '@/composables/useLenis'
import SiteHeader from '@/components/sections/SiteHeader.vue'
import SiteFooter from '@/components/sections/SiteFooter.vue'

const route = useRoute()

// Page-level smooth scrolling, kept in sync with GSAP ScrollTrigger.
useLenis()

const isHome = computed(() => route.name === 'home')
</script>

<template>
  <a
    href="#main"
    class="sr-only rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60"
  >
    Skip to content
  </a>

  <SiteHeader v-if="isHome" />

  <main id="main">
    <RouterView v-slot="{ Component }">
      <Transition
        enter-active-class="transition-opacity duration-500 ease-out"
        enter-from-class="opacity-0"
        leave-active-class="transition-opacity duration-200 ease-in"
        leave-to-class="opacity-0"
        mode="out-in"
      >
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>

  <SiteFooter v-if="isHome" />
</template>
