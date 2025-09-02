import React from "react";

export default function Results({
  score = 0,
  total = 0,
  onRetry,
  onChooseNew,
}) {
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;
  
  const getPerformanceData = () => {
    if (percent >= 80) {
      return {
        title: "Excellent!",
        message: "You're rocking it",
        icon: "bi-trophy-fill",
        color: "text-amber-600",
        bgColor: "bg-amber-100",
        borderColor: "border-amber-200"
      };
    } else if (percent >= 50) {
      return {
        title: "Nice Work!",
        message: "Some room to improve",
        icon: "bi-star-fill",
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        borderColor: "border-blue-200"
      };
    } else {
      return {
        title: "Keep Practicing!",
        message: "You'll get better",
        icon: "bi-arrow-repeat",
        color: "text-green-600",
        bgColor: "bg-green-100",
        borderColor: "border-green-200"
      };
    }
  };

  const performance = getPerformanceData();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-6 py-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#0C7D74] rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-[#0C7D74] rounded-full opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#085F57] rounded-full opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-200 p-8 md:p-12">
          <div className="text-center mb-10">
            <div className="mb-6 relative">
              <div className="absolute inset-0 bg-[#0C7D74] rounded-full opacity-20 blur-xl scale-110"></div>
              <div className="relative bg-white rounded-full p-6 shadow-lg border border-slate-200 w-24 h-24 mx-auto flex items-center justify-center">
                <i className="bi bi-flag-fill text-[#0C7D74] text-4xl"></i>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-black via-slate-800 to-[#0C7D74] bg-clip-text text-transparent mb-3">
          You have completed the questions
            </h1>
            <p className="text-slate-600 text-lg">
              Look how you performed. You could retry again to improve your score.
            </p>
          </div>

          <div className="text-center mb-10">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 shadow-inner border border-slate-200 mb-6">
              <p className="text-sm font-medium text-slate-600 mb-2">Your Score</p>
              <p className="text-5xl md:text-6xl font-extrabold text-slate-800 mb-2">
                {score} <span className="text-3xl text-slate-500">/ {total}</span>
              </p>
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="flex-1 bg-slate-200 rounded-full h-3 max-w-xs">
                  <div 
                    className="bg-gradient-to-r from-[#0C7D74] to-[#085F57] h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <span className="text-2xl font-bold text-[#0C7D74]">{percent}%</span>
              </div>
            </div>

            <div className={`${performance.bgColor} ${performance.borderColor} border-2 rounded-2xl p-6 shadow-sm`}>
              <div className="flex items-center justify-center gap-4">
                <div className={`${performance.color} bg-white rounded-full p-3 shadow-md`}>
                  <i className={`bi ${performance.icon} text-2xl`}></i>
                </div>
                <div className="text-left">
                  <h3 className={`text-xl font-bold ${performance.color}`}>{performance.title}</h3>
                  <p className="text-slate-700">{performance.message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-0 bg-[#0C7D74] rounded-xl blur opacity-30"></div>
              <button
                onClick={onRetry}
                className="relative w-full px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 text-white bg-[#0C7D74] hover:bg-[#085F57] hover:shadow-xl active:scale-95"
              >
                <span className="flex items-center justify-center gap-3">
                  <i className="bi bi-arrow-clockwise text-xl"></i>
                  Retry the questions
                </span>
              </button>
            </div>
            
            <div className="relative flex-1">
              <button
                onClick={onChooseNew}
                className="w-full px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 text-[#0C7D74] bg-white border-2 border-[#0C7D74] hover:bg-[#0C7D74] hover:text-white hover:shadow-xl active:scale-95"
              >
                <span className="flex items-center justify-center gap-3">
                  <i className="bi bi-plus-circle text-xl"></i>
                  Get New Topic
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
            <div className="bg-[#0C7D74] rounded-full w-12 h-12 flex items-center justify-center mb-3 mx-auto">
              <i className="bi bi-check-circle text-white text-xl"></i>
            </div>
            <h4 className="font-bold text-slate-800 text-lg">{score}</h4>
            <p className="text-sm text-slate-600">Correct Answers</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
            <div className="bg-[#0C7D74] rounded-full w-12 h-12 flex items-center justify-center mb-3 mx-auto">
              <i className="bi bi-x-circle text-white text-xl"></i>
            </div>
            <h4 className="font-bold text-slate-800 text-lg">{total - score}</h4>
            <p className="text-sm text-slate-600">Missed Questions</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
            <div className="bg-[#0C7D74] rounded-full w-12 h-12 flex items-center justify-center mb-3 mx-auto">
              <i className="bi bi-percent text-white text-xl"></i>
            </div>
            <h4 className="font-bold text-slate-800 text-lg">{percent}%</h4>
            <p className="text-sm text-slate-600">Accuracy Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}