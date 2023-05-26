# SEI Project 2 - Ultimate Trivia Quiz

This project involved building a front-end React app that interacts with a publicly available API and incorporates multiple components. For my project, I used a trivia API and the app is designed to provide users with a quiz featuring a diverse range of categories and questions. Users can either opt for a random quiz that combines questions from different categories or personalise their quiz by selecting questions to add to their "My Quiz" page.

Check out the [Ultimate Trivia Quiz](https://ultimate-trivia-quiz.netlify.app/)

## Tech Stack

- HTML
- CSS
- JavaScript
- React
- SASS

## Project Brief

- Build a React application that consumes a public API.
- Consume a public API – this could be anything but it must make sense for your project.
- The app should include a router - with several "pages".
- Include wireframes - that you designed before building the app.
- Have semantically clean HTML.

## Timeframe

1 Week | Solo project

## Planning

Once I decided to create a quiz application, my initial step was to plan the project by outlining its features, functionality, and initial thoughts on styling. Using Excalidraw, I created a wireframe that mapped out the various features I intended to incorporate, first focusing on those needed to create a functioning app and what would be achievable in the project timeframe. I then considered some potential stretch goals that I could add if time permitted. 

<img src="https://github.com/karaguarraci/Project-2/assets/115991254/7344992b-5fe2-4b34-ba7a-c106c4590ef3" alt="project wireframe" width="400">

## Build/Code Process

### MVP

Following on from the planning stage, I began setting up the initial file and structure of the app, including setting up the function for making API calls. I initially encountered difficulties with the API link as it required a key which I was unsure of how to integrate into my code. However, with reading the documentation, some guidance from my instructors and the aid of Postman to better comprehend the process, I was able to successfully utilise the API to retrieve the questions and display them on the webpage.

In thinking through how to present the questions and answers in the app, I explored several different ideas and considered the number of components that would be required. Ultimately, I decided to display both the question and answers on the same page, which became one of the main components utilised throughout the app's various question pages.

I added a QuestionCard into my QuestionPage and created a separate QuestionCard component. I mapped the available questions to display them all on the page. 

```js
 <ul className="questions-page__container">
          {questions.map((question) => (
            <QuestionCard question={question} />
          ))}
        </ul>
```

In order to enable users to select from the available categories provided by the API, I had to create a new component for the category selection. I then used the QuestionsPage to display the selected category's questions. This proved to be a challenging task that required significant research, I have outlined how I achieved this in the challenges section of the ReadMe. 

I realised that when loading to each question page, it would take some time before the questions were displayed, so I decided to add a loading message. In order to achieve this, I had to use useState(). Initially, I set the state to true and then within the useEffect hook, I set it to false once the data had been loaded. However, this approach only worked the first time the page was accessed. To address this issue, I set the state to true again each time the page was re-rendered. I accomplished this by adding the code at the top of my useEffect hook.

```js
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
  
  
  
   {loading ? (
        <div className="questions-page__loading">Loading questions...</div>
      ) : (
        <ul className="questions-page__container">
          {questions.map((question) => (
            <QuestionCard question={question} />
          ))}
        </ul>
      )}
```

### Stretch Goals

With all of the above functionality in place and some extra time before the presentation, I decided to implement a 'My Quiz' feature that would allow users to select specific questions and add them to a personal quiz page by clicking a button. This feature proved to be challenging and required a fair amount of research to properly implement.
When I discussed the 'My Quiz' feature with my instructor, they suggested that I explore the use of local storage to store the selected questions. After conducting some research and revisiting our previous sessions on tokens, I was able to save a question to local storage when the corresponding button was clicked. However, I realised that each new question was overwriting the previously saved question, so I rethought my approach. After some thought, I decided to store the selected questions in an array. I was able to successfully save the questions in an array, but I had to make sure that an empty array was created in local storage before appending the selected questions. Here is an example of my code for this feature:

```js
  setAddQuestion(!addQuestion);
    if (!addQuestion) {
      const savedQuestions =
        JSON.parse(localStorage.getItem("savedQuestions")) || [];
      savedQuestions.push(question);
      localStorage.setItem("savedQuestions", JSON.stringify(savedQuestions));
```

To display the selected questions on the 'My Quiz' page, I first had to retrieve them from local storage. Once I had the selected questions stored in an array, I used a similar functionality to the QuestionsPage component to display them on the 'My Quiz' page. This involved mapping over the array of selected questions and using the QuestionCard component to display them in a specific format.

```js
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
```

<img src="https://github.com/karaguarraci/Project-2/assets/115991254/e4d68ce4-4825-4312-9b1b-ebcd96409680" alt="app screenshot" width="350">

## Challenges

I mentioned above about the challenge I had when implementing the category selection.
To ensure that the appropriate set of questions was displayed upon selection of a particular category, I implemented the useParams method. Before that, I had to include the categories themselves by creating an object that contained the displayName and slug for each category. The slug was then utilised to link to the corresponding set of questions. The implementation of useParams looked something like this:

```js 
 const { category } = useParams();
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      if (category === undefined) {
        const { data } = await axios.get(`${X_API_URL}/trivia?limit=15`, {
          headers: { "X-Api-Key": APIkey },
        });
        setQuestions(data);
        setLoading(false);
        // console.log(data);
      } else {
        const { data } = await axios.get(
          `${X_API_URL}/trivia?limit=15&category=${category}`,
          {
            headers: { "X-Api-Key": APIkey },
          }
        );
        setQuestions(data);
        setLoading(false);
        // console.log(data);
      }
    };
    fetchData();
  }, [category]);
```

I also made use of an if statement that checked whether the category slug was undefined. This was necessary because the random questions functionality would break if the slug was defined. By doing so, I was able to ensure that the random questions feature would only be used when a category was not selected, while also allowing for the selection of a specific category when needed.

I have since thought about refactoring the above code, as it is quite repetitive, below is the refactored code: 

```js
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
```
<img src="https://github.com/karaguarraci/Project-2/assets/115991254/8f25f4a1-15d9-4fe2-a8ad-307506909c69" alt="app screenshot" width="350">

## Wins

To make the answer hidden and reveal it upon button click, I utilised the useState() hook and created a function to reveal the answer. Using a ternary operator in the return statement, I only displayed the answer if the button had been clicked and the showAnswer state was true. This was achieved by calling the reveal answer function on the onClick event of the button.

```js
const [showAnswer, setShowAnswer] = useState(false);


  const revealAnswer = () => {
    setAnswer(question.answer);
    setShowAnswer(true);
  };
  
  
 <p>{showAnswer ? `A. ${answer}` : ""}</p>
        <button onClick={revealAnswer} className="question-card__button">
          Reveal Answer
        </button>
```
<img src="https://github.com/karaguarraci/Project-2/assets/115991254/dbd73373-26a5-4797-b433-ca8059700e01" alt="app screenshot" width="300">
<img src="https://github.com/karaguarraci/Project-2/assets/115991254/202027fb-b991-4cc0-9548-8cd035ea15e9" alt="app screenshot" width="300">

## Project Screenshots

<img src="https://github.com/karaguarraci/Project-2/assets/115991254/6aaca053-69f2-4aa6-b2c1-915ee483060a" alt="app screenshot" width="300" height="200">
<img src="https://github.com/karaguarraci/Project-2/assets/115991254/8f25f4a1-15d9-4fe2-a8ad-307506909c69" alt="app screenshot" width="300" height="200">
<img src="https://github.com/karaguarraci/Project-2/assets/115991254/d34facbb-578d-4c5e-a0de-5d15a60a8da6" alt="app screenshot" width="300" height="200">
<img src="https://github.com/karaguarraci/Project-2/assets/115991254/44a52a57-3649-4b2d-b58a-93c3d4536fe3" alt="app screenshot" width="300" height="200">
<img src="https://github.com/karaguarraci/Project-2/assets/115991254/b759e57d-22f9-427e-a592-4bcfc97bf48a" alt="app screenshot" width="300" height="200">

## Key Learnings

Creating my first React app was a valuable learning experience for me. I gained a deeper understanding of key concepts such as conditional rendering and state management. Additionally, this project provided me with a practical opportunity to explore and work with API endpoints in the front end. I learned how to make HTTP requests to APIs, retrieve data, and handle it in my React components.

## Future Improvements

I would like to add two features to the ‘myQuiz’ element of my project to improve the user experience: the ability to reset the page and delete individual questions. These features were not implemented due to time constraints, but I believe they would be valuable additions. 
