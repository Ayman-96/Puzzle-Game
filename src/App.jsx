import { useState, useEffect, useRef } from "react";
import "./App.css";
import { levels, avatars, logos } from "./data";
import Highlighter from "react-highlight-words";
import { useLocalStorageState } from "./localStorage";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { howToPlayInfo } from "./how-to-play";
function App() {
  const [difficulty, setDifficulty] = useState(null);
  const [play, setPlay] = useState(null);
  const [selectedLvl, setSelectedLvl] = useState(null);

  const [timer, setTimer] = useState(null); // For inGaame Timer
  const [showProfile, setShowProfile] = useState(false);
  //
  const [easySolved, setEasySolved] = useLocalStorageState([], "easyCases");
  const [mediumSolved, setMediumSolved] = useLocalStorageState(
    [],
    "mediumCases",
  );
  const [hardSolved, setHardSolved] = useLocalStorageState([], "hardCases");
  const solvedCasesContainer = [easySolved, mediumSolved, hardSolved];
  //
  // #TRY TO SOLVE
  const [mistakes, setMistakes] = useState(0);
  const [numTry, setNumTry] = useLocalStorageState(
    {
      first: 0,
      second: 0,
      third: 0,
      last: 0,
    },
    "mistakes",
  );

  // Time Out
  const [countTimeOut, setCountTimeOut] = useLocalStorageState(0, "timeOut");
  // TIME RANK
  const [solvedQuarter, setSolvedQuarter] = useLocalStorageState(
    {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
    },
    "solvedQuarters",
  );
  // Streak
  const [streak, setStreak] = useLocalStorageState(
    { currentStreak: 0, longestStreak: 0 },
    "streak",
  );
  const [selectedAvatar, setSelectedAvatar] = useLocalStorageState(
    avatars[0],
    "avatars",
  );
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
          solvedCasesContainer={solvedCasesContainer}
          howToPlayInfo={howToPlayInfo}
          logos={logos}
        />
      )}
      {showProfile && (
        <UserProfile
          setShowProfile={setShowProfile}
          selectedAvatar={selectedAvatar}
          setSelectedAvatar={setSelectedAvatar}
          dateJoined={dateJoined}
          levels={levels}
          solvedCasesContainer={solvedCasesContainer}
          numTry={numTry}
          solvedQuarter={solvedQuarter}
          streak={streak}
          countTimeOut={countTimeOut}
        />
      )}

      {difficulty && play && (
        <LevelContent
          caseDetails={caseDetails}
          setTimer={setTimer}
          timer={timer}
          setMistakes={setMistakes} //Drop-Drill
          mistakes={mistakes}
          setPlay={setPlay} //Drop-Drill
          setDifficulty={setDifficulty} // drop-drill
          setEasySolved={setEasySolved}
          setMediumSolved={setMediumSolved}
          setHardSolved={setHardSolved}
          setNumTry={setNumTry}
          solvedCasesContainer={solvedCasesContainer}
          setSelectedLvl={setSelectedLvl}
          setSolvedQuarter={setSolvedQuarter}
          setStreak={setStreak}
          setCountTimeOut={setCountTimeOut}
          streak={streak}
          countTimeOut={countTimeOut}
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
  solvedCasesContainer,
  howToPlayInfo,
  logos,
}) {
  const [showLevels, setShowLevels] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  function handleShowLevels() {
    setShowLevels((prev) => !prev);
  }
  function handleShowHowToPlay() {
    setShowHowToPlay((prev) => !prev);
  }
  function handleShowAbout() {
    setShowAbout((prev) => !prev);
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
              selectedLvl={selectedLvl}
              handleShowLevels={handleShowLevels}
              solvedCasesContainer={solvedCasesContainer}
            />
          )}

          <button // Start Button
            className={`start-level ${selectedLvl && "ready"}`}
            onClick={handleShowLevels}
            disabled={!selectedLvl}
            title={!selectedLvl ? "Select a Difficulty" : "Start Level"}
          >
            {selectedLvl
              ? "START " + selectedLvl.toUpperCase()
              : "SELECT A DIFFICULTY"}
          </button>
        </div>

        <button className="htp-button" onClick={handleShowHowToPlay}>
          HOW TO PLAY
        </button>
        {showHowToPlay && (
          <HowToPlay
            howToPlayInfo={howToPlayInfo}
            handleShowHowToPlay={handleShowHowToPlay}
          />
        )}

        <button className="about-btn" onClick={handleShowAbout}>
          About ⓘ
        </button>
        {showAbout && (
          <AboutDev logos={logos} handleShowAbout={handleShowAbout} />
        )}
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
  levels,
  solvedCasesContainer,
  numTry,
  solvedQuarter,
  streak,
  countTimeOut,
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
          <PlayerCasesSolved
            levels={levels}
            solvedCasesContainer={solvedCasesContainer}
          />

          <PlayerAccuracy
            numTry={numTry}
            solvedCasesContainer={solvedCasesContainer}
          />
          <PlayerTimeOut countTimeOut={countTimeOut} />

          <PlayerTimeRank
            solvedQuarter={solvedQuarter}
            solvedCasesContainer={solvedCasesContainer}
          />

          <PlayerStreak streak={streak} />
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
function PlayerCasesSolved({ levels, solvedCasesContainer }) {
  const colorBars = ["green", "yellow", "red"];
  return (
    <div>
      <div className="cases-solved-title">— CASES SOLVED —</div>
      <div className="amount-cases">
        {levels.map((level, i) => {
          const solvedCases = solvedCasesContainer[i].length;
          const availableCases = level.length;
          //level = easy,medium,hard array of objects
          return (
            <div className="cases-solved" key={i}>
              <div className="level-amount">
                <p className="case-difficulty diff-color">
                  <span className={`${level[i].difficulty}-dot`}></span>
                  {level[i].difficulty}
                </p>
                <div className="solved-amount">
                  {solvedCases} / {availableCases}
                </div>
              </div>
              <div
                className="solved-bar"
                style={{
                  width: `${(solvedCases / availableCases) * 100}%`,
                  backgroundColor: colorBars[i],
                }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
function PlayerAccuracy({ numTry }) {
  const totalSolved = Object.values(numTry).reduce(
    (totalValue, eachValue) => totalValue + eachValue,
    0,
  );
  const firstPerecntage = (numTry.first / totalSolved) * 100;
  const accuracy = [
    {
      icon: "🥇",
      amount: numTry.first,
      nthTry: "FIRST TRY",
      color: "#FFD700",
    },
    {
      icon: "🥈",
      amount: numTry.second,
      nthTry: "SECOND TRY",
      color: "#C0C0C0",
    },
    {
      icon: "🥉",
      amount: numTry.third,
      nthTry: "THIRD TRY",
      color: "#CD7F32",
    },
    {
      icon: "💀",
      amount: numTry.last,
      nthTry: "LAST TRY",
      color: "#720f0f",
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
          <div>{firstPerecntage.toFixed(2)}%</div>
        </div>
        <div className="first-try-icon">🎯</div>
      </div>
    </div>
  );
}
function PlayerTimeRank({ solvedQuarter, solvedCasesContainer }) {
  const timeRank = [
    {
      icon: "⚡",
      rank: "INSTANT",
      quarterDetail: "Solved in 1st quarter of time",
      amount: solvedQuarter.first,
      color: "yellow",
    },
    {
      icon: "🎯",
      rank: "SHARP",
      quarterDetail: "Solved in 2nd quarter of time",
      amount: solvedQuarter.second,
      color: "red",
    },
    {
      icon: "⏳",
      rank: "STEADY",
      quarterDetail: "Solved in 3rd quarter of time",
      amount: solvedQuarter.third,
      color: "blue",
    },
    {
      icon: "🐢",
      rank: "TURTLE",
      quarterDetail: "Solved in 4th quarter of time",
      amount: solvedQuarter.fourth,
      color: "green",
    },
  ];
  const solvedLength = Object.values(solvedCasesContainer).reduce(
    (total, eachObj) => total + eachObj.length,
    0,
  );
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
                    width: `${(rank.amount / solvedLength) * 100}%`,
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
function PlayerStreak({ streak }) {
  return (
    <div className="streak-comp">
      <div className="steak-title">— STREAK RECORD —</div>
      <div className="player-streak">
        <div className="current-streak">
          <p>CURRENT STREAK</p>
          <div>{streak.currentStreak}🔥</div>
          <div id="in-a-row">cases in a row</div>
        </div>
        <div className="current-streak">
          <p>LONGEST STREAK</p>
          <div>{streak.longestStreak}⚡</div>
          <div id="best-time">all time best</div>
        </div>
      </div>
    </div>
  );
}
function PlayerTimeOut({ countTimeOut }) {
  return (
    <div>
      <div className="first-try-title">— TIME OUTS —</div>
      <div className="first-try">
        <div className="time-out-detail">
          <div id="against-clock">AGAINST THE CLOCK..!</div>
          <div id="count-time-out">{countTimeOut}x</div>
        </div>
        <div className="time-out-icon">⏱️</div>
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
function Levels({
  difficulty,
  setPlay,
  selectedLvl,
  handleShowLevels,
  solvedCasesContainer,
}) {
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
          const setter = {
            easy: solvedCasesContainer[0],
            medium: solvedCasesContainer[1],
            hard: solvedCasesContainer[2],
          };
          const solvedCases = setter[lvl.difficulty]; // ex. setter[easy]
          const openedCase = solvedCases.length + 1;
          return (
            <button
              className={`each-level ${selectedLvl}-button`}
              key={lvl.id}
              onClick={() => handleShowContent(lvl.id)}
              aria-disabled={
                !solvedCases.includes(lvl.number) && openedCase !== lvl.id
              }
              disabled={
                !solvedCases.includes(lvl.number) && openedCase !== lvl.id
              }
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
                  <div className="case-availability">
                    {solvedCases.includes(lvl.number) ? ( // if solved includes
                      <FaCircleCheck id="fa-circle-check" />
                    ) : openedCase === lvl.id ? ( // if not included but 1 lvl after
                      <FaLockOpen id="fa-lock-open" />
                    ) : (
                      <FaLock id="fa-lock" />
                    )}
                  </div>
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
  mistakes,
  setPlay,
  setDifficulty,
  setEasySolved,
  setMediumSolved,
  setHardSolved,
  setNumTry,
  solvedCasesContainer,
  setSelectedLvl,
  setSolvedQuarter,
  setStreak,
  setCountTimeOut,
  streak,
  countTimeOut,
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
          setStreak={setStreak}
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
          setEasySolved={setEasySolved}
          setMediumSolved={setMediumSolved}
          setHardSolved={setHardSolved}
          setMistakes={setMistakes}
          mistakes={mistakes}
          setNumTry={setNumTry}
          solvedCasesContainer={solvedCasesContainer}
          setSelectedLvl={setSelectedLvl}
          setSolvedQuarter={setSolvedQuarter}
          setStreak={setStreak}
          streak={streak}
        />
      )}
      {timer <= 0 && timer !== null && (
        <div className="time-up-overlay">
          <TimeUp
            setPlay={setPlay}
            setDifficulty={setDifficulty}
            setTimer={setTimer}
            caseDetails={caseDetails}
            setSelectedLvl={setSelectedLvl}
            setStreak={setStreak}
            streak={streak}
            setCountTimeOut={setCountTimeOut}
            mistakes={mistakes}
            countTimeOut={countTimeOut}
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
          <p className="content-difficulty">
            {caseDetails.difficulty.toUpperCase()}
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
  setTimer,
  setMistakes,
  setStreak,
}) {
  const totalTime = caseDetails.timeLimit;

  function handleCheckAnswer() {
    if (userAns === caseDetails.solution) {
      setSubmitted(true);
    } else {
      setSubmitted(true);
      setMistakes((prev) => prev + 1);
      setTimer((prev) => prev - totalTime / 4); // reduce timer by 1/4
      setStreak((prev) => ({ ...prev, currentStreak: 0 }));
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
  setEasySolved,
  setMediumSolved,
  setHardSolved,
  setMistakes,
  mistakes,
  setNumTry,
  solvedCasesContainer,
  setSelectedLvl,
  setSolvedQuarter,
  setStreak,
  streak,
}) {
  function handleNextLevel() {
    setPlay((prev) => (questNumber !== nextLvlCheck.length ? prev + 1 : null)); // condition for last level
    setSubmitted(false);
    setUserAns(null);
    setMistakes(0);
  }
  function handleToMainMenu() {
    setPlay(null);
    setDifficulty(null);
    setSelectedLvl(null);
    setMistakes(0);
  }
  // (Achivments) Count Level as Solved
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return; // to prevent second render (strict mode)

    const setters = {
      easy: setEasySolved,
      medium: setMediumSolved,
      hard: setHardSolved,
    };
    const setSolved = setters[caseDetails.difficulty]; // setters[easy],setters[medium]

    setSolved((prev) =>
      prev.includes(caseDetails.number) ? prev : [...prev, caseDetails.number],
    );
    ran.current = true;
  }, []);

  const ref = useRef(false);
  const preventDup = {
    easy: 0,
    medium: 1,
    hard: 2,
  };
  const setTry = {
    // also an array is possible [0] = first
    0: "first",
    1: "second",
    2: "third",
    3: "last",
  };
  useEffect(() => {
    if (ref.current) return;

    if (
      // prevent solved cases to count
      !solvedCasesContainer[preventDup[caseDetails.difficulty]].includes(
        caseDetails.number,
      )
    ) {
      const select = setTry[mistakes];
      setNumTry((prev) => ({ ...prev, [select]: prev[select] + 1 })); // [] = Use the value inside the variable as the key
    }

    ref.current = true;
  }, []);

  const totalTime = caseDetails.timeLimit; // 100
  const quarterAmount = totalTime / 4; //25
  const ren = useRef(false);

  useEffect(() => {
    if (ren.current) return;
    if (
      // prevent solved cases to count
      !solvedCasesContainer[preventDup[caseDetails.difficulty]].includes(
        caseDetails.number,
      )
    ) {
      if (timer >= quarterAmount * 3)
        setSolvedQuarter((prev) => ({ ...prev, first: prev.first + 1 }));
      else if (timer >= quarterAmount * 2)
        setSolvedQuarter((prev) => ({ ...prev, second: prev.second + 1 }));
      else if (timer >= quarterAmount)
        setSolvedQuarter((prev) => ({ ...prev, third: prev.third + 1 }));
      else setSolvedQuarter((prev) => ({ ...prev, fourth: prev.fourth + 1 }));
    }
    ren.current = true;
  }, []);
  const questNumber = caseDetails.id; // 5
  const nextLvlCheck = levels[preventDup[caseDetails.difficulty]]; // 5;

  const ranEffect = useRef(false);
  useEffect(() => {
    if (ranEffect.current) return;
    setStreak((prev) => ({
      ...prev,
      currentStreak: prev.currentStreak + 1,
    }));

    setStreak((prev) => ({
      ...prev,
      longestStreak:
        prev.currentStreak > prev.longestStreak
          ? prev.currentStreak
          : prev.longestStreak,
    }));

    ranEffect.current = true;
  }, [setStreak]);

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
            #TRIES <span id="tries-number">{mistakes + 1}</span>
          </div>
          <div className="streak">
            STREAK <span id="streak">{streak.currentStreak}🔥</span>
          </div>
        </div>
        <div className="key-clue">
          <p>— THE KEY CLUE —</p>
          <p>{caseDetails.explanation}</p>
          <button className="next-case" onClick={handleNextLevel}>
            {questNumber === nextLvlCheck.length ? (
              " ◀ Go to Main Menu"
            ) : (
              <>
                ▶ Next Case{" "}
                <span>CASE #{nextLvlCheck[questNumber].number}</span>
              </>
            )}
          </button>
          <p id="up-next">
            {nextLvlCheck[questNumber] ? (
              `UP NEXT : ${nextLvlCheck[questNumber].title}`
            ) : (
              <>
                🕵️ CASE FILES CLOSED —{" "}
                <span id={`finished-diff-${caseDetails.difficulty}`}>
                  {caseDetails.difficulty.toUpperCase()}
                </span>{" "}
                DIFFICULTY CONQUERED!
              </>
            )}
          </p>
          <button className="return-to-mainmenu" onClick={handleToMainMenu}>
            {" "}
            {questNumber === nextLvlCheck.length ? "" : "← Return to Menu "}
          </button>
        </div>
      </div>
    </div>
  );
}
function TimeUp({
  setPlay,
  setDifficulty,
  setTimer,
  caseDetails,
  setSelectedLvl,
  setStreak,
  streak,
  setCountTimeOut,
  mistakes,
  countTimeOut,
}) {
  function handleToMainMenu() {
    setPlay(null);
    setDifficulty(null);
    setTimer(null);
    setSelectedLvl(null);
  }
  function handleTryAgain() {
    setTimer(caseDetails.timeLimit);
  }
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current) return;
    // directly reset, avoid refresh trick
    setStreak((prev) => ({ ...prev, currentStreak: 0 }));
    setCountTimeOut((prev) => prev + 1);

    ref.current = true;
  }, []);
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
        <div className="tries-number">
          #TRIES <span id="tries-number">{mistakes}</span>
        </div>
        <p>
          # Time Outs<span id="time-out">{countTimeOut}</span>
        </p>
        <div className="streak">
          STREAK RESETED<span id="streak">{streak.currentStreak}🔥</span>
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

function HowToPlay({ howToPlayInfo, handleShowHowToPlay }) {
  return (
    <div className="how-to-play">
      <div className="how-to-play-header">
        <button className="close-how-to-play" onClick={handleShowHowToPlay}>
          ↩
        </button>
        <div className="up-title">— INTELLIGENCE PUZZLE GAME —</div>
        <div className="htp-title">HOW TO PLAY</div>
        <div className="htp-subtitle">
          {" "}
          Read between the lines.
          <br />
          The truth is always in front of You.
        </div>
      </div>

      <div className="htp-comps">
        <HelpRules howToPlayInfo={howToPlayInfo} />
        <HelpTimeRank howToPlayInfo={howToPlayInfo} />
        <HelpMedals howToPlayInfo={howToPlayInfo} />
        <div className="pro-tip">
          <div>
            <div className="tip-icon">💡</div>
            <div className="tip-content">
              <div>PRO TIP</div>
              <div>
                {" "}
                Use the <span>highlight tool</span> to mark suspicious parts of
                the text. Wrong answers are designed to feel almost right —
                always go back to the text before deciding.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function HelpRules({ howToPlayInfo }) {
  return (
    <div className="htp-rules">
      <div>
        <div className="the-rules-title">— THE RULES —</div>
        <div className="rules-container">
          {howToPlayInfo[0].map((rule) => {
            return (
              <div
                className="rule-container"
                key={rule.id}
                style={{ borderLeft: `3px solid ${rule.color}` }}
              >
                <div className="rule-id">
                  <div
                    style={{
                      filter: `drop-shadow(0 0 8px ${rule.color}55)`,
                      color: rule.color,
                    }}
                  >
                    {rule.id}
                  </div>
                  <div
                    style={{ filter: `drop-shadow(0 0 8px ${rule.color}55)` }}
                  >
                    {rule.icon}
                  </div>
                </div>

                <div className="rule-content">
                  <div className="rule-title">{rule.title}</div>
                  <div className="rule-desc">{rule.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
function HelpTimeRank({ howToPlayInfo }) {
  return (
    <div className="htp-time">
      <div className="the-time-title">— TIME RANKS —</div>
      <div className="time-title-desc">
        Your time limit is split into 4 quarters — the earlier you solve, the
        better your rank
      </div>
      <div className="rank-wraper">
        {howToPlayInfo[1].map((rank) => {
          return (
            <div className="rank-container" key={rank.icon}>
              <div className="rank-type">
                <div>{rank.icon}</div>
                <div style={{ color: rank.color }}>{rank.rank}</div>
              </div>
              <div className="rank-right">
                <div className="desc">{rank.desc}</div>
                <div className="rank-bar-track">
                  <div
                    className="rank-bar"
                    style={{ width: rank.bar, background: rank.color }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
function HelpMedals({ howToPlayInfo }) {
  return (
    <div className="htp-medals">
      <div className="the-time-title">— MEDALS —</div>
      <div className="medal-separater">
        {howToPlayInfo[2].map((medal) => {
          return (
            <div className="medals-container" key={medal.icon}>
              <div className="medal-icon">{medal.icon}</div>
              <div className="medal-label" style={{ color: medal.color }}>
                {medal.label}
              </div>
              <div className="medal-desc">{medal.desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
function AboutDev({ logos, handleShowAbout }) {
  const badges = ["contradication", "investigation", "CODED", "IMPOSTER"];
  const Accounts = [
    {
      socialMedia: "GITHUB",
      name: "Ayman-96",
      ref: "https://github.com/Ayman-96",
      img: logos[0],
      color: "#e7e2e2",
    },
    {
      socialMedia: "FACEBOOK",
      name: "Aeman",
      ref: "https://www.facebook.com/share/18E2kL3sz3/",
      img: logos[1],
      color: "rgba(10, 103, 216, 0.67)",
    },
    {
      socialMedia: "INSTAGRAM",
      name: "@Aeman_a96",
      ref: "https://www.instagram.com/aeman_a96?igsh=eWFuZWN0Nm0xNm9v",
      img: logos[2],
      color: "rgb(182, 13, 128)",
    },
    {
      socialMedia: "TELEGRAM",
      name: "@Aeman9_6",
      ref: "https://www.instagram.com/aeman_a96?igsh=eWFuZWN0Nm0xNm9v",
      img: logos[3],
      color: "rgb(11, 165, 171)",
    },
  ];
  const techonologies = ["React", "Vite", "CSS", "LocalStorage"];
  return (
    <div className="about">
      <div>
        <button className="close-about" onClick={handleShowAbout}>
          ↩
        </button>

        <div className="game-details">
          <div className="about-game">— ABOUT THE GAME —</div>
          <div className="about-game-desc">
            <div className="about-title">BETWEEN THE LINES</div>
            <div className="about-desc">
              A text-based intelligence puzzle game. Every case is a realistic
              document — an email, a witness statement, a report. Someone is
              always lying. Your job is to read carefully, spot the
              contradiction, and find the truth hidden between the lines.
            </div>
            <div className="about-badges">
              {badges.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </div>
          </div>
        </div>

        <span id="br">────────────────────────</span>

        <div className="dev-details">
          <div className="developer">— THE DEVELOPER —</div>
          <div className="dev-info">
            <div>👨‍💻</div>
            <div className="dev-detail">
              <div className="dev-name">Ayman</div>
              <div className="dev-speciality">
                Frontend Developer · React Learner
              </div>
            </div>
          </div>
        </div>

        <div className="acc-details">
          <div className="finde-me">— FIND ME —</div>
          <div className="accounts">
            {Accounts.map((acc) => {
              return (
                <div className="acc-info" key={acc.name}>
                  <img
                    src={acc.img}
                    alt={acc.socialMedia.toLowerCase()}
                    color="red"
                    style={{
                      filter: `brightness(0) invert(0.8) drop-shadow(0 0 8px ${acc.color})`,
                    }}
                  />
                  <div>
                    <div className="social-media">{acc.socialMedia}</div>

                    <a
                      href={acc.ref}
                      className="-name"
                      style={{ color: acc.color }}
                    >
                      {acc.name}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="techonology-details">
          <div className="techno">
            {techonologies.map((tech, i) => (
              <span key={i}>{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
