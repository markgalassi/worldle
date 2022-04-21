import React from "react";
import { useTranslation } from "react-i18next";

interface UpdateNotificationProps {
  ignoreUpdateNotification: () => void;
  onLoadNewServiceWorkerAccept: () => void;
}

export function UpdateNotification({
  ignoreUpdateNotification,
  onLoadNewServiceWorkerAccept,
}: UpdateNotificationProps) {
  const { t } = useTranslation();

  return (
    <div>
      <p>{t("newVersion")}</p>
      <div className="flex justify-center gap-1">
        <button
          className="uppercase font-bold underline"
          onClick={onLoadNewServiceWorkerAccept}
        >
          {t("update")}
        </button>
        <p>{t("or")}</p>
        <button
          className="uppercase font-bold underline"
          onClick={ignoreUpdateNotification}
        >
          {t("ignore")}
        </button>
      </div>
    </div>
  );
}
