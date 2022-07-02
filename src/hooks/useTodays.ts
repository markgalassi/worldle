import { DateTime } from "luxon";
import { useCallback, useEffect, useMemo, useState } from "react";
import seedrandom from "seedrandom";
import {
  bigEnoughCountriesWithImage,
  countriesWithImage,
  Country,
  smallCountryLimit,
} from "../domain/countries";
import { areas } from "../domain/countries.area";
import { CountryCode } from "../domain/countries.position";
import { Guess, loadAllGuesses, saveGuesses } from "../domain/guess";

const forcedCountries: Record<string, CountryCode> = {
  "2022-02-02": "TD",
  "2022-02-03": "PY",
  "2022-03-21": "HM",
  "2022-03-22": "MC",
  "2022-03-23": "PR",
  "2022-03-24": "MX",
  "2022-03-25": "SE",
  "2022-03-26": "VU",
  "2022-03-27": "TF",
  "2022-03-28": "AU",
  "2022-03-29": "DE",
  "2022-03-30": "GA",
  "2022-03-31": "AI",
  "2022-04-01": "NE",
  "2022-04-02": "ET",
  "2022-04-03": "TZ",
  "2022-04-04": "LV",
  "2022-04-05": "CN",
  "2022-04-06": "SO",
  "2022-04-07": "JP",
  "2022-04-08": "BJ",
  "2022-04-09": "PW",
  "2022-04-10": "TW",
  "2022-04-11": "BS",
  "2022-04-12": "GA",
  "2022-04-13": "KZ",
  "2022-04-14": "PH",
  "2022-04-15": "MR",
  "2022-04-16": "AE",
  "2022-04-17": "SI",
  "2022-04-18": "LT",
  "2022-04-19": "PT",
  "2022-04-20": "LA",
  "2022-04-21": "TR",
  "2022-04-22": "CF",
  "2022-04-23": "MC",
  "2022-04-24": "UY",
  "2022-04-25": "CR",
  "2022-04-26": "MM",
  "2022-04-27": "ZW",
  "2022-04-28": "HR",
  "2022-04-29": "NC",
  "2022-04-30": "CO",
  "2022-05-01": "CU",
  "2022-05-02": "ES",
  "2022-05-03": "TM",
  "2022-05-04": "LI",
  "2022-05-05": "MK",
  "2022-05-06": "CY",
  "2022-05-07": "SR",
  "2022-05-08": "JM",
  "2022-05-09": "LR",
  "2022-05-10": "MZ",
  "2022-05-11": "AL",
  "2022-05-12": "UA",
  "2022-05-13": "SL",
  "2022-05-14": "CV",
  "2022-05-15": "BO",
  "2022-05-16": "AF",
  "2022-05-17": "TT",
  "2022-05-18": "FI",
  "2022-05-19": "CZ",
  "2022-05-20": "NP",
  "2022-05-21": "SZ",
  "2022-05-22": "AR",
  "2022-05-23": "PL",
  "2022-05-24": "TO",
  "2022-05-25": "BF",
  "2022-05-26": "EE",
  "2022-05-27": "UG",
  "2022-05-28": "BT",
  "2022-05-29": "FJ",
  "2022-05-30": "ER",
  "2022-05-31": "PY",
  "2022-06-01": "SH",
  "2022-06-02": "US",
  "2022-06-03": "BG",
  "2022-06-04": "DJ",
  "2022-06-05": "GM",
  "2022-06-06": "KH",
  "2022-06-07": "NA",
  "2022-06-08": "UZ",
  "2022-06-09": "BH",
  "2022-06-10": "CG",
  "2022-06-11": "NZ",
  "2022-06-12": "DK",
  "2022-06-13": "BD",
  "2022-06-14": "ML",
  "2022-06-15": "BW",
  "2022-06-16": "NG",
  "2022-06-17": "KY",
  "2022-06-18": "AO",
  "2022-06-19": "MA",
  "2022-06-20": "KE",
  "2022-06-21": "MN",
  "2022-06-22": "PG",
  "2022-06-23": "SN",
  "2022-06-24": "AQ",
  "2022-06-25": "GH",
  "2022-06-26": "IS",
  "2022-06-27": "MD",
  "2022-06-28": "NO",
  "2022-06-29": "SC",
  "2022-06-30": "MD",
  "2022-07-01": "VE",
};

