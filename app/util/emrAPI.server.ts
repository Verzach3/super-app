import {Medication, Patient} from "fhir/r4";
import getAxiosClientServer from "~/util/getAxiosClient.server";
import {getToken} from "~/util/tokenUtil.server";

const baseURL = "https://" + process.env.EMR_BASE_URL ?? "";
const fhirBaseURL = `${baseURL}/apis/default/fhir`;
const standartURL = `${baseURL}/apis/default/api`;

export async function getPatientData(patientId: string): Promise<Patient> {
  const res = await getAxiosClientServer().get(`${fhirBaseURL}/Patient/${patientId}`, {
    headers: {
      Authorization: `Bearer ${await getToken() ?? ""}`
    }
  })
  return res.data as Patient;
}

export async function getPatientMedication(patientId: string) {
  const res = await getAxiosClientServer().get(`${fhirBaseURL}/MedicationRequest?patient=${patientId}`, {
      headers: {
        Authorization: `Bearer ${await getToken() ?? ""}`
      }
    }
  )
  return res.data as Medication;
}