"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      setAnswer("Sorry, I couldn't process your question. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAskAgain = () => {
    setQuestion("");
    setAnswer("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-purple-800 flex flex-col items-center justify-center p-4" style={{background: 'linear-gradient(135deg, #1a1a1a 0%, #331D4C 50%, #2a1a3e 100%)'}}>
      <div className="max-w-2xl w-full">
        {/* Logo space */}
        <div className="h-20 mb-8 flex items-center justify-center">
          <Image 
            src="/site-logo.svg"
            alt="Site Logo"
            width={200}
            height={64}
            className="h-16 w-auto filter brightness-0 invert"
            priority
          />
        </div>
        
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-gray-700/50">
          <h1 className="text-4xl font-bold text-center text-white mb-8">
            Ask Me Anything
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What would you like to know?"
                className="w-full h-32 p-4 border-2 border-gray-600 rounded-lg focus:border-purple-400 focus:outline-none resize-none text-lg bg-gray-700/50 text-white placeholder-gray-400"
                disabled={isLoading}
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !question.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
            >
              {isLoading ? "Thinking..." : "Ask"}
            </button>
          </form>

          {answer && (
            <div className="mt-8 p-6 bg-gray-700/50 rounded-lg border border-gray-600/50">
              <h2 className="text-xl font-semibold text-white mb-3">Answer:</h2>
              <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                {answer}
              </p>
              <button
                onClick={handleAskAgain}
                className="mt-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-2 px-4 rounded-lg font-medium hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-lg"
              >
                Ask Another Question
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
