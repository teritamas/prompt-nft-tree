import axios from "axios";
const BASE_URL = "https://api.stability.ai";
const GENERATE_FULL_URL = `${BASE_URL}/v1/generation/stable-diffusion-v1-5/text-to-image`;

export function generate(apiKey: string, prompt: string): Image {
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

  axios
    .post(GENERATE_FULL_URL, requestBody, {
      headers: {
        "Content-Type": "application/json",
        Accept: "image/png",
        Authorization: `Bearer ${apiKey}`,
      },
      responseType: "arraybuffer",
    })
    .then((response: { data: BlobPart }) => {
      const blob = new Blob([response.data], { type: "image/png" });
      const url = URL.createObjectURL(blob);
      const img = new Image();

      img.onload = function () {
        URL.revokeObjectURL(url);
        document.body.appendChild(img);
      };
      img.src = url;
      return img;
    })
    .catch((error: any) => {
      console.error(error);
    });
}
