<script setup>
import { education, experience } from '@/data/experience'
import { profile } from '@/data/profile'
import AppButton from '@/components/ui/AppButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import TimelineItem from '@/components/ui/TimelineItem.vue'
</script>

<template>
  <section id="experience" class="relative scroll-mt-24 py-24 sm:py-32">
    <div class="container-page">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've been building."
        description="Three years of shipping and maintaining systems that stay in production long after the launch demo."
      />

      <div class="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-8">
          <ol class="relative space-y-6">
            <!-- Vertical rail -->
            <span
              class="absolute top-2 bottom-2 left-4 w-px bg-gradient-to-b from-brand-400/60 via-line to-transparent sm:left-6"
              aria-hidden="true"
            />
            <TimelineItem v-for="item in experience" :key="item.id" :item="item" />
          </ol>
        </div>

        <aside class="space-y-6 lg:col-span-4">
          <div data-reveal class="reveal surface-card rounded-3xl p-6 sm:p-7">
            <h3 class="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
              <AppIcon name="cap" :size="20" class="text-brand-400" />
              Education
            </h3>

            <div v-for="item in education" :key="item.id" class="mt-5 space-y-1.5">
              <p class="text-sm font-medium">{{ item.qualification }}</p>
              <p class="text-sm text-muted">{{ item.institution }}</p>
              <p class="font-mono text-xs text-muted">{{ item.start }} — {{ item.end }}</p>
              <p
                v-if="item.note"
                class="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-300"
              >
                <AppIcon name="check" :size="13" />
                {{ item.note }}
              </p>
            </div>
          </div>

          <div
            data-reveal
            class="reveal surface-card rounded-3xl bg-gradient-to-br from-brand-500/10 to-accent-500/10 p-6 sm:p-7"
          >
            <h3 class="font-display text-lg font-semibold tracking-tight">
              Want the full history?
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">
              The résumé has the complete breakdown of roles, tooling and responsibilities.
            </p>
            <AppButton :href="profile.resume" class="mt-5" block external>
              <template #leading><AppIcon name="download" :size="16" /></template>
              Download résumé
            </AppButton>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>
