import { useState } from "react";

const QuestionCard = ({ question, showAddButton = true }) => {
  const [answer, setAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [addQuestion, setAddQuestion] = useState(false);

  const questions = [];
  const revealAnswer = () => {
    setAnswer(question.answer);
    setShowAnswer(true);
  };
  // move savedQuestions to const
  const handleAddQuestion = () => {
    const savedQuestions =
      JSON.parse(localStorage.getItem("savedQuestions")) || [];
    setAddQuestion(!addQuestion);

    if (!addQuestion) {
      savedQuestions.push(question);
    } else {
      savedQuestions = savedQuestions.filter(
        (savedQuestion) => savedQuestion.question !== question.question
      );
    }

    localStorage.setItem("savedQuestions", JSON.stringify(savedQuestions));
  };

  //add a showDeletebutton and set it accordingly (showAddButton example)

  //showDeleteButton onClick event to call a function that takes the question
  //remove the passed question from the savedQuestions list. savedQuestions
  //list is the list used to populate the My Quiz page.
  //once removed and the list has been updated, redraw the page (probably useState or useEffect)

  return (
    <li className="question-card">
      <div className="question-card__info">
        {/* <p>{question.category}</p> */}
        <p>Q. {question.question}</p>
        <p>{showAnswer ? `A. ${answer}` : ""}</p>
        <button onClick={revealAnswer} className="question-card__button">
          Reveal Answer
        </button>
        {showAddButton && (
          <button onClick={handleAddQuestion} className="question-card__button">
            {addQuestion ? "Remove from My Quiz" : "Add to My Quiz"}
          </button>
        )}
      </div>
    </li>
  );
};

export default QuestionCard;
