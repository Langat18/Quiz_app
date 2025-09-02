import React, { useState, useEffect } from "react";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Welcome from "./pages/welcome";
import Selection from "./pages/Selection";
import Results from "./pages/Result";
import Quiz from "./pages/Questions";

export default function App() {
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);