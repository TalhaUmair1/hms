<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { reactive, watch } from 'vue'
import { useFetch } from '#app'
import { useToast } from '#imports'

const props = defineProps({
  doctor: {
    type: Object,
    default: null
  }
})
console.log('docotor is loged',props);

const { data: users, pending } = useFetch('/api/users', {
  key: 'users-list',
  lazy: true
})

const schema = z.object({
  user_id: z.coerce.number().min(1, 'User ID is required'),
  specialization: z.string().min(2, 'Specialization is required'),
  fees: z.coerce.number().min(0, 'Fees must be positive'),
  availability: z.string().min(2, 'Availability is required'),
  id: z.number().optional()
})

type Schema = z.output<typeof schema>

const initialState: Partial<Schema> = {
  user_id: undefined,
  specialization: undefined,
  fees: undefined,
  availability: undefined,
  id: undefined
}

const state = reactive<Partial<Schema>>(props.doctor||{ ...initialState })
const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const url = state.id ? `/api/doctors/${state.id}` : '/api/doctors'
  const method = state.id ? 'PUT' : 'POST'
  const { error } = await useFetch(url, { method, body: event.data })

  if (error.value) {
    toast.add({ title: 'Error', description: error.value.message })
  } else {
    toast.add({
      title: state.id ? 'Updated' : 'Created',
      description: `Doctor ${state.id ? 'updated' : 'created'} successfully!`
    })
  }

  Object.assign(state, initialState)
}

const resetForm = () => Object.assign(state, initialState)

