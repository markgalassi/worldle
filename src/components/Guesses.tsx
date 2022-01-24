import { Guess } from "../domain/guess";
import { GuessRow } from "./GuessRow";

interface GuessesProps {
  rowCount: number
  guesses: Guess[]
}

export function Guesses({rowCount, guesses}: GuessesProps) {
  return (
    <div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from(Array(rowCount).keys()).map((index) => (
          <GuessRow key={index} guess={guesses[index]} />
        ))}
      </div>
    </div>
  );
}
