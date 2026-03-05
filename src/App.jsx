import { useState, useEffect } from "react";
import "./App.css";

const easyLevels = [
  {
    id: 1,
    number: "001",
    difficulty: "EASY",
    title: "THE NEIGHBOR",
    subTitle: "A letter was slipped under your door by mistake",
    case: `My dearest Margaret,
    I hope this letter finds you well. Life here has been peaceful, though I must admit the nights feel longer than I remember. I think of the house often — the garden, the kitchen, the way the light comes through the east window in the morning. I miss it deeply.
    Please do not worry about me. I am eating well and the people here are kind. James visits every Sunday without fail, which means the world to me. Tell him I said so, if you see him before I do.
    With all my love,
    Father`,
    question:
      "Something in this letter suggests the father did not write it willingly. What is it?",

    img: "",
    options: [
      {
        key: "A",
        text: "He misses the house too much which means he was forced to leave",
      },
      {
        key: "B",
        text: "He asks Margaret to tell James he visits — but if James visits him, he would tell James himself",
      },
      {
        key: "C",
        text: "He says the nights feel longer — a sign of fear or depression",
      },
      {
        key: "D",
        text: "He says the people are kind — he is trying to convince himself",
      },
    ],
    solution: "B",
    explanation:
      "He asks Margaret to tell James he visits every Sunday — but if James truly visits him, he would tell James himself. He wouldn't need Margaret as a messenger. James does not actually visit.",
    category: "contradiction",
    timeLimit: 60,
  },
  {
    id: 2,
    title: "second",
    subTitle: "",
    case: "",
    img: "",
    options: "",
    solution: "",
    explanation: "",
    timeLimit: "",
  },
];

const mediumLevels = [
  {
    id: 1,
    title: "",
    subTitle: "",
    case: "",
    img: "",
    options: "",
    solution: "",
    explanation: "",
    timeLimit: "",
  },
];
const hardLevels = [
  {
    id: 1,
    title: "",
    subTitle: "",
    case: "",
    img: "",
    options: "",
    solution: "",
    explanation: "",
    timeLimit: "",
  },
];
function App() {
  const [difficulty, setDifficulty] = useState("");
  const [play, setPlay] = useState(null);
  return (
    <div>
      {!play && <Main setDifficulty={setDifficulty} />}
      {difficulty && !play && (
        <Levels difficulty={difficulty} setPlay={setPlay} />
      )}

      {difficulty && play && (
        <LevelContent difficulty={difficulty} play={play} />
      )}
    </div>
  );
}

function Main({ setDifficulty }) {
  function handleSetDifficulty(level) {
    setDifficulty(level);
  }
  return (
    <div className="container">
      <div className="header">
        <h2 className="title">Solve Problems</h2>
        <h3>subtitle</h3>
      </div>
      <div className="body">
        <div className="difficulty">
          <p>Choose a Difficulty :</p>
          <button id="easy" onClick={() => handleSetDifficulty(easyLevels)}>
            Easy
          </button>
          <button id="medium" onClick={() => handleSetDifficulty(mediumLevels)}>
            Medium
          </button>
          <button id="hard" onClick={() => handleSetDifficulty(hardLevels)}>
            Hard
          </button>
        </div>
      </div>
    </div>
  );
}

function Levels({ difficulty, setPlay }) {
  function handleShowContent(id) {
    console.log(id);
    setPlay(id);
  }
  return (
    <div className="levels">
      {Array.from({ length: difficulty.length }, (_, i) => {
        return (
          <button key={i} onClick={() => handleShowContent(i + 1)}>
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}

function LevelContent({ difficulty, play }) {
  const [userAns, setUserAns] = useState(null);
  const totalTime = difficulty[play - 1].timeLimit;
  const [timer, setTimer] = useState(totalTime);
  const percentage = (timer / totalTime) * 100;

  useEffect(() => {
    if (timer === 0) return;

    const countDown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countDown);
  }, [timer]);

  function handleUserAnswer(userAnswer) {
    setUserAns(userAnswer);
  }
  return (
    <div className="play-content">
      <div className="header-container">
        <p id="emoji">📬</p>
        <p id="role">YOUR ROLE</p>
        <p className="content-title"> {difficulty[play - 1].title} </p>
        <div className="stats">
          <p className="content-level">Level: {difficulty[play - 1].id} </p>
          <p className="content-difficulty">
            {difficulty[play - 1].difficulty}
          </p>
        </div>
      </div>

      <div className="timer">
        <p>TIME REMAINING</p>
        <div className="timer-countdown">{difficulty[play - 1].timeLimit}</div>
        <div
          className="countdown-bar"
          style={{
            width: `${percentage}%`,
            height: "20px",
            transition: "width 1s linear",
            backgroundColor: "#B87D5A",
          }}
        ></div>
      </div>

      <div className="case-conainer">
        <div className="case-container-header">
          <p id="file">-- CASE FILE #{difficulty[play - 1].number} --</p>
          <p className="content-subtitle">{difficulty[play - 1].subTitle}</p>
        </div>
        <div className="case-content">{difficulty[play - 1].case}</div>
      </div>

      <div className="question-section">
        <p>QUESTION... So ?</p>
        <p className="content-question">{difficulty[play - 1].question}</p>
      </div>

      <div className="answer-options">
        {difficulty[play - 1].options.map((optn, index) => {
          return (
            <div
              key={index}
              className="option-button"
              onClick={() => handleUserAnswer(optn.key)}
            >
              <div className="option-letter">{optn.key} </div>
              <div className="option-text">{optn.text}</div>
            </div>
          );
        })}
      </div>
      <p className="footer-text">-- SELECT YOUR ANSWER --</p>
    </div>
  );
}
export default App;
