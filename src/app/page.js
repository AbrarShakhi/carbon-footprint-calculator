"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Welcome to the Carbon Footprint Calculator"
  );

  const messages = [
    "Track your carbon footprint effortlessly ☀️",
    "Make a positive impact on our planet 🌍",
    "Urban University students, let's go green ☁️",
  ];

  // Cycle through welcome messages every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setWelcomeMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    router.push("/q");
  };

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen px-4 bg-cover bg-center text-gray-100 transition-all duration-500"
      style={{
        backgroundImage: "url('/chris-nguyen-lbmrrNgq2lo-unsplash.jpg')", // Your sky image
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div> {/* Overlay for contrast */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-center drop-shadow-lg z-10">
        {welcomeMessage}
      </h1>
      <p className="text-base sm:text-lg md:text-xl mb-8 text-center max-w-md shadow-sm z-10">
        This tool helps Urban University students estimate their carbon footprint.
        Would you like to participate and take the first step towards a greener future?
      </p>
      <button
        onClick={handleStart}
        className="px-8 py-4 bg-sky-400 hover:bg-sky-500 transform hover:scale-105 transition-all duration-300 rounded-xl text-lg sm:text-xl font-semibold shadow-lg shadow-sky-500/50 w-full sm:w-auto z-10"
      >
        GO
      </button>
      
      {/* Photo Credit at the bottom */}
      <div className="absolute bottom-4 text-sm text-white z-10">
        <p>
          Photo by{" "}
          <a
            href="https://unsplash.com/@cspek?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
            className="text-sky-300 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chris Nguyen
          </a>{" "}
          on{" "}
          <a
            href="https://unsplash.com/photos/blue-sky-and-white-clouds-lbmrrNgq2lo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
            className="text-sky-300 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Unsplash
          </a>
        </p>
      </div>
    </div>
  );
}