const noRepeatStartDate = DateTime.fromFormat("2022-05-01", "yyyy-MM-dd");

export function getDayString(shiftDayCount?: number) {
  return DateTime.now()
    .plus({ days: shiftDayCount ?? 0 })
    .toFormat("yyyy-MM-dd");
}

export function useTodays(dayString: string): [
  {
    country?: Country;
    guesses: Guess[];
  },
  (guess: Guess) => void,
  number,
  number
] {
  const [todays, setTodays] = useState<{
    country?: Country;
    guesses: Guess[];
  }>({ guesses: [] });

  const addGuess = useCallback(
    (newGuess: Guess) => {
      if (todays == null) {
        return;
      }

      const newGuesses = [...todays.guesses, newGuess];

      setTodays((prev) => ({ country: prev.country, guesses: newGuesses }));
      saveGuesses(dayString, newGuesses);
    },
    [dayString, todays]
  );

  useEffect(() => {
    const guesses = loadAllGuesses()[dayString] ?? [];
    const country = getCountry(dayString);

    setTodays({ country, guesses });
  }, [dayString]);

  const randomAngle = useMemo(
    () => seedrandom.alea(dayString)() * 360,
    [dayString]
  );

  const imageScale = useMemo(() => {
    const normalizedAngle = 45 - (randomAngle % 90);
    const radianAngle = (normalizedAngle * Math.PI) / 180;
    return 1 / (Math.cos(radianAngle) * Math.sqrt(2));
  }, [randomAngle]);

  return [todays, addGuess, randomAngle, imageScale];
}

function getCountry(dayString: string) {
  const currentDayDate = DateTime.fromFormat(dayString, "yyyy-MM-dd");
  let pickingDate = DateTime.fromFormat("2022-03-21", "yyyy-MM-dd");
  let smallCountryCooldown = 0;
  let pickedCountry: Country | null = null;

  const lastPickDates: Record<string, DateTime> = {};

  do {
    smallCountryCooldown--;

    const pickingDateString = pickingDate.toFormat("yyyy-MM-dd");

    const forcedCountryCode = forcedCountries[dayString];
    const forcedCountry =
      forcedCountryCode != null
        ? countriesWithImage.find(
            (country) => country.code === forcedCountryCode
          )
        : undefined;

    const countrySelection =
      smallCountryCooldown < 0
        ? countriesWithImage
        : bigEnoughCountriesWithImage;

    if (forcedCountry != null) {
      pickedCountry = forcedCountry;
    } else {
      let countryIndex = Math.floor(
        seedrandom.alea(pickingDateString)() * countrySelection.length
      );
      pickedCountry = countrySelection[countryIndex];

      if (pickingDate >= noRepeatStartDate) {
        while (isARepeat(pickedCountry, lastPickDates, pickingDate)) {
          countryIndex = (countryIndex + 1) % countrySelection.length;
          pickedCountry = countrySelection[countryIndex];
        }
      }
    }

    if (areas[pickedCountry.code] < smallCountryLimit) {
      smallCountryCooldown = 7;
    }

    lastPickDates[pickedCountry.code] = pickingDate;
    pickingDate = pickingDate.plus({ day: 1 });
  } while (pickingDate <= currentDayDate);

  return pickedCountry;
}

function isARepeat(
  pickedCountry: Country | null,
  lastPickDates: Record<string, DateTime>,
  pickingDate: DateTime
) {
  if (pickedCountry == null || lastPickDates[pickedCountry.code] == null) {
    return false;
  }
  const daysSinceLastPick = pickingDate.diff(
    lastPickDates[pickedCountry.code],
    "day"
  ).days;

  return daysSinceLastPick < 100;
}
