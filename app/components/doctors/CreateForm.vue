<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { reactive } from 'vue'
import { useFetch } from '#app'
import { useToast } from '#imports'


const { data: users, pending, error, refresh } = useFetch('/api/users', {
  key: 'typicode-users',
  transform: (data: { id: number; name: string }[]) => {
    // console.log('Fetched raw users:', data)
    return data?.map(user => ({
      label: user.name,
      value: Number(user.id),
    }))
  },
  lazy: true
})



const toggle = () => {
  Object.assign(state, initialState)
}
// Zod schema for validation
const schema = z.object({
  user_id: z.coerce.number().min(1, 'User ID is required'),
  specialization: z.string().min(2, 'Specialization is required'),
  fees: z.coerce.number().min(0, 'Fees must be positive'),
  availability: z.string().min(2, 'Availability is required'),
  id: z.number().optional()
})

type Schema = z.output<typeof schema>

// Initial state
const initialState: Partial<Schema> = {
  user_id: undefined,
  specialization: undefined,
  fees: undefined,
  availability: undefined,
  id: undefined
}

let state = reactive<Partial<Schema>>({ ...initialState })

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log('Form submitted with data:', event.data)
// if(props.doctor)
  const { data, error } = await useFetch('/api/doctors', {
    method: 'PUT',
    body: event.data
  })

  if (error.value) {
    toast.add({
      title: 'Error',
      description: error.value.message || 'Something went wrong',
    })
    return
  }

  toast.add({
    title: 'Success',
    description: `Doctor with specialization ${event.data.specialization} added`,
  })


  Object.assign(state, initialState)
}

