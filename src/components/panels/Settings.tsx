import React from "react";
import { useTranslation } from "react-i18next";
import { SettingsData } from "../../hooks/useSettings";
import { Panel } from "./Panel";

interface SettingsProps {
  isOpen: boolean;
  close: () => void;
  settingsData: SettingsData;
  updateSettings: (newSettings: Partial<SettingsData>) => void;
}

export function Settings({
  isOpen,
  close,
  settingsData,
  updateSettings,
}: SettingsProps) {
  const { t } = useTranslation();

  return (
    <Panel title={t("settings.title")} isOpen={isOpen} close={close}>
      <div>
        <header className="my-2">
          <h3 className="text-lg font-bold">
            {t("settings.difficultyModifiers")}
          </h3>
          <div className="text-sm italic text-gray-500">
            {t("settings.startingNextDay")}
          </div>
        </header>
        <div className="flex p-1">
          <input
            type="checkbox"
            id="setting-noImage"
            checked={settingsData.noImageMode}
            onChange={() =>
              updateSettings({ noImageMode: !settingsData.noImageMode })
            }
          />
          <label className="flex-1 ml-2" htmlFor="setting-noImage">
            {t("settings.noImageMode")}
          </label>
        </div>
        <div className="flex p-1">
          <input
            type="checkbox"
            id="setting-rotationMode"
            checked={settingsData.rotationMode}
            onChange={() =>
              updateSettings({ rotationMode: !settingsData.rotationMode })
            }
          />
          <label className="flex-1 ml-2" htmlFor="setting-rotationMode">
            {t("settings.rotationMode")}
          </label>
        </div>
      </div>
    </Panel>
  );
}
