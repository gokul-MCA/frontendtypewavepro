import axios from "axios";
import { FormValues } from "../types";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;


export const postContactForm = ( data: FormValues ) =>
  axios.post(`${BASE_URL}/api/contact/`, data);


export const postCaptcha = (token: string) => 
  axios.post(`${BASE_URL}/api/captcha/`, {token});