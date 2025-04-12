import React, { useEffect, useState } from 'react';

function CountdownTimer({startSeconds = 60}){
  const [secondsLeft, setSecondsLeft] = useState(startSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval); // cleanup on unmount
  }, [secondsLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div>
      <h2>Countdown: {formatTime(secondsLeft)}</h2>
    </div>
  );
};

export default CountdownTimer;