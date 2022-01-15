import { useCallback, useState } from 'react';
import { countries } from './countries';
import haversine from 'haversine-distance'

function App() {
  const [country, setCountry] = useState(countries[Math.floor(Math.random() * countries.length)]);
  const [guesses, setGuesses] = useState<{name: string, distance: number}[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const guessedCountry = countries.find(country => country.name.toLowerCase() === currentGuess.toLowerCase());
    if (guessedCountry != null) {
      setGuesses(prevGuesses => [
        ...prevGuesses,
        {name: currentGuess, distance: haversine(guessedCountry, country)}
      ])
      setCurrentGuess('')
    }
  }, [currentGuess])

  return (
    <div>
      <div>
        {/* <h1>{country.name}</h1> */}
        <img
          alt='country to guess'
          src={`images/countries/${country.code.toLowerCase()}/vector.svg`}
          style={{maxHeight: '25vh'}}
        />
        <h2>Guesses:</h2>
        <ul>
          {guesses.map((guess, index) => (
            <li key={index}>
              {guess.name} - {Math.round(guess.distance / 1000)}km
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <input
            value={currentGuess}
            onChange={e => setCurrentGuess(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}

export default App;
