import { useState, useEffect } from "react";
import "./App.css";

const easyLevels = [
  {
    id: 1,
    number: "001",
    difficulty: "EASY",
    title: "THE NEIGHBOR",
    subTitle: "A letter was slipped under your door by mistake",
    case: `My dearest Margaret,\n
    I hope this letter finds you well. Life here has been peaceful, though I must admit the nights feel longer than I remember. I think of the house often — the garden, the kitchen, the way the light comes through the east window in the morning. I miss it deeply.\n
    Please do not worry about me. I am eating well and the people here are kind. James visits every Sunday without fail, which means the world to me. Tell him I said so, if you see him before I do.\n
    With all my love,\n Father`,
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
    title: "THE NEW EMPLOYEE",
    subTitle: "Your first week at the company — something feels off",
    question:
      "Based on the email chain, who is lying about the missed deadline?",
    case: `From: Daniel (Manager) → To: All Team
Monday, 9:14 AM

"Team, just a reminder that the Henderson report was due last Friday. We are still waiting on it. This delay is unacceptable and is affecting the entire department."

---

From: Sara → To: Daniel
Monday, 10:02 AM

"Daniel, I submitted my section to Mark last Thursday as agreed. I have the email confirmation if needed."

---

From: Mark → To: Daniel
Monday, 10:45 AM

"I never received anything from Sara. My section was completed and sent to you directly on Friday morning. The delay is not on my end."

---

From: Sara → To: Daniel
Monday, 11:03 AM

"Mark, you replied to my submission email on Thursday saying you received it. I still have that reply in my inbox."`,
    number: "002",
    difficulty: "Easy",
    options: [
      {
        key: "A",
        text: "Daniel — he knew about the delay but waited until Monday to address it",
      },
      {
        key: "B",
        text: "Mark — he claimed he never received Sara's section but his own reply proves he did",
      },
      {
        key: "C",
        text: "Sara — she submitted late and is covering it up with a fake confirmation",
      },
      { key: "D", text: "Both Sara and Mark are lying to protect each other" },
    ],
    solution: "B",
    explanation:
      "Mark claimed he never received Sara's submission — but Sara pointed out that Mark replied to her email confirming receipt. You can't reply to an email you never received. Mark's own action exposes his lie.",
    category: "contradiction",
    timeLimit: 60,
  },
  {
    id: 3,
    title: "THE DOCTOR",
    subTitle: "A patient's file landed on your desk this morning",
    question:
      "What detail in this file suggests the prescription was not written by the listed doctor?",
    case: `Patient: Robert Hall — Age: 52
Admitted: Tuesday, 8:30 AM
Attending Physician: Dr. Elaine Morris

Diagnosis: Moderate hypertension, mild anxiety.

Prescription issued Tuesday 8:45 AM:
— Medication A: 10mg daily
— Medication B: 50mg twice daily

Physician notes:
"Patient is responding well. Continue current plan. Follow-up in two weeks."

---

Staff log note — Tuesday 9:10 AM:
"Dr. Morris called in sick this morning. Shift covered by Dr. James."`,
    number: "003",
    difficulty: "Easy",
    options: [
      {
        key: "A",
        text: "The medication dosage is too high for a patient his age",
      },
      {
        key: "B",
        text: "The prescription was issued at 8:45 AM but Dr. Morris called in sick that morning — she was never there",
      },
      {
        key: "C",
        text: "The diagnosis of anxiety and hypertension together is medically unusual",
      },
      {
        key: "D",
        text: "The follow-up period of two weeks is too short for this condition",
      },
    ],
    solution: "B",
    explanation:
      "The prescription was signed by Dr. Morris at 8:45 AM — but the staff log shows she called in sick that same morning and never came in. Someone else issued that prescription under her name.",
    category: "investigation",
    timeLimit: 60,
  },
  {
    id: 4,
    title: "THE JOURNALIST",
    subTitle: "An anonymous tip arrived in your inbox late last night",
    question:
      "What inconsistency in the Mayor's statement reveals he is not telling the truth?",
    case: `Anonymous tip received — Wednesday 11:58 PM:
"The Mayor approved the construction contract before the public vote. Check his own calendar."

---

Mayor's official statement — Thursday 10:00 AM:

"I want to be absolutely clear. The construction contract for the new district was approved only after the public vote on September 14th, as required by law. My office followed every procedure correctly and transparently. I did not sign anything before the community had their say. Any claims suggesting otherwise are completely false and politically motivated."

---

City records — obtained Thursday 2:00 PM:
Contract reference: CDX-2024
Signing date: September 11th
Signed by: Mayor's office`,
    number: "004",
    difficulty: "Easy",
    options: [
      {
        key: "A",
        text: "The anonymous tip was sent late at night which makes it unreliable",
      },
      {
        key: "B",
        text: "The Mayor used the phrase 'politically motivated' which is defensive language",
      },
      {
        key: "C",
        text: "The Mayor said approval came after September 14th — but city records show the contract was signed on September 11th, three days before",
      },
      {
        key: "D",
        text: "The city records could have been tampered with by political opponents",
      },
    ],
    solution: "C",
    explanation:
      "The Mayor specifically stated nothing was signed before the September 14th vote. The city records show the contract was signed on September 11th — three days before the vote. His own statement contradicts the official document.",
    category: "investigation",
    timeLimit: 60,
  },
  {
    id: 5,
    title: "THE FRIEND",
    subTitle:
      "Two of your closest friends had a falling out — both texted you their version",
    question:
      "Whose story contains a detail that makes their version impossible?",
    case: `Message from Layla — Friday 9:45 PM:

"I can't believe Adam. We were at the restaurant together on Wednesday night. I told him about my job situation in confidence. The next morning my boss called me into his office — someone had told him everything. Adam is the only person who knew. He must have called my boss that same night after dinner."

---

Message from Adam — Friday 10:20 PM:

"Layla is completely wrong. Yes we had dinner Wednesday. But I would never do that to her. I got home, went straight to sleep — I had an early flight Thursday at 6 AM to visit my parents. I was at the airport by 4:30 AM. I had no time and no reason to call anyone that night."

---

Layla again — Friday 10:35 PM:

"He's lying. I saw him at the coffee shop near my office on Thursday afternoon. He was never on any flight."`,
    number: "005",
    difficulty: "Easy",
    options: [
      {
        key: "A",
        text: "Layla is lying — she has no proof Adam spoke to her boss",
      },
      {
        key: "B",
        text: "Adam is lying — if he had a 6 AM flight he would have left before the coffee shop opened",
      },
      {
        key: "C",
        text: "Adam is lying — Layla saw him at the coffee shop Thursday afternoon, which contradicts his claim of being away",
      },
      {
        key: "D",
        text: "Both are equally believable and there is not enough information to decide",
      },
    ],
    solution: "C",
    explanation:
      "Adam claimed he flew out Thursday at 6 AM to visit his parents — meaning he should have been away all day. But Layla saw him at the coffee shop near her office Thursday afternoon. He couldn't have been on a flight and in the city at the same time. His alibi falls apart.",
    category: "contradiction",
    timeLimit: 60,
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

  function handleUserAnswer(userAnswer) {
    setUserAns(userAnswer);
  }

  return (
    <div className="play-content">
      <div className="header-container">
        <p id="emoji">📬</p>
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
      </div>

      {submitted && (
        <p
          className={`explanation ${userAns === difficulty[play - 1].solution ? "correct-exp" : "wrong-exp"}`}
        >
          {difficulty[play - 1].explanation}
        </p>
      )}

      {userAns && (
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
      )}

      <p className="footer-text">
        {!submitted ? "-- SELECT YOUR ANSWER --" : "-- STAY SHARP --"}
      </p>
    </div>
  );
}
export default App;
