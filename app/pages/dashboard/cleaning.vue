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
          <h2 class="text-3xl font-bold mb-4">Cleaning & Sanitation at Shaukat Khanum Hospital</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            Maintaining a clean and hygienic environment is a top priority at Shaukat Khanum Memorial Cancer Hospital & Research Centre. Proper sanitation not only prevents infections but also ensures a safe and comfortable experience for patients, staff, and visitors.
          </p>
          <p class="text-gray-700 leading-relaxed">
            The hospital has implemented rigorous cleaning protocols and employs a trained team of housekeeping professionals dedicated to keeping all areas sterile and organized.
          </p>
        </UCard>

        <!-- Section 2: Cleaning Protocols -->
        <UCard class="p-8 bg-green-50">
          <h2 class="text-3xl font-bold mb-4">Cleaning Protocols</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            The hospital follows **strict sanitation and hygiene protocols** across all departments. Key practices include:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Regular cleaning of patient rooms, treatment areas, and operating theaters.</li>
            <li>Use of hospital-grade disinfectants and sterilization methods.</li>
            <li>Scheduled deep cleaning for critical zones such as ICUs and laboratories.</li>
            <li>Immediate cleaning of spills, waste disposal, and hazardous material handling.</li>
            <li>Strict hand hygiene and personal protective equipment (PPE) protocols for cleaning staff.</li>
          </ul>
          <p class="text-gray-700 leading-relaxed">
            These procedures help prevent healthcare-associated infections and maintain a safe environment for all.
          </p>
        </UCard>

        <!-- Section 3: Cleaning Staff -->
        <UCard class="p-8">
          <h2 class="text-3xl font-bold mb-4">Cleaning & Housekeeping Staff</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            The housekeeping team is comprised of **trained cleaning professionals, supervisors, and support staff**. Their responsibilities include maintaining hygiene, sanitizing equipment, managing waste, and supporting infection control measures.
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Supervisors:</strong> Oversee cleaning schedules, quality control, and staff training.</li>
            <li><strong>Cleaning Staff:</strong> Execute daily cleaning routines, disinfect surfaces, and ensure safe handling of cleaning chemicals.</li>
            <li><strong>Support Staff:</strong> Manage laundry, linen, and waste disposal in accordance with hospital standards.</li>
          </ul>
          <p class="text-gray-700 leading-relaxed">
            Continuous training is provided to keep staff updated on infection control, proper cleaning techniques, and safety protocols, ensuring that all areas of the hospital remain sterile and safe.
          </p>
        </UCard>

        <!-- Section 4: Waste Management -->
        <UCard class="p-8 bg-green-50">
          <h2 class="text-3xl font-bold mb-4">Waste Management & Infection Control</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            Proper disposal of medical and general waste is critical to hospital safety. The cleaning staff follow strict guidelines for:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Segregation of biomedical and non-biomedical waste.</li>
            <li>Safe handling of sharps, contaminated materials, and hazardous chemicals.</li>
            <li>Regular disposal through approved channels to prevent environmental contamination.</li>
            <li>Disinfection of waste collection points and equipment.</li>
          </ul>
          <p class="text-gray-700 leading-relaxed">
            These practices help maintain a safe environment for patients and staff while adhering to national and international sanitation standards.
          </p>
        </UCard>

        <!-- Section 5: Training & Professional Development -->
        <UCard class="p-8">
          <h2 class="text-3xl font-bold mb-4">Training & Professional Development</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            All cleaning staff undergo **continuous training** in infection control, safety, chemical handling, and cleaning techniques. Training programs include:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Infection control and hand hygiene procedures.</li>
            <li>Safe handling and storage of cleaning chemicals.</li>
            <li>Emergency response and spill management.</li>
            <li>Periodic performance assessments and refresher training.</li>
          </ul>
          <p class="text-gray-700 leading-relaxed">
            This ensures that every member of the cleaning team performs their duties safely, efficiently, and consistently.
          </p>
        </UCard>

        <!-- Section 6: Sanitation Impact on Patients -->
        <UCard class="p-8 bg-green-50">
          <h2 class="text-3xl font-bold mb-4">Impact on Patients and Hospital Safety</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            Effective cleaning and sanitation directly contribute to **patient safety, comfort, and well-being**. A sterile and hygienic environment reduces hospital-acquired infections, ensures smooth clinical operations, and improves patient trust and satisfaction.
          </p>
          <p class="text-gray-700 leading-relaxed">
            By integrating cleaning practices with infection control protocols, the housekeeping team plays a critical role in the hospital’s mission to deliver **world-class cancer care** in a safe and hygienic environment.
          </p>
        </UCard>

        <!-- Section 7: Commitment & Excellence -->
        <UCard class="p-8 text-center bg-primary/5">
          <h3 class="text-3xl font-semibold mb-4">Commitment to Excellence</h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            The cleaning and sanitation department at Shaukat Khanum Hospital exemplifies **dedication, professionalism, and patient-centered care**. Every action—from daily cleaning routines to waste management—is guided by a commitment to maintain the highest standards of hygiene and safety, ensuring a clean, safe, and healing environment for all.
          </p>
        </UCard>

      </UContainer>
    </template>
  </UDashboardPanel>
</template>

<script setup lang="ts">
// Static content only; no reactive data is needed
</script>
