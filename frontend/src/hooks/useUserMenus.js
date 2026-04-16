import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { getUserMenus } from "../services/api";

export function useUserMenus() {
  const { user, setUserMenus } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const data = await getUserMenus();
        if (!cancelled && data.menu_tree) {
          setUserMenus(data.menu_tree);
        }
      } catch {
        if (!cancelled) {
          setUserMenus([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [user, setUserMenus]);

  return { loading };
}