<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import { reactive, ref, watchEffect } from "vue";
import { useToast } from "#imports";
import { refDebounced } from "@vueuse/core";
import type { AvatarProps } from "@nuxt/ui";

const props = defineProps({
  appointment: {
    type: Object,
    default: () => null,
  },
});

const { user: currentUser } = useUserSession() as any;

console.log(currentUser.value, "Current User");

const patients = ref<any[]>([]);
const loadingPatients = ref(false);
const searchTerm = ref("");
const searchTermDebounced = refDebounced(searchTerm, 200);
const searchTermDoctor = ref("");
const searchTermDoctorDebounced = refDebounced(searchTermDoctor, 200);

const { data: doctors, pending: loadingDoctors } = useFetch("/api/doctors", {
  key: "table-doctors",
  params: {
    q: searchTermDoctorDebounced,
  },
});
// console.log(doctors, "Doctors List  in CreateAppointment.vue");

const schema = z.object({
  patient_id: z.coerce.number().min(1, "Patient is required"),
  doctor_id: z.coerce.number().min(1, "Doctor is required"),
  date: z.string().min(1, "Date is required"),
  status: z.enum(["pending", "confirmed", "completed", "canceled"]),
  id: z.number().optional(),
});
type Schema = z.output<typeof schema>;

// ----------------------
// STATE
// ----------------------
const initialState: Partial<Schema> = {
  patient_id: undefined,
  doctor_id: undefined,
  date: undefined,
  status: "pending",
  id: undefined,
};

const state = reactive<Partial<Schema>>({
  ...initialState,
  ...props.appointment,
  status: props.appointment?.status || "pending",
});

watchEffect(async () => {
  if (!currentUser.value) return;

  loadingPatients.value = true;

  try {
    if (currentUser.value.role === "patient") {
      const data: any = await $fetch("/api/patients/me");
      const patient = data?.data || data;
      patients.value = patient ? [patient] : [];
    } else {
      // Add search parameter to the API call
      const params = searchTermDebounced.value ? { q: searchTermDebounced.value } : {};
      const data: any = await $fetch("/api/patients", { params });
      patients.value = data?.data || [];
    }
  } catch (error) {
    console.error("Error loading patients:", error);
  }

  loadingPatients.value = false;
});
console.log(patients, "getting patients");

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const url = state.id ? `/api/appointments/${state.id}` : "/api/appointments";

  const method = state.id ? "PUT" : "POST";

  const { error } = await useFetch(url, {
    method,
    body: event.data,
  });

  if (error.value) {
    toast.add({
      title: "Error",
      description: error.value.message,
    });
    return;
  }

  toast.add({
    title: state.id ? "Updated" : "Created",
    description: `Appointment ${state.id ? "updated" : "created"} successfully`,
  });

  Object.assign(state, initialState);
}

const resetForm = (event: Event) => {
  event.preventDefault();
  Object.assign(state, initialState);
};

const statuses = ["pending", "confirmed", "completed", "canceled"];
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="w-full max-w-md p-8">
      <h1 class="text-2xl font-bold mb-6 text-center">
        {{ state.id ? "Edit Appointment" : "Create Appointment" }}
      </h1>

      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <!-- Patient -->
        <UFormField label="Patient" name="patient_id">
          <USelectMenu
            v-model="state.patient_id"
            v-model:search-term="searchTerm"
            :items="patients"
            value-key="id"
            label-key="patient_name"
            :loading="loadingPatients"
            ignore-filter
            placeholder="Select patient"
            class="w-full"
            size="xl"
          />
        </UFormField>

        <!-- Doctor -->
        <UFormField label="Doctor" name="doctor_id">
          <USelectMenu
            v-model="state.doctor_id"
            v-model:search-term="searchTermDoctor"
            :items="doctors?.data || []"
            value-key="id"
            label-key="name"
            :loading="loadingDoctors"
            ignore-filter
            placeholder="Select doctor"
            class="w-full"
            size="xl"
          />
        </UFormField>

        <!-- Date -->
        <UFormField label="Date" name="date">
          <UInput v-model="state.date" type="date" size="xl" class="w-full" />
        </UFormField>

        <!-- Status -->
        <UFormField label="Status" name="status">
          <USelectMenu
            v-model="state.status"
            :items="statuses"
            :disabled="currentUser?.role === 'patient'"
            placeholder="Select status"
            class="w-full"
            size="xl"
          />
        </UFormField>

        <!-- Actions -->
        <div class="flex justify-end gap-3 pt-4">
          <UButton
            label="Reset"
            color="error"
            variant="ghost"
            @click="() => resetForm({} as Event)"
          />
          <UButton
            :label="state.id ? 'Update Appointment' : 'Create Appointment'"
            type="submit"
            size="lg"
          />
        </div>
      </UForm>
    </div>
  </div>
</template>
