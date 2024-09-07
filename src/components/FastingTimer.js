import React, { useState, useEffect } from 'react';
//import './FastingTimer.css'; // Ensure this path is correct

const FastingTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [goalHours, setGoalHours] = useState(16);
  const [previousGoal, setPreviousGoal] = useState(null);
  const [clickedHour, setClickedHour] = useState(null);

  const goalSeconds = goalHours * 3600;
  const remainingTime = goalSeconds - seconds;

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval = null;
    if (isActive && remainingTime > 0) {
      interval = setInterval(() => {
        setSeconds((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isActive || remainingTime <= 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingTime]);

  const handleStartPause = () => {
    if (!isActive) {
      if (previousGoal !== null) {
        const usePrevious = window.confirm(
          `Same goal as last time (${previousGoal})? Click OK for Same, Cancel for New.`
        );
        if (usePrevious) {
          setGoalHours(previousGoal);
          setIsActive(true);
          return;
        }
      }
      setPreviousGoal(goalHours);
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setSeconds(0);
  };

  const fastingBenefits = [
    { hour: 1, benefit: "Blood sugar levels start to drop." },
    { hour: 3, benefit: "Glycogen stores begin to deplete." },
    { hour: 6, benefit: "Growth hormone levels start to rise." },
    { hour: 12, benefit: "Fat burning increases as insulin levels drop." },
    { hour: 16, benefit: "Autophagy starts to clean out damaged cells." },
    { hour: 24, benefit: "Ketones are produced and fat burning intensifies." },
    { hour: 48, benefit: "Growth hormone and cellular repair are maximized." },
  ];

  const handleHourClick = (hour) => {
    setClickedHour(clickedHour === hour ? null : hour);
  };

  return (
    <div className="fasting-timer">
      <div>
        <label htmlFor="goal-hours">Set Goal: </label>
        <input
          type="number"
          id="goal-hours"
          value={goalHours}
          onChange={(e) => setGoalHours(Number(e.target.value))}
          min="1"
          max="48"
          step="1" // Use whole numbers
        />
      </div>

      <div className="time-display">
        <div>Elapsed Time: {formatTime(seconds)}</div>
        <div>Goal Time: {goalHours} ({formatTime(goalSeconds)})</div>
        {remainingTime <= 0 && (
          <div className="goal-reached">🎉 Goal reached! 🎉</div>
        )}
      </div>

      <div className="controls">
        <button onClick={handleStartPause} className="start-pause-btn">
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset} className="reset-btn">
          Reset
        </button>
      </div>

      <h3>Fasting Benefits</h3>
      <ul className="fasting-benefits">
        {fastingBenefits.map((benefit, index) => (
          <li
            key={index}
            onClick={() => handleHourClick(benefit.hour)}
            className="benefit-item"
          >
            <div className="hour-number">
              {benefit.hour}
              {clickedHour === benefit.hour && (
                <div className="benefit-detail">{benefit.benefit}</div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FastingTimer;
