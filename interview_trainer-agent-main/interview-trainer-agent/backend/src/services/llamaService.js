import axios from "axios";

export const generateInterviewContent = async (prompt) => {
  try {
    const apiKey = process.env.WATSONX_API_KEY;
    const baseUrl = process.env.WATSONX_BASE_URL;
    const deploymentId = process.env.WATSONX_DEPLOYMENT_ID;
    const version = process.env.WATSONX_API_VERSION;

    const tokenResponse = await axios.post(
      "https://iam.cloud.ibm.com/identity/token",
      new URLSearchParams({
        grant_type: "urn:ibm:params:oauth:grant-type:apikey",
        apikey: apiKey
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json"
        }
      }
    );

    const accessToken = tokenResponse.data.access_token;

    const payload = {
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    };

    const response = await axios.post(
      `${baseUrl}/ml/v1/deployments/${deploymentId}/text/chat?version=${version}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );

    const result =
      response.data?.choices?.[0]?.message?.content ||
      response.data?.results?.[0]?.generated_text ||
      "";

    return result;
  } catch (error) {
  console.log("IBM ERROR STATUS:", error.response?.status);
  console.log("IBM ERROR DATA:", JSON.stringify(error.response?.data, null, 2));
  console.log("IBM ERROR MESSAGE:", error.message);

  throw new Error(
    JSON.stringify({
      status: error.response?.status || 500,
      data: error.response?.data || error.message
    })
  );
}
};