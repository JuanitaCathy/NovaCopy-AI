"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation

const SidebarItem = ({ label, icon }: { label: string; icon: JSX.Element }) => (
  <div className="flex items-center px-4 py-2 hover:bg-gradient-to-r from-[#00b4d8] to-[#9b5de5] text-white rounded-md cursor-pointer transition-all duration-300 whitespace-nowrap z-10">
    {icon}
    <span className="text-sm font-medium ml-2">{label}</span>
  </div>
);

const ChatMessage = ({
  text,
  from,
  onCopy,
}: {
  text: string;
  from: "user" | "ai";
  onCopy?: () => void;
}) => (
  <div
    className={`mb-4 ${from === "user" ? "flex justify-end" : "flex justify-start"}`}
  >
    <div
      className={`px-4 py-2 rounded-lg ${from === "user" ? "bg-[#00b4d8] text-white" : "bg-[#16213e] text-white"} ${
        from === "user" ? "ml-auto" : "mr-auto"
      }`}
      style={{
        padding: "10px",
        maxWidth: from === "user" ? "70%" : "80%",
      }} // Adjusted width and padding
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

const Copywriter: React.FC = () => {
  const [messages, setMessages] = useState<
    { text: string; from: "user" | "ai" }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions] = useState([
    "Tell me a little bit about your Product/Service? Be as detailed as possible.",
    "Who are you trying to target, what pain points do you want me to focus on?",
    "What is your Call-To-Action and offer (if any)?",
    "Do you have a certain tone you'd like me to follow?",
  ]);
  const router = useRouter();

  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        text: "Hello! My name is Nova 🤖! I'm here to help you generate the perfect copy! Let's begin?",
        from: "ai",
      },
    ]);
  }, []);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "") return; // Prevent sending empty messages

    const userMessage = { text: input, from: "user" as "user" | "ai" };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setLoading(true);

    if (questionIndex < questions.length) {
      // Ask the next question
      setTimeout(() => {
        const aiMessage = {
          text: questions[questionIndex],
          from: "ai" as "user" | "ai",
        };
        setMessages([...newMessages, aiMessage]);
        setQuestionIndex(questionIndex + 1);
        setInput("");
        setLoading(false);
      }, 2000);
    } else {
      // Generate AI response after all questions are answered
      setTimeout(() => {
        const finalMessage = {
          text: "Thank you for the information! I'll use this to generate your copy.",
          from: "ai" as "user" | "ai",
        };
        setMessages([...newMessages, finalMessage]);
        setLoading(false);
        setInput(""); // Clear input after sending
      }, 2000);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        // Allow new line on Shift + Enter
        return;
      } else {
        e.preventDefault(); // Prevent default new line behavior
        handleSend();
      }
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard!");
  };

  const handleSavePDF = () => {
    const doc = new jsPDF();
    let yOffset = 10;

    messages.forEach((msg, index) => {
      doc.text(
        10,
        yOffset,
        `${msg.from === "user" ? "You" : "Nova"}: ${msg.text}`
      );
      yOffset += 10;
    });

    doc.save("generated-copy.pdf");
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <StarsBackground className="absolute inset-0 z-1" />
      <ShootingStars className="absolute inset-0 z-1" />

      <div className="flex h-full">
        <aside className="w-64 bg-[#1a1a2e] p-4 shadow-lg z-20">
          <div className="flex items-center mb-5">
            <Image
              src="/NovaCopy_white.png"
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="ml-3 mt-5 text-white">
              <h2 className="text-xl font-semibold">NovaCopy AI</h2>
              <button className="text-[#00b4d8] hover mt-4">
                Upgrade your plan
              </button>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <SidebarItem label="Create Custom Copy" icon={<svg />} />
            <SidebarItem label="Browse Templates" icon={<svg />} />
            <SidebarItem label="Previous Copies" icon={<svg />} />
            <SidebarItem label="Settings" icon={<svg />} />
          </div>
        </aside>

        <div className="flex-1 p-8 flex flex-col space-y-8 text-white z-20">
          <header className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">AI Copywriter</h1>
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-gradient-to-r from-[#00b4d8] to-[#9b5de5] text-white px-4 py-2 rounded-md hover:bg-[#0489b1] transition-all duration-300"
            >
              Back to Dashboard
            </button>
          </header>

          <section className="flex flex-col flex-1 bg-[#1a1a2e] p-4 rounded-md">
            <div
              className="flex-1 overflow-y-auto mb-4"
              ref={messageContainerRef}
              style={{ maxHeight: "calc(100vh - 250px)" }}
            >
              {messages.map((msg, index) => (
                <ChatMessage
                  key={index}
                  text={msg.text}
                  from={msg.from}
                  onCopy={
                    msg.from === "ai" ? () => handleCopy(msg.text) : undefined
                  }
                />
              ))}
              {loading && (
                <div className="text-center text-gray-400">Generating...</div>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <textarea
                  className="w-full p-4 border border-[#00b4d8] bg-[#16213e] text-white rounded-md"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={2} // Adjust the number of visible rows
                ></textarea>
                <p className="text-sm text-gray-400 mt-2">
                  Press Enter to send, Shift + Enter for a new line.
                </p>
              </div>
              <button
                className="px-6 py-2 bg-gradient-to-r from-[#00b4d8] to-[#9b5de5] text-white rounded-md hover:bg-[#0489b1] transition-all duration-300"
                onClick={handleSend}
                disabled={loading}
                style={{ height: "calc(2rem + 1.5rem)" }} // Ensure button height matches text area
              >
                Generate
              </button>
              <button
                className="px-4 py-2 bg-gradient-to-r from-[#00b4d8] to-[#9b5de5] text-white rounded-md hover:bg-[#0489b1] transition-all duration-300"
                onClick={handleSavePDF}
              >
                Save as PDF
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Copywriter;
