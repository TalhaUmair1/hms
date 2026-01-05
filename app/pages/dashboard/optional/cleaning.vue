<template>
  <UDashboardPanel id="hospital-cleaning">
    <!-- Header -->
    <template #header>
      <UDashboardNavbar title="Hospital Cleaning & Sanitation">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <!-- Body -->
    <template #body>
      <UContainer class="space-y-16 py-6">
        <!-- Section 1: Introduction -->
        <UCard class="p-8">
          <h2 class="text-3xl font-bold mb-4">Hospital Cleaning & Sanitation Services</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            A clean, hygienic, and well-maintained environment is essential for effective
            healthcare delivery. The hospital’s Cleaning and Sanitation Department ensures
            that all clinical and non-clinical areas meet strict hygiene and safety
            standards.
          </p>
          <p class="text-gray-700 leading-relaxed">
            Through structured cleaning systems, trained personnel, and continuous
            monitoring, the department supports infection prevention, patient comfort, and
            uninterrupted hospital operations.
          </p>
        </UCard>

        <!-- Section 2: Cleaning Protocols -->
        <UCard class="p-8 bg-green-50">
          <h2 class="text-3xl font-bold mb-4">Cleaning Protocols and Standards</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            The hospital follows clearly defined sanitation protocols designed to maintain
            the highest level of cleanliness across all departments. Core practices
            include:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>
              Routine cleaning of patient rooms, wards, corridors, and waiting areas.
            </li>
            <li>
              Scheduled disinfection of operating theaters, ICUs, and procedure rooms.
            </li>
            <li>Use of approved hospital-grade disinfectants and cleaning agents.</li>
            <li>
              Immediate response to spills, contamination, and high-risk exposure areas.
            </li>
            <li>Strict adherence to hand hygiene and protective equipment guidelines.</li>
          </ul>
          <p class="text-gray-700 leading-relaxed">
            These protocols are designed to minimize infection risks and ensure a
            consistently safe environment for patients, staff, and visitors.
          </p>
        </UCard>

        <!-- Section 3: Cleaning Staff -->
        <UCard class="p-8">
          <h2 class="text-3xl font-bold mb-4">Housekeeping Team and Responsibilities</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            The cleaning and housekeeping department is supported by a structured team of
            trained professionals who work around the clock to maintain hygiene and
            sanitation standards.
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>
              <strong>Supervisors:</strong> Plan schedules, monitor quality, and ensure
              compliance with sanitation protocols.
            </li>
            <li>
              <strong>Housekeeping Staff:</strong> Perform routine and specialized
              cleaning tasks across hospital areas.
            </li>
            <li>
              <strong>Support Services:</strong> Manage linen services, laundry
              operations, and internal waste movement.
            </li>
          </ul>
          <p class="text-gray-700 leading-relaxed">
            Clear role definitions and daily monitoring ensure consistency,
            accountability, and operational efficiency.
          </p>
        </UCard>

        <!-- Section 4: Waste Management -->
        <UCard class="p-8 bg-green-50">
          <h2 class="text-3xl font-bold mb-4">Waste Management and Infection Control</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            Effective waste management is a critical component of hospital sanitation. The
            department follows regulated procedures for:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Segregation of clinical, non-clinical, and hazardous waste.</li>
            <li>Safe handling and disposal of sharps and contaminated materials.</li>
            <li>Regular disinfection of waste holding areas and transport equipment.</li>
            <li>Coordination with approved waste disposal systems.</li>
          </ul>
          <p class="text-gray-700 leading-relaxed">
            These measures reduce environmental risks and strengthen overall infection
            control within the hospital.
          </p>
        </UCard>

        <!-- Section 5: Training & Professional Development -->
        <UCard class="p-8">
          <h2 class="text-3xl font-bold mb-4">Training and Skill Development</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            Continuous training ensures that cleaning staff remain competent, confident,
            and compliant with safety standards. Training areas include:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Infection prevention and hygiene practices.</li>
            <li>Safe use and storage of cleaning chemicals.</li>
            <li>Emergency spill response and hazard control.</li>
            <li>Routine evaluations and refresher training sessions.</li>
          </ul>
          <p class="text-gray-700 leading-relaxed">
            These initiatives promote consistency, safety, and service quality across all
            cleaning operations.
          </p>
        </UCard>

        <!-- Section 6: Impact on Patient Safety -->
        <UCard class="p-8 bg-green-50">
          <h2 class="text-3xl font-bold mb-4">Impact on Patient Safety and Care</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            A clean and well-maintained environment directly supports patient safety and
            clinical outcomes. Effective sanitation helps reduce hospital-acquired
            infections, supports smooth clinical workflows, and enhances patient
            confidence.
          </p>
          <p class="text-gray-700 leading-relaxed">
            By aligning cleaning practices with clinical infection control standards, the
            department plays an essential role in maintaining a safe and professional
            healthcare environment.
          </p>
        </UCard>

        <!-- Section 7: Commitment & Excellence -->
        <UCard class="p-8 text-center bg-primary/5">
          <h3 class="text-3xl font-semibold mb-4">
            Commitment to Operational Excellence
          </h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            The Cleaning and Sanitation Department operates with a strong focus on
            discipline, consistency, and quality. Every process is designed to uphold high
            hygiene standards, ensuring that the hospital remains a safe, clean, and
            well-organized environment for patients, staff, and visitors.
          </p>
        </UCard>
      </UContainer>
    </template>
  </UDashboardPanel>
</template>

<script setup lang="ts">
// Static informational page
</script>
