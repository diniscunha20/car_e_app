import React, { useState } from "react";
import ProgressBar from "./ProgressController";

const maxProgress = 100;

const ProgressProvider: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const startProgress = () => {
    setShowProgress(true);
    setProgress(0);
  };

  const addProgress = (amount: number) => {
    setProgress((prev) => Math.min(prev + amount, maxProgress));
  };

  const submitProgress = () => {
    setShowProgress(false);
    setProgress(0);
    alert("Submitted!");
  };

  return (
    <div>
      {showProgress && <ProgressBar max={maxProgress} progress={progress} />}

      
    </div>
  );
};

export default ProgressProvider;
