<script setup>
defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  /** Slight tilt, in degrees, for the fanned-out layout. */
  tilt: { type: Number, default: 0 },
})
</script>

<template>
  <figure
    class="relative shrink-0 snap-center transition-transform duration-500 ease-out will-change-transform hover:z-20 hover:-translate-y-2 hover:rotate-0"
    :style="{ transform: `rotate(${tilt}deg)` }"
  >
    <!-- Device frame -->
    <div
      class="relative overflow-hidden rounded-[2rem] border border-line bg-elevated p-1.5 shadow-2xl shadow-black/25 ring-1 ring-black/5"
    >
      <!-- Notch -->
      <span
        class="absolute top-2.5 left-1/2 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-black/60"
        aria-hidden="true"
      />

      <img
        :src="src"
        :alt="alt"
        loading="lazy"
        decoding="async"
        width="1080"
        height="2400"
        class="block w-full rounded-[1.6rem] object-cover"
      />
    </div>

    <!-- Glow under the device -->
    <div
      class="pointer-events-none absolute -inset-x-4 -bottom-6 h-10 rounded-full bg-brand-500/20 blur-2xl"
      aria-hidden="true"
    />
  </figure>
</template>
