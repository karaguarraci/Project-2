import { useEffect, useState } from "react";
import axios from "axios";
import { X_API_URL } from "../../const";
import { APIkey } from "../../const";
import QuestionCard from "./QuestionCard";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";


const QuestionsPage = (props) => {
  console.log(props);
  const location = useLocation();
  // console.log(location);
  const titleName = location.state;
  // console.log(titleName);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  const getUrlString = () => {
    let myUrl = `${X_API_URL}/trivia?limit=15`;
    if (category !== undefined) {
      myUrl += `&category=${category}`;
    }
    return myUrl;
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const { data } = await axios.get(getUrlString(), {
        headers: { "X-Api-Key": APIkey },
      });
      setQuestions(data);
      setLoading(false);
    };
    fetchData();
  }, [category]);

  return (
    <div className="questions-page page">
      {titleName === null ? (
        <h1>Random Quiz</h1>
      ) : (
        <h1>{titleName.displayName}</h1>
      )}
      {loading ? (
        <div className="questions-page__loading">Loading questions...</div>
      ) : (
        <ul className="questions-page__container">
          {questions.map((question) => (
            <QuestionCard question={question} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionsPage;


