import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const currentYear = new Date().getFullYear();

  // Target year
  const [targetYear, setTargetYear] = useState(currentYear + 1);

  const calculateTimeLeft = () => {
    const now = new Date();

    const newYear = new Date(
      `January 1, ${targetYear} 00:00:00`
    );

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
      days: Math.floor(
        difference / (1000 * 60 * 60 * 24)
      ),
      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      ),
      minutes: Math.floor(
        (difference / (1000 * 60)) % 60
      ),
      seconds: Math.floor(
        (difference / 1000) % 60
      ),
    };
  };

  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft()
  );

  useEffect(() => {
    // Immediately update when year changes
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetYear]);

  // Generate future years
  const futureYears = [];

  for (let year = currentYear + 1; year <= currentYear + 20; year++) {
    futureYears.push(year);
  }

  return (
    <div className="app">

      {/* Animated Stars */}
      <div className="stars">
        {Array.from({ length: 50 }).map((_, index) => (
          <span key={index} className="star"></span>
        ))}
      </div>

      {/* Countdown Card */}
      <div className="countdown-container">

        <p className="small-title">
          ✨ THE COUNTDOWN BEGINS ✨
        </p>

        <h1>New Year Countdown</h1>

        <p className="subtitle">
          Get ready to welcome a brand new year!
        </p>

        {/* Year Selector */}
        <div className="year-selector">

          <label htmlFor="year">
            Select Your New Year
          </label>

          <select
            id="year"
            value={targetYear}
            onChange={(e) =>
              setTargetYear(Number(e.target.value))
            }
          >
            {futureYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

        </div>

        {/* Selected Year */}
        <div className="selected-year">
          🎆 Countdown to {targetYear} 🎆
        </div>

        {/* Countdown */}
        <div className="countdown">

          <div className="time-box">
            <span>
              {String(timeLeft.days).padStart(2, "0")}
            </span>
            <p>Days</p>
          </div>

          <div className="time-box">
            <span>
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <p>Hours</p>
          </div>

          <div className="time-box">
            <span>
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <p>Minutes</p>
          </div>

          <div className="time-box">
            <span>
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <p>Seconds</p>
          </div>

        </div>

        {/* Bottom Message */}
        <p className="message">
          🎆 A new year, a new beginning, a new adventure! 🎆
        </p>

      </div>
    </div>
  );
}

export default App;