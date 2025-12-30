<template>
  <UDashboardPanel id="pharmacy-overview">
    <!-- Header -->
    <template #header>
      <UDashboardNavbar title="Pharmacy Overview">
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
          <h2 class="text-3xl font-bold mb-4">Pharmacy Overview at Shaukat Khanum Hospital</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            The pharmacy department at Shaukat Khanum Memorial Cancer Hospital & Research Centre is a **cornerstone of patient care**, ensuring that all life-saving medications are available, correctly dispensed, and administered under strict quality standards. It supports all clinical services, from chemotherapy and radiation therapy to supportive and palliative care, serving thousands of patients every year.
          </p>
          <p class="text-gray-700 leading-relaxed">
            The department combines skilled professionals, state-of-the-art inventory management, and rigorous operational protocols to maintain a **continuous, uninterrupted supply of medicines** for patient care.
          </p>
        </UCard>

        <!-- Section 2: Medicines Overview -->
        <UCard class="p-8 bg-green-50">
          <h2 class="text-3xl font-bold mb-4">Medicines Available</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            The hospital pharmacy handles a wide array of medications critical for cancer treatment and supportive care. Medicines are categorized to streamline distribution and monitoring:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Chemotherapy and Targeted Therapy:</strong> Medications such as Cisplatin, Paclitaxel, and targeted agents used in various cancer treatments.</li>
            <li><strong>Pain Management:</strong> Analgesics, opioids, and non-opioid medications to ensure patients remain comfortable during treatment.</li>
            <li><strong>Antibiotics and Infection Control:</strong> Medications to prevent and treat infections, particularly in immunocompromised patients.</li>
            <li><strong>Supportive Care Medications:</strong> Drugs for nausea, vomiting, anemia, and other side effects of cancer therapy.</li>
            <li><strong>Vitamins and Nutritional Supplements:</strong> Ensuring optimal patient health during treatment.</li>
          </ul>
          <p class="text-gray-700 leading-relaxed">
            Every medicine undergoes rigorous quality assurance, including checks for **expiry, potency, and storage conditions**. High-risk medications are tracked meticulously to prevent errors, and emergency stocks are maintained to ensure availability at all times.
          </p>
        </UCard>

        <!-- Section 3: Pharmacy Staff -->
        <UCard class="p-8">
          <h2 class="text-3xl font-bold mb-4">Pharmacy Staff and Roles</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            The pharmacy department is staffed with highly trained professionals dedicated to providing safe, accurate, and timely medication services. The team includes:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Pharmacists:</strong> Oversee dispensing, verify prescriptions, provide clinical guidance, and ensure compliance with safety standards.</li>
            <li><strong>Assistant Pharmacists:</strong> Support pharmacists in preparing medications, managing inventory, and counseling patients.</li>
            <li><strong>Pharmacy Technicians:</strong> Handle storage, packaging, and quality checks of all medicines, ensuring compliance with SOPs.</li>
            <li><strong>Support Staff:</strong> Assist with record-keeping, logistics, and patient communication.</li>
          </ul>
          <p class="text-gray-700 leading-relaxed">
            Continuous professional development is provided through **training programs, workshops, and seminars**, keeping the staff updated on the latest pharmaceutical standards, cancer treatment protocols, and patient safety guidelines.
          </p>
        </UCard>

        <!-- Section 4: Operations & Quality Assurance -->
        <UCard class="p-8 bg-green-50">
          <h2 class="text-3xl font-bold mb-4">Operations & Quality Assurance</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            The pharmacy operates under strict **standard operating procedures (SOPs)** to ensure accuracy and safety. Core operational features include:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Inventory management system for real-time stock monitoring.</li>
            <li>Temperature and humidity-controlled storage for sensitive medications.</li>
            <li>Regular audits and inspections to ensure compliance with local and international regulations.</li>
            <li>Documented dispensing process to minimize errors and ensure traceability.</li>
            <li>Emergency and backup stock management for critical medications.</li>
          </ul>
          <p class="text-gray-700 leading-relaxed">
            These operational standards ensure that all medicines are **safe, effective, and available** for patients, contributing to the hospital’s commitment to high-quality care.
          </p>
        </UCard>

        <!-- Section 5: Patient Care & Safety -->
        <UCard class="p-8">
          <h2 class="text-3xl font-bold mb-4">Patient Care and Safety</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            Pharmacy staff play a **direct role in patient care**. They provide guidance on proper medication use, potential side effects, and adherence to treatment schedules. This patient-centric approach ensures:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Reduction of medication errors and adverse effects.</li>
            <li>Improved treatment outcomes through correct usage and adherence.</li>
            <li>Clear communication between doctors, nurses, and pharmacy staff.</li>
            <li>Continuous monitoring of patient responses to therapy.</li>
          </ul>
          <p class="text-gray-700 leading-relaxed">
            Every patient receives personalized attention, and the pharmacy is an integral part of the hospital’s **multidisciplinary care model**, supporting oncology, pediatric, surgical, and palliative care teams.
          </p>
        </UCard>

        <!-- Section 6: Training & Education -->
        <UCard class="p-8 bg-green-50">
          <h2 class="text-3xl font-bold mb-4">Training and Professional Development</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            Shaukat Khanum’s pharmacy department invests heavily in **training and skill development**. Programs include:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Postgraduate training for pharmacists and pharmacy technicians.</li>
            <li>Regular workshops on the latest cancer treatment drugs.</li>
            <li>Compliance and safety training to meet international standards.</li>
            <li>Mentorship programs for new staff members.</li>
          </ul>
          <p class="text-gray-700 leading-relaxed">
            These initiatives ensure that the pharmacy staff maintain a high level of expertise, providing safe and efficient care to patients while contributing to the hospital’s mission of excellence in oncology care.
          </p>
        </UCard>

        <!-- Section 7: Sustainability & Impact -->
        <UCard class="p-8">
          <h2 class="text-3xl font-bold mb-4">Sustainability and Impact</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            The pharmacy department supports the hospital’s **sustainable care model**. Through careful management of resources, donations, and operational efficiency, the pharmacy ensures that medications are always available, minimizing waste and maximizing patient benefit.
          </p>
          <p class="text-gray-700 leading-relaxed mb-4">
            Impact highlights:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700">
            <li>Thousands of patients receive timely medications free of cost.</li>
            <li>Advanced therapies and supportive care medications are consistently available.</li>
            <li>Continuous improvement in inventory management and dispensing accuracy.</li>
            <li>Integration with hospital research and education programs ensures long-term sustainability.</li>
          </ul>
        </UCard>

        <!-- Closing Section -->
        <UCard class="p-8 text-center bg-primary/5">
          <h3 class="text-3xl font-semibold mb-4">Commitment to Excellence</h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            The pharmacy at Shaukat Khanum Memorial Cancer Hospital is more than a supply center—it is a **foundation of patient care, safety, and hope**. With skilled staff, advanced systems, and unwavering dedication, the pharmacy ensures that every patient receives the highest standard of care, every day.
          </p>
        </UCard>

      </UContainer>
    </template>
  </UDashboardPanel>
</template>

<script setup lang="ts">
// Static content only; no reactive data needed
</script>