const sep = [
  { id: 1, name: 'Cardiologist' },
  { id: 2, name: 'Dermatologist' },
  { id: 3, name: 'Neurologist' },
  { id: 4, name: 'Pediatrician' },
  { id: 5, name: 'Allergist' },
  { id: 6, name: 'Anesthesiologist' },
  { id: 7, name: 'Audiologist' },
  { id: 8, name: 'Chiropractor' },
  { id: 9, name: 'Dentist' },
  { id: 10, name: 'Endocrinologist' },
  { id: 11, name: 'Epidemiologist' },
  { id: 12, name: 'Gastroenterologist' },
  { id: 13, name: 'Geneticist' },
  { id: 14, name: 'Geriatrician' },
  { id: 15, name: 'Gynecologist' },
  { id: 16, name: 'Hematologist' },
  { id: 17, name: 'Immunologist' },
  { id: 18, name: 'Infectious Disease Specialist' },
  { id: 19, name: 'Internal Medicine Physician' },
  { id: 20, name: 'Neonatologist' },
  { id: 21, name: 'Nephrologist' },
  { id: 22, name: 'Obstetrician' },
  { id: 23, name: 'Occupational Therapist' },
  { id: 24, name: 'Oncologist' },
  { id: 25, name: 'Ophthalmologist' },
  { id: 26, name: 'Optometrist' },
  { id: 27, name: 'Orthopedic Surgeon' },
  { id: 28, name: 'Otolaryngologist (ENT)' },
  { id: 29, name: 'Pathologist' },
  { id: 30, name: 'Pharmacologist' },
  { id: 31, name: 'Physical Therapist' },
  { id: 32, name: 'Plastic Surgeon' },
  { id: 33, name: 'Podiatrist' },
  { id: 34, name: 'Psychiatrist' },
  { id: 35, name: 'Psychologist' },
  { id: 36, name: 'Pulmonologist' },
  { id: 37, name: 'Radiologist' },
  { id: 38, name: 'Rheumatologist' },
  { id: 39, name: 'Sleep Specialist' },
  { id: 40, name: 'Sports Medicine Specialist' },
  { id: 41, name: 'Surgeon' },
  { id: 42, name: 'Thoracic Surgeon' },
  { id: 43, name: 'Urologist' },
  { id: 44, name: 'Vascular Surgeon' },
  { id: 45, name: 'Acupuncturist' },
  { id: 46, name: 'Addiction Specialist' },
  { id: 47, name: 'Adolescent Medicine Specialist' },
  { id: 48, name: 'Aerospace Medicine Specialist' },
  { id: 49, name: 'Andrologist' },
  { id: 50, name: 'Biomedical Engineer' },
  { id: 51, name: 'Biostatistician' },
  { id: 52, name: 'Cardiac Electrophysiologist' },
  { id: 53, name: 'Cardiothoracic Surgeon' },
  { id: 54, name: 'Clinical Laboratory Scientist' },
  { id: 55, name: 'Clinical Neurophysiologist' },
  { id: 56, name: 'Clinical Pharmacologist' },
  { id: 57, name: 'Clinical Psychologist' },
  { id: 58, name: 'Colorectal Surgeon' },
  { id: 59, name: 'Community Medicine Specialist' },
  { id: 60, name: 'Critical Care Specialist' },
  { id: 61, name: 'Cytogeneticist' },
  { id: 62, name: 'Dental Surgeon' },
  { id: 63, name: 'Dermatopathologist' },
  { id: 64, name: 'Diabetologist' },
  { id: 65, name: 'Emergency Medicine Specialist' },
  { id: 66, name: 'Endodontist' },
  { id: 67, name: 'Environmental Health Specialist' },
  { id: 68, name: 'Epidemiology Researcher' },
  { id: 69, name: 'Family Physician' },
  { id: 70, name: 'Forensic Pathologist' },
  { id: 71, name: 'Forensic Psychiatrist' },
  { id: 72, name: 'Gastrointestinal Surgeon' },
  { id: 73, name: 'Genetic Counselor' },
  { id: 74, name: 'Geriatric Psychiatrist' },
  { id: 75, name: 'Hand Surgeon' },
  { id: 76, name: 'Head and Neck Surgeon' },
  { id: 77, name: 'Hepatologist' },
  { id: 78, name: 'Hospitalist' },
  { id: 79, name: 'Hyperbaric Medicine Specialist' },
  { id: 80, name: 'Imaging Specialist' },
  { id: 81, name: 'Infectious Disease Researcher' },
  { id: 82, name: 'Integrative Medicine Specialist' },
  { id: 83, name: 'Interventional Cardiologist' },
  { id: 84, name: 'Interventional Radiologist' },
  { id: 85, name: 'Laboratory Medicine Specialist' },
  { id: 86, name: 'Laser Surgeon' },
  { id: 87, name: 'Lifestyle Medicine Physician' },
  { id: 88, name: 'Maternal-Fetal Medicine Specialist' },
  { id: 89, name: 'Maxillofacial Surgeon' },
  { id: 90, name: 'Medical Geneticist' },
  { id: 91, name: 'Medical Microbiologist' },
  { id: 92, name: 'Medical Oncologist' },
  { id: 93, name: 'Molecular Biologist' },
  { id: 94, name: 'Musculoskeletal Radiologist' },
  { id: 95, name: 'Naturopathic Doctor' },
  { id: 96, name: 'Neonatal Surgeon' },
  { id: 97, name: 'Neuro-Oncologist' },
  { id: 98, name: 'Neuro-Ophthalmologist' },
  { id: 99, name: 'Neuropsychologist' },
  { id: 100, name: 'Neuroradiologist' },
  { id: 101, name: 'Nuclear Medicine Specialist' },
  { id: 102, name: 'Nutritionist' },
  { id: 103, name: 'Obesity Medicine Specialist' },
  { id: 104, name: 'Occupational Medicine Specialist' },
  { id: 105, name: 'Oncoplastic Surgeon' },
  { id: 106, name: 'Ophthalmic Surgeon' },
  { id: 107, name: 'Oral Surgeon' },
  { id: 108, name: 'Orthodontist' },
  { id: 109, name: 'Orthopedic Oncologist' },
  { id: 110, name: 'Orthopedic Spine Surgeon' },
  { id: 111, name: 'Osteopathic Physician' },
  { id: 112, name: 'Pain Management Specialist' },
  { id: 113, name: 'Palliative Care Specialist' },
  { id: 114, name: 'Pathology Assistant' },
  { id: 115, name: 'Pediatric Cardiologist' },
  { id: 116, name: 'Pediatric Dentist' },
  { id: 117, name: 'Pediatric Endocrinologist' },
  { id: 118, name: 'Pediatric Gastroenterologist' },
  { id: 119, name: 'Pediatric Hematologist' },
  { id: 120, name: 'Pediatric Nephrologist' },
  { id: 121, name: 'Pediatric Neurologist' },
  { id: 122, name: 'Pediatric Oncologist' },
  { id: 123, name: 'Pediatric Pulmonologist' },
  { id: 124, name: 'Pediatric Rheumatologist' },
  { id: 125, name: 'Pediatric Surgeon' },
  { id: 126, name: 'Perinatologist' },
  { id: 127, name: 'Periodontist' },
  { id: 128, name: 'Phlebotomist' },
  { id: 129, name: 'Physiatrist' },
  { id: 130, name: 'Plastic and Reconstructive Surgeon' },
  { id: 131, name: 'Preventive Medicine Specialist' },
  { id: 132, name: 'Primary Care Physician' },
  { id: 133, name: 'Proctologist' },
  { id: 134, name: 'Public Health Specialist' },
  { id: 135, name: 'Radiation Oncologist' },
  { id: 136, name: 'Rehabilitation Specialist' },
  { id: 137, name: 'Reproductive Endocrinologist' },
  { id: 138, name: 'Respiratory Therapist' },
  { id: 139, name: 'Rheumatology Researcher' },
  { id: 140, name: 'Sexologist' },
  { id: 141, name: 'Skull Base Surgeon' },
  { id: 142, name: 'Sleep Medicine Physician' },
  { id: 143, name: 'Spine Surgeon' },
  { id: 144, name: 'Sports Orthopedic Surgeon' },
  { id: 145, name: 'Surgical Oncologist' },
  { id: 146, name: 'Telemedicine Specialist' },
  { id: 147, name: 'Toxicologist' },
  { id: 148, name: 'Transplant Surgeon' },
  { id: 149, name: 'Trauma Surgeon' },
  { id: 150, name: 'Tropical Medicine Specialist' },
  { id: 151, name: 'Urgent Care Physician' },
  { id: 152, name: 'Urogynecologist' },
  { id: 153, name: 'Veterinarian' },
  { id: 154, name: 'Virologist' },
  { id: 155, name: 'Wound Care Specialist' },
  { id: 156, name: 'Clinical Immunologist' },
  { id: 157, name: 'Bioinformatics Specialist' },
  { id: 158, name: 'Cardiac Surgeon' },
  { id: 159, name: 'Cardiovascular Technician' },
  { id: 160, name: 'Dental Hygienist' },
  { id: 161, name: 'Dermatologic Surgeon' },
  { id: 162, name: 'Endocrine Surgeon' },
  { id: 163, name: 'Fetal Medicine Specialist' },
  { id: 164, name: 'Genomics Expert' },
  { id: 165, name: 'Gynecologic Oncologist' },
  { id: 166, name: 'Health Informatics Specialist' },
  { id: 167, name: 'Interventional Pulmonologist' },
  { id: 168, name: 'Laparoscopic Surgeon' },
  { id: 169, name: 'Medical Physicist' },
  { id: 170, name: 'Mental Health Counselor' },
  { id: 171, name: 'Neurointerventional Radiologist' },
  { id: 172, name: 'Neurosurgeon' },
  { id: 173, name: 'Occupational Psychologist' },
  { id: 174, name: 'Orthopedic Trauma Surgeon' },
  { id: 175, name: 'Pain Therapist' },
  { id: 176, name: 'Pediatric Otolaryngologist' },
  { id: 177, name: 'Perioperative Nurse Specialist' },
  { id: 178, name: 'Plastic Aesthetic Surgeon' },
  { id: 179, name: 'Prosthodontist' },
  { id: 180, name: 'Public Health Analyst' },
  { id: 181, name: 'Radiation Physicist' },
  { id: 182, name: 'Radiologic Technologist' },
  { id: 183, name: 'Reconstructive Surgeon' },
  { id: 184, name: 'Reproductive Biologist' },
  { id: 185, name: 'Rural Health Specialist' },
  { id: 186, name: 'Stem Cell Researcher' },
  { id: 187, name: 'Surgical Technologist' },
  { id: 188, name: 'Teleradiologist' },
  { id: 189, name: 'Travel Medicine Specialist' },
  { id: 190, name: 'Ultrasound Technician' },
  { id: 191, name: 'Veterinary Surgeon' },
  { id: 192, name: 'Voice Therapist' },
  { id: 193, name: 'Wellness Consultant' },
  { id: 194, name: 'Clinical Research Physician' },
  { id: 195, name: 'Dietitian' },
  { id: 196, name: 'Echocardiographer' },
  { id: 197, name: 'Elder Care Specialist' },
  { id: 198, name: 'Fertility Specialist' },
  { id: 199, name: 'Gastrointestinal Pathologist' },
  { id: 200, name: 'Gynecologic Surgeon' },
  { id: 201, name: 'Heart Failure Specialist' },
  { id: 202, name: 'HIV Specialist' },
  { id: 203, name: 'Hormone Specialist' },
  { id: 204, name: 'Imaging Technician' },
  { id: 205, name: 'Infectious Disease Physician' },
  { id: 206, name: 'Internal Medicine Resident' },
  { id: 207, name: 'Laser Therapy Specialist' },
  { id: 208, name: 'Liver Transplant Surgeon' },
  { id: 209, name: 'Lung Specialist' },
  { id: 210, name: 'Medical Technologist' },
  { id: 211, name: 'Microbiologist' },
  { id: 212, name: 'Neuroendocrinologist' },
  { id: 213, name: 'Neurogeneticist' },
  { id: 214, name: 'Neurophysiologist' },
  { id: 215, name: 'Obstetric Anesthetist' },
  { id: 216, name: 'Oncology Nurse' },
  { id: 217, name: 'Orthopedic Assistant' },
  { id: 218, name: 'Pain Psychologist' },
  { id: 219, name: 'Pediatric Anesthesiologist' },
  { id: 220, name: 'Pediatric Radiologist' },
  { id: 221, name: 'Pediatric Urologist' },
  { id: 222, name: 'Pharmacist' },
  { id: 223, name: 'Physiotherapist' },
  { id: 224, name: 'Plastic Facial Surgeon' },
  { id: 225, name: 'Preventive Cardiologist' },
  { id: 226, name: 'Primary Care Pediatrician' },
  { id: 227, name: 'Psychiatric Nurse' },
  { id: 228, name: 'Radiation Therapist' },
  { id: 229, name: 'Rehabilitation Psychologist' },
  { id: 230, name: 'Renal Transplant Surgeon' },
  { id: 231, name: 'Sleep Technician' },
  { id: 232, name: 'Speech Therapist' },
  { id: 233, name: 'Sports Cardiologist' },
  { id: 234, name: 'Sports Physiologist' },
  { id: 235, name: 'Surgical Pathologist' },
  { id: 236, name: 'Tissue Engineer' },
  { id: 237, name: 'Trauma Orthopedic Surgeon' },
  { id: 238, name: 'Vascular Neurologist' },
  { id: 239, name: 'Veterinary Radiologist' },
  { id: 240, name: 'Vision Specialist' },
  { id: 241, name: 'Women’s Health Specialist' },
  { id: 242, name: 'Wound Healing Specialist' },
  { id: 243, name: 'Yoga Therapist' },
  { id: 244, name: 'Zoonotic Disease Specialist' },
  { id: 245, name: 'Clinical Epidemiologist' },
  { id: 246, name: 'Diabetes Educator' },
  { id: 247, name: 'Hormone Replacement Specialist' },
  { id: 248, name: 'Hospital Pharmacist' },
  { id: 249, name: 'ICU Specialist' },
  { id: 250, name: 'Interventional Neuroradiologist' },
  { id: 251, name: 'Lymphatic Specialist' },
  { id: 252, name: 'Medical Illustrator' },
  { id: 253, name: 'Molecular Oncologist' },
  { id: 254, name: 'Nurse Anesthetist' },
  { id: 255, name: 'Nurse Practitioner' },
  { id: 256, name: 'Obstetric Nurse' },
  { id: 257, name: 'Oncology Pharmacist'}
  ]

