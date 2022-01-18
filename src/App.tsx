import { useCallback, useState } from "react";
import { countries } from "./countries";
import haversine from "haversine-distance";
import * as seedrandom from "seedrandom";

function App() {
  const now = new Date();
  const nowString = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
  const [country] = useState(
    countries[Math.floor(seedrandom.alea(nowString)() * countries.length)]
  );
  const [guesses, setGuesses] = useState<{ name: string; distance: number }[]>(
    []
  );
  const [currentGuess, setCurrentGuess] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const guessedCountry = countries.find(
        (country) => country.name.toLowerCase() === currentGuess.toLowerCase()
      );
      if (guessedCountry != null) {
        setGuesses((prevGuesses) => [
          ...prevGuesses,
          { name: currentGuess, distance: haversine(guessedCountry, country) },
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
        <div className="flex flex-col">
          <img
            className="max-h-52 my-1"
            alt="country to guess"
            src={`images/countries/${country.code.toLowerCase()}/vector.svg`}
          />
          <div>
            <h2 className="text-xl">Guesses:</h2>
            <ul>
              {guesses.map((guess, index) => (
                <li key={index}>
                  {guess.name} - {Math.round(guess.distance / 1000)}km
                </li>
              ))}
            </ul>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex my-1">
              <input
                className="border-2 flex-auto"
                value={currentGuess}
                onChange={(e) => setCurrentGuess(e.target.value)}
              />
              <button className="border-2 px-4 ml-1" type="submit">
                🗺️
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
