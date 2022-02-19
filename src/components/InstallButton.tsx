import React from "react";
import { useTranslation } from "react-i18next";

interface InstallButtonProps {
  pwaInstall: (options: {
    title?: string;
    logo?: string;
    features?: React.ReactNode;
    featuresTitle?: string;
    description?: string;
    descritpionTitle?: string;
    instructionTitle?: string;
    instructionActionOk?: string;
    instructionActionCancel?: string;
    instructionActionInstall?: string;
    instructionIdeviceAction1?: string;
    instructionIdeviceAction2?: string;
    instructionFirefoxAction1?: string;
    instructionFirefoxAction2?: string;
    instructionFirefoxNewAction1?: string;
    instructionFirefoxNewAction2?: string;
    instructionOperaAction1?: string;
    instructionOperaAction2?: string;
    instructionNotSupported?: string;
  }) => Promise<void>;
}

export function InstallButton({ pwaInstall }: InstallButtonProps) {
  const { t } = useTranslation();

  return (
    <button
      className="mr-3 text-xl"
      type="button"
      onClick={() =>
        pwaInstall({
          title: t("install.title"),
          descritpionTitle: t("install.descritpionTitle"),
          description: t("install.description"),
          instructionTitle: t("install.instructionTitle"),
          instructionActionOk: t("install.instructionActionOk"),
          instructionActionCancel: t("install.instructionActionCancel"),
          instructionActionInstall: t("install.instructionActionInstall"),
          instructionFirefoxAction1: t("install.instructionFirefoxAction1"),
          instructionFirefoxAction2: t("install.instructionFirefoxAction2"),
          instructionFirefoxNewAction1: t(
            "install.instructionFirefoxNewAction1"
          ),
          instructionFirefoxNewAction2: t(
            "install.instructionFirefoxNewAction2"
          ),
          instructionIdeviceAction1: t("install.instructionIdeviceAction1"),
          instructionIdeviceAction2: t("install.instructionIdeviceAction2"),
          instructionOperaAction1: t("install.instructionOperaAction1"),
          instructionOperaAction2: t("install.instructionOperaAction2"),
          instructionNotSupported: t("install.instructionNotSupported"),
        })
      }
    >
      📲
    </button>
  );
}
