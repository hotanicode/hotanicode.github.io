<script setup>
import { computed, reactive, ref } from 'vue'
import { profile, socials } from '@/data/profile'
import AppButton from '@/components/ui/AppButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'

const form = reactive({ name: '', email: '', message: '' })
const errors = reactive({ name: '', email: '', message: '' })
const sent = ref(false)
const copied = ref(false)

const channels = [
  { icon: 'mail', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: 'phone', label: 'Phone', value: profile.phone, href: `tel:${profile.phoneHref}` },
  { icon: 'pin', label: 'Location', value: profile.location, href: null },
]

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const validate = () => {
  errors.name = form.name.trim() ? '' : 'Please tell me your name.'
  errors.email = isValidEmail(form.email.trim()) ? '' : 'A valid email lets me reply.'
  errors.message = form.message.trim().length >= 10 ? '' : 'A little more detail, please.'

  return !errors.name && !errors.email && !errors.message
}

const mailtoHref = computed(() => {
  const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || 'someone'}`)
  const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`)
  return `mailto:${profile.email}?subject=${subject}&body=${body}`
})

/** No backend here — hand the composed message to the visitor's mail client. */
const handleSubmit = () => {
  if (!validate()) return

  window.location.href = mailtoHref.value
  sent.value = true
  window.setTimeout(() => (sent.value = false), 6000)
}

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(profile.email)
    copied.value = true
    window.setTimeout(() => (copied.value = false), 2000)
  } catch {
    // Clipboard blocked — the mailto link is still available.
  }
}

const fieldClass = (hasError) => [
  'w-full rounded-xl border bg-surface/60 px-4 py-3 text-sm outline-none transition-colors duration-200 placeholder:text-muted/70',
  hasError ? 'border-red-400/70 focus:border-red-400' : 'border-line focus:border-brand-400',
]
</script>

<template>
  <section id="contact" class="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
    <div
      class="pointer-events-none absolute -bottom-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[130px]"
      aria-hidden="true"
    />

    <div class="container-page relative">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something solid."
        description="Open to full-stack and backend roles, contract work and interesting problems. I usually reply within a day."
        align="center"
      />

      <div class="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-12">
        <div class="space-y-4 lg:col-span-5">
          <component
            :is="channel.href ? 'a' : 'div'"
            v-for="channel in channels"
            :key="channel.label"
            data-reveal
            class="reveal surface-card flex items-center gap-4 rounded-2xl p-5 transition-all duration-300"
            :class="channel.href ? 'hover:-translate-y-0.5 hover:border-brand-400/50' : ''"
            :href="channel.href ?? undefined"
          >
            <span
              class="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-400/10 text-brand-500 dark:text-brand-300"
            >
              <AppIcon :name="channel.icon" :size="19" />
            </span>
            <div class="min-w-0">
              <p class="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                {{ channel.label }}
              </p>
              <p class="mt-0.5 truncate text-sm font-medium">{{ channel.value }}</p>
            </div>
          </component>

          <div data-reveal class="reveal surface-card rounded-2xl p-5">
            <p class="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">Elsewhere</p>
            <div class="mt-3 flex items-center gap-2">
              <a
                v-for="social in socials"
                :key="social.name"
                :href="social.url"
                :target="social.icon === 'mail' ? undefined : '_blank'"
                rel="noopener noreferrer"
                :aria-label="social.name"
                class="grid size-10 place-items-center rounded-xl border border-line text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/60 hover:text-brand-500 dark:hover:text-brand-300"
              >
                <AppIcon :name="social.icon" :size="18" />
              </a>

              <button
                type="button"
                class="ml-auto inline-flex items-center gap-1.5 rounded-xl border border-line px-3 py-2 text-xs font-medium text-muted transition-colors hover:border-brand-400/60 hover:text-fg"
                @click="copyEmail"
              >
                <AppIcon :name="copied ? 'check' : 'copy'" :size="14" />
                {{ copied ? 'Copied' : 'Copy email' }}
              </button>
            </div>
          </div>
        </div>

        <form
          data-reveal
          class="reveal surface-card space-y-5 rounded-3xl p-6 sm:p-8 lg:col-span-7"
          novalidate
          @submit.prevent="handleSubmit"
        >
          <div class="grid gap-5 sm:grid-cols-2">
            <div class="space-y-2">
              <label for="contact-name" class="text-sm font-medium">Name</label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                autocomplete="name"
                placeholder="Jane Doe"
                :class="fieldClass(Boolean(errors.name))"
                :aria-invalid="Boolean(errors.name)"
              />
              <p v-if="errors.name" class="text-xs text-red-400">{{ errors.name }}</p>
            </div>

            <div class="space-y-2">
              <label for="contact-email" class="text-sm font-medium">Email</label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                placeholder="jane@company.com"
                :class="fieldClass(Boolean(errors.email))"
                :aria-invalid="Boolean(errors.email)"
              />
              <p v-if="errors.email" class="text-xs text-red-400">{{ errors.email }}</p>
            </div>
          </div>

          <div class="space-y-2">
            <label for="contact-message" class="text-sm font-medium">Message</label>
            <textarea
              id="contact-message"
              v-model="form.message"
              rows="5"
              placeholder="Tell me about the role, the team or the problem you're solving…"
              :class="fieldClass(Boolean(errors.message))"
              :aria-invalid="Boolean(errors.message)"
            />
            <p v-if="errors.message" class="text-xs text-red-400">{{ errors.message }}</p>
          </div>

          <div class="flex flex-wrap items-center gap-4">
            <AppButton type="submit" size="lg" as="button">
              Send message
              <template #trailing><AppIcon name="send" :size="17" /></template>
            </AppButton>

            <p v-if="sent" class="text-sm text-emerald-500 dark:text-emerald-400">
              Opening your mail app…
            </p>
            <p v-else class="text-xs text-muted">
              Opens in your mail client — nothing is stored on this site.
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
