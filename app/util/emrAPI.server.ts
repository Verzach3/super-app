import {Medication, Patient} from "fhir/r4";
import getAxiosClientServer from "~/util/getAxiosClient.server";
import {getToken} from "~/util/tokenUtil.server";
import {AxiosRequestConfig, AxiosResponse} from "axios";

const baseURL = "https://" + process.env.EMR_BASE_URL ?? "";
const fhirBaseURL = `${baseURL}/apis/default/fhir`;
const standartURL = `${baseURL}/apis/default/api`;

const MAX_RETRIES = 3; // Número máximo de reintentos
const RETRY_DELAY = 1000; // Tiempo de espera entre reintentos en milisegundos

async function makeRequest<T>(config: AxiosRequestConfig, retries = 0): Promise<AxiosResponse<T>> {
  try {
    const res = await getAxiosClientServer()(config);
    console.log("Petición exitosa", res.status, res.data)
    return res
  } catch (error) {
    console.log("Error en la petición", error, retries);
    if (retries < MAX_RETRIES) {
      // Esperar un tiempo antes de reintentar
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return makeRequest<T>(config, retries + 1);
    } else {
      throw error; // Lanzar el error si se han agotado los reintentos
    }
  }
}


export async function getPatientData(patientId: string): Promise<Patient> {
  const config: AxiosRequestConfig = {
    url: `${fhirBaseURL}/Patient/${patientId}`,
    headers: {
      Authorization: `Bearer ${await getToken() ?? ""}`
    }
  };
  const response = await makeRequest<Patient>(config);
  return response.data;
}

export async function getPatientMedication(patientId: string) {
  const config: AxiosRequestConfig = {
    url: `${fhirBaseURL}/MedicationRequest?patient=${patientId}`,
    headers: {
      Authorization: `Bearer ${await getToken() ?? ""}`
    }
  }
  const response = await makeRequest<Medication[]>(config);
  return response.data;
}