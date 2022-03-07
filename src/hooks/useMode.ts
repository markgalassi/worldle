import { useEffect, useState } from "react";

function loadAllModeValues(modeName: string): Record<string, boolean> {
  const storedModeValues = localStorage.getItem(modeName);
  return storedModeValues != null ? JSON.parse(storedModeValues) : {};
}

export function useMode(
  modeName: string,
  dayString: string,
  defaultValue: boolean
): [boolean, (modeValue: boolean) => void] {
  const [modeValue, setModeValue] = useState<boolean>(defaultValue);

  useEffect(() => {
    setModeValue(loadAllModeValues(modeName)[dayString] ?? defaultValue);
  }, [dayString, defaultValue, modeName]);

  useEffect(() => {
    const allModeValues = loadAllModeValues(modeName);
    localStorage.setItem(
      modeName,
      JSON.stringify({
        ...allModeValues,
        [dayString]: modeValue,
      })
    );
  }, [dayString, modeName, modeValue]);

  return [modeValue, setModeValue];
}
