import React from "react";
import { DateTime } from "luxon";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const LOCAL_STORAGE_KEY = "LastNewsNotificationsDate";

const newsNotifications: Record<string, string[]> = {
  "2022-04-23": ["newsNotifications"],
};

export function useNewsNotifications(dayString: string) {
  const { t } = useTranslation();
  useEffect(() => {
    const lastDayString = localStorage.getItem(LOCAL_STORAGE_KEY) ?? dayString;
    const toDateTime = (dateString: string) =>
      DateTime.fromFormat(dateString, "yyyy-MM-dd");

    const notificationsToDisplay = Object.entries(newsNotifications)
      .filter(
        ([date]) =>
          toDateTime(date) > toDateTime(lastDayString) &&
          toDateTime(date) <= toDateTime(dayString)
      )
      .flatMap(([, messages]) => messages);

    notificationsToDisplay.forEach((message) => {
      toast.info(
        <div dangerouslySetInnerHTML={{ __html: t(`news.${message}`) }} />,
        {
          autoClose: false,
        }
      );
    });

    localStorage.setItem(LOCAL_STORAGE_KEY, dayString);
  }, [dayString, t]);
}
