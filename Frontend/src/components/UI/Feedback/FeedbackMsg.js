import "./FeedbackMsg.css";

const FeedbackMsg = (props) => {
  return (
    <div
      style={{ opacity: props.opacity }}
      className={`${props.className} feedback-container}`}
    >
      <p className="feedback-msg">{props.children}</p>
    </div>
  );
};

export default FeedbackMsg;
