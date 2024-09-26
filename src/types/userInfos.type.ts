import { Objective } from "@prisma/client";
import { z } from "zod";

export const UserInfos = z.object({
  age: z.coerce.number().min(0).max(150),
  heightInCentimeters: z.coerce.number().min(0).max(250),
  objective: z.nativeEnum(Objective),
});

export enum UserInfosENUM {
  age= "age",
  heightInCentimeters= "heightInCentimeters",
  objective= "objective",
}

export type UserInfosType = z.infer<typeof UserInfos>;
