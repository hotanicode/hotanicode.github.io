<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { navLinks, profile } from '@/data/profile'
import { useActiveSection } from '@/composables/useActiveSection'
import { scrollTo, startScroll, stopScroll } from '@/composables/useLenis'
import { useUiStore } from '@/stores/ui'
import AppButton from '@/components/ui/AppButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'

const ui = useUiStore()
const { menuOpen } = storeToRefs(ui)

const sectionIds = navLinks.map((link) => link.hash.slice(1))
const { activeId } = useActiveSection(sectionIds)

const scrolled = ref(false)
const progress = ref(0)

const onScroll = () => {
  const y = window.scrollY
  const max = document.documentElement.scrollHeight - window.innerHeight
  scrolled.value = y > 24
  progress.value = max > 0 ? Math.min(100, (y / max) * 100) : 0
}

const onKeydown = (event) => {
  if (event.key === 'Escape') ui.closeMenu()
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  document.body.style.removeProperty('overflow')
  startScroll()
})

// Lock the page behind the mobile menu.
watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) stopScroll()
  else startScroll()
})

const goTo = (hash) => {
  ui.closeMenu()
  scrollTo(hash, { offset: -76 })
}

const headerClasses = computed(() => [
  'fixed inset-x-0 top-0 z-50 transition-all duration-500',
  scrolled.value
    ? 'border-b border-line bg-surface/80 backdrop-blur-xl'
    : 'border-b border-transparent bg-transparent',
])
</script>

<template>
  <header :class="headerClasses">
    <!-- Reading progress -->
    <div
      class="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-brand-400 to-accent-400 transition-transform duration-150"
      :style="{ transform: `scaleX(${progress / 100})` }"
      aria-hidden="true"
    />

    <div class="container-page flex h-[4.5rem] items-center justify-between gap-6">
      <a
        href="#home"
        class="group inline-flex items-center gap-2.5 font-display text-base font-semibold tracking-tight"
        @click.prevent="goTo('#home')"
      >
        <span
          class="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-bold text-white shadow-lg shadow-brand-500/25 transition-transform duration-300 group-hover:scale-105"
        >
          {{ profile.initials }}
        </span>
        <span class="hidden sm:inline">{{ profile.name }}</span>
      </a>

      <nav class="hidden items-center gap-1 lg:flex" aria-label="Primary">
        <a
          v-for="link in navLinks"
          :key="link.hash"
          :href="link.hash"
          :class="[
            'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300',
            activeId === link.hash.slice(1) ? 'text-fg' : 'text-muted hover:text-fg',
          ]"
          :aria-current="activeId === link.hash.slice(1) ? 'true' : undefined"
          @click.prevent="goTo(link.hash)"
        >
          <span
            v-if="activeId === link.hash.slice(1)"
            class="absolute inset-0 rounded-full bg-fg/[0.06]"
            aria-hidden="true"
          />
          <span class="relative">{{ link.label }}</span>
        </a>
      </nav>

      <div class="flex items-center gap-2">
        <ThemeToggle />

        <AppButton
          :href="profile.resume"
          size="sm"
          variant="primary"
          external
          class="hidden sm:inline-flex"
        >
          <template #leading><AppIcon name="download" :size="16" /></template>
          Resume
        </AppButton>

        <button
          type="button"
          class="grid size-10 place-items-center rounded-full border border-line bg-elevated/70 text-fg transition-colors hover:border-brand-400/60 lg:hidden"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          @click="ui.toggleMenu()"
        >
          <AppIcon :name="menuOpen ? 'close' : 'menu'" :size="20" />
        </button>
      </div>
    </div>

    <!-- Mobile navigation -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <nav
        v-if="menuOpen"
        id="mobile-nav"
        class="border-t border-line bg-surface/95 backdrop-blur-xl lg:hidden"
        aria-label="Mobile"
      >
        <div class="container-page flex flex-col gap-1 py-5">
          <a
            v-for="link in navLinks"
            :key="link.hash"
            :href="link.hash"
            :class="[
              'rounded-xl px-4 py-3 text-base font-medium transition-colors',
              activeId === link.hash.slice(1)
                ? 'bg-fg/[0.06] text-fg'
                : 'text-muted hover:bg-fg/[0.04] hover:text-fg',
            ]"
            @click.prevent="goTo(link.hash)"
          >
            {{ link.label }}
          </a>

          <AppButton :href="profile.resume" class="mt-3" block external>
            <template #leading><AppIcon name="download" :size="16" /></template>
            Download résumé
          </AppButton>
        </div>
      </nav>
    </Transition>
  </header>
</template>
