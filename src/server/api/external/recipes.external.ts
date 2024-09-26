import { env } from "~/env.mjs";
import {
  type EdamamSuccessResponse,
  type EdamamErrorResponse,
  type RecipesApiOptions,
} from "./recipes.external.types";

const RECIPES_API = "https://api.edamam.com/api/recipes/v2";

export const getExternalRecipes = (
  opts: RecipesApiOptions = { type: "public" }
) => {
  const qs: string[] = [];
  const addKeypair = (key: string, value: string | number | boolean) => {
    qs.push(`${key}=${encodeURIComponent(value)}`);
  };
  addKeypair("app_id", env.EDAMAM_APP_ID);
  addKeypair("app_key", env.EDAMAM_API_KEY);
  addKeypair("random", true);
  addKeypair("imageSize", "THUMBNAIL");
  Object.entries(opts).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => addKeypair(key, v));
    } else {
      addKeypair(key, value);
    }
  });
  const url = `${RECIPES_API}?${qs.join("&")}`;
  return fetch(url, {
    headers: {
      "Accept-Language": "en",
    },
  }).then(
    (res) => res.json() as Promise<EdamamErrorResponse | EdamamSuccessResponse>
  );
};
