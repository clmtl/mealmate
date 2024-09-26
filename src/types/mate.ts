import { Color } from "@prisma/client";
import { z } from "zod";

export const Mate = z.object({
  level: z.coerce.number().min(0).max(5),
  color: z.nativeEnum(Color),
});

export enum MateENUM {
  level = "level",
  color = "color",
}

export type MateType = z.infer<typeof Mate>;
