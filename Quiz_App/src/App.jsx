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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://opentdb.com/api_category.php");
        const data = await res.json();
        setCategories(data.trivia_categories || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    if (hasSeenWelcome) {
      fetchCategories();
    }
  }, [hasSeenWelcome]);

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const shuffleArray = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const handleStartQuiz = async () => {
    if (!selectedCategory || !selectedDifficulty) {
      setError("Please choose a category and difficulty.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setShowResults(false);
      setScore(0);
      setCurrentQuestionIndex(0);

      const url = `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.response_code !== 0 || !Array.isArray(data.results)) {
        throw new Error("Invalid response from API");
      }

      const normalized = data.results.map((q) => {
        const decodedQuestion = decodeHtml(q.question);
        const decodedCorrect = decodeHtml(q.correct_answer);
        const decodedIncorrect = q.incorrect_answers.map((a) => decodeHtml(a));
        const answers = shuffleArray([decodedCorrect, ...decodedIncorrect]);
        return {
          question: decodedQuestion,
          answers,
          correctAnswer: decodedCorrect,
          category: q.category,
          difficulty: q.difficulty,
        };
      });

      setQuestions(normalized);
      setIsQuizStarted(true);
    } catch (err) {
      console.error(err);
      setError("Failed to load questions.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answer) => {
    const current = questions[currentQuestionIndex];
    if (answer && answer === current.correctAnswer) {
      setScore((s) => s + 1);
    }

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex >= questions.length) {
      setShowResults(true);
      setIsQuizStarted(false);
    } else {
      setCurrentQuestionIndex(nextIndex);
    }
  };

  const handleTimeout = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex >= questions.length) {
      setShowResults(true);
      setIsQuizStarted(false);
    } else {
      setCurrentQuestionIndex(nextIndex);
    }
  };
