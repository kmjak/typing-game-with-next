import { useEffect, useRef, useState } from "react";

interface TimeComponentProps {
  timerRef: React.MutableRefObject<number | null>;
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  maxTime: number;
}

export const TimeComponent = ({timerRef,timeLeft,setTimeLeft,maxTime}:TimeComponentProps) => {
  useEffect(() => {
    const startTime = Date.now();
    const updateTimer = () => {
      const elapsedTime = (Date.now() - startTime) / 1000;
      const newTimeLeft = Math.max(0, maxTime - elapsedTime);
      setTimeLeft(newTimeLeft);

      if (newTimeLeft > 0) {
        timerRef.current = requestAnimationFrame(updateTimer);
      }
    };

    timerRef.current = requestAnimationFrame(updateTimer);

    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, []);

  const progressBarWidth = (timeLeft / maxTime) * 100;
  const barColor = timeLeft >= 60 ? "blue" : timeLeft >= 30 ? "yellow" : "red";

  return (
    <>
      <h1 className="text-4xl font-semibold text-center my-5">
        {Math.ceil(timeLeft)}秒
      </h1>
      <div className="w-full max-w-lg h-2 bg-gray-200 rounded">
        <div
          className={`h-full rounded bg-${barColor}-500`}
          style={{
            width: `${progressBarWidth}%`,
            transition: 'width 0.1s linear'
          }}
        />
      </div>
    </>
  );
}