import React, { useEffect, useState, useRef } from "react";

export default function Quiz({
  question,
  currentQuestionIndex,
  totalQuestions,
  onAnswer,
  onTimeout,
  timePerQuestion = 15,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [remaining, setRemaining] = useState(timePerQuestion);
  const [showFeedback, setShowFeedback] = useState(false);

  const timerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const FEEDBACK_DELAY = 1500;

  const isCorrect = (answer) => answer === question.correctAnswer;

  useEffect(() => {
    setSelectedAnswer(null);
    setRemaining(timePerQuestion);
    setShowFeedback(false);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
      feedbackTimeoutRef.current = null;
    }

    timerRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setShowFeedback(true);
          feedbackTimeoutRef.current = setTimeout(() => {
            if (typeof onTimeout === "function") onTimeout();
            feedbackTimeoutRef.current = null;
          }, FEEDBACK_DELAY);
          return 0;
        }
        return r - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
        feedbackTimeoutRef.current = null;
      }
    };
  }, [question, timePerQuestion, onTimeout]);

  const handleSubmit = () => {
    if (!selectedAnswer || showFeedback) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setShowFeedback(true);

    feedbackTimeoutRef.current = setTimeout(() => {
      if (typeof onAnswer === "function") onAnswer(selectedAnswer);
      feedbackTimeoutRef.current = null;
    }, FEEDBACK_DELAY);
  };

  const buttonClass =
    "w-full text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 bg-[#0C7D74] hover:bg-[#085F57] hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";

  const answerButtonBase =
    "w-full font-medium py-4 px-6 rounded-xl shadow-lg transition-all duration-300 border-2 flex items-center justify-between text-left hover:shadow-xl transform hover:scale-102 active:scale-98";
  
  const defaultUnselected =
    "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50";
  const selectedNeutral = "border-[#0C7D74] bg-[#0C7D74]/10 text-slate-800 shadow-lg";
  const correctClass = "border-green-500 bg-green-50 text-green-800 shadow-lg";
  const wrongClass = "border-red-500 bg-red-50 text-red-800 shadow-lg";
  const dimmed = "opacity-60";

  const getAnswerClass = (answer) => {
    if (!showFeedback) {
      return `${answerButtonBase} ${
        selectedAnswer === answer ? selectedNeutral : defaultUnselected
      }`;
    }

    if (isCorrect(answer)) {
      return `${answerButtonBase} ${correctClass}`;
    }
    if (answer === selectedAnswer && !isCorrect(answer)) {
      return `${answerButtonBase} ${wrongClass}`;
    }

    return `${answerButtonBase} ${defaultUnselected} ${dimmed}`;
  };

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const timeProgress = (remaining / timePerQuestion) * 100;
  const isTimeRunningOut = remaining <= 5;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-6 py-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#0C7D74] rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-[#0C7D74] rounded-full opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-[#085F57] rounded-full opacity-10 animate-pulse delay-500"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-200 p-6 md:p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-black to-[#0C7D74] bg-clip-text text-transparent">
                Question {currentQuestionIndex + 1}/{totalQuestions}
              </h1>
              <div className={`px-4 py-2 rounded-xl shadow-lg font-bold text-lg transition-all duration-300 ${
                isTimeRunningOut 
                  ? 'bg-red-100 text-red-700 border-2 border-red-300 animate-pulse' 
                  : 'bg-white text-slate-700 border-2 border-slate-200'
              }`}>
                <div className="flex items-center gap-2">
                  <i className="bi bi-clock text-lg"></i>
                  <span>{remaining}s</span>
                </div>
              </div>
            </div>

            {/* Question Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">Question Progress</span>
                <span className="text-sm font-medium text-slate-600">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#0C7D74] to-[#085F57] h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Timer Progress Bar */}
            <div className="mb-2">
              <div className="w-full bg-slate-200 rounded-full h-1">
                <div 
                  className={`h-1 rounded-full transition-all duration-1000 ease-linear ${
                    isTimeRunningOut ? 'bg-red-500' : 'bg-[#0C7D74]'
                  }`}
                  style={{ width: `${timeProgress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-8 rounded-2xl shadow-inner border border-slate-200 mb-8">
            <div className="flex items-start gap-4">
              <div className="bg-[#0C7D74] rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <i className="bi bi-question-lg text-white text-sm"></i>
              </div>
              <p className="text-slate-800 text-lg md:text-xl font-medium leading-relaxed">
                {question.question}
              </p>
            </div>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-1 gap-4 mb-8">
            {(question.answers || []).map((answer, index) => {
              const chosen = selectedAnswer === answer;
              const disabled = showFeedback;
              const letters = ['A', 'B', 'C', 'D'];
              
              return (
                <button
                  type="button"
                  key={index}
                  onClick={() => {
                    if (showFeedback) return;
                    setSelectedAnswer(answer);
                  }}
                  disabled={disabled}
                  className={getAnswerClass(answer)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                      showFeedback && isCorrect(answer) ? 'bg-green-500 text-white' :
                      showFeedback && chosen && !isCorrect(answer) ? 'bg-red-500 text-white' :
                      chosen ? 'bg-[#0C7D74] text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {letters[index]}
                    </div>
                    <span className="flex-1 text-left">{answer}</span>
                  </div>
                  <div className="flex items-center">
                    {showFeedback && isCorrect(answer) && (
                      <div className="bg-green-500 rounded-full w-8 h-8 flex items-center justify-center">
                        <i className="bi bi-check-lg text-white font-bold"></i>
                      </div>
                    )}
                    {showFeedback && chosen && !isCorrect(answer) && (
                      <div className="bg-red-500 rounded-full w-8 h-8 flex items-center justify-center">
                        <i className="bi bi-x-lg text-white font-bold"></i>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-slate-100 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <i className="bi bi-tag text-[#0C7D74]"></i>
                <span className="font-medium text-slate-600">Category:</span>
                <span className="font-semibold text-slate-800">{question.category}</span>
              </div>
              <div className="h-4 w-px bg-slate-300"></div>
              <div className="flex items-center gap-2">
                <i className="bi bi-speedometer2 text-[#0C7D74]"></i>
                <span className="font-medium text-slate-600">Difficulty:</span>
                <span className="font-semibold text-slate-800 capitalize">{question.difficulty}</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-[#0C7D74] rounded-xl blur opacity-30"></div>
            <button
              type="button"
              disabled={!selectedAnswer || showFeedback}
              onClick={handleSubmit}
              className={buttonClass}
            >
              <span className="flex items-center justify-center gap-3">
                <i className="bi bi-check-circle text-xl"></i>
                Submit Answer
              </span>
            </button>
          </div>

          {!selectedAnswer && !showFeedback && (
            <p className="text-center text-slate-500 text-sm mt-4">
              Select an answer to submit
            </p>
          )}
        </div>
      </div>
    </div>
  );
}