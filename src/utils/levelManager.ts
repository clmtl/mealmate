import { type Objective } from "@prisma/client";

export const loseFat = (
  level: number,
  yesterdaysWeight: number | undefined,
  todaysWeight: number | undefined
) => {
  if (yesterdaysWeight === undefined || todaysWeight === undefined) {
    return level;
  }
  if (todaysWeight < yesterdaysWeight) {
    return level + 1;
  }
  return level;
};

export const gainMuscle = (
  level: number,
  yesterdaysWeight: number | undefined,
  todaysWeight: number | undefined
) => {
  if (yesterdaysWeight === undefined || todaysWeight === undefined) {
    return level;
  }
  if (todaysWeight > yesterdaysWeight) {
    return level + 1;
  }
  return level;
};

export const maintainWeight = (
  level: number,
  yesterdaysWeight: number | undefined,
  todaysWeight: number | undefined
) => {
  if (yesterdaysWeight === undefined || todaysWeight === undefined) {
    return level;
  }
  if (todaysWeight === yesterdaysWeight) {
    return level + 1;
  }
  return level;
};

export const calculateNewLevel = ({
  matesLevel,
  usersObjective,
  todaysWeight,
  yesterdaysWeight,
}: {
  usersObjective: Objective;
  matesLevel: number;
  yesterdaysWeight?: number;
  todaysWeight?: number;
}) => {
  switch (usersObjective) {
    case "LOSE_FAT": {
      return loseFat(matesLevel, yesterdaysWeight, todaysWeight);
    }
    case "GAIN_MUSCLE": {
      return gainMuscle(matesLevel, yesterdaysWeight, todaysWeight);
    }
    case "MAINTAIN_WEIGHT": {
      return maintainWeight(matesLevel, yesterdaysWeight, todaysWeight);
    }
  }
  return matesLevel;
};
