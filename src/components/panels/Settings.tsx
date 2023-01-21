import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SettingsData } from "../../hooks/useSettings";
import { translations } from "../../i18n";
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
  const { t, i18n } = useTranslation();
  const [debugEnabled, setDebugEnabled] = useState(false);

  return (
    <Panel
      title={t("settings.title")}
      isOpen={isOpen}
      close={close}
      debugAction={() => setDebugEnabled(true)}
    >
      <div className="my-4 flex flex-col gap-2">
        <div className="flex p-1">
          <select
            id="setting-distanceUnit"
            className="h-8 dark:bg-slate-800 w-16 p-1"
            value={settingsData.distanceUnit}
            onChange={(e) =>
              updateSettings({ distanceUnit: e.target.value as "km" | "miles" })
            }
          >
            <option value="km">KM</option>
            <option value="miles">Miles</option>
          </select>
          <label
            className="flex-1 ml-2 flex items-center"
            htmlFor="setting-distanceUnit"
          >
            {t("settings.distanceUnit")}
          </label>
        </div>
        <div className="flex p-1">
          <select
            id="setting-theme"
            className="h-8 dark:bg-slate-800 w-16 p-1"
            value={settingsData.theme}
            onChange={(e) =>
              updateSettings({ theme: e.target.value as "light" | "dark" })
            }
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          <label
            className="flex-1 ml-2 flex items-center"
            htmlFor="setting-theme"
          >
            {t("settings.theme")}
          </label>
        </div>
        <div className="flex p-1">
          <select
            id="setting-language"
            className="h-8 dark:bg-slate-800 w-16 p-1"
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
          >
            {Object.keys(translations).map((language) => (
              <option key={language} value={language}>
                {language.toUpperCase()}
              </option>
            ))}
          </select>
          <label
            className="flex-1 ml-2 flex items-center"
            htmlFor="setting-language"
          >
            {t("settings.language")}
          </label>
        </div>
      </div>
      <div className="my-4 flex flex-col gap-2">
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
            id="setting-showScale"
            checked={settingsData.showScale}
            onChange={(e) => updateSettings({ showScale: e.target.checked })}
          />
          <label className="flex-1 ml-2" htmlFor="setting-showScale">
            {t("settings.showScale")}
          </label>
        </div>
        <div className="flex p-1">
          <input
            type="checkbox"
            id="setting-noImage"
            checked={settingsData.noImageMode}
            onChange={(e) => updateSettings({ noImageMode: e.target.checked })}
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
            onChange={(e) => updateSettings({ rotationMode: e.target.checked })}
          />
          <label className="flex-1 ml-2" htmlFor="setting-rotationMode">
            {t("settings.rotationMode")}
          </label>
        </div>
      </div>
      {debugEnabled && (
        <div className="my-4">
          <header className="my-2">
            <h3 className="text-lg font-bold">Debug Menu</h3>
          </header>
          <div className="flex p-1">
            <input
              type="checkbox"
              id="setting-allowShiftingDay"
              checked={settingsData.allowShiftingDay}
              onChange={(e) =>
                updateSettings({ allowShiftingDay: e.target.checked })
              }
            />
            <label
              className="flex-1 ml-2 flex items-center"
              htmlFor="setting-allowShiftingDay"
            >
              Allow shifting day
            </label>
          </div>
          <div className="flex p-1">
            <select
              id="setting-shiftDayCount"
              className="h-8 dark:bg-slate-800"
              value={settingsData.shiftDayCount}
              onChange={(e) =>
                updateSettings({ shiftDayCount: parseInt(e.target.value) })
              }
            >
              {Array.from(Array(8).keys()).map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
            <label
              className="flex-1 ml-2 flex items-center"
              htmlFor="setting-shiftDayCount"
            >
              Shift day count
            </label>
          </div>
        </div>
      )}
    </Panel>
  );
}
