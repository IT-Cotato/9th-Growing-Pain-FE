import "./App.css";
import Router from './routes/Router';
import React from "react";

function App() {
  const userInfo = false;

  return (
    <>
      <Router userInfo={userInfo} />
    </>
  );
}

export default App;
