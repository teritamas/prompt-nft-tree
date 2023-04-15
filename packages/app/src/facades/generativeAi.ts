import axios from "axios";
const BASE_URL = "https://api.stability.ai";
const GENERATE_FULL_URL = `${BASE_URL}/v1/generation/stable-diffusion-v1-5/text-to-image`;

export function generateAndUpdateNode(apiKey: string, prompt: string) {
  const requestBody = {
    text_prompts: [
      {
        text: prompt,
      },
    ],
    cfg_scale: 7,
    clip_guidance_preset: "FAST_BLUE",
    height: 512,
    width: 512,
    samples: 1,
    seed: 1,
    steps: 30,
  };

  return axios.post(GENERATE_FULL_URL, requestBody, {
    headers: {
      "Content-Type": "application/json",
      Accept: "image/png",
      Authorization: `Bearer ${apiKey}`,
    },
    responseType: "arraybuffer",
  });
}
