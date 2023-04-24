import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";

const OwnQuizPage = () => {
  const [addedQuestions, setAddedQuestions] = useState([]);

  useEffect(() => {
    setAddedQuestions(JSON.parse(localStorage.getItem("savedQuestions")) || []);
  }, []);

  return (
    <div className="added-questions page">
      <h1>My Quiz</h1>

      <ul className="added-questions__list">
        {addedQuestions.map((question) => (
          <QuestionCard question={question} showAddButton={false} />
        ))}
      </ul>
    </div>
  );
};

export default OwnQuizPage;
