import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

export const parsePdfResume = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await API.post("/parse/pdf", formData);
  return data;
};

export const parseImageResume = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await API.post("/parse/image", formData);
  return data;
};

export const generateInterviewQuestions = async (payload) => {
  const { data } = await API.post("/interview/generate", payload);
  return data;
};