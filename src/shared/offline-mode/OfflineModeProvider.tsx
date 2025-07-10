import { useEffect } from "react";
import { toast } from "sonner";

import { useOnlineStatus } from "./useOnlineStatus";

export const OfflineModeProvider = ({ children }: { children: React.ReactNode }) => {
  const { isOnline, wasOffline } = useOnlineStatus();

  useEffect(() => {
    if (!isOnline) {
      toast.warning("Отсутствует подключение к интернету.", {
        description: "Вы находитесь в оффлайн-режиме. Некоторые функции могут быть недоступны."
      });
    } else if (wasOffline) {
      toast.success("Подключение восстановлено!");
    }
  }, [isOnline]);

  return children;
};
