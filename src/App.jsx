import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const calculateTimeLeft = () => {
    const now = new Date();
    const nextYear = now.getFullYear() + 1;

    const newYear = new Date(`January 1, ${nextYear} 00:00:00`);
    const difference = newYear - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app">
      <div className="countdown-container">
        <p className="small-title">✨ THE COUNTDOWN BEGINS ✨</p>

        <h1>New Year Countdown</h1>

        <p className="subtitle">
          Get ready to welcome a brand new year!
        </p>

        <div className="countdown">
          <div className="time-box">
            <span>{String(timeLeft.days).padStart(2, "0")}</span>
            <p>Days</p>
          </div>

          <div className="time-box">
            <span>{String(timeLeft.hours).padStart(2, "0")}</span>
            <p>Hours</p>
          </div>

          <div className="time-box">
            <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
            <p>Minutes</p>
          </div>

          <div className="time-box">
            <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
            <p>Seconds</p>
          </div>
        </div>

        <p className="message">
          🎆 A new year, a new beginning, a new adventure! 🎆
        </p>
      </div>
    </div>
  );
}

export default App;