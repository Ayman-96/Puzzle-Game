import { useState, useEffect } from "react";
import "./App.css";
import { easyLevels, mediumLevels, hardLevels } from "./data";
import Highlighter from "react-highlight-words";

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
  const [highlights, setHighlight] = useState([]);
  const [bgColor, setBgColor] = useState();
  const [color, setColor] = useState();
  const [colorName, setColorName] = useState("");
  const [boldText, setBoldText] = useState("normal");

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.ctrlKey && e.key === "z") {
        setHighlight((prev) => prev.slice(0, -1));
      }
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleHighlightColor(backgroundColor, textColor, colorName) {
    if (bgColor === backgroundColor && color === textColor) {
      setBgColor("");
      setColor("");
      setColorName("");
    } else {
      setBgColor(backgroundColor);
      setColor(textColor);
      setColorName(colorName);
    }
  }

  function fontWeight() {
    boldText === "normal" ? setBoldText("bold") : setBoldText("normal");
  }

  const handleHighlight = () => {
    let selected = window.getSelection().toString().trim();
    if (selected && (bgColor || boldText === "bold"))
      setHighlight((prev) => [...prev, selected]);
  };
  return (
    <div className="case-container">
      <div className="case-container-header">
        <div className="case-file-highlight">
          <p id="file">-- CASE FILE #{difficulty[play - 1].number} --</p>
          <HighlightOtions
            handleHighlightColor={handleHighlightColor}
            bgColor={bgColor}
          />
          <button
            className={`bold-highlighter ${boldText === "bold" && "selected-bold"}`}
            onClick={fontWeight}
            title="White"
          >
            B
          </button>
        </div>
        <div className="case-subtitle">
          <p className="content-subtitle">{difficulty[play - 1].subTitle}</p>
          <p className="highlight-name">
            {colorName ? colorName : "No Highlighter"}
          </p>
        </div>
      </div>

      <div className="case-content" onMouseUp={handleHighlight}>
        <Highlighter
          searchWords={highlights}
          autoEscape={true}
          textToHighlight={difficulty[play - 1].case}
          highlightStyle={{
            background: bgColor ? bgColor : "none",
            color: color ? color : "white",
            fontWeight: boldText === "bold" ? "bold" : "normal",
            borderRadius: 3,
            padding: "4px 0px",
          }}
        />
      </div>
    </div>
  );
}
function HighlightOtions({ handleHighlightColor, bgColor }) {
  const colors = [
    { clr: "#eff755", txt: "black", clrNme: "Yellow" },
    { clr: "pink", txt: "black", clrNme: "Pink" },
    { clr: "#6fdb51", txt: "black", clrNme: "Green" },
    { clr: "#82ccee", txt: "black", clrNme: "Blue" },
    { clr: "white", txt: "black", clrNme: "White" },
  ];
  return (
    <div className="highlight-options">
      <div className={"highlight-colors"}>
        {colors.map((color) => {
          return (
            <button
              className={`${color.clrNme.toLowerCase()}-highlighter ${bgColor === color.clr && "selected-color"}`}
              key={color.clrNme}
              onClick={() =>
                handleHighlightColor(color.clr, color.txt, color.clrNme)
              }
              title={color.clrNme}
            ></button>
          );
        })}
      </div>
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
