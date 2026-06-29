import { useState } from "react";
import AnswerBlock from "./AnswerBlock";
import CopyButton from "./CopyButton";

const QuestionCard = ({ item, index }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const copyText = `Question: ${item.question}\nAnswer: ${item.answer}`;

  return (
    <article className="question-card">
      <div className="question-head">
        <h3>Question {index + 1}</h3>

        <div className="question-actions">
          <button
            className="toggle-btn"
            onClick={() => setShowAnswer((prev) => !prev)}
            aria-expanded={showAnswer}
            type="button"
          >
            {showAnswer ? "Hide" : "Show"}
          </button>

          <CopyButton text={copyText} />
        </div>
      </div>

      <p className="question">{item.question}</p>

      {showAnswer ? (
        <div className="answer-wrap">
          <AnswerBlock answer={item.answer} />
        </div>
      ) : (
        <div className="answer-collapsed">Answer hidden — click Show to reveal</div>
      )}
    </article>
  );
};

export default QuestionCard;  