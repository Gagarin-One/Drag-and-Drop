import React from "react";
import ReactDOM from "react-dom";
import Kanban from "./Kanban";
import './App.scss'

function App() {
  return (
    <div style={{ padding: '50px' }}>
            <h1 style={{ marginBottom: '20px' }}>
            Drag and drop
            </h1>
            <Kanban/>
        </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
export default App;