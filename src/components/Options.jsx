import PropTypes from "prop-types";

export default function Options({ updateFeedback, totalFeedback }) {
  const handleFeedback = (type) => {
    updateFeedback(type);
  };

  const handleReset = () => {
    updateFeedback({
      good: 0,
      neutral: 0,
      bad: 0,
      total: 0,
      positive: 0
    });
  };

  return (
    <div className="Options">
      <h2>Options</h2>
      <button onClick={() => handleFeedback("good")}>Good</button>
      <button onClick={() => handleFeedback("neutral")}>Neutral</button>
      <button onClick={() => handleFeedback("bad")}>Bad</button>
      {totalFeedback > 0 && <button onClick={handleReset}>Reset</button>}
    </div>
  );
}

Options.propTypes = {
  updateFeedback: PropTypes.func.isRequired,
  totalFeedback: PropTypes.number.isRequired
};
