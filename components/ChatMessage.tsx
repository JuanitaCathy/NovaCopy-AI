"use client"
import React from 'react';

const ChatMessage = ({
  text,
  from,
  onCopy,
}: {
  text: React.ReactNode; // Updated to ReactNode
  from: "user" | "ai";
  onCopy?: () => void;
}) => (
  <div className={`mb-4 ${from === "user" ? "flex justify-end" : "flex justify-start"}`}>
    <div
      className={`px-4 py-2 rounded-lg ${from === "user" ? "bg-[#00b4d8] text-white" : "bg-[#16213e] text-white"} ${from === "user" ? "ml-auto" : "mr-auto"}`}
      style={{ padding: "10px", maxWidth: from === "user" ? "70%" : "80%" }}
    >
      {text}
      {from === "ai" && (
        <button
          className="ml-2 text-sm text-[#00b4d8] hover:underline"
          onClick={onCopy}
        >
          Copy
        </button>
      )}
    </div>
  </div>
);

export default ChatMessage;
