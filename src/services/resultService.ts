import axios from "axios";
import { ResultType } from "../types";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getResults = () =>
  axios.get(`${BASE_URL}/api/results/`);

export const postResults = (data: ResultType) =>
  axios.post(`${BASE_URL}/api/results/`, data);

export const deleteResults = () =>
  axios.delete(`${BASE_URL}/api/results/`);