</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="w-full max-w-md p-8">
      <h1 class="text-2xl font-bold mb-6 text-center">
        {{ state.id ? 'Edit Doctor' : 'Create Doctor' }}
      </h1>

      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="User" name="user_id">
          <USelectMenu
            v-model="state.user_id"
            :items="users"
            value-key="id"
            label-key="name"
            :loading="pending"
            placeholder="Select user"
            class="w-full"
            size="xl"
          />
        </UFormField>

        <UFormField label="Specialization" name="specialization">
          <USelectMenu
            v-model="state.specialization"
            labelKey="name"
            value-key="name"
            :items="sep"
            placeholder="Chose your Specialization"
            size="xl"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Fees" name="fees">
          <UInput v-model="state.fees" type="number" size="xl" class="w-full" placeholder="Enter fees" />
        </UFormField>

        <UFormField label="Availability" name="availability">
          <UInput v-model="state.availability" type="date" size="xl" class="w-full" />
        </UFormField>

        <div class="flex justify-end gap-3 pt-4">
          <UButton label="Reset" color="error" variant="ghost" @click="resetForm" />
          <UButton :label="state.id ? 'Update Doctor' : 'Create Doctor'" type="submit" size="lg" />
        </div>
      </UForm>
    </div>
  </div>
</template>