const sep = [
  { "id": 1, "name": "Cardiologist" },
  { "id": 2, "name": "Dermatologist" },
  { "id": 3, "name": "Neurologist" },
  { "id": 4, "name": "Pediatrician" },
  { "id": 5, "name": "Orthopedic Surgeon" },
  { "id": 6, "name": "Psychiatrist" },
  { "id": 7, "name": "Radiologist" },
  { "id": 8, "name": "Oncologist" },
  { "id": 9, "name": "Gynecologist" },
  { "id": 10, "name": "General Surgeon" },
  { "id": 11, "name": "Endocrinologist" },
  { "id": 12, "name": "Nephrologist" },
  { "id": 13, "name": "Urologist" },
  { "id": 14, "name": "ENT Specialist" },
  { "id": 15, "name": "Pulmonologist" },
  { "id": 16, "name": "Rheumatologist" },
  { "id": 17, "name": "Gastroenterologist" },
  { "id": 18, "name": "Hematologist" },
  { "id": 19, "name": "Ophthalmologist" },
  { "id": 20, "name": "Family Medicine" },
  { "id": 21, "name": "Anesthesiologist" },
  { "id": 22, "name": "Pathologist" },
  { "id": 23, "name": "Plastic Surgeon" },
  { "id": 24, "name": "Vascular Surgeon" },
  { "id": 25, "name": "Allergist / Immunologist" },
  { "id": 26, "name": "Sports Medicine Specialist" },
  { "id": 27, "name": "Emergency Medicine Specialist" },
  { "id": 28, "name": "Occupational Medicine Specialist" },
  { "id": 29, "name": "Infectious Disease Specialist" },
  { "id": 30, "name": "Geriatrician" },
  { "id": 31, "name": "Palliative Care Specialist" },
  { "id": 32, "name": "Neonatologist" },
  { "id": 33, "name": "Medical Geneticist" },
  { "id": 34, "name": "Reproductive Endocrinologist" },
  { "id": 35, "name": "Sleep Medicine Specialist" },
  { "id": 36, "name": "Clinical Pharmacologist" },
  { "id": 37, "name": "Nuclear Medicine Specialist" },
  { "id": 38, "name": "Critical Care Specialist" },
  { "id": 39, "name": "Dentist" },
  { "id": 40, "name": "Chiropractor" },

  // extended (41–240+)
  { "id": 41, "name": "Cosmetic Surgeon" },
  { "id": 42, "name": "Maxillofacial Surgeon" },
  { "id": 43, "name": "Oral Surgeon" },
  { "id": 44, "name": "Orthodontist" },
  { "id": 45, "name": "Prosthodontist" },
  { "id": 46, "name": "Periodontist" },
  { "id": 47, "name": "Endodontist" },
  { "id": 48, "name": "Pediatric Dentist" },
  { "id": 49, "name": "Public Health Dentist" },
  { "id": 50, "name": "Forensic Odontologist" },
  { "id": 51, "name": "Osteopath" },
  { "id": 52, "name": "Acupuncturist" },
  { "id": 53, "name": "Homeopathic Doctor" },
  { "id": 54, "name": "Ayurvedic Doctor" },
  { "id": 55, "name": "Unani Medicine Specialist" },
  { "id": 56, "name": "Naturopath" },
  { "id": 57, "name": "Physiotherapist" },
  { "id": 58, "name": "Speech Therapist" },
  { "id": 59, "name": "Audiologist" },
  { "id": 60, "name": "Occupational Therapist" },
  { "id": 61, "name": "Clinical Psychologist" },
  { "id": 62, "name": "Child Psychologist" },
  { "id": 63, "name": "Counseling Psychologist" },
  { "id": 64, "name": "Neuropsychologist" },
  { "id": 65, "name": "Addiction Psychiatrist" },
  { "id": 66, "name": "Adolescent Medicine Specialist" },
  { "id": 67, "name": "Hospitalist" },
  { "id": 68, "name": "Military Medicine Specialist" },
  { "id": 69, "name": "Preventive Medicine Specialist" },
  { "id": 70, "name": "Tropical Medicine Specialist" },
  { "id": 71, "name": "Hyperbaric Medicine Specialist" },
  { "id": 72, "name": "Clinical Nutritionist" },
  { "id": 73, "name": "Dietetics Specialist" },
  { "id": 74, "name": "Weight Loss Specialist" },
  { "id": 75, "name": "Bariatric Surgeon" },
  { "id": 76, "name": "Hand Surgeon" },
  { "id": 77, "name": "Foot and Ankle Surgeon" },
  { "id": 78, "name": "Spine Surgeon" },
  { "id": 79, "name": "Trauma Surgeon" },
  { "id": 80, "name": "Colorectal Surgeon" },
  { "id": 81, "name": "Breast Surgeon" },
  { "id": 82, "name": "Thoracic Surgeon" },
  { "id": 83, "name": "Hepatologist" },
  { "id": 84, "name": "Pancreatologist" },
  { "id": 85, "name": "Proctologist" },
  { "id": 86, "name": "Andrologist" },
  { "id": 87, "name": "Fertility Specialist" },
  { "id": 88, "name": "Maternal-Fetal Medicine Specialist" },
  { "id": 89, "name": "Obstetrician" },
  { "id": 90, "name": "Lactation Consultant" },
  { "id": 91, "name": "Prenatal Genetic Counselor" },
  { "id": 92, "name": "Child Development Specialist" },
  { "id": 93, "name": "Adoption Medicine Specialist" },
  { "id": 94, "name": "Pediatric Cardiologist" },
  { "id": 95, "name": "Pediatric Endocrinologist" },
  { "id": 96, "name": "Pediatric Gastroenterologist" },
  { "id": 97, "name": "Pediatric Hematologist" },
  { "id": 98, "name": "Pediatric Nephrologist" },
  { "id": 99, "name": "Pediatric Oncologist" },
  { "id": 100, "name": "Pediatric Neurologist" },
  { "id": 101, "name": "Pediatric Pulmonologist" },
  { "id": 102, "name": "Pediatric Rheumatologist" },
  { "id": 103, "name": "Pediatric Surgeon" },
  { "id": 104, "name": "Pediatric Urologist" },
  { "id": 105, "name": "Pediatric Infectious Disease Specialist" },
  { "id": 106, "name": "Pediatric Critical Care Specialist" },
  { "id": 107, "name": "Neuro-oncologist" },
  { "id": 108, "name": "Epileptologist" },
  { "id": 109, "name": "Movement Disorder Specialist" },
  { "id": 110, "name": "Headache Specialist" },
  { "id": 111, "name": "Multiple Sclerosis Specialist" },
  { "id": 112, "name": "Stroke Specialist" },
  { "id": 113, "name": "Neurointensivist" },
  { "id": 114, "name": "Cognitive Neurologist" },
  { "id": 115, "name": "Neurorehabilitation Specialist" },
  { "id": 116, "name": "Neurosurgeon" },
  { "id": 117, "name": "Functional Neurosurgeon" },
  { "id": 118, "name": "Pediatric Neurosurgeon" },
  { "id": 119, "name": "Skull Base Surgeon" },
  { "id": 120, "name": "Spinal Neurosurgeon" },
  { "id": 121, "name": "Cardiac Electrophysiologist" },
  { "id": 122, "name": "Interventional Cardiologist" },
  { "id": 123, "name": "Heart Failure Specialist" },
  { "id": 124, "name": "Cardiac Surgeon" },
  { "id": 125, "name": "Transplant Cardiologist" },
  { "id": 126, "name": "Pediatric Cardiothoracic Surgeon" },
  { "id": 127, "name": "Adult Congenital Cardiologist" },
  { "id": 128, "name": "Immuno-Oncologist" },
  { "id": 129, "name": "Radiation Oncologist" },
  { "id": 130, "name": "Surgical Oncologist" },
  { "id": 131, "name": "Pediatric Oncologic Surgeon" },
  { "id": 132, "name": "Molecular Oncologist" },
  { "id": 133, "name": "Genitourinary Oncologist" },
  { "id": 134, "name": "Gynecologic Oncologist" },
  { "id": 135, "name": "Sarcoma Specialist" },
  { "id": 136, "name": "Bone Marrow Transplant Specialist" },
  { "id": 137, "name": "Stem Cell Transplant Specialist" },
  { "id": 138, "name": "Integrative Medicine Specialist" },
  { "id": 139, "name": "Holistic Medicine Specialist" },
  { "id": 140, "name": "Wellness & Preventive Care Specialist" },
  { "id": 141, "name": "Immunopathologist" },
  { "id": 142, "name": "Clinical Biochemist" },
  { "id": 143, "name": "Molecular Pathologist" },
  { "id": 144, "name": "Forensic Pathologist" },
  { "id": 145, "name": "Virologist" },
  { "id": 146, "name": "Bacteriologist" },
  { "id": 147, "name": "Parasitologist" },
  { "id": 148, "name": "Mycologist" },
  { "id": 149, "name": "Cytogeneticist" },
  { "id": 150, "name": "Immunohematologist" },
  { "id": 151, "name": "Phlebologist" },
  { "id": 152, "name": "Pain Management Specialist" },
  { "id": 153, "name": "Spinal Pain Specialist" },
  { "id": 154, "name": "Rehabilitation Medicine Specialist" },
  { "id": 155, "name": "Medical Oncologist" },
  { "id": 156, "name": "Dental Public Health Specialist" },
  { "id": 157, "name": "Oral Pathologist" },
  { "id": 158, "name": "Oral Radiologist" },
  { "id": 159, "name": "Oral Medicine Specialist" },
  { "id": 160, "name": "Oral Implantologist" },
  { "id": 161, "name": "Craniofacial Surgeon" },
  { "id": 162, "name": "Cleft Lip & Palate Surgeon" },
  { "id": 163, "name": "Microsurgeon" },
  { "id": 164, "name": "Reconstructive Surgeon" },
  { "id": 165, "name": "Laser Surgeon" },
  { "id": 166, "name": "Robotic Surgeon" },
  { "id": 167, "name": "Minimally Invasive Surgeon" },
  { "id": 168, "name": "Laparoscopic Surgeon" },
  { "id": 169, "name": "Endoscopic Surgeon" },
  { "id": 170, "name": "Hernia Surgeon" },
  { "id": 171, "name": "Biliary Surgeon" },
  { "id": 172, "name": "Liver Transplant Surgeon" },
  { "id": 173, "name": "Kidney Transplant Surgeon" },
  { "id": 174, "name": "Lung Transplant Specialist" },
  { "id": 175, "name": "Bone Transplant Specialist" },
  { "id": 176, "name": "Eye Surgeon" },
  { "id": 177, "name": "Corneal Specialist" },
  { "id": 178, "name": "Glaucoma Specialist" },
  { "id": 179, "name": "Retina Specialist" },
  { "id": 180, "name": "Oculoplastic Surgeon" },
  { "id": 181, "name": "Pediatric Ophthalmologist" },
  { "id": 182, "name": "Neuro-ophthalmologist" },
  { "id": 183, "name": "Vision Rehabilitation Specialist" },
  { "id": 184, "name": "Orthoptist" },
  { "id": 185, "name": "Low Vision Specialist" },
  { "id": 186, "name": "Contact Lens Specialist" },
  { "id": 187, "name": "Medical Aesthetician" },
  { "id": 188, "name": "Dermatopathologist" },
  { "id": 189, "name": "Pediatric Dermatologist" },
  { "id": 190, "name": "Cosmetic Dermatologist" },
  { "id": 191, "name": "Mohs Surgeon" },
  { "id": 192, "name": "Immunodermatologist" },
  { "id": 193, "name": "Hair Restoration Specialist" },
  { "id": 194, "name": "Trichologist" },
  { "id": 195, "name": "Tattoo Removal Specialist" },
  { "id": 196, "name": "Skin Cancer Surgeon" },
  { "id": 197, "name": "Allergy & Asthma Specialist" },
  { "id": 198, "name": "Food Allergy Specialist" },
  { "id": 199, "name": "Drug Allergy Specialist" },
  { "id": 200, "name": "Environmental Allergy Specialist" },
  { "id": 201, "name": "Immunotherapy Specialist" },
  { "id": 202, "name": "Travel Medicine Specialist" },
  { "id": 203, "name": "Marine Medicine Specialist" },
  { "id": 204, "name": "Aerospace Medicine Specialist" },
  { "id": 205, "name": "Disaster Medicine Specialist" },
  { "id": 206, "name": "Rural Medicine Specialist" },
  { "id": 207, "name": "Urban Medicine Specialist" },
  { "id": 208, "name": "Telemedicine Specialist" },
  { "id": 209, "name": "Digital Health Specialist" },
  { "id": 210, "name": "AI in Medicine Specialist" },
  { "id": 211, "name": "Clinical Trial Specialist" },
  { "id": 212, "name": "Pharmaceutical Medicine Specialist" },
  { "id": 213, "name": "Regenerative Medicine Specialist" },
  { "id": 214, "name": "Stem Cell Therapy Specialist" },
  { "id": 215, "name": "Gene Therapy Specialist" },
  { "id": 216, "name": "Genomic Medicine Specialist" },
  { "id": 217, "name": "Precision Medicine Specialist" },
  { "id": 218, "name": "Medical Informatics Specialist" },
  { "id": 219, "name": "Health Policy Specialist" },
  { "id": 220, "name": "Epidemiologist" },
  { "id": 221, "name": "Public Health Specialist" },
  { "id": 222, "name": "Community Medicine Specialist" },
  { "id": 223, "name": "School Health Specialist" },
  { "id": 224, "name": "Occupational Health Nurse" },
  { "id": 225, "name": "Industrial Hygienist" },
  { "id": 226, "name": "Ergonomist" },
  { "id": 227, "name": "Toxicologist" },
  { "id": 228, "name": "Environmental Health Specialist" },
  { "id": 229, "name": "Climate Change & Health Specialist" },
  { "id": 230, "name": "Sustainability in Healthcare Specialist" },
  { "id": 231, "name": "Veteran Health Specialist" },
  { "id": 232, "name": "Prison Health Specialist" },
  { "id": 233, "name": "Refugee Health Specialist" },
  { "id": 234, "name": "Homeless Health Specialist" },
  { "id": 235, "name": "LGBTQ+ Health Specialist" },
  { "id": 236, "name": "Mental Health Specialist" },
  { "id": 237, "name": "Substance Abuse Specialist" },
  { "id": 238, "name": "Behavioral Health Specialist" },
  { "id": 239, "name": "Crisis Intervention Specialist" },
  { "id": 240, "name": "Suicide Prevention Specialist" },
  { "id": 241, "name": "Substance Abuse Counselor" },
  { "id": 242, "name": "Substance Abuse Counselor" },
]

