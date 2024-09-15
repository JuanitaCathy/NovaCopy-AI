"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  text: string | JSX.Element;
  from: "user" | "ai";
  onCopy?: () => void;
}) => (
  <div
    className={`mb-4 ${
      from === "user" ? "flex justify-end" : "flex justify-start"
    }`}
  >
    <div
      className={`px-4 py-2 rounded-lg ${
        from === "user" ? "bg-[#00b4d8] text-white" : "bg-[#16213e] text-white"
      } ${from === "user" ? "ml-auto" : "mr-auto"}`}
      style={{
        padding: "10px",
        maxWidth: from === "user" ? "70%" : "80%",
      }}
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
    { text: string | JSX.Element; from: "user" | "ai" }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<string[]>([
    "What's your product or service?",
    "What's your brand name and product name?",
    "Are there any sales, offers, or pain points you'd like to focus on?",
    "Who is the copy targeted towards? Anything else to keep in mind?",
  ]); // List of questions to ask
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<string[]>([]); // Store user responses here

  const router = useRouter();
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // Initial greeting and the first question
  useEffect(() => {
    setMessages([
      {
        text: "Hello! My name is Nova 🤖! I'm here to help you generate the perfect copy! Let's begin?",
        from: "ai",
      },
      {
        text: questions[currentQuestionIndex], // Ask the first question
        from: "ai",
      },
    ]);
  }, []);

  // Scroll chat container to the bottom on every message update
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Append user's message to messages array
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, from: "user" },
    ]);

    setUserResponses([...userResponses, input]); // Store the user's response
    setInput(""); // Clear input field

    // Show "Nova is typing" animation after user response
    setLoading(true);

    // Move to the next question or generate the copy
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: questions[currentQuestionIndex + 1], from: "ai" },
        ]);
        setLoading(false);
      }, 1500); // Delay to simulate "typing"
    } else {
      // If all questions are answered, generate the copy
      setTimeout(() => {
        generateText();
      }, 1500); // Delay to simulate "typing"
    }
  };

  const generateText = async () => {
    const prompt = `
      The user has a product/service: ${userResponses[0]}.
      Brand name: ${userResponses[1]}.
      Key points like offers or pain points to focus on: ${userResponses[2]}.
      Target audience and anything else to keep in mind: ${userResponses[3]}.
    `;

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          tone: "Formal",
          format: "email",
        }),
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();
      const generatedText = data.choices?.[0]?.text || "No response text found";

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: generatedText, from: "ai" },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Sorry, something went wrong. Please try again.", from: "ai" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        text: "Hello! My name is Nova 🤖! I'm here to help you generate the perfect copy! Let's begin?",
        from: "ai",
      },
      {
        text: questions[0], // Ask the first question again
        from: "ai",
      },
    ]);
    setCurrentQuestionIndex(0);
    setUserResponses([]);
    setInput("");
  };

  const handleSavePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 10;
    let yOffset = 20;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    messages.forEach((msg) => {
      const author = msg.from === "user" ? "You" : "Nova";
      const fullText = `${author}: ${msg.text}`;

      const textLines = doc.splitTextToSize(fullText, pageWidth - 2 * margin);

      textLines.forEach((line: string | string[]) => {
        if (yOffset + 10 > pageHeight - 10) {
          doc.addPage();
          yOffset = 20;
        }
        doc.text(line, margin, yOffset);
        yOffset += 10;
      });

      yOffset += 10;
    });

    doc.save("generated-copy.pdf");
  };

  return (
    <div className="relative h-screen overflow-hidden overflow-y-auto">
      <div className="flex h-full">
        <aside className="fixed top-0 left-0 w-60 h-full bg-[#1a1a2e] p-4 shadow-lg z-20">
          <div className="flex items-center mb-5">
            <Image
              src="/NovaCopy_white.png"
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="ml-3 mt-5 text-white">
              <h2 className="text-xl font-bold">NovaCopy AI</h2>
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
        </aside>

        <div className="flex-1 ml-60 p-8 flex flex-col space-y-8 text-white z-20">
          <header className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">AI Copywriter</h1>
            <div className="flex items-center">
              <button
                onClick={handleSavePDF}
                className="bg-[#00b4d8] text-white px-4 py-2 rounded-md hover:bg-[#0489b1] transition-all duration-300" > Save as PDF </button> </div> 
          </header>
          <section className="flex flex-col flex-1 bg-[#1a1a2e] p-3 rounded-md mb-2">
        <div
          className="flex-1 overflow-y-auto p-3"
          ref={messageContainerRef}
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              text={msg.text}
              from={msg.from}
              onCopy={() => navigator.clipboard.writeText(String(msg.text))}
            />
          ))}
        </div>

        {loading && (
              <div className="animate-pulse text-center text-gray-400">
                <p>Nova is typing...</p>
              </div>
        )}

        <div className="flex items-center">
          <input
            type="text"
            className="flex-1 bg-[#1a1a2e] border border-[#00b4d8] px-4 py-2 rounded-md outline-none"
            placeholder="Type your response..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <button
            onClick={handleSend}
            className="bg-[#00b4d8] text-white px-4 py-2 ml-2 rounded-md hover:bg-[#0489b1] transition-all duration-300"
          >
            Send
          </button>
          <button
            onClick={handleClear}
            className="bg-[#ff6b6b] text-white px-4 py-2 ml-2 rounded-md hover:bg-[#e63946] transition-all duration-300"
          >
            Clear
          </button>
        </div>
      </section>
    </div>
  </div>
</div>
); };

export default Copywriter;

