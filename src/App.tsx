import { useCallback, useMemo, useState } from "react";
import { countries } from "./countries";
import * as geolib from "geolib";
import * as seedrandom from "seedrandom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { DateTime, Interval } from "luxon";

const MAX_DISTANCE_ON_EARTH = 20_000_000;
const START_DATE = DateTime.fromISO("2022-01-21");
interface Guess {
  name: string;
  distance: number;
  direction: string;
}

function getDayString() {
  return DateTime.now().toFormat("yyyy-MM-dd");
}

function loadAllGuesses(): Record<string, Guess[]> {
  const storedGuesses = localStorage.getItem("guesses");
  return storedGuesses != null ? JSON.parse(storedGuesses) : {};
}

function computeProximityPercent(distance: number): number {
  const proximity = Math.max(MAX_DISTANCE_ON_EARTH - distance, 0);
  return Math.round((proximity / MAX_DISTANCE_ON_EARTH) * 100);
}

function App() {
  const dayString = useMemo(getDayString, []);
  const country = useMemo(
    () =>
      countries[Math.floor(seedrandom.alea(dayString)() * countries.length)],
    [dayString]
  );

  const [guesses, setGuesses] = useState<Guess[]>(
    loadAllGuesses()[dayString] ?? []
  );
  const [currentGuess, setCurrentGuess] = useState("");

  const saveGuesses = useCallback(
    (guesses) => {
      const allGuesses = loadAllGuesses();
      localStorage.setItem(
        "guesses",
        JSON.stringify({
          ...allGuesses,
          [dayString]: guesses,
        })
      );
    },
    [dayString]
  );

  const gameEnded = guesses.length === 6 || guesses.at(-1)?.distance === 0;

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const guessedCountry = countries.find(
        (country) => country.name.toLowerCase() === currentGuess.toLowerCase()
      );
      if (guessedCountry != null) {
        const newGuesses = [
          ...guesses,
          {
            name: currentGuess,
            distance: geolib.getDistance(guessedCountry, country),
            direction:
              geolib.getRoughCompassDirection(
                geolib.getCompassDirection(guessedCountry, country)
              ) ?? "!",
          },
        ];
        setGuesses(newGuesses);
        saveGuesses(newGuesses);
        setCurrentGuess("");
      }
    },
    [country, currentGuess, guesses, saveGuesses]
  );

  const shareText = useMemo(() => {
    const guessCount = guesses.at(-1)?.distance === 0 ? guesses.length : "X";
    console.log("aze", new Date(dayString), START_DATE);
    const dayCount = Math.floor(
      Interval.fromDateTimes(START_DATE, DateTime.fromISO(dayString)).length(
        "day"
      )
    );
    const title = `Worldle #${dayCount} ${guessCount}/6`;

    const guessString = guesses
      .map((guess) => {
        const percent = computeProximityPercent(guess.distance);
        const greenSquareCount = Math.floor(percent / 20);
        const yellowSquareCount = percent - greenSquareCount * 20 >= 10 ? 1 : 0;
        console.log({ greenSquareCount, yellowSquareCount });
        const green = "🟩".repeat(greenSquareCount);
        const yellow = "🟨".repeat(yellowSquareCount);
        const white = "⬜".repeat(5 - greenSquareCount - yellowSquareCount);
        return `${green}${yellow}${white}`;
      })
      .join("\n");

    return [title, guessString, 'https://worldle.teuteuf.fr'].join('\n');
  }, [dayString, guesses]);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg">
        <header className="border-b-2 border-gray-200">
          <h1 className="text-4xl font-bold uppercase tracking-wide text-center my-1">
            Wor<span className="text-green-600">l</span>dle
          </h1>
        </header>
        <div className="flex flex-col mx-2">
          <img
            className="max-h-52 my-1"
            alt="country to guess"
            src={`images/countries/${country.code.toLowerCase()}/vector.svg`}
          />
          <div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {Array.from(Array(6).keys()).map((index) => (
                <GuessRow key={index} guess={guesses[index]} />
              ))}
            </div>
          </div>
          <div className="my-2">
            {gameEnded ? (
              <CopyToClipboard text={shareText}>
                <button className="border-2 px-4 uppercase bg-green-600 text-white w-full">
                  Share
                </button>
              </CopyToClipboard>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <input
                    className="border-2 flex-auto"
                    placeholder="Country..."
                    value={currentGuess}
                    onChange={(e) => setCurrentGuess(e.target.value)}
                  />
                  <button className="border-2 uppercase my-0.5" type="submit">
                    🌍 Guess
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function GuessRow({ guess }: { guess?: Guess }) {
  const bgColor = guess != null ? "bg-white" : "bg-gray-200";

  return (
    <>
      <div className={`border-2 h-8 col-span-3 ${bgColor}`}>
        {guess?.name.toUpperCase()}
      </div>
      <div className={`border-2 h-8 col-span-2 ${bgColor}`}>
        {guess && `${Math.round(guess.distance / 1000)}km`}
      </div>
      <div className={`border-2 h-8 col-span-1 ${bgColor}`}>
        {guess?.distance === 0 ? "🎉" : guess?.direction}
      </div>
      <div className={`border-2 h-8 col-span-1 ${bgColor}`}>
        {guess && `${computeProximityPercent(guess.distance)}%`}
      </div>
    </>
  );
}

export default App;
