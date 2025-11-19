import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const postGeminiPrompt = (searchInputValue: string) => {
    return axios.post(`${BASE_URL}/gemini`,  
        { searchInputValue },
        { withCredentials: true })
}