'use client'

import { useState } from "react";
import Sidebar from "../../components/Sidebar";

export default function SignedInContent() {
  const [userInput, setUserInput] = useState("");
  const [businesses, setBusinesses] = useState(["Business 1"]); // 登録ビジネスのリスト

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(event.target.value);
  };

  const handleAddBusiness = () => {
    const newBusiness = prompt("新しいビジネスの名前を入力してください:");
    if (newBusiness) {
      setBusinesses([...businesses, newBusiness]);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden flex flex-col">
      <div className="flex flex-grow">
        {/* Side bar */}
        <Sidebar businesses={businesses} handleAddBusiness={handleAddBusiness} />

        {/* User Input Field */}
        <section className="w-1/2 p-4">
          <h2 className="text-xl font-semibold">Prompt</h2>
          <textarea
            className="w-full h-64 p-2 border border-gray-300 rounded"
            placeholder="Please enter here..."
            value={userInput}
            onChange={handleInputChange}
          ></textarea>

          <h2 className="text-xl font-semibold">Tone</h2>
          <textarea
            className="w-full h-30 p-2 border border-gray-300 rounded"
            placeholder="Please enter here..."
          ></textarea>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Generate
          </button>
        </section>

        {/* AI Response Field */}
        <section className="w-1/2 bg-gray-500 p-4">
          <h2 className="text-xl font-semibold">AI Response</h2>
          <div className="h-64 p-2 border border-gray-300 rounded"></div>
        </section>
      </div>
    </main>
  );
}
