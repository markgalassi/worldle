import { DateTime } from "luxon";
import { loadAllGuesses } from "./guess";

export interface StatsData {
  currentStreak: number;
  maxStreak: number;
  played: number;
  winRatio: number;
  guessDistribution: Record<1 | 2 | 3 | 4 | 5 | 6, number>;
  averageBestDistance: number;
}

export function getStatsData(): StatsData {
  const allGuesses = loadAllGuesses();

  const allGuessesEntries = Object.entries(allGuesses);
  const played = allGuessesEntries.length;

  const guessDistribution = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };

  let currentStreak = 0;
  let maxStreak = 0;
  let previousDate: DateTime | undefined;
  let bestDistanceSum = 0;
  for (const [dayString, guesses] of allGuessesEntries) {
    bestDistanceSum += Math.min(...guesses.map((guess) => guess.distance));
    const currentDate = DateTime.fromFormat(dayString, "yyyy-MM-dd");
    const winIndex = guesses.findIndex((guess) => guess.distance === 0);
    const won = winIndex >= 0;
    if (won) {
      const tryCount = (winIndex + 1) as 1 | 2 | 3 | 4 | 5 | 6;
      guessDistribution[tryCount]++;

      if (
        previousDate == null ||
        previousDate.plus({ days: 1 }).hasSame(currentDate, "day")
      ) {
        currentStreak++;
      } else {
        currentStreak = 1;
      }
    } else {
      currentStreak = 0;
    }

    if (currentStreak > maxStreak) {
      maxStreak = currentStreak;
    }
    previousDate = currentDate;
  }

  const winCount = Object.values(guessDistribution).reduce(
    (total, tries) => total + tries
  );

  return {
    currentStreak: currentStreak,
    maxStreak: maxStreak,
    played,
    winRatio: winCount / (played || 1),
    guessDistribution: guessDistribution,
    averageBestDistance: bestDistanceSum / (played || 1),
  };
}
