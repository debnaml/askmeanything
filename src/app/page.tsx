"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReversing, setIsReversing] = useState(false);

  // Handle seamless forward/reverse looping with time manipulation
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (isReversing) {
        // Calculate reverse time position
        const reverseTime = video.duration - video.currentTime;
        if (video.currentTime <= 0.1) {
          // Reached the beginning while reversing, switch to forward
          setIsReversing(false);
          video.currentTime = 0;
        }
      } else {
        // Playing forward
        if (video.currentTime >= video.duration - 0.1) {
          // Reached the end, start reversing by controlling currentTime
          setIsReversing(true);
        }
      }
    };

    const handleEnded = () => {
      if (!isReversing) {
        setIsReversing(true);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [isReversing]);

  // Handle reverse playback by manually controlling currentTime
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isReversing) return;

    const reverseInterval = setInterval(() => {
      if (video.currentTime > 0.1) {
        // Move backward at half speed (roughly)
        video.currentTime -= 0.033; // Approximate 30fps reverse at 0.5x speed
      } else {
        // Reached beginning, switch to forward
        video.currentTime = 0;
        setIsReversing(false);
        video.play();
      }
    }, 33); // ~30fps for smooth reverse

    return () => clearInterval(reverseInterval);
  }, [isReversing]);

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
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Fullscreen Background Video - Manual Forward/Reverse Loop */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{
          filter: 'brightness(0.8) contrast(1.1)',
        }}
        onLoadedData={(e) => {
          // Start with forward playback at half speed
          e.currentTarget.playbackRate = 0.5;
        }}
        onEnded={() => {
          // When video ends naturally, start reverse
          if (!isReversing) {
            setIsReversing(true);
          }
        }}
      >
        <source src="/sora.mp4" type="video/mp4" />
      </video>
      
      {/* Very light overlay for text readability */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      
      <div className="max-w-2xl w-full relative z-20">
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
        
        <div className="bg-black/5 backdrop-blur-3xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden animate-pulse-glow">
          {/* Very subtle glass morphism layers to allow video visibility */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/3 via-purple-500/5 to-white/2 rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/3 to-transparent rounded-3xl"></div>
          
          <div className="relative z-20">
            <h1 className="text-4xl font-bold text-center text-white mb-8 drop-shadow-2xl animate-glow" style={{textShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(147,51,234,0.8)'}}>
              Ask Me Anything
            </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What would you like to know?"
                className="w-full h-32 p-4 border border-white/30 rounded-xl focus:border-purple-400/70 focus:outline-none focus:ring-2 focus:ring-purple-400/50 resize-none text-lg bg-white/5 backdrop-blur-sm text-white placeholder-white/70 shadow-xl"
                disabled={isLoading}
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !question.trim()}
              className="w-full bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-sm text-white py-3 px-6 rounded-xl font-semibold text-lg hover:from-purple-700/95 hover:to-pink-700/95 disabled:from-gray-500/60 disabled:to-gray-600/60 disabled:cursor-not-allowed transition-all duration-300 shadow-2xl border border-white/20"
            >
              {isLoading ? "Thinking..." : "Ask"}
            </button>
          </form>

          {answer && (
            <div className="mt-8 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/30 shadow-2xl">
              <h2 className="text-xl font-semibold text-white mb-3 drop-shadow-lg">Answer:</h2>
              <p className="text-white/95 leading-relaxed whitespace-pre-wrap">
                {answer}
              </p>
              <button
                onClick={handleAskAgain}
                className="mt-4 bg-gradient-to-r from-emerald-600/90 to-teal-600/90 backdrop-blur-sm text-white py-2 px-4 rounded-xl font-medium hover:from-emerald-700/95 hover:to-teal-700/95 transition-all duration-300 shadow-xl border border-white/20"
              >
                Ask Another Question
              </button>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
