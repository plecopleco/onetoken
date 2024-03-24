import { useEffect, useRef, useState } from "react";
import localFont from "next/font/local";

const myFont = localFont({ src: "../pages/LuloCleanOne.otf" });

export const CountDown = () => {
  const [hours, setHours] = useState<number | string>(0);
  const [minutes, setMinutes] = useState<number | string>(0);
  const [seconds, setSeconds] = useState<number | string>(0);

  let interval: NodeJS.Timeout;

  const startTimer = () => {
    const countDownDate = 1711344600 * 1000;
    interval = setInterval(() => {
      const now = new Date().getTime();
      const differenceMilliseconds = countDownDate - now;
      const hours = Math.floor(differenceMilliseconds / (1000 * 3600));

      const minutes = Math.floor(
        // (hours * 3600 * 1000 - differenceMilliseconds) % (1000 * 60)
        (differenceMilliseconds % (1000 * 3600)) / (1000 * 60)
      );
      const seconds = Math.floor((differenceMilliseconds % (1000 * 60)) / 1000);

      if (differenceMilliseconds < 0) {
        // stop timer
        clearInterval(interval);
      } else {
        // update timer
        setHours(formatTime(hours));
        setMinutes(formatTime(minutes));
        setSeconds(formatTime(seconds));
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval);
    };
  }, []);

  function formatTime(time: number) {
    if (time < 10) {
      return `0${time}`;
    } else {
      return time;
    }
  }

  if (hours) {
    return (
      <div className={myFont.className}>
        <div className="flex gap-3 items-center justify-center">
          <h1 className="sm:text-xl md:text-2xl lg:text-5xl text-xl">
            ENDS IN:
          </h1>
          <div className="flex flex-col items-center ">
            <p className="sm:text-xl md:text-2xl lg:text-5xl text-xl">
              {hours}:{minutes}:{seconds}
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex gap-6 items-center justify-center">
        <div className="flex flex-col items-center ">
          <p className="text-xl">--</p>
          <p className="text-l">Days</p>
        </div>
        <div className="flex flex-col items-center ">
          <p className="text-xl">--</p>
          <p className="text-l">Hours</p>
        </div>
        <div className="flex flex-col items-center ">
          <p className="text-xl">--</p>
          <p className="text-l">Minutes</p>
        </div>
        <div className="flex flex-col items-center ">
          <p className="text-xl">--</p>
          <p className="text-l">Seconds</p>
        </div>
      </div>
    );
  }
};
