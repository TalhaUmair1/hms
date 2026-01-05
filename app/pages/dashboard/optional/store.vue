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
          <h2 class="text-3xl font-bold mb-4">Hospital Pharmacy Overview</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            The Pharmacy Department is a critical clinical service unit responsible for
            the safe procurement, storage, preparation, and dispensing of medicines across
            all hospital departments. It plays a central role in supporting inpatient and
            outpatient care by ensuring uninterrupted access to high-quality medications.
          </p>
          <p class="text-gray-700 leading-relaxed">
            Through standardized workflows, trained professionals, and advanced inventory
            systems, the pharmacy ensures that all medications are delivered accurately,
            timely, and in accordance with approved medical protocols.
          </p>
        </UCard>

        <!-- Section 2: Medicines Overview -->
        <UCard class="p-8 bg-green-50">
          <h2 class="text-3xl font-bold mb-4">Medicines and Therapeutic Categories</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            The pharmacy manages a comprehensive range of medicines to support diagnostic,
            therapeutic, and preventive healthcare services. These medicines are
            categorized to ensure efficient handling and clinical accuracy:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>
              <strong>Specialized Therapies:</strong> Medicines used for advanced
              treatments, including oncology, hematology, and chronic disease management.
            </li>
            <li>
              <strong>Pain and Symptom Control:</strong> Analgesics and supportive
              medicines to improve patient comfort and recovery.
            </li>
            <li>
              <strong>Antibiotics and Antimicrobials:</strong> Used for infection
              prevention and treatment under strict stewardship guidelines.
            </li>
            <li>
              <strong>Supportive Medications:</strong> Medicines addressing side effects,
              nutritional deficiencies, and metabolic needs.
            </li>
            <li>
              <strong>Emergency and Critical Care Drugs:</strong> Rapid-access medicines
              for intensive and emergency care units.
            </li>
          </ul>
          <p class="text-gray-700 leading-relaxed">
            All medicines are monitored for expiry, storage conditions, and batch
            traceability. High-alert medications are handled with additional safety checks
            ensuring maximum patient protection.
          </p>
        </UCard>

        <!-- Section 3: Pharmacy Staff -->
        <UCard class="p-8">
          <h2 class="text-3xl font-bold mb-4">Pharmacy Team and Responsibilities</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            The pharmacy is operated by a multidisciplinary team of qualified
            professionals who ensure safe and effective medication use throughout the
            hospital:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>
              <strong>Clinical Pharmacists:</strong> Validate prescriptions, oversee
              medication therapy, and collaborate with physicians and nurses.
            </li>
            <li>
              <strong>Assistant Pharmacists:</strong> Assist in dispensing, preparation,
              inventory handling, and patient guidance.
            </li>
            <li>
              <strong>Pharmacy Technicians:</strong> Manage storage, labeling, compounding
              support, and documentation.
            </li>
            <li>
              <strong>Administrative Support:</strong> Ensure accurate records, reporting,
              and coordination with hospital departments.
            </li>
          </ul>
          <p class="text-gray-700 leading-relaxed">
            The team works under clearly defined roles and responsibilities to maintain
            efficiency, accountability, and patient safety at every stage.
          </p>
        </UCard>

        <!-- Section 4: Operations & Quality Assurance -->
        <UCard class="p-8 bg-green-50">
          <h2 class="text-3xl font-bold mb-4">Pharmacy Operations and Quality Control</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            Pharmacy operations follow strict Standard Operating Procedures (SOPs) to
            ensure consistency, safety, and regulatory compliance. Key operational
            practices include:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Digitized inventory management for real-time stock visibility.</li>
            <li>Controlled storage environments for temperature-sensitive medicines.</li>
            <li>Routine internal audits and quality inspections.</li>
            <li>Verified dispensing workflows with full documentation.</li>
            <li>Defined protocols for emergency stock readiness.</li>
          </ul>
          <p class="text-gray-700 leading-relaxed">
            These systems ensure medication accuracy, traceability, and compliance with
            national and international healthcare standards.
          </p>
        </UCard>

        <!-- Section 5: Patient Safety & Clinical Support -->
        <UCard class="p-8">
          <h2 class="text-3xl font-bold mb-4">Patient Safety and Clinical Support</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            Patient safety is a core priority of the pharmacy department. Pharmacists
            actively support clinical teams by reviewing prescriptions, identifying
            potential drug interactions, and ensuring appropriate dosing.
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Reduction of medication errors through verification checks.</li>
            <li>Clear medication counseling and usage guidance.</li>
            <li>Coordination with doctors and nursing staff.</li>
            <li>Ongoing monitoring of medication effectiveness and tolerance.</li>
          </ul>
          <p class="text-gray-700 leading-relaxed">
            This collaborative approach strengthens clinical outcomes and enhances the
            overall quality of patient care.
          </p>
        </UCard>

        <!-- Section 6: Training & Development -->
        <UCard class="p-8 bg-green-50">
          <h2 class="text-3xl font-bold mb-4">Training and Professional Development</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            Continuous learning is embedded within the pharmacy department to maintain
            high professional standards. Training initiatives include:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Structured onboarding programs for new staff.</li>
            <li>Ongoing education on updated treatment guidelines.</li>
            <li>Safety, compliance, and quality assurance training.</li>
            <li>Skill enhancement workshops and internal assessments.</li>
          </ul>
          <p class="text-gray-700 leading-relaxed">
            These programs ensure the pharmacy team remains competent, confident, and
            aligned with evolving healthcare practices.
          </p>
        </UCard>

        <!-- Closing Section -->
        <UCard class="p-8 text-center bg-primary/5">
          <h3 class="text-3xl font-semibold mb-4">
            Operational Excellence in Pharmacy Services
          </h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            The hospital pharmacy is a vital operational pillar that ensures safe
            medication management, clinical support, and uninterrupted healthcare
            delivery. Through disciplined processes, skilled professionals, and strong
            quality controls, the pharmacy consistently upholds excellence in patient
            care.
          </p>
        </UCard>
      </UContainer>
    </template>
  </UDashboardPanel>
</template>

<script setup lang="ts">
// Static informational page
</script>
