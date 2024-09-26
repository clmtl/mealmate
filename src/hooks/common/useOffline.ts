import { useCallback, useEffect, useState } from "react";

const useOffline = () => {
  const [onlineStatus, setOnlineStatus] = useState(true);

  const toOffline = useCallback(() => {
    setOnlineStatus(false);
  }, []);

  const toOnline = useCallback(() => {
    setOnlineStatus(true);
  }, []);

  useEffect(() => {
    window.addEventListener("offline", toOffline);
    window.addEventListener("online", toOnline);

    return () => {
      window.removeEventListener("offline", toOffline);
      window.removeEventListener("online", toOnline);
    };
  }, [toOffline, toOnline]);

  return !onlineStatus;
};

export default useOffline;
