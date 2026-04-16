import { useMemo } from "react";
import { useAuth } from "./useAuth";

export function useSchlNm() {
  const { user } = useAuth();
  return useMemo(() => (user?.univ_nm ?? "").trim(), [user?.univ_nm]);
}

