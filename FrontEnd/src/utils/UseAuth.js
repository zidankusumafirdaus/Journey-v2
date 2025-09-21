import { useEffect, useState } from "react";
import { getProfile } from "./api";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getProfile();
        setIsAuth(true);
      } catch {
        localStorage.removeItem("token");
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return { isAuth, loading };
};
