import { useEffect, useState } from "react";

const useTimer = (cb, interval = 1000) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [stop, setStop] = useState(false);

  useEffect(() => {
    let timeInterval;
    if (stop) return () => clearInterval(timeInterval);
    timeInterval = setInterval(() => {
      if (timeLeft > 0) setTimeLeft((prev) => prev - interval);
    }, interval);

    if (timeLeft === 0) cb();

    return () => clearInterval(timeInterval);
  }, [timeLeft, stop]);

  function start(seconds) {
    setStop(false);
    setTimeLeft(seconds * 1000);
  }

  function stopTime() {
    setStop(true);
  }

  return { timeLeft: timeLeft / 1000, start, stopTime };
};
export default useTimer;
