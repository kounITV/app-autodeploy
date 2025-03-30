"use client";

import { createContext, useContext } from "react";
import { type AppAbility } from "../../setting/interface";

export const AbilityContext = createContext<AppAbility | undefined>(undefined);

export function useAbility() {
  const ability = useContext(AbilityContext);
  if (!ability) {
    throw new Error("Ability context must be used within AbilityProvider");
  }
  return ability;
}
