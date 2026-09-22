<script setup>
import { ref } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import AppsSection from '@/components/sections/AppsSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'

const page = ref(null)

// Reveals every `[data-reveal]` element on the page as it scrolls into view.
useScrollReveal(page)
</script>

<template>
  <div ref="page">
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ExperienceSection />
    <ProjectsSection />
    <AppsSection />
    <ContactSection />
  </div>
</template>
