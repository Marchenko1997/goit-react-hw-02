import PropTypes from 'prop-types';

const Feedback = ({ feedbackTypes, totalFeedback }) => {
  const positivePercentage = totalFeedback === 0 ? 0 : Math.round((feedbackTypes.positive / totalFeedback) * 100);

  return (
    <div>
      <h2>Feedback</h2>
      <p>Good: {feedbackTypes.good}</p>
      <p>Neutral: {feedbackTypes.neutral}</p>
      <p>Bad: {feedbackTypes.bad}</p>
      <p>Total: {totalFeedback}</p>
      <p>Positive: {positivePercentage}%</p>
    </div>
  );
};

Feedback.propTypes = {
  feedbackTypes: PropTypes.shape({
    good: PropTypes.number.isRequired,
    neutral: PropTypes.number.isRequired,
    bad: PropTypes.number.isRequired,
    positive: PropTypes.number.isRequired,
  }).isRequired,
  totalFeedback: PropTypes.number.isRequired,
};

export default Feedback;
