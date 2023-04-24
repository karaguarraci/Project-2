// import { imageURL } from "../../const";
const HomePage = () => {
  return (
    <div className="homepage page">
      <h1>The Ultimate Trivia Quiz</h1>
      <div className="homepage__about">
        <p>Welcome to the ultimate online trivia quiz!</p>
        <p>
          You can choose from a range of categories or mix it up and try your
          luck at the random quiz.
        </p>
        <p>Have fun &#128513;</p>
      </div>
      {/* <img src={imageURL} alt="" className="homepage__image" /> */}
    </div>
  );
};

export default HomePage;
