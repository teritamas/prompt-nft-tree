import axios from "axios";
const BASE_URL = "https://api.stability.ai";
const GENERATE_FULL_URL = `${BASE_URL}/v1/generation/stable-diffusion-v1-5/text-to-image`;

export async function generateAndUpdateNode(apiKey: string, prompt: string): Blob {
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
        const targetArea = document.getElementById("generativeImage")!;

        const currentImage = targetArea.firstChild;
        if (currentImage) {
          targetArea.removeChild(currentImage);
        }
        targetArea.appendChild(img);
      };
      img.src = url;
      return img;
    })
    .catch((error: any) => {
      console.error(error);
    });
}
