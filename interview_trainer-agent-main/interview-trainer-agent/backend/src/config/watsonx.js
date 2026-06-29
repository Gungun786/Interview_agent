import dotenv from "dotenv";

dotenv.config();

export const watsonxConfig = {
  apiKey: process.env.WATSONX_API_KEY,
  baseUrl: process.env.WATSONX_BASE_URL,
  deploymentId: process.env.WATSONX_DEPLOYMENT_ID,
  version: process.env.WATSONX_API_VERSION || "2021-05-01"
};