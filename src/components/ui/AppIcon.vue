<script setup>
import { computed } from 'vue'

/**
 * Inline SVG icon set — keeps the bundle free of an icon dependency.
 * Stroke icons inherit `currentColor`; brand marks are filled.
 */
const STROKE_ICONS = {
  mail: [
    'M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z',
    'm3.8 6.8 8.2 5.6 8.2-5.6',
  ],
  phone: [
    'M6.4 3h2.9l1.5 3.9-2 1.4a12.4 12.4 0 0 0 5.9 5.9l1.4-2 3.9 1.5v2.9a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 3.2 5.2 2 2 0 0 1 5.2 3z',
  ],
  pin: [
    'M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z',
    'M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  ],
  download: ['M12 3.5v11.5', 'm7 10.5 5 5 5-5', 'M4.5 20h15'],
  arrowRight: ['M4 12h15', 'm13 6 6 6-6 6'],
  arrowUpRight: ['M7.5 16.5 16.5 7.5', 'M8.5 7.5h8v8'],
  external: [
    'M14 4h6v6',
    'M20 4 11 13',
    'M18 14.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.5',
  ],
  sun: [
    'M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z',
    'M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4',
  ],
  moon: ['M20.5 14.8A8.6 8.6 0 0 1 9.2 3.5a8.6 8.6 0 1 0 11.3 11.3z'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  close: ['m6 6 12 12', 'm18 6-12 12'],
  code: ['m9 8-5 4 5 4', 'm15 8 5 4-5 4', 'm13.6 4.5-3.2 15'],
  layers: ['m12 3 8.5 4.5L12 12 3.5 7.5z', 'm3.5 12 8.5 4.5 8.5-4.5', 'm3.5 16.5 8.5 4.5 8.5-4.5'],
  database: [
    'M12 3c4.1 0 7.5 1.3 7.5 3s-3.4 3-7.5 3-7.5-1.3-7.5-3S7.9 3 12 3z',
    'M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6',
    'M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3',
  ],
  spark: [
    'm12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z',
    'm18 15.5.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z',
  ],
  sparkles: [
    'm12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z',
    'm18 15.5.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z',
  ],
  terminal: ['m5 8 4 4-4 4', 'M12.5 16.5h6.5'],
  chess: [
    'M12 3.5a2.9 2.9 0 0 1 1.7 5.2c1.4.9 2.3 2.4 2.3 4.1H8c0-1.7.9-3.2 2.3-4.1A2.9 2.9 0 0 1 12 3.5z',
    'M8 12.8h8l-1 5.2H9z',
    'M6 21h12',
  ],
  check: ['m5 12.5 4.5 4.5L19 7.5'],
  chevronDown: ['m6 9.5 6 6 6-6'],
  lock: ['M5.5 10.5h13v9.5h-13z', 'M8.5 10.5V8a3.5 3.5 0 1 1 7 0v2.5'],
  briefcase: [
    'M3.5 7.5h17V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19z',
    'M9 7.5V6A1.5 1.5 0 0 1 10.5 4.5h3A1.5 1.5 0 0 1 15 6v1.5',
  ],
  cap: ['m12 4 9 4.5-9 4.5-9-4.5z', 'M6.5 10.8V16c0 1.7 2.5 3 5.5 3s5.5-1.3 5.5-3v-5.2'],
  copy: ['M9 9h10v11H9z', 'M15 9V5H5v10h4'],
  send: ['m21 3-9.4 18-2.2-7.4L2 11.4z'],
}

const FILL_ICONS = {
  github:
    'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.6 9.6 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z',
  linkedin:
    'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9.5 9h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05 4.02 0 4.76 2.6 4.76 5.98V21h-4v-5.3c0-1.26-.02-2.9-1.8-2.9-1.81 0-2.08 1.38-2.08 2.8V21h-4z',
}

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 },
  strokeWidth: { type: [Number, String], default: 1.6 },
})

const paths = computed(() => STROKE_ICONS[props.name] ?? [])
const fillPath = computed(() => FILL_ICONS[props.name] ?? null)
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    class="shrink-0"
  >
    <path v-if="fillPath" :d="fillPath" fill="currentColor" />
    <template v-else>
      <path
        v-for="(d, index) in paths"
        :key="index"
        :d="d"
        fill="none"
        stroke="currentColor"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>
  </svg>
</template>
