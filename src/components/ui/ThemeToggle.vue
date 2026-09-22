<script setup>
import { storeToRefs } from 'pinia'
import { useUiStore } from '@/stores/ui'
import AppIcon from './AppIcon.vue'

const ui = useUiStore()
const { isDark } = storeToRefs(ui)
</script>

<template>
  <button
    type="button"
    class="relative grid size-10 place-items-center rounded-full border border-line bg-elevated/70 text-muted transition-colors duration-300 hover:border-brand-400/60 hover:text-brand-500 dark:hover:text-brand-300"
    :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    :aria-pressed="isDark"
    @click="ui.toggleTheme()"
  >
    <Transition
      enter-active-class="transition duration-300"
      enter-from-class="opacity-0 rotate-90 scale-50"
      leave-active-class="absolute transition duration-300"
      leave-to-class="opacity-0 -rotate-90 scale-50"
      mode="out-in"
    >
      <AppIcon :key="isDark ? 'moon' : 'sun'" :name="isDark ? 'moon' : 'sun'" :size="18" />
    </Transition>
  </button>
</template>
