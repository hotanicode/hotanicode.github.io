<script setup>
import { education } from '@/data/experience'
import { profile } from '@/data/profile'
import AppIcon from '@/components/ui/AppIcon.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import TagPill from '@/components/ui/TagPill.vue'

const facts = [
  { icon: 'pin', label: 'Based in', value: profile.location },
  { icon: 'briefcase', label: 'Currently', value: 'Strathmore University I.C.T' },
  { icon: 'cap', label: 'Education', value: education[0].qualification },
  { icon: 'mail', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
]
</script>

<template>
  <section id="about" class="relative scroll-mt-24 py-24 sm:py-32">
    <div class="container-page">
      <SectionHeading
        eyebrow="About"
        title="Backend depth, full-stack range."
        description="I work where reliability matters claims processing, payments and internal platforms that a whole campus depends on."
      />

      <div class="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div class="space-y-5 lg:col-span-7">
          <p
            v-for="(paragraph, index) in profile.bio"
            :key="index"
            data-reveal
            class="reveal text-base leading-relaxed text-muted"
          >
            {{ paragraph }}
          </p>

          <div data-reveal class="reveal flex flex-wrap gap-2 pt-2">
            <TagPill
              v-for="interest in profile.interests"
              :key="interest"
              :label="interest"
              tone="accent"
            />
          </div>
        </div>

        <div class="space-y-4 lg:col-span-5">
          <dl data-reveal class="reveal surface-card space-y-5 rounded-3xl p-6 sm:p-7">
            <div v-for="fact in facts" :key="fact.label" class="flex items-start gap-4">
              <span
                class="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-400/10 text-brand-500 dark:text-brand-300"
              >
                <AppIcon :name="fact.icon" :size="18" />
              </span>
              <div class="min-w-0">
                <dt class="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                  {{ fact.label }}
                </dt>
                <dd class="mt-0.5 text-sm leading-snug font-medium break-words">
                  <a
                    v-if="fact.href"
                    :href="fact.href"
                    class="transition-colors hover:text-brand-500 dark:hover:text-brand-300"
                  >
                    {{ fact.value }}
                  </a>
                  <template v-else>{{ fact.value }}</template>
                </dd>
              </div>
            </div>
          </dl>

          <div data-reveal class="reveal surface-card rounded-3xl p-6 sm:p-7">
            <h3 class="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">Languages</h3>
            <ul class="mt-4 space-y-3">
              <li
                v-for="language in profile.languages"
                :key="language.name"
                class="flex items-center justify-between gap-4 text-sm"
              >
                <span class="font-medium">{{ language.name }}</span>
                <span class="text-muted">{{ language.level }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
