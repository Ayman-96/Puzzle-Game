import { useState, useEffect } from "react";
import "./App.css";
import { easyLevels, mediumLevels, hardLevels } from "./data";
import Highlighter from "react-highlight-words";

function App() {
  const [difficulty, setDifficulty] = useState(null);
  const [play, setPlay] = useState(null);

  const [timer, setTimer] = useState(null); // For inGaame Timer
  const [mistakes, setMistakes] = useState(0);

  const currentCase = difficulty && play ? difficulty[play - 1] : null;
  const caseDetails = difficulty &&
    play && {
      id: currentCase.id,
      number: currentCase.number,
      difficulty: currentCase.difficulty,
      title: currentCase.title,
      subTitle: currentCase.subTitle,
      emoji: currentCase.emoji,
      case: currentCase.case,
      question: currentCase.question,
      img: currentCase.img,
      options: currentCase.options,
      solution: currentCase.solution,
      explanation: currentCase.explanation,
      category: currentCase.category,
      timeLimit: currentCase.timeLimit,
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (play && difficulty) {
      setTimer(difficulty[play - 1].timeLimit);
    }
  }, [play, difficulty]);
  return (
    <div>
      {!play && <Main setDifficulty={setDifficulty} />}
      {difficulty && !play && (
        <Levels difficulty={difficulty} setPlay={setPlay} />
      )}

      {difficulty && play && (
        <LevelContent
          caseDetails={caseDetails}
          setTimer={setTimer}
          timer={timer}
          setMistakes={setMistakes} //Drop-Drill
          setPlay={setPlay} //Drop-Drill
          setDifficulty={setDifficulty} // drop-drill
        />
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
        <button className="profiletton-button" title="Profile">
          <img src="/avatars/main-avatar.jpg" alt="Profile" />
        </button>
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

function LevelContent({
  caseDetails,
  setTimer,
  timer,
  setMistakes,
  setPlay,
  setDifficulty,
}) {
  const [userAns, setUserAns] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const totalTime = caseDetails.timeLimit;
  const percentage = (timer / totalTime) * 100;

  useEffect(() => {
    if (timer <= 0 || submitted) return;

    const countDown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countDown);
  }, [timer, setTimer, submitted]); //setTimer is stable, meaning they never change. So adding it won't cause extra renders. ESLint just wants it there for safety.

  return (
    <div className="play-content">
      <LevelInfo
        caseDetails={caseDetails}
        timer={timer}
        percentage={percentage}
      />

      <CaseContent caseDetails={caseDetails} />

      <QuestionSection caseDetails={caseDetails} />
      <AnswerSection
        caseDetails={caseDetails}
        userAns={userAns}
        setUserAns={setUserAns}
        submitted={submitted}
      />

      {timer > 0 && userAns && (
        <Submittion
          submitted={submitted}
          userAns={userAns}
          caseDetails={caseDetails}
          setSubmitted={setSubmitted}
          setTimer={setTimer}
          setMistakes={setMistakes}
        />
      )}

      {submitted && userAns === caseDetails.solution && (
        <CorrectAnswering
          caseDetails={caseDetails}
          setPlay={setPlay}
          setDifficulty={setDifficulty}
          setSubmitted={setSubmitted}
          setUserAns={setUserAns}
          timer={timer}
        />
      )}
      {timer <= 0 && timer !== null && (
        <div className="time-up-overlay">
          <TimeUp
            setPlay={setPlay}
            setDifficulty={setDifficulty}
            setTimer={setTimer}
            caseDetails={caseDetails}
          />
        </div>
      )}
      <p className="footer-text">
        {!submitted ? "-- SELECT YOUR ANSWER --" : "-- STAY SHARP --"}
      </p>
    </div>
  );
}
// LevelContent COMPONENTS
function LevelInfo({ caseDetails, timer, percentage }) {
  return (
    <div className="level-info">
      <div className="header-container">
        <p id="emoji">{caseDetails.emoji}</p>
        <div className="role-infp">
          <p id="role">YOUR ROLE</p>
          <p className="content-title"> {caseDetails.title} </p>
        </div>

        <div className="stats">
          <p className="content-level">Level: {caseDetails.id} </p>
          <p className="content-difficulty">{caseDetails.difficulty}</p>
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

function CaseContent({ caseDetails }) {
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
          <p id="file">-- CASE FILE #{caseDetails.number} --</p>
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
          <p className="content-subtitle">{caseDetails.subTitle}</p>
          <p className="highlight-name">
            {colorName ? colorName : "No Highlighter"}
          </p>
        </div>
      </div>

      <div className="case-content" onMouseUp={handleHighlight}>
        <Highlighter
          searchWords={highlights}
          autoEscape={true}
          textToHighlight={caseDetails.case}
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
function TimeUp({ setPlay, setDifficulty, setTimer, caseDetails }) {
  function handleToMainMenu() {
    setPlay(null);
    setDifficulty(null);
    setTimer(null);
  }
  function handleTryAgain() {
    setTimer(caseDetails.timeLimit);
  }
  return (
    <div className="time-up-container">
      <div className="time-up-warning">
        <div className="timer-emoji">⏱</div>
        <p>— TIME'S UP! —</p>
        <h2>Case Unsolved..!</h2>
        <p>
          You ran out of time before finding the truth. The case remains open
        </p>
        <div className="separation">————————————————</div>
      </div>
      <div className="time-up-details">
        <div className="first-cell-details">
          <p>#Tries</p>
        </div>
        <div className="second-cell-details"></div>
        <p>Time Rank</p>
        <div className="third-cell-details">
          <p>Streak</p>
        </div>
      </div>
      <div className="next-step-buttons">
        <button className="try-again" onClick={handleTryAgain}>
          {" "}
          ▶ TRY AGAIN
        </button>
        <button className="go-menu" onClick={handleToMainMenu}>
          ◀ MENU
        </button>
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
function QuestionSection({ caseDetails }) {
  return (
    <div className="question-section">
      <p>QUESTION... So ?</p>
      <p className="content-question">{caseDetails.question}</p>
    </div>
  );
}
function AnswerSection({ caseDetails, userAns, setUserAns, submitted }) {
  function handleUserAnswer(userAnswer) {
    setUserAns(userAnswer);
  }
  return (
    <div className="answer-options">
      {caseDetails.options.map((optn, index) => {
        return (
          <button
            key={index}
            className={`option-button ${userAns === optn.key ? "selected" : ""} ${submitted && userAns === optn.key && userAns !== caseDetails.solution && "missed"}`}
            onClick={() => handleUserAnswer(optn.key)}
            disabled={submitted}
          >
            <div className="option-letter">{optn.key} </div>
            <div className="option-text">{optn.text}</div>
          </button>
        );
      })}

      {/* {submitted && (
        <p
          className={`explanation ${userAns === caseDetails.solution ? "correct-exp" : "wrong-exp"}`}
        >
          {caseDetails.explanation}
        </p>
      )} */}
    </div>
  );
}
function Submittion({
  submitted,
  userAns,
  caseDetails,
  setSubmitted,
  setMistakes,
}) {
  function handleCheckAnswer() {
    if (userAns === caseDetails.solution) {
      setSubmitted(true);
    } else {
      setSubmitted(true);
      setMistakes((prev) => prev + 1);
    }
  }
  useEffect(() => {
    if (submitted && userAns !== caseDetails.solution) {
      setTimeout(() => {
        setSubmitted(false);
      }, 1000);
    }
  }, [submitted, userAns, caseDetails.solution, setSubmitted]);
  return (
    <div>
      <button
        className={`submit-answer ${submitted && (userAns === caseDetails.solution ? "correct-answer" : "wrong-answer")}`}
        onClick={handleCheckAnswer}
      >
        {!submitted
          ? "SUBMIT"
          : userAns === caseDetails.solution
            ? "CORRECT!"
            : "WRONG!"}
      </button>
    </div>
  );
}
function CorrectAnswering({
  caseDetails,
  setPlay,
  setDifficulty,
  setSubmitted,
  setUserAns,
  timer,
}) {
  function handleNextLevel() {
    setPlay((prev) => prev + 1);
    setSubmitted(false);
    setUserAns(null);
  }
  function handleToMainMenu() {
    setPlay(null);
    setDifficulty(null);
  }
  return (
    <div className="correct-overlay">
      <div className="corrected-section">
        <div className="corrected-inform">
          <p className="case-solved">
            <span className="solved-dot"></span>
            CASE SOLVED
          </p>
          <p className="check">✓</p>
          <p className="congrats">Sharp Mind</p>
          <p className="congrats2">You solved the problem successivly</p>
        </div>
        <div className="solved-details">
          <div className="done-time">
            TIME LEFT <span id="done-time">{timer + 1}s</span>
          </div>
          <div className="tries-number">
            #TRIES <span id="tries-number">1</span>
          </div>
          <div className="streak">
            STREAK <span id="streak">x🔥</span>
          </div>
        </div>
        <div className="key-clue">
          <p>— THE KEY CLUE —</p>
          <p>{caseDetails.explanation}</p>
          <button className="next-case" onClick={handleNextLevel}>
            ▶ Next Case <span>CASE #{caseDetails.number}</span>
          </button>
          <p id="up-next">UP NEXT : {caseDetails.title}</p>
          <button className="return-to-mainmenu" onClick={handleToMainMenu}>
            {" "}
            ← Return to Menu
          </button>
        </div>
      </div>
    </div>
  );
}
export default App;
