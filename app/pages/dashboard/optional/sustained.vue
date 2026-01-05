<template>
  <UDashboardPanel id="how-its-sustained">
    <!-- Header -->
    <template #header>
      <UDashboardNavbar title="How It’s Sustained">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <!-- Body -->
    <template #body>
      <UContainer class="space-y-12 py-6">

        <!-- Intro Section -->
        <UCard class="p-8">
          <h2 class="text-3xl font-bold mb-4">How Shaukat Khanum Sustains Its Mission</h2>
          <p class="text-gray-700 leading-relaxed">
            Shaukat Khanum Memorial Cancer Hospital & Research Centre (SKMCH&RC) operates on a unique, self-reinforcing model that ensures **high-quality cancer care is available to all, regardless of financial status**. 
            This model integrates **donations, patient care, research, and education** into a sustainable cycle that maximizes impact and trust.
          </p>
        </UCard>

        <!-- Donation Section -->
        <UCard class="p-8 bg-green-50">
          <h3 class="text-2xl font-semibold mb-4">1. Donations: The Foundation of Our Care</h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            Donations from individuals, corporations, and charitable foundations form the backbone of SKMCH&RC. 
            More than 70% of our patients receive **free treatment**, made possible entirely through the generosity of donors from Pakistan and around the world.
          </p>
          <p class="text-gray-700 leading-relaxed mb-4">
            These funds are carefully managed to ensure **maximum transparency and accountability**. Donors are empowered to see exactly how their contributions help save lives, from providing chemotherapy sessions to funding advanced medical equipment.
          </p>
          <ul class="list-disc pl-6 text-gray-700 space-y-2">
            <li>Direct patient care and free treatment</li>
            <li>Advanced diagnostic and treatment equipment</li>
            <li>Funding clinical research and trials</li>
            <li>Education and training for healthcare professionals</li>
          </ul>
        </UCard>

        <!-- Patient Care Section -->
        <UCard class="p-8">
          <h3 class="text-2xl font-semibold mb-4">2. Patient Care: Delivering Excellence</h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            SKMCH&RC delivers **comprehensive, multidisciplinary cancer care** under one roof. Each patient receives a personalized treatment plan designed by a team of specialists, including oncologists, surgeons, radiologists, and supportive care staff.
          </p>
          <p class="text-gray-700 leading-relaxed mb-4">
            By integrating care, research, and technology, the hospital ensures that every patient benefits from **the latest treatment protocols** while maintaining **dignity, compassion, and respect** throughout their journey.
          </p>
          <p class="text-gray-700 leading-relaxed">
            The hospital continuously monitors outcomes and patient satisfaction to ensure **continuous improvement**, ensuring that donations and resources have the greatest possible impact.
          </p>
        </UCard>

        <!-- Research Section -->
        <UCard class="p-8 bg-green-50">
          <h3 class="text-2xl font-semibold mb-4">3. Research: Advancing Cancer Care</h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            Research is a core pillar of SKMCH&RC. The institution actively participates in **clinical trials, epidemiological studies, and outcome research**. These initiatives not only improve cancer treatment protocols locally but also contribute to global oncology knowledge.
          </p>
          <p class="text-gray-700 leading-relaxed mb-4">
            Donations and funding directly support:
          </p>
          <ul class="list-disc pl-6 text-gray-700 space-y-2">
            <li>Innovative research projects in oncology</li>
            <li>Clinical trials to evaluate new treatments</li>
            <li>Collaboration with international cancer research institutions</li>
            <li>Publication of research findings to benefit the broader medical community</li>
          </ul>
          <p class="text-gray-700 leading-relaxed">
            By integrating research with patient care, the hospital ensures that every treatment is backed by **scientific evidence**, keeping SKMCH&RC at the forefront of oncology in the region.
          </p>
        </UCard>

        <!-- Education Section -->
        <UCard class="p-8">
          <h3 class="text-2xl font-semibold mb-4">4. Education: Building the Future</h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            SKMCH&RC invests heavily in **education and training**. Programs include postgraduate education for doctors, nursing training, and workshops for allied health professionals. 
            This ensures that **future leaders in oncology** are well-prepared to continue the mission.
          </p>
          <p class="text-gray-700 leading-relaxed mb-4">
            Through education, the hospital not only sustains its own workforce but also **strengthens Pakistan’s healthcare system**, creating a ripple effect that extends well beyond the hospital walls.
          </p>
        </UCard>

        <!-- Integration Section -->
        <UCard class="p-8 bg-green-50">
          <h3 class="text-2xl font-semibold mb-4">5. The Self-Reinforcing Model</h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            The sustainability of SKMCH&RC comes from the **integration of donations, patient care, research, and education**. Each component supports and reinforces the others:
          </p>
          <ul class="list-disc pl-6 text-gray-700 space-y-2">
            <li>Donations fund patient care and research</li>
            <li>Patient care provides data and insights for research</li>
            <li>Research improves treatment protocols and clinical outcomes</li>
            <li>Education develops skilled healthcare professionals to maintain and expand impact</li>
          </ul>
          <p class="text-gray-700 leading-relaxed mt-4">
            This cyclical model ensures that every contribution, effort, and resource continues to generate **maximum benefit**, creating a sustainable system of hope, healing, and impact.
          </p>
        </UCard>

        <!-- CTA Section -->
        <UCard class="text-center p-8">
          <h3 class="text-2xl font-semibold mb-2">Join Us in Sustaining Hope</h3>
          <p class="text-gray-700 mb-4 leading-relaxed">
            Your support, whether through donations, volunteering, or spreading awareness, directly contributes to this sustainable cycle, helping us treat more patients, advance research, and educate the next generation of healthcare professionals.
          </p>
          <UButton size="lg">Donate or Support Now</UButton>
        </UCard>

      </UContainer>
    </template>
  </UDashboardPanel>
</template>

<script setup lang="ts">
// No dynamic data required for this static dashboard panel
</script>
