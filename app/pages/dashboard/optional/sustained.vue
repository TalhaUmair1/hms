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
          <h2 class="text-3xl font-bold mb-4">Operational Sustainability Overview</h2>
          <p class="text-gray-700 leading-relaxed">
            Shaukat Khanum Memorial Cancer Hospital & Research Centre (SKMCH&RC) sustains
            its operations through a structured and carefully governed financial model.
            Annual budgeting focuses on maintaining uninterrupted patient care, advanced
            medical services, research activities, and workforce development, while
            ensuring cost efficiency and accountability across all departments.
          </p>
        </UCard>

        <!-- Budget Allocation Section -->
        <UCard class="p-8 bg-green-50">
          <h3 class="text-2xl font-semibold mb-4">1. Annual Budget Allocation</h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            The hospital operates with a multi-billion PKR annual budget, distributed
            across essential operational domains. Financial planning is conducted annually
            with strict internal controls and audits to ensure optimal utilization of
            resources.
          </p>
          <ul class="list-disc pl-6 text-gray-700 space-y-2">
            <li>Medical treatment and patient services (largest allocation)</li>
            <li>Medicines, chemotherapy drugs, and consumables</li>
            <li>Diagnostic services and laboratory operations</li>
            <li>Facility management and utilities</li>
          </ul>
        </UCard>

        <!-- Patient Care Expenses -->
        <UCard class="p-8">
          <h3 class="text-2xl font-semibold mb-4">
            2. Patient Care & Clinical Operations
          </h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            A significant portion of the budget is dedicated to direct patient care. This
            includes outpatient services, inpatient wards, surgical procedures, intensive
            care units, radiology, and radiation oncology.
          </p>
          <p class="text-gray-700 leading-relaxed">
            Costs also cover clinical staff salaries, nursing services, emergency response
            teams, and continuous monitoring systems to ensure high-quality and safe
            treatment standards.
          </p>
        </UCard>

        <!-- Equipment & Technology -->
        <UCard class="p-8 bg-green-50">
          <h3 class="text-2xl font-semibold mb-4">3. Medical Equipment & Technology</h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            Substantial financial resources are allocated to the procurement, maintenance,
            and upgrading of advanced medical equipment. This includes linear
            accelerators, imaging systems, laboratory analyzers, and specialized surgical
            tools.
          </p>
          <p class="text-gray-700 leading-relaxed">
            Regular maintenance contracts and technology upgrades ensure uninterrupted
            services and compliance with international medical standards.
          </p>
        </UCard>

        <!-- Research Expenses -->
        <UCard class="p-8">
          <h3 class="text-2xl font-semibold mb-4">4. Research & Clinical Studies</h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            A dedicated portion of the budget supports oncology research, clinical trials,
            and data analysis. Expenditure includes research staffing, trial
            infrastructure, ethical compliance, and collaboration with international
            research bodies.
          </p>
          <p class="text-gray-700 leading-relaxed">
            Research spending directly contributes to improved treatment protocols and
            evidence-based clinical practices.
          </p>
        </UCard>

        <!-- Education & Workforce -->
        <UCard class="p-8 bg-green-50">
          <h3 class="text-2xl font-semibold mb-4">
            5. Education & Human Resource Development
          </h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            Budget allocations also cover medical education programs, postgraduate
            training, nursing education, and continuous professional development for
            staff.
          </p>
          <p class="text-gray-700 leading-relaxed">
            Investment in human resources ensures long-term operational stability, skilled
            workforce retention, and consistent quality of care.
          </p>
        </UCard>

        <!-- Governance & Controls -->
        <UCard class="p-8">
          <h3 class="text-2xl font-semibold mb-4">6. Financial Governance & Oversight</h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            Financial sustainability is reinforced through strong governance mechanisms.
            Regular internal audits, external audits, and performance reviews ensure
            transparency, compliance, and responsible expenditure.
          </p>
          <p class="text-gray-700 leading-relaxed">
            This disciplined financial approach allows the hospital to manage rising
            healthcare costs while maintaining service quality and operational continuity.
          </p>
        </UCard>
      </UContainer>
    </template>
  </UDashboardPanel>
</template>

<script setup lang="ts">
// Static informational dashboard panel
</script>
