import React, { useState } from "react";

interface ProgressProps {
  max: number;
  progress: number;
}

const ProgressBar: React.FC<ProgressProps> = ({ max, progress }) => {
  const percent = Math.min((progress / max) * 100, 100);

  return (
    <div style={{ border: "1px solid #ccc", width: "100%", padding: 2 }}>
      <div
        style={{
          width: `${percent}%`,
          height: "20px",
          backgroundColor: "dodgerblue",
          transition: "width 0.3s ease",
        }}
      />
    </div>
  );
};

const ProgressController: React.FC = () => {
  const maxProgress = 100;
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  // Called when first button is pressed to show progress bar and start progress
  const startProgress = () => {
    setShowProgress(true);
    setProgress(0);
  };

  // Increment progress by n (e.g., 10)
  const addProgress = (amount: number) => {
    setProgress((prev) => Math.min(prev + amount, maxProgress));
  };

  // Submit: reset and hide progress bar
  const submitProgress = () => {
    setShowProgress(false);
    setProgress(0);
    // Your submit logic here
    alert("Submitted!");
  };

  return (
    <div>
      {!showProgress && (
        <button onClick={startProgress}>Start Progress</button>
      )}

      {showProgress && (
        <>
          <ProgressBar max={maxProgress} progress={progress} />
          <button onClick={() => addProgress(10)}>Add 10%</button>
          <button onClick={() => addProgress(20)}>Add 20%</button>
          <button
            onClick={submitProgress}
            disabled={progress < maxProgress}
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default ProgressController;