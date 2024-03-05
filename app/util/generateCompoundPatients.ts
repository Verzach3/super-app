import {Patient} from "fhir/r4";
import {PatientProfile} from "~/types/database.types";
import CompoundPatient from "~/fhir-supa/compoundPatient";

export default function generateCompoundPatients(patients: {
  resource: Patient,
  fullUrl: string
}[], profiles: PatientProfile[]) {
  const compoundPatients: CompoundPatient[] = [];
  const processedEmrIds: string[] = [];

  // Iterate over patients
  for (const patient of patients) {
    const profile = profiles.find(profile => profile.emr_id === patient.resource.id);
    compoundPatients.push(new CompoundPatient(patient.resource, profile));
    if (patient.resource.id != null) {
      processedEmrIds.push(patient.resource.id);
    }
  }

  // Iterate over profiles
  for (const profile of profiles) {
    // Skip if a CompoundPatient has already been created for this emr_id
    if (processedEmrIds.includes(profile.emr_id)) {
      continue;
    }
    compoundPatients.push(new CompoundPatient(undefined, profile));
  }

  return compoundPatients;
}