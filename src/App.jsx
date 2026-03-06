import { useState, useEffect } from "react";
import "./App.css";
import { easyLevels, mediumLevels, hardLevels } from "./data";

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

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (timer === 0) return;

    const countDown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countDown);
  }, [timer]);

  return (
    <div className="play-content">
      <LevelInfo
        difficulty={difficulty}
        play={play}
        timer={timer}
        percentage={percentage}
      />

      <CaseContent difficulty={difficulty} play={play} />

      <QuestionSection difficulty={difficulty} play={play} />

      <AnswerSection
        difficulty={difficulty}
        play={play}
        userAns={userAns}
        setUserAns={setUserAns}
        submitted={submitted}
      />

      {userAns && (
        <Submittion
          submitted={submitted}
          userAns={userAns}
          difficulty={difficulty}
          play={play}
          setSubmitted={setSubmitted}
        />
      )}

      <p className="footer-text">
        {!submitted ? "-- SELECT YOUR ANSWER --" : "-- STAY SHARP --"}
      </p>
    </div>
  );
}
// LevelContent COMPONENTS
function LevelInfo({ difficulty, play, timer, percentage }) {
  return (
    <div className="level-info">
      <div className="header-container">
        <p id="emoji">{difficulty[play - 1].emoji}</p>
        <div className="role-infp">
          <p id="role">YOUR ROLE</p>
          <p className="content-title"> {difficulty[play - 1].title} </p>
        </div>

        <div className="stats">
          <p className="content-level">Level: {difficulty[play - 1].id} </p>
          <p className="content-difficulty">
            {difficulty[play - 1].difficulty}
          </p>
        </div>
      </div>
      <div className="timer">
        <p>TIME REMAINING</p>
        <div className="timer-countdown">{timer}</div>
        <div className="countdown-bar-wrapper">
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
      </div>
    </div>
  );
}
function CaseContent({ difficulty, play }) {
  return (
    <div className="case-conainer">
      <div className="case-container-header">
        <p id="file">-- CASE FILE #{difficulty[play - 1].number} --</p>
        <p className="content-subtitle">{difficulty[play - 1].subTitle}</p>
      </div>
      <div className="case-content">{difficulty[play - 1].case}</div>
    </div>
  );
}
function QuestionSection({ difficulty, play }) {
  return (
    <div className="question-section">
      <p>QUESTION... So ?</p>
      <p className="content-question">{difficulty[play - 1].question}</p>
    </div>
  );
}
function AnswerSection({ difficulty, play, userAns, setUserAns, submitted }) {
  function handleUserAnswer(userAnswer) {
    setUserAns(userAnswer);
  }
  return (
    <div className="answer-options">
      {difficulty[play - 1].options.map((optn, index) => {
        return (
          <button
            key={index}
            className={`option-button ${userAns === optn.key ? "selected" : ""}`}
            onClick={() => handleUserAnswer(optn.key)}
            disabled={submitted}
          >
            <div className="option-letter">{optn.key} </div>
            <div className="option-text">{optn.text}</div>
          </button>
        );
      })}

      {submitted && (
        <p
          className={`explanation ${userAns === difficulty[play - 1].solution ? "correct-exp" : "wrong-exp"}`}
        >
          {difficulty[play - 1].explanation}
        </p>
      )}
    </div>
  );
}
function Submittion({ submitted, userAns, difficulty, play, setSubmitted }) {
  return (
    <button
      className={`submit-answer ${submitted && (userAns === difficulty[play - 1].solution ? "correct-answer" : "wrong-answer")}`}
      onClick={() => setSubmitted(true)}
    >
      {!submitted
        ? "SUBMIT"
        : userAns === difficulty[play - 1].solution
          ? "CORRECT!"
          : "WRONG!"}
    </button>
  );
}
export default App;
