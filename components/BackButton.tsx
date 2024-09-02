import React from "react";
import { useRouter } from "next/navigation"; // Using Next.js router

const BackButton: React.FC = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/")} // Navigate to the homepage on click
      className="flex items-center px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none"
    >
      {/* House Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5 mr-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 9.75L12 3l9 6.75M4.5 19.5v-8.25M19.5 19.5v-8.25M9 19.5v-6h6v6"
        />
      </svg>
      Back to Homepage
    </button>
  );
};

export default BackButton;
