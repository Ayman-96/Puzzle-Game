import { useState } from "react";
import "./App.css";

const easyLevels = [
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
  return <Main />;
}

function Main() {
  const [difficulty, setDifficulty] = useState("");

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
      {difficulty && <Levels difficulty={difficulty} />}
    </div>
  );
}

export default App;
