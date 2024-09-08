"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { StarsBackground } from '@/components/ui/stars-background';
import { ShootingStars } from '@/components/ui/shooting-stars';
import { jsPDF } from 'jspdf';

const SidebarItem = ({ label, icon }: { label: string; icon: JSX.Element }) => (
  <div className="flex items-center px-4 py-2 space-x-2 hover:bg-gradient-to-r from-[#00b4d8] to-[#9b5de5] text-white rounded-md cursor-pointer transition-all duration-300 whitespace-nowrap z-10">
    <div className="flex items-center justify-center w-6 h-12">{icon}</div>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const ChatMessage = ({
  text,
  from,
  onCopy,
}: {
  text: string | JSX.Element;
  from: 'user' | 'ai';
  onCopy?: () => void;
}) => (
  <div
    className={`mb-4 ${from === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
  >
    <div
      className={`px-4 py-2 rounded-lg ${from === 'user' ? 'bg-[#00b4d8] text-white' : 'bg-[#16213e] text-white'} ${
        from === 'user' ? 'ml-auto' : 'mr-auto'
      }`}
      style={{
        padding: '10px',
        maxWidth: from === 'user' ? '70%' : '80%',
      }}
    >
      {text}
      {from === 'ai' && (
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
    { text: string | JSX.Element; from: 'user' | 'ai' }[]
  >([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [bannerTitle, setBannerTitle] = useState('Welcome to AI Copywriter');
  const [type, setType] = useState('Email Ad'); // Initialize with default value
  const router = useRouter();
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle client-side logic here
    const query = new URLSearchParams(window.location.search);
    setType(query.get("type") || "Email Ad");

    setMessages([
      {
        text: 'Hello! My name is Nova 🤖! I\'m here to help you generate the perfect copy! Let\'s begin?',
        from: 'ai',
      },
    ]);
    setBannerTitle('Generating Copy for Your Request');
  }, []);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    // Add user's message to the chat
    setMessages(prevMessages => [
      ...prevMessages,
      { text: input, from: 'user' }
    ]);

    setLoading(true);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: input, // User input
          tone: 'Formal', // Example tone, adjust as needed
          format: 'email', // Example format, adjust as needed
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log('Response data:', data); // Log the entire response

      // Assuming the response format contains a "choices" array
      const generatedText = data.choices && data.choices[0] ? data.choices[0].text : 'No response text found';

      // Add AI's response to the chat
      setMessages(prevMessages => [
        ...prevMessages,
        { text: generatedText, from: 'ai' }
      ]);

    } catch (error) {
      console.error('Error:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { text: 'Sorry, something went wrong. Please try again.', from: 'ai' }
      ]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  const handleCopy = (text: string | JSX.Element) => {
    const textToCopy = typeof text === 'string' ? text : text.toString();
    navigator.clipboard.writeText(textToCopy);
    alert('Text copied to clipboard!');
  };

  const handleSavePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 10;
    let yOffset = 20;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);

    const filteredMessages = messages.slice(1);

    filteredMessages.forEach((msg) => {
      const author = msg.from === 'user' ? 'You' : 'Nova';
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

    doc.save('generated-copy.pdf');
  };

  return (
    <div className="relative h-screen overflow-hidden overflow-y-auto">
      <StarsBackground className="absolute inset-0 z-1" />
      <ShootingStars className="absolute inset-0 z-1" />
      <div className="flex h-full">
        <aside className="w-60 bg-[#1a1a2e] p-4 shadow-lg z-20">
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
            <SidebarItem label="Create Custom Copy" icon={<svg />} />
            <SidebarItem label="Browse Templates" icon={<svg />} />
            <SidebarItem label="Previous Copies" icon={<svg />} />
            <SidebarItem label="Settings" icon={<svg />} />
          </div>
          <div className="m-5 mt-10">
            <button
              onClick={() => router.push('/dashboard')}
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
              style={{ maxHeight: 'calc(100vh - 200px)' }}
            >
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  text={message.text}
                  from={message.from}
                  onCopy={() => handleCopy(typeof message.text === 'string' ? message.text : message.text.toString())}
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
            <div className="text-gray-400 text-sm mt-2">
              Press Enter to send, press Shift + Enter to enter a new line.
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Copywriter;
