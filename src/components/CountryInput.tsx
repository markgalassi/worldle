import { useState } from "react";
import Autosuggest from "react-autosuggest";
import { countries } from "../domain/countries";

interface CountryInputProps {
  currentGuess: string;
  setCurrentGuess: (guess: string) => void;
}

export function CountryInput({
  currentGuess,
  setCurrentGuess,
}: CountryInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={({ value }) =>
        setSuggestions(
          countries
            .map((c) => c.name.toUpperCase())
            .filter((c) => c.toLowerCase().includes(value.toLowerCase()))
        )
      }
      onSuggestionsClearRequested={() => setSuggestions([])}
      getSuggestionValue={(suggestion) => suggestion}
      renderSuggestion={(suggestion) => (
        <div className="border-2">{suggestion}</div>
      )}
      containerProps={{
        className: "border-2 flex-auto relative",
      }}
      inputProps={{
        className: "w-full",
        placeholder: "Country, territory...",
        value: currentGuess,
        onChange: (_e, { newValue }) => setCurrentGuess(newValue),
      }}
      renderSuggestionsContainer={({ containerProps, children }) => (
        <div
          {...containerProps}
          className={`${containerProps.className} absolute bottom-full w-full bg-white mb-1 divide-x-2`}
        >
          {children}
        </div>
      )}
    />
  );
}