</script>



<template>
 <div class="flex justify-center items-center min-h-screen ">
  
  <div class="w-full max-w-md p-8 ">
    <h1 class="text-2xl font-bold mb-6 text-center">Doctor Form</h1>

    <UForm 
      :schema="schema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormField label="User ID" name="user_id">
         <USelectMenu
    v-model="state.user_id"
    :items="users"
    value-key="value"
    label-key="label"
    :loading="pending"
    searchable
    searchable-placeholder="Search a user..."
    icon="i-lucide-user"
    placeholder="Select user"
    value-attribute="value"
    option-attribute="label"
    class="w-full"
    size="xl"
  >
   
  </USelectMenu>
      </UFormField>

      <UFormField label="Specialization" name="specialization">
        <!-- <UInput v-model="state.specialization" size="xl" class="w-full" placeholder="e.g. Cardiologist" /> -->
          <USelectMenu v-model="state.specialization" labelKey="name" value-key="name"  :items="sep" size="xl" class="w-full" placeholder="e.g. Cardiologist" />
      </UFormField>

      <UFormField label="Fees" name="fees">
        <UInput v-model="state.fees" type="number" size="xl" class="w-full" placeholder="Enter fees" />
      </UFormField>

      <UFormField label="Availability" name="availability">
        <UInput v-model="state.availability" type="date" size="xl" class="w-full" placeholder="e.g. Mon-Fri 9AM-5PM" />
      </UFormField>

      <div class="flex justify-end gap-3 pt-4">
        <UButton @click="toggle" label="Cancel" color="error" variant="ghost" />
        <UButton label="Create" type="submit" size="lg" />
      </div>
    </UForm>
  </div>
</div>
</template>
