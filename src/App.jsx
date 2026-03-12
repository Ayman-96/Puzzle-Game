import { useState, useEffect } from "react";
import "./App.css";
import { levels, avatars } from "./data";
import Highlighter from "react-highlight-words";
function App() {
  const [difficulty, setDifficulty] = useState(null);
  const [play, setPlay] = useState(null);

  const [timer, setTimer] = useState(null); // For inGaame Timer
  const [showProfile, setShowProfile] = useState(false);

  const [mistakes, setMistakes] = useState(0);

  const [selectedAvatar, setSelectedAvatar] = useState(
    localStorage.getItem("avatar") || avatars[0], // at first set main img
  );
  const [selectedLvl, setSelectedLvl] = useState(null);

  // DATE JOINED STORAGE
  const dateJoined = localStorage.getItem("dateJoined");
  const date = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  if (!dateJoined) localStorage.setItem("dateJoined", date); // RUN ONCE EVER

  const diffLabel = [
    {
      levelName: "easy",
      desc: "Clear contradictions, simple connections",
    },
    { levelName: "medium", desc: "Multiple clues, stronger red herrings" },
    {
      levelName: "hard",
      desc: "Deep complexity, almost-right answers",
    },
  ];
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

  // STORAGE
  useEffect(() => {
    localStorage.setItem("avatar", selectedAvatar);
  }, [selectedAvatar]);

  return (
    <div>
      {!play && !showProfile && (
        <Main
          setDifficulty={setDifficulty}
          setShowProfile={setShowProfile}
          selectedAvatar={selectedAvatar}
          setSelectedLvl={setSelectedLvl}
          selectedLvl={selectedLvl}
          diffLabel={diffLabel}
          difficulty={difficulty}
          levels={levels}
          setPlay={setPlay}
        />
      )}
      {showProfile && (
        <UserProfile
          setShowProfile={setShowProfile}
          selectedAvatar={selectedAvatar}
          setSelectedAvatar={setSelectedAvatar}
          dateJoined={dateJoined}
          diffLabel={diffLabel}
        />
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

function Main({
  setDifficulty,
  setShowProfile,
  selectedAvatar,
  setSelectedLvl,
  selectedLvl,
  diffLabel,
  difficulty,
  levels,
  setPlay,
}) {
  const [showLevels, setShowLevels] = useState(false);
  function handleShowLevels() {
    setShowLevels((prev) => !prev);
  }
  return (
    <div className="container">
      <div className="main-menu">
        <div className="header">
          <button
            className="profiletton-button"
            title="Profile"
            onClick={() => setShowProfile(true)}
          >
            <img src={selectedAvatar} alt="Profile" />
          </button>
          <br />

          <div className="main-menu-title">
            <div className="uptitle">— Intelligence Puzzle Game —</div>
            <div className="title">
              BETWEEN<span>THE LINES</span>
            </div>
            <div className="subtitle">
              DIFFERENT ASPECTS. TRUST <span>NOTHING</span>
            </div>
          </div>
        </div>

        <div className="body">
          <div className="difficulty">
            {/* prettier-ignore*/}
            <p> SELECT{" "} 
              <span className={`${selectedLvl && selectedLvl}`}> Difficulty{" "}</span>:</p>

            <ShowDifficultyLevels
              setDifficulty={setDifficulty}
              setSelectedLvl={setSelectedLvl}
              difficulty={difficulty}
              diffLabel={diffLabel}
              levels={levels}
            />
          </div>

          {showLevels && (
            <Levels
              difficulty={difficulty}
              setPlay={setPlay}
              levels={levels}
              diffLabel={diffLabel}
              selectedLvl={selectedLvl}
              handleShowLevels={handleShowLevels}
            />
          )}

          <button
            className={`start-level ${selectedLvl && "ready"}`}
            onClick={handleShowLevels}
          >
            {selectedLvl
              ? "START " + selectedLvl.toUpperCase()
              : "SELECT A DIFFICULTY"}
          </button>
        </div>
      </div>
    </div>
  );
}

// USER PROFILE COMPONENTS
function UserProfile({
  setShowProfile,
  selectedAvatar,
  setSelectedAvatar,
  dateJoined,
  diffLabel,
}) {
  return (
    <div className="profile-overlay">
      <div className="profile-card">
        <PlayerDetails
          setShowProfile={setShowProfile}
          selectedAvatar={selectedAvatar}
          setSelectedAvatar={setSelectedAvatar}
          dateJoined={dateJoined}
        />
        <div className="player-performance">
          <PlayerCasesSolved diffLabel={diffLabel} />

          <PlayerAccuracy />

          <PlayerTimeRank />

          <PlayerStreak />
        </div>
      </div>
    </div>
  );
}
function Avatars({
  handleShowAvatars,
  setSelectedAvatar,
  setChangedAvatarMessage,
}) {
  return (
    <div className="avatar-overlay">
      <div className="avatars-display">
        <button className="close-avatars" onClick={handleShowAvatars}>
          ↩
        </button>
        <div className="avatars-grid">
          {avatars.map((img, index) => (
            <img
              src={img}
              alt="avatar"
              key={index}
              className="provided-avatar"
              onClick={() => {
                setSelectedAvatar(img);
                handleShowAvatars();
                setChangedAvatarMessage(true);
                setTimeout(() => setChangedAvatarMessage(false), 5000);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
function PlayerDetails({
  setShowProfile,
  selectedAvatar,
  setSelectedAvatar,
  dateJoined,
}) {
  const [showAvatars, setShowAvatars] = useState(false);
  const [changedAvatarMessage, setChangedAvatarMessage] = useState(false);
  const [userName, setUserName] = useState(
    localStorage.getItem("username") || "username",
  );
  function handleShowAvatars() {
    setShowAvatars((prev) => !prev);
  }
  function handleUserName(e) {
    setUserName(e.target.value);
  }
  useEffect(() => {
    localStorage.setItem("username", userName);
  }, [userName]);
  return (
    <div>
      <button className="close-profile" onClick={() => setShowProfile(false)}>
        ↩
      </button>
      <div className="basic-details">
        <div className="profile-avatar">
          <img src={selectedAvatar} alt="Profile" />
          <button className="change-avatar-icon" onClick={handleShowAvatars}>
            ✎
          </button>
        </div>

        <div className="show-avatars">
          {showAvatars && (
            <Avatars
              handleShowAvatars={handleShowAvatars}
              setSelectedAvatar={setSelectedAvatar}
              setChangedAvatarMessage={setChangedAvatarMessage}
            />
          )}
        </div>
        {changedAvatarMessage && (
          <div className="changed-avatar-mess">
            Avatar Changed Successfully!💜
          </div>
        )}
        <div className="player-details">
          <input
            type="text"
            className="username"
            onChange={(e) => handleUserName(e)}
            max={15}
            value={userName}
          />
          <div className="change-username-icon">✎</div>
          <button className="player-badge">Investigator</button>
          <p className="enter-date">Joined {dateJoined}</p>
        </div>
      </div>
    </div>
  );
}
function PlayerCasesSolved({ diffLabel }) {
  return (
    <div>
      <div className="cases-solved-title">— CASES SOLVED —</div>
      <div className="amount-cases">
        {diffLabel.map((level, i) => {
          return (
            <div className="cases-solved" key={i}>
              <div className="level-amount">
                <p className="case-difficulty diff-color">
                  <span className={`${level.levelName}-dot`}></span>
                  {level.levelName}
                </p>
                <div className="solved-amount">X/N</div>
              </div>
              <div className="solved-bar"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
function PlayerAccuracy() {
  const accuracy = [
    {
      icon: "🥇",
      amount: 0,
      nthTry: "FIRST TRY",
      color: "yellow",
    },
    { icon: "🥈", amount: 0, nthTry: "SECOND TRY", color: "grey" },
    {
      icon: "🥉",
      amount: 0,
      nthTry: "THIRD TRY",
      color: "brown",
    },
    {
      icon: "💀",
      amount: 0,
      nthTry: "LAST TRY",
      color: "silver",
    },
  ];
  return (
    <div>
      <div className="accuracy-title">— ACCURACY —</div>
      <div className="player-accuracy">
        {accuracy.map((state, i) => {
          return (
            <div className="medals-details" key={i}>
              <div className="accuracy-icon">{state.icon}</div>
              <div className="accuracy-amount" style={{ color: state.color }}>
                {state.amount}
              </div>
              <div className="accuracy-try">{state.nthTry}</div>
            </div>
          );
        })}
      </div>

      <div className="first-try-title">— FIRST TRY ACCURACY —</div>
      <div className="first-try">
        <div className="first-try-detail">
          <div id="sniper">SNIPER..!</div>
          <div>X%</div>
        </div>
        <div className="first-try-icon">🎯</div>
      </div>
    </div>
  );
}
function PlayerTimeRank() {
  const timeRank = [
    {
      icon: "⚡",
      rank: "INSTANT",
      quarterDetail: "Solved in 1st quarter of time",
      amount: 40,
      color: "yellow",
    },
    {
      icon: "🎯",
      rank: "SHARP",
      quarterDetail: "Solved in 2nd quarter of time",
      amount: 30,
      color: "red",
    },
    {
      icon: "⏳",
      rank: "STEADY",
      quarterDetail: "Solved in 3rd quarter of time",
      amount: 20,
      color: "blue",
    },
    {
      icon: "🐢",
      rank: "TURTLE",
      quarterDetail: "Solved in 4th quarter of time",
      amount: 48,
      color: "green",
    },
  ];
  return (
    <div>
      <div className="time-rank-title">— TIME RANK —</div>
      <div className="rank-explanation">
        Shows how fast you solved each case within the time limit
        <div className="rank-exp-case-num">#CASES</div>
      </div>
      <div className="player-time-rank">
        {timeRank.map((rank, i) => {
          return (
            <div className="timer-deal" key={i}>
              <div className="rank-icon">{rank.icon}</div>
              <div className="rank-rank">{rank.rank}</div>
              <div className="rank-quarter">{rank.quarterDetail}</div>
              <div className="rank-amount">{rank.amount}</div>
              <div className="rank-bar-track">
                <div
                  className="rank-bar"
                  style={{
                    width: `${(rank.amount / 60) * 100}%`,
                    background: rank.color,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
function PlayerStreak() {
  return (
    <div>
      <div className="steak-title">— STREAK RECORD —</div>
      <div className="player-streak">
        <div className="current-streak">
          <p>CURRENT STREAK</p>
          <div>N🔥</div>
          <div id="in-a-row">cases in a row</div>
        </div>
        <div className="current-streak">
          <p>LONGEST STREAK</p>
          <div>N⚡</div>
          <div id="best-time">all time best</div>
        </div>
      </div>
    </div>
  );
}

// LEVELS COMPONENTS
function ShowDifficultyLevels({
  setDifficulty,
  setSelectedLvl,
  difficulty,
  diffLabel,
  levels,
}) {
  function handleSetDifficulty(level) {
    setDifficulty(level);
  }
  return (
    <div className="show-difficulty">
      {levels.map((level, index) => {
        //easy,medium,hardLevel
        return (
          <button
            className={`diff-button ${level === difficulty && "active"}`}
            key={index}
            onClick={() => {
              handleSetDifficulty(level);
              setSelectedLvl(diffLabel[index].levelName);
            }}
          >
            <div className="button-content">
              <div className="btn-desc">
                <span
                  className={`${diffLabel[index].levelName}-dot  ${level === difficulty && "shine-dot"}`}
                ></span>

                <div className={`${level === difficulty && "ready"}`}>
                  {diffLabel[index].levelName}
                </div>

                <div className="level-desc">{diffLabel[index].desc}</div>
              </div>

              <div className="btn-lvl-length">
                LEVELS{" "}
                <span id="num" className={`${level === difficulty && "ready"}`}>
                  {level.length}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
function Levels({ difficulty, setPlay, selectedLvl, handleShowLevels }) {
  function handleShowContent(id) {
    setPlay(id);
  }
  return (
    <div className={`show-levels-comp ${selectedLvl}-comp`}>
      <div className="select-case-header">
        <div>— SELECT CASE —</div>
        <div className="case-diff">
          <div className="btn-desc">
            <span className={`${selectedLvl}-dot`}></span>
            <div className="ready">{selectedLvl}</div>
            <div>DIFFICULTY</div>
          </div>
          <button className="close-levels-popup" onClick={handleShowLevels}>
            ↩
          </button>
        </div>
      </div>
      <div className="select-case-body">
        {difficulty.map((lvl) => {
          return (
            <button
              className={`each-level ${selectedLvl}-button`}
              key={lvl.id}
              onClick={() => handleShowContent(lvl.id)}
            >
              <div>
                <div className="lvl-id">#{lvl.number}</div>
                <div className="lvl-icon">{lvl.emoji}</div>
              </div>
              <div>
                <div className="lvl-title">{lvl.title}</div>
                <div className="lvl-category">{lvl.category}</div>
              </div>
              <div>
                <div>
                  <div className="case-availability">✓ | 🔒</div>
                  <div className="lvl-time">{lvl.timeLimit}s</div>
                </div>
                <div id="play-icon">▶</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// PLAY-SCREEN
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
export default App;
