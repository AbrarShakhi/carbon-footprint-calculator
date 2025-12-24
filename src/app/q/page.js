"use client";

import { useState } from "react";
import forum from "@/app/components/forum";

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [finished, setFinished] = useState(false);

  const currentQuestion = forum[currentQuestionIndex];

  const getPreviousAnswer = (questionId) => {
    const previousAnswer = answers.find(
      (answer) => answer.questionId === questionId
    );
    return previousAnswer ? previousAnswer.answer : "";
  };

  const handleAnswer = (answer) => {
    const score = currentQuestion.score(answer);

    setAnswers((prev) => {
      const updated = prev.filter(
        (a) => a.questionId !== currentQuestion.id
      );
      updated.push({ questionId: currentQuestion.id, answer, score });
      return updated;
    });

    setTotalScore((prev) => prev + score);

    if (currentQuestion.type === "categorical") {
      handleNext();
    }
  };

  const handleNumericAnswer = () => {
    if (inputValue === "") return;

    const score = currentQuestion.score(Number(inputValue));

    setAnswers((prev) => {
      const updated = prev.filter(
        (a) => a.questionId !== currentQuestion.id
      );
      updated.push({
        questionId: currentQuestion.id,
        answer: inputValue,
        score,
      });
      return updated;
    });

    setTotalScore((prev) => prev + score);
    setInputValue("");
    handleNext();
  };

  const handleNext = () => {
    if (currentQuestionIndex < forum.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setTotalScore(0);
    setInputValue("");
    setFinished(false);
  };

  /* ================= RESULT VIEW ================= */
  if (finished) {
    return (
      <div
        className="flex justify-center items-center min-h-screen px-4 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/chris-nguyen-lbmrrNgq2lo-unsplash.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="w-full max-w-lg p-8 bg-white bg-opacity-30 rounded-xl shadow-xl z-10 backdrop-blur-lg text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            🌍 Your Carbon Footprint
          </h2>

          <p className="text-xl text-gray-900 mb-2">
            <span className="font-semibold">
              {totalScore.toFixed(2)}
            </span>{" "}
            kg CO₂e / year
          </p>

          <p className="text-gray-700 mb-6">
            Based on your transport, diet, energy use, and digital activity.
          </p>

          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go To Start
          </button>
        </div>
      </div>
    );
  }

  /* ================= QUESTION VIEW ================= */
  return (
    <div
      className="flex justify-center items-center min-h-screen px-4 bg-cover bg-center text-gray-100 transition-all duration-500"
      style={{
        backgroundImage: "url('/chris-nguyen-lbmrrNgq2lo-unsplash.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="w-full max-w-lg p-6 bg-white bg-opacity-30 rounded-xl shadow-xl z-10 backdrop-blur-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          {currentQuestion.text}
        </h2>

        {currentQuestion.type === "categorical" && (
          <div className="space-y-4">
            {Object.keys(currentQuestion.options).map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {currentQuestion.type === "number" && (
          <input
            type="number"
            value={inputValue || getPreviousAnswer(currentQuestion.id)}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
            placeholder="Enter your answer"
          />
        )}

        <div className="mt-6 text-center">
          {currentQuestion.type === "number" && (
            <button
              onClick={handleNumericAnswer}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              {currentQuestionIndex === forum.length - 1
                ? "Finish"
                : "Next"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
