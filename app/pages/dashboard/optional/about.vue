<template>
  <UDashboardPanel id="about-shaukat-khanum">
    <!-- Header -->
    <template #header>
      <UDashboardNavbar title="About Shaukat Khanum">
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
            <p class="text-lg text-gray-600">
              Providing World-Class Cancer Care to All
            </p>
            <p class="text-gray-500 max-w-3xl mx-auto">
              Shaukat Khanum Memorial Cancer Hospital & Research Centre (SKMCH&RC)
              is a leading tertiary care cancer hospital dedicated to providing
              high-quality cancer treatment to patients, regardless of their
              ability to pay.
            </p>
          </div>
        </UCard>

        <!-- About -->
        <UCard>
          <h2 class="text-2xl font-semibold mb-4">About the Hospital</h2>
          <div class="space-y-4 text-gray-600">
            <p>
              Shaukat Khanum Memorial Cancer Hospital & Research Centre was
              established with the mission to offer state-of-the-art cancer care
              to those who could not otherwise afford it. Inspired by the
              personal struggle of Imran Khan’s mother with cancer, the hospital
              was founded to ensure that financial limitations never stand in the
              way of life-saving treatment.
            </p>
            <p>
              Today, SKMCH&RC is Pakistan’s largest and most advanced cancer care
              institution, equipped with modern medical technology and staffed
              by highly qualified doctors trained both locally and
              internationally.
            </p>
          </div>
        </UCard>

        <!-- Mission & Vision -->
        <div class="grid md:grid-cols-2 gap-6">
          <UCard>
            <h3 class="text-xl font-semibold mb-2">Our Mission</h3>
            <p class="text-gray-600">
              To provide comprehensive cancer care of the highest standard to
              all patients, irrespective of their financial means, while
              advancing medical research, education, and awareness.
            </p>
          </UCard>

          <UCard>
            <h3 class="text-xl font-semibold mb-2">Our Vision</h3>
            <p class="text-gray-600">
              To be a center of excellence in cancer care, research, and
              education, setting benchmarks in quality, compassion, and
              transparency.
            </p>
          </UCard>
        </div>

        <!-- Services -->
        <UCard>
          <h2 class="text-2xl font-semibold mb-6">Our Services</h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <UCard
              v-for="service in services"
              :key="service"
              class="text-center"
            >
              {{ service }}
            </UCard>
          </div>
        </UCard>

        <!-- Free Care -->
        <UCard class="bg-primary/5">
          <h2 class="text-2xl font-semibold mb-4">
            Free Cancer Care Through Donations
          </h2>
          <p class="text-gray-600 mb-4">
            More than 70% of patients are treated completely free of charge.
            This is only possible due to generous donations from supporters
            worldwide.
          </p>
          <ul class="list-disc pl-6 text-gray-600 space-y-2">
            <li>Free treatment for deserving cancer patients</li>
            <li>Advanced medical equipment</li>
            <li>Cancer research and clinical trials</li>
            <li>Training and education of healthcare professionals</li>
          </ul>
        </UCard>

        <!-- Research & Education -->
        <UCard>
          <h2 class="text-2xl font-semibold mb-4">Research & Education</h2>
          <p class="text-gray-600">
            Research is a core pillar of Shaukat Khanum Hospital. The institution
            actively participates in cancer research, clinical trials, and
            outcome studies, while also offering postgraduate training programs
            for doctors, nurses, and allied health professionals.
          </p>
        </UCard>

        <!-- Why Choose -->
        <UCard>
          <h2 class="text-2xl font-semibold mb-6">
            Why Choose Shaukat Khanum Hospital
          </h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <UCard v-for="reason in reasons" :key="reason">
              {{ reason }}
            </UCard>
          </div>
        </UCard>

        <!-- Appointments -->
        <UCard class="text-center">
          <h2 class="text-2xl font-semibold mb-2">
            Appointments & Patient Care
          </h2>
          <p class="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our dedicated teams guide patients through every step of diagnosis,
            treatment, and recovery with care and professionalism.
          </p>
          <UButton to="/dashboard/appointments" size="lg">Book Appointment</UButton>
        </UCard>

      </UContainer>
    </template>
  </UDashboardPanel>
</template>

<script setup lang="ts">
const services = [
  'Medical Oncology',
  'Radiation Oncology',
  'Surgical Oncology',
  'Pediatric Oncology',
  'Chemotherapy & Immunotherapy',
  'Diagnostic Imaging & Pathology',
  'Bone Marrow Transplant',
  'Palliative & Supportive Care'
]

const reasons = [
  'Internationally trained cancer specialists',
  'Advanced diagnostic and treatment technology',
  'Patient-focused and compassionate care',
  'Majority of patients treated free of cost',
  'Transparent and trusted donation system',
  'Recognized nationally and internationally'
]
</script>
