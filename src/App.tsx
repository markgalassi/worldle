import { useCallback, useState } from "react";
import { countries } from "./countries";
import * as geolib from "geolib";
import * as seedrandom from "seedrandom";

interface Guess {
  name: string;
  distance: number;
  direction: string;
}

function App() {
  const now = new Date();
  const nowString = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
  const [country] = useState(
    countries[Math.floor(seedrandom.alea(nowString)() * countries.length)]
  );
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");

  const gameEnded = guesses.length === 6 || guesses.at(-1)?.distance === 0;

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const guessedCountry = countries.find(
        (country) => country.name.toLowerCase() === currentGuess.toLowerCase()
      );
      if (guessedCountry != null) {
        setGuesses((prevGuesses) => [
          ...prevGuesses,
          {
            name: currentGuess,
            distance: geolib.getDistance(guessedCountry, country),
            direction:
              geolib.getRoughCompassDirection(
                geolib.getCompassDirection(guessedCountry, country)
              ) ?? "!",
          },
        ]);
        setCurrentGuess("");
      }
    },
    [country, currentGuess]
  );

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
            <div className="grid grid-cols-6 gap-1">
              {Array.from(Array(6).keys()).map((index) => (
                <GuessRow key={index} guess={guesses[index]} />
              ))}
            </div>
          </div>
          <div className="my-2">
            {gameEnded ? (
              <button className="border-2 px-4 uppercase bg-green-600 text-white w-full">
                Share
              </button>
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
  return (
    <>
      <div className="border-2 h-8 col-span-3">{guess?.name.toUpperCase()}</div>
      <div className="border-2 h-8 col-span-2">
        {guess && `${Math.round(guess.distance / 1000)}km`}
      </div>
      <div className="border-2 h-8 col-span-1">{guess?.direction}</div>
    </>
  );
}

export default App;
