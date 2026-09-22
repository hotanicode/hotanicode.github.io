<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** `button`, `a` or any component — inferred from `href`/`to` when omitted. */
  as: { type: [String, Object], default: null },
  href: { type: String, default: null },
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'ghost', 'outline'].includes(v),
  },
  size: { type: String, default: 'md', validator: (v) => ['sm', 'md', 'lg'].includes(v) },
  block: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  external: { type: Boolean, default: false },
})

const tag = computed(() => props.as ?? (props.href ? 'a' : 'button'))

const VARIANTS = {
  primary:
    'bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5',
  secondary:
    'bg-elevated text-fg border border-line hover:border-brand-400/70 hover:-translate-y-0.5',
  outline:
    'border border-brand-400/60 text-brand-500 dark:text-brand-300 hover:bg-brand-400/10 hover:-translate-y-0.5',
  ghost: 'text-muted hover:text-fg hover:bg-fg/5',
}

const SIZES = {
  sm: 'text-sm px-3.5 py-2 gap-1.5',
  md: 'text-sm px-5 py-2.5 gap-2',
  lg: 'text-base px-6 py-3 gap-2.5',
}

const classes = computed(() => [
  'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400',
  VARIANTS[props.variant],
  SIZES[props.size],
  props.block ? 'w-full' : '',
  props.disabled ? 'pointer-events-none opacity-50' : '',
])

const linkAttrs = computed(() =>
  props.external ? { target: '_blank', rel: 'noopener noreferrer' } : {},
)
</script>

<template>
  <component
    :is="tag"
    :href="href"
    :class="classes"
    :disabled="tag === 'button' && disabled ? true : undefined"
    :aria-disabled="disabled || undefined"
    v-bind="linkAttrs"
  >
    <slot name="leading" />
    <slot />
    <slot name="trailing" />
  </component>
</template>
