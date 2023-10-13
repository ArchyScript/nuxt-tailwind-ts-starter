import axios, { AxiosRequestHeaders } from "axios"
import AppConfig from "~/AppConfig"
const { BASE_URL } = AppConfig

export const getAuthHeaders = (): AxiosRequestHeaders & any => {
  let authToken = null

  if (process.client && typeof window !== "undefined") {
    authToken = window.localStorage.getItem("authToken")
  }

  authToken = !authToken || authToken === undefined ? authToken : authToken

  const headers = {
    Authorization: `Bearer ${authToken}`,
  }

  return headers
}

// Axios instances
const defaultAxiosInstance = axios.create({
  baseURL: `${BASE_URL}/inspector`,
  headers: { ...getAuthHeaders() },
})

const commonAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { ...getAuthHeaders() },
})

const uploadAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    ...getAuthHeaders(),
    "Content-Type": "multipart/form-data",
  },
})

export { defaultAxiosInstance, commonAxiosInstance, uploadAxiosInstance }

/* 
const tehs = {
  first_name: Joi.string().required().label("first name"),
  last_name: Joi.string().required().label("last name"),
  address: Joi.string().required().label("address"),
  nationality: Joi.string().required().label("nationality"),
  email: Joi.string().required().email().label("email"),c
  power_of_attorney: Joi.string().required().label("power of attorney"),
  pep: Joi.string().required().label("pep").allow(null, ""),
  international_passport: Joi.string()
    .uri()
    .required()
    .label("International passport"),
  selfie: Joi.string().uri().required().label("Liveness check"),
  passport_number: Joi.string().required().label("passport number"),

  company_name: Joi.string().required().label("Company name"),
  company_reg_number: Joi.string()
    .required()
    .label("Company registration number"),
  company_country: Joi.string().required().label("company country"),
  company_address: Joi.string().required().label("Address of the company"),
  aml_appropriate_regulation: Joi.string()
    .required()
    .label("aml_appropriate_regulation"),
  appropriate_prudential_supervision: Joi.string()
    .required()
    .label("appropriate_prudential_supervision"),
  certificate_of_incorporation: Joi.string()
    .uri()
    .required()
    .label("Certificate of Incorporation"),

  company_account_number: Joi.string()
    .required()
    .label("Company account number"),
  company_account_name: Joi.string().required().label("Company account name"),
  company_bank: Joi.string().required().label("Company bank"),
  service_charge: Joi.number().required().label("Company service charge"),
  //   Other documents
  recaptchaToken: Joi.string().required().label("reCaptcha"),
}
 */
