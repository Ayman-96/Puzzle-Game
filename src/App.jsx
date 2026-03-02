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
        <div className="levels">
          <p>Choose a Level :</p>
          <button id="easy">Easy</button>
          <button id="medium">Medium</button>
          <button id="hard">Hard</button>
        </div>
      </div>
    </div>
  );
}
export default App;
