import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const currentYear = new Date().getFullYear();

  const [targetYear, setTargetYear] = useState(currentYear + 1);

  const calculateTimeLeft = () => {
    const now = new Date();

    const newYear = new Date(
      `January 1, ${targetYear} 00:00:00`
    );

    const difference = newYear - now;

    if (difference <= 0) {
      return {
        isPast: true,
        days: Math.floor(Math.abs(difference) / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (Math.abs(difference) / (1000 * 60 * 60)) % 24
        ),
        minutes: Math.floor(
          (Math.abs(difference) / (1000 * 60)) % 60
        ),
        seconds: Math.floor(
          (Math.abs(difference) / 1000) % 60
        ),
      };
    }

    return {
      isPast: false,
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
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetYear]);

  // Generate past and future years
  const years = [];

  for (let year = 2000; year <= 3000; year++) {
    years.push(year);
  }

  return (
    <div className="app">

      {/* Animated Stars */}
      <div className="stars">
        {Array.from({ length: 50 }).map((_, index) => (
          <span key={index} className="star"></span>
        ))}
      </div>

      {/* Main Countdown Card */}
      <div className="countdown-container">

        <p className="small-title">
          ✨ THE COUNTDOWN BEGINS ✨
        </p>

        <h1>New Year Countdown</h1>

        <p className="subtitle">
          Choose any year and explore its New Year countdown.
        </p>

            <div className="year-selector">

        <label htmlFor="year">
          Select Year
        </label>

        <select
          id="year"
          value={targetYear}
          onChange={(e) =>
            setTargetYear(Number(e.target.value))
          }
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <button
          className="current-year-btn"
          onClick={() => setTargetYear(currentYear + 1)}
        >
          ↩ Current Year
        </button>

      </div>

        {/* Selected Year */}
        <div className="selected-year">
          🎆 New Year {targetYear} 🎆
        </div>

        {/* Future Year */}
        {!timeLeft.isPast && (
          <>
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

            <p className="message">
              🎆 A new year, a new beginning, a new adventure! 🎆
            </p>
          </>
        )}

        {/* Past Year */}
        {timeLeft.isPast && (
          <div className="past-year">

            <div className="past-icon">
              🎉
            </div>

            <h2>
              New Year {targetYear} Has Arrived!
            </h2>

            <p>
              This New Year was celebrated{" "}
              <strong>{timeLeft.days} days ago</strong>.
            </p>

            <div className="past-time">
              ✨ {timeLeft.days} Days •{" "}
              {timeLeft.hours} Hours •{" "}
              {timeLeft.minutes} Minutes ago ✨
            </div>

            <p className="past-message">
              🎊 Every year becomes a beautiful memory.
              Here's to new beginnings! 🎊
            </p>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;