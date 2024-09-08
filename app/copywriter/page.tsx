"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { jsPDF } from "jspdf";

const SidebarItem = ({
  label,
  icon,
  href,
}: {
  label: string;
  icon: JSX.Element;
  href: string;
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(href)}
      className="flex items-center px-4 py-2 space-x-2 hover:bg-gradient-to-r from-[#00b4d8] to-[#9b5de5] text-white rounded-md cursor-pointer transition-all duration-300 whitespace-nowrap z-10"
    >
      <div className="flex items-center justify-center w-6 h-12">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

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
  const [bannerTitle, setBannerTitle] = useState("Welcome to AI Copywriter");
  const router = useRouter();
  const query = new URLSearchParams(window.location.search);
  const type = query.get("type") || "Email Ad";

  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        text: "Hello! My name is Nova 🤖! I'm here to help you generate the perfect copy! Let's begin?",
        from: "ai",
      },
    ]);
    setBannerTitle(`Copy Generation Request`);
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
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 10;
    let yOffset = 20;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    const filteredMessages = messages.slice(1); // Exclude the first message

    // Add the remaining messages
    filteredMessages.forEach((msg) => {
      const author = msg.from === "user" ? "You" : "Nova";
      const fullText = `${author}: ${msg.text}`;

      // Split the text if it overflows the page width
      const textLines = doc.splitTextToSize(fullText, pageWidth - 2 * margin);

      // Add each line of text
      textLines.forEach((line: string | string[]) => {
        if (yOffset + 10 > pageHeight - 10) {
          doc.addPage(); // Add a new page if it exceeds
          yOffset = 20; // Reset Y offset for the new page
        }
        doc.text(line, margin, yOffset);
        yOffset += 10; // Adjust spacing between lines
      });

      yOffset += 10; // Extra spacing between messages
    });

    doc.save("generated-copy.pdf");
  };

  const handleSave = () => {
    const formatDateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      return now.toLocaleDateString("en-US", options);
    };

    const copy = {
      title: `Copy Created on ${formatDateTime()}`,
      messages: messages,
    };

    // Save chat copy to localStorage
    const existingCopies = JSON.parse(
      localStorage.getItem("chatCopies") || "[]"
    );
    existingCopies.push(copy);
    localStorage.setItem("chatCopies", JSON.stringify(existingCopies));

    // Navigate to the previous copies page
    router.push("/previous-copies");
  };

  return (
    <div className="relative h-screen overflow-hidden overflow-y-auto">
      {" "}
      {/* Added overflow-y-auto here */}
      <StarsBackground className="absolute inset-0 z-1" />
      <ShootingStars className="absolute inset-0 z-1" />
      <div className="flex h-full">
        <aside className="w-60 h-screen bg-[#1a1a2e] p-4 shadow-lg z-20">
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
          <div className="flex flex-col space-y-2">
            <SidebarItem
              label="Create Custom Copy"
              icon={<svg />}
              href="/copywriter"
            />
            <SidebarItem
              label="Previous Copies"
              icon={<svg />}
              href="/previous-copies"
            />
            <SidebarItem label="Settings" icon={<svg />} href="/settings" />
            <SidebarItem label="Feedback" icon={<svg />} href="/feedback" />
          </div>
          <div className="m-5 mt-10">
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-gradient-to-r from-[#00b4d8] to-[#9b5de5] text-white px-4 py-2 rounded-md hover:bg-[#0489b1] transition-all duration-300"
            >
              Back to Dashboard
            </button>
          </div>
        </aside>

        <div className="flex-1 p-8 flex flex-col space-y-8 text-white z-20">
          <header className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">AI Copywriter</h1>
            <div className="bg-[#9b5de5] text-white px-4 py-2 rounded-md">
              <span>{type}</span>
            </div>
          </header>

          <section className="flex flex-col flex-1 bg-[#1a1a2e] p-3 rounded-md mb-2">
            <div className="p-3 rounded-t-md flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">{bannerTitle}</h2>
              <button
                onClick={handleSavePDF}
                className="bg-gradient-to-r from-[#00b4d8] to-[#9b5de5] text-white px-4 py-2 rounded-md hover:bg-[#0489b1] transition-all duration-300"
              >
                Save as PDF
              </button>
            </div>
            <div
              className="flex-1 overflow-y-auto p-3"
              ref={messageContainerRef}
              style={{ maxHeight: "calc(100vh - 200px)" }} // Set a fixed height for the chat area
            >
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  text={message.text}
                  from={message.from}
                  onCopy={() => handleCopy(message.text)}
                />
              ))}
              {loading && (
                <div className="flex justify-center">
                  <div className="loader" />
                </div>
              )}
            </div>

            <div className="flex items-center p-3 bg-[#1a1a2e] rounded-b-md">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here..."
                className="flex-1 p-2 bg-[#16213e] text-white rounded-md border border-[#00b4d8]"
                rows={2}
              />
              <button
                onClick={handleSend}
                className="bg-gradient-to-r from-[#00b4d8] to-[#9b5de5] text-white px-4 py-5 rounded-md ml-2 hover:bg-[#0489b1]"
              >
                Send
              </button>
            </div>
            <div className="flex justify-between">
              <div className="text-gray-400 text-sm mt-2 ml-3">
                Press Enter to send, press Shift + Enter to enter a new line.
              </div>
              <button
                onClick={handleSave}
                className="p-2 text-white bg-[#00b4d8] hover:bg-[#0489b1] rounded-lg transition-all duration-300"
                style={{ marginRight: "16px" }}
              >
                Save
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Copywriter;
