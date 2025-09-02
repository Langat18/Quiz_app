import React from "react";

export default function Selection({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  onStartQuiz,
}) {
  const buttonClass =
    "w-full text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 bg-[#0C7D74] hover:bg-[#085F57] hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";

  const isFormValid = selectedCategory && selectedDifficulty;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-6 py-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 right-20 w-40 h-40 bg-[#0C7D74] rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-32 left-20 w-28 h-28 bg-[#0C7D74] rounded-full opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-2/3 right-1/4 w-20 h-20 bg-[#085F57] rounded-full opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-200 p-8 md:p-12">
          <div className="text-center mb-10">
            <div className="mb-6 relative">
              <div className="absolute inset-0 bg-[#0C7D74] rounded-full opacity-20 blur-xl scale-110"></div>
              <div className="relative bg-white rounded-full p-6 shadow-lg border border-slate-200 w-20 h-20 mx-auto flex items-center justify-center">
                <i className="bi bi-gear-fill text-[#0C7D74] text-3xl"></i>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-black via-slate-800 to-[#0C7D74] bg-clip-text text-transparent mb-3">
              Make a Choice
            </h1>
            <p className="text-slate-600 text-lg">
              Select your preferences to customize your quiz experience
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-8">
            {/* Category Selection */}
            <div className="flex flex-col">
              <label
                htmlFor="category"
                className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2"
              >
                <i className="bi bi-collection text-[#0C7D74]"></i>
                Categories
              </label>
              <div className="relative">
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-4 bg-white border-2 border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0C7D74] focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md appearance-none cursor-pointer"
                >
                  <option value="">-- Choose Category --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                  <i className="bi bi-chevron-down text-slate-400"></i>
                </div>
              </div>
              {selectedCategory && (
                <div className="mt-2 flex items-center gap-2 text-sm text-[#0C7D74]">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Category selected</span>
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="difficulty"
                className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2"
              >
                <i className="bi bi-speedometer2 text-[#0C7D74]"></i>
                Difficulty Level
              </label>
              <div className="relative">
                <select
                  id="difficulty"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full p-4 bg-white border-2 border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0C7D74] focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md appearance-none cursor-pointer"
                >
                  <option value="">-- Choose Difficulty --</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                  <i className="bi bi-chevron-down text-slate-400"></i>
                </div>
              </div>
              {selectedDifficulty && (
                <div className="mt-2 flex items-center gap-2 text-sm text-[#0C7D74]">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Difficulty selected</span>
                </div>
              )}
            </div>
            <div className="bg-slate-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">Setup Progress</span>
                <span className="text-sm font-medium text-slate-600">
                  {selectedCategory && selectedDifficulty ? '2/2' : selectedCategory || selectedDifficulty ? '1/2' : '0/2'}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-[#0C7D74] h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ 
                    width: selectedCategory && selectedDifficulty ? '100%' : selectedCategory || selectedDifficulty ? '50%' : '0%' 
                  }}
                ></div>
              </div>
            </div>

            <div className="relative mt-4">
              <div className="absolute inset-0 bg-[#0C7D74] rounded-xl blur opacity-30"></div>
              <button 
                onClick={onStartQuiz} 
                className={buttonClass}
                disabled={!isFormValid}
              >
                <span className="flex items-center justify-center gap-3">
                  Next
                  <i className="bi bi-arrow-right-circle text-xl"></i>
                </span>
              </button>
            </div>

            {!isFormValid && (
              <p className="text-center text-slate-500 text-sm">
                Please select both category and difficulty to proceed
              </p>
            )}
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="bg-[#0C7D74] rounded-full w-10 h-10 flex items-center justify-center">
                <i className="bi bi-lightbulb text-white text-sm"></i>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 text-sm">Quick Tip</h4>
                <p className="text-xs text-slate-600">Start with Easy difficulty if you're new</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="bg-[#0C7D74] rounded-full w-10 h-10 flex items-center justify-center">
                <i className="bi bi-star text-white text-sm"></i>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 text-sm">Pro Tip</h4>
                <p className="text-xs text-slate-600">Hard mode offers the best learning experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}