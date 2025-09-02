import React from "react";

const Welcome = ({ onStart }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-6 py-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#0C7D74] rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-[#0C7D74] rounded-full opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#085F57] rounded-full opacity-10 animate-pulse delay-500"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center max-w-2xl mx-auto text-center">
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-[#0C7D74] rounded-full opacity-20 blur-xl scale-110"></div>
          <div className="relative bg-white rounded-full p-8 shadow-xl border border-slate-200">
            <i className="bi bi-patch-question text-[#0C7D74] text-8xl"></i>
          </div>
        </div>

        <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-black via-slate-800 to-[#0C7D74] bg-clip-text text-transparent mb-4 leading-tight">
          The Challenge Buzz
        </h1>

        <p className="text-xl md:text-2xl text-slate-700 font-medium mb-2 leading-relaxed">
          Test your knowledge and learn
        </p>
        
        <p className="text-sm text-slate-500 mb-12 max-w-md">
          Challenge yourself with engaging questions and expand your horizons
        </p>

        <div className="relative">
          <div className="absolute inset-0 bg-[#0C7D74] rounded-full blur opacity-30"></div>
          <button
            onClick={() => onStart && onStart()}
            className="relative px-12 py-4 text-xl font-semibold rounded-full shadow-xl transition-all duration-300 ease-out transform hover:scale-105 text-white bg-[#0C7D74] hover:bg-[#085F57] hover:shadow-2xl active:scale-95"
          >
            <span className="flex items-center gap-3">
              Start Quiz
              <i className="bi bi-arrow-right-circle text-xl"></i>
            </span>
          </button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
            <div className="bg-[#0C7D74] rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
              <i className="bi bi-lightning text-white text-xl"></i>
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Quick & Fun</h3>
            <p className="text-sm text-slate-600">Engaging questions designed to test and expand your knowledge</p>
          </div>
          
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
            <div className="bg-[#0C7D74] rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
              <i className="bi bi-trophy text-white text-xl"></i>
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Track Progress</h3>
            <p className="text-sm text-slate-600">Monitor your performance and see how much you've learned</p>
          </div>
          
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
            <div className="bg-[#0C7D74] rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
              <i className="bi bi-people text-white text-xl"></i>
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Challenge Friends</h3>
            <p className="text-sm text-slate-600">Share your scores and compete with friends and family</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;