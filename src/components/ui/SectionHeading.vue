<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  align: { type: String, default: 'left', validator: (v) => ['left', 'center'].includes(v) },
})
</script>

<template>
  <header :class="['max-w-2xl', align === 'center' ? 'mx-auto text-center' : '']">
    <p
      v-if="eyebrow"
      data-reveal
      class="reveal mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-elevated/60 px-3 py-1 font-mono text-xs tracking-[0.18em] text-brand-500 uppercase dark:text-brand-300"
    >
      <span class="size-1.5 rounded-full bg-brand-400" />
      {{ eyebrow }}
    </p>

    <h2
      data-reveal
      class="reveal font-display text-3xl leading-tight font-semibold text-balance sm:text-4xl md:text-[2.75rem]"
    >
      {{ title }}
    </h2>

    <p v-if="description" data-reveal class="reveal mt-4 text-base leading-relaxed text-muted">
      {{ description }}
    </p>

    <slot />
  </header>
</template>
