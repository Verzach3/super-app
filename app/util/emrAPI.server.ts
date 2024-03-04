import {Patient} from "fhir/r4";
import getAxiosClientServer from "~/util/getAxiosClient.server";

const baseURL = process.env.EMR_BASE_URL ?? "";
const fhirBaseURL = `${baseURL}/apis/default/fhir`;
const standartURL = `${baseURL}/apis/default/api`;
async function getPatientData(patientId: string): Promise<Patient> {
  const res = await getAxiosClientServer().get(`${fhirBaseURL}/Patient/${patientId}`)
  return res.data as Patient;
}