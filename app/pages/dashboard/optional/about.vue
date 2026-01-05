<template>
  <UDashboardPanel id="about-hospital">
    <!-- Header -->
    <template #header>
      <UDashboardNavbar title="About the Hospital">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <!-- Body -->
    <template #body>
      <UContainer class="space-y-16 py-6">
        <!-- Hero / Intro -->
        <UCard>
          <div class="text-center space-y-4">
            <h1 class="text-3xl font-bold">
              Shaukat Khanum Memorial Cancer Hospital & Research Centre
            </h1>
            <p class="text-lg text-gray-600">A Comprehensive Cancer Care Institution</p>
            <p class="text-gray-500 max-w-3xl mx-auto">
              Shaukat Khanum Memorial Cancer Hospital & Research Centre (SKMCH&RC) is a
              tertiary care cancer institution providing specialized, multidisciplinary
              oncology services supported by modern medical infrastructure, clinical
              expertise, and research-driven practices.
            </p>
          </div>
        </UCard>

        <!-- About -->
        <UCard>
          <h2 class="text-2xl font-semibold mb-4">About the Hospital</h2>
          <div class="space-y-4 text-gray-600">
            <p>
              Shaukat Khanum Memorial Cancer Hospital & Research Centre was established as
              a dedicated cancer care institution with a strong focus on clinical
              excellence, patient safety, and evidence-based treatment. The hospital
              integrates advanced diagnostic services, specialized oncology care, and
              modern treatment modalities under one roof.
            </p>
            <p>
              Over the years, the hospital has grown into one of Pakistan’s most advanced
              cancer treatment facilities, supported by a team of highly qualified
              consultants, surgeons, nurses, and allied health professionals trained both
              locally and internationally.
            </p>
          </div>
        </UCard>

        <!-- Mission & Vision -->
        <div class="grid md:grid-cols-2 gap-6">
          <UCard>
            <h3 class="text-xl font-semibold mb-2">Our Mission</h3>
            <p class="text-gray-600">
              To deliver comprehensive, high-quality cancer care through clinical
              excellence, innovation, multidisciplinary collaboration, and continuous
              improvement in patient outcomes.
            </p>
          </UCard>

          <UCard>
            <h3 class="text-xl font-semibold mb-2">Our Vision</h3>
            <p class="text-gray-600">
              To be a recognized center of excellence in oncology services, research, and
              education, setting benchmarks in quality, safety, and patient-centered care.
            </p>
          </UCard>
        </div>

        <!-- Services -->
        <UCard>
          <h2 class="text-2xl font-semibold mb-6">Clinical Services</h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <UCard v-for="service in services" :key="service" class="text-center">
              {{ service }}
            </UCard>
          </div>
        </UCard>

        <!-- Research & Education -->
        <UCard class="bg-primary/5">
          <h2 class="text-2xl font-semibold mb-4">Research, Training & Education</h2>
          <p class="text-gray-600">
            Research and education are integral components of the hospital’s operations.
            The institution actively participates in clinical research, outcome analysis,
            and quality improvement initiatives, while offering structured training
            programs for doctors, nurses, pharmacists, and allied health professionals.
          </p>
        </UCard>

        <!-- Why Choose -->
        <UCard>
          <h2 class="text-2xl font-semibold mb-6">Why Choose This Hospital</h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <UCard v-for="reason in reasons" :key="reason">
              {{ reason }}
            </UCard>
          </div>
        </UCard>

        <!-- Appointments -->
        <UCard class="text-center">
          <h2 class="text-2xl font-semibold mb-2">Appointments & Patient Services</h2>
          <p class="text-gray-600 mb-6 max-w-2xl mx-auto">
            Dedicated patient service teams assist individuals throughout the care
            journey, from initial consultation to treatment planning and follow-up.
          </p>
          <UButton to="/dashboard/appointments" size="lg"> Book Appointment </UButton>
        </UCard>
      </UContainer>
    </template>
  </UDashboardPanel>
</template>

<script setup lang="ts">
const services = [
  "Medical Oncology",
  "Radiation Oncology",
  "Surgical Oncology",
  "Pediatric Oncology",
  "Chemotherapy & Immunotherapy",
  "Diagnostic Imaging & Pathology",
  "Bone Marrow Transplant",
  "Palliative & Supportive Care",
];

const reasons = [
  "Multidisciplinary cancer care teams",
  "Advanced diagnostic and treatment technology",
  "Evidence-based clinical practices",
  "Strong focus on patient safety and quality",
  "Integrated research and clinical services",
  "Recognized oncology expertise",
];
</script>
