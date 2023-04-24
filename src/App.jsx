import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import QuestionsPage from "./components/QuestionsPage";
import CategoryPage from "./components/CategoryPage";
import HomePage from "./components/HomePage";
import OwnQuizPage from "./components/OwnQuizPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/ownquiz" element={<OwnQuizPage />} />
        <Route path="/questions/:category" element={<QuestionsPage />} />
      </Routes>
    </div>
  );
}

export default App;
