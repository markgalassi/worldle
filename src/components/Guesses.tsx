import { Guess } from "../domain/guess";
import { GuessRow } from "./GuessRow";
import React from "react";
import { SettingsData } from "../hooks/useSettings";
import { Country } from "../domain/countries";

interface GuessesProps {
  targetCountry?: Country;
  rowCount: number;
  guesses: Guess[];
  settingsData: SettingsData;
  countryInputRef?: React.RefObject<HTMLInputElement>;
}

export function Guesses({
  targetCountry,
  rowCount,
  guesses,
  settingsData,
  countryInputRef,
}: GuessesProps) {
  return (
    <div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from(Array(rowCount).keys()).map((index) => (
          <GuessRow
            targetCountry={targetCountry}
            key={index}
            guess={guesses[index]}
            settingsData={settingsData}
            countryInputRef={countryInputRef}
          />
        ))}
      </div>
    </div>
  );
}
