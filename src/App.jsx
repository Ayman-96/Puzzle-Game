import "./App.css";

function App() {
  return <Main />;
}

function Main() {
  return (
    <div className="container">
      <div className="header">
        <h2 className="title">Solve Problems</h2>
        <h3>subtitle</h3>
      </div>
      <div className="body">
        <div className="difficulty">
          <p>Choose a Difficulty :</p>
          <button id="easy">Easy</button>
          <button id="medium">Medium</button>
          <button id="hard">Hard</button>
        </div>
      </div>
    </div>
  );
}

function Levels() {
  return (
    <div className="levels">
      <button>1</button>
      <button>2</button>
      <button>3</button>
    </div>
  );
}

export default App;
