import { z } from "zod";

export const WeightHistory = z.object({
  weight: z.coerce.number().min(0),
});

export enum WeightHistoryENUM {
  weight = "weight",
}

export type WeightHistoryType = z.infer<typeof WeightHistory>;
