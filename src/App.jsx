import { useState, useEffect } from "react";
import Options from "./components/Options";
import Feedback from "./components/Feedback";
import Notification from "./components/Notification";

import "./App.css";

export default function App() {
  const [feedbackTypes, setFeedbackTypes] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
    positive: 0
  });

  const [feedbackMessageShown, setFeedbackMessageShown] = useState(false);

  useEffect(() => {
    const savedFeedback = localStorage.getItem("feedback");
    if (savedFeedback) {
      setFeedbackTypes(JSON.parse(savedFeedback));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(feedbackTypes));
  }, [feedbackTypes, feedbackMessageShown]);

  const updateFeedback = (feedbackType) => {
    if (!feedbackMessageShown) {
      setFeedbackMessageShown(true);
    }

    if (typeof feedbackType === "string") {
      setFeedbackTypes((prev) => ({
        ...prev,
        [feedbackType]: prev[feedbackType] + 1,
        total: prev.total + 1,
        positive: feedbackType === "good" || feedbackType === "neutral" ? prev.positive + 1 : prev.positive 
      }));
    } else {
      setFeedbackTypes(feedbackType);
    }
  };

  const totalFeedback = feedbackTypes.good + feedbackTypes.neutral + feedbackTypes.bad;

  const positivePercentage =
    totalFeedback === 0
      ? 0
      : Math.round((feedbackTypes.positive / totalFeedback) * 100);

  return (
    <div>
      <h1>Sip Happens Café</h1>
      {!feedbackMessageShown && (
        <p>
          Please leave your feedback about our service by selecting one of the
          options below.
        </p>
      )}
      <Options updateFeedback={updateFeedback} totalFeedback={totalFeedback} />
      {totalFeedback > 0 ? (
        <Feedback
          feedbackTypes={feedbackTypes}
          totalFeedback={totalFeedback}
          positivePercentage={positivePercentage}
        />
      ) : (
        feedbackMessageShown && <Notification message="No feedback given yet." />
      )}
    </div>
  );
}
