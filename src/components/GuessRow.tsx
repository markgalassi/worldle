import {
  computeProximityPercent,
  Direction,
  generateSquareCharacters,
} from "../domain/geography";
import { Guess } from "../domain/guess";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

const DIRECTION_ARROWS: Record<Direction, string> = {
  N: "⬆️",
  NNE: "↗️",
  NE: "↗️",
  ENE: "↗️",
  E: "➡️",
  ESE: "↘️",
  SE: "↘️",
  SSE: "↘️",
  S: "⬇️",
  SSW: "↙️",
  SW: "↙️",
  WSW: "↙️",
  W: "⬅️",
  WNW: "↖️",
  NW: "↖️",
  NNW: "↖️",
};

const SQUARE_ANIMATION_LENGTH = 150;
type AnimationState = "NOT_STARTED" | "RUNNING" | "ENDED";

export function GuessRow({ guess }: { guess?: Guess }) {
  const proximity = guess != null ? computeProximityPercent(guess.distance) : 0;
  const squares = generateSquareCharacters(proximity);

  const [animationState, setAnimationState] =
    useState<AnimationState>("NOT_STARTED");

  useEffect(() => {
    if (guess == null) {
      return;
    }

    setAnimationState("RUNNING");
    setTimeout(() => {
      setAnimationState("ENDED");
    }, SQUARE_ANIMATION_LENGTH * 6);
  }, [guess]);

  switch (animationState) {
    case "NOT_STARTED":
      return <div className={`col-span-7 border-2 h-8 bg-gray-200`} />;
    case "RUNNING":
      return (
        <>
          <div
            className={`flex text-2xl w-full justify-evenly items-center col-span-6 border-2 h-8`}
          >
            {squares.map((character, index) => (
              <div
                key={index}
                className="opacity-0 animate-reveal"
                style={{
                  animationDelay: `${SQUARE_ANIMATION_LENGTH * index}ms`,
                }}
              >
                {character}
              </div>
            ))}
          </div>
          <div className="border-2 h-8 col-span-1 animate-reveal">
            <CountUp
              end={proximity}
              suffix="%"
              duration={(SQUARE_ANIMATION_LENGTH * 5) / 1000}
            />
          </div>
        </>
      );
    case "ENDED":
      return (
        <>
          <div className="text-ellipsis overflow-hidden whitespace-nowrap border-2 h-8 col-span-3 animate-reveal">
            {guess?.name.toUpperCase()}
          </div>
          <div className="border-2 h-8 col-span-2 animate-reveal">
            {guess && `${Math.round(guess.distance / 1000)}km`}
          </div>
          <div className="border-2 h-8 col-span-1 animate-reveal">
            {guess?.distance === 0
              ? "🎉"
              : guess && DIRECTION_ARROWS[guess.direction]}
          </div>
          <div className="border-2 h-8 col-span-1 animate-reveal animate-pop">
            {`${proximity}%`}
          </div>
        </>
      );
  }
}
