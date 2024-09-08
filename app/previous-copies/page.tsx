"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";

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

const PreviousCopies: React.FC = () => {
  const [copies, setCopies] = useState<
    { title: string; messages: { text: string; from: "user" | "ai" }[] }[]
  >([]);
  const [selectedCopy, setSelectedCopy] = useState<{
    title: string;
    messages: { text: string; from: "user" | "ai" }[];
  } | null>(null);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const storedCopies = JSON.parse(localStorage.getItem("chatCopies") || "[]");
    setCopies(storedCopies);
  }, []);

  const handleItemClick = (copy: {
    title: string;
    messages: { text: string; from: "user" | "ai" }[];
  }) => {
    if (isEditing === null) {
      setSelectedCopy(copy);
    }
  };

  const handleDelete = (index: number) => {
    const updatedCopies = copies.filter((_, i) => i !== index);
    setCopies(updatedCopies);
    localStorage.setItem("chatCopies", JSON.stringify(updatedCopies));
  };

  const handleRename = (index: number) => {
    const updatedCopies = [...copies];
    updatedCopies[index].title = newTitle;
    setCopies(updatedCopies);
    localStorage.setItem("chatCopies", JSON.stringify(updatedCopies));
    setIsEditing(null);
  };

  const handleRenameStart = (index: number, currentTitle: string) => {
    setIsEditing(index);
    setNewTitle(currentTitle);
  };

  const handleRenameCancel = () => {
    setIsEditing(null);
    setNewTitle("");
  };

  return (
    <div className="relative h-screen overflow-hidden overflow-y-auto">
      {" "}
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
            <h1 className="text-4xl font-bold">Previous Copies</h1>
          </header>

          <section className="flex flex-col flex-1 bg-[#1a1a2e] p-3 rounded-md mb-2">
            {selectedCopy ? (
              <>
                <div className="p-3 rounded-t-md">
                  <h2 className="text-xl font-bold text-white">
                    {selectedCopy.title}
                  </h2>
                </div>
                <div
                  className="flex-1 overflow-y-auto p-3"
                  style={{ maxHeight: "calc(100vh - 200px)" }}
                >
                  {selectedCopy.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-4 ${
                        message.from === "user"
                          ? "flex justify-end"
                          : "flex justify-start"
                      }`}
                    >
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          message.from === "user"
                            ? "bg-[#00b4d8] text-white"
                            : "bg-[#16213e] text-white"
                        } ${message.from === "user" ? "ml-auto" : "mr-auto"}`}
                        style={{
                          padding: "10px",
                          maxWidth: message.from === "user" ? "70%" : "80%",
                        }}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedCopy(null)}
                  className="bg-gradient-to-r from-[#00b4d8] to-[#9b5de5] text-white px-4 py-2 rounded-md hover:bg-[#0489b1] transition-all duration-300"
                >
                  Back to List
                </button>
              </>
            ) : (
              <ul className="space-y-4">
                {copies.map((copy, index) => (
                  <li
                    key={index}
                    className="p-4 bg-[#1a1a2e] rounded-md cursor-pointer hover:bg-gradient-to-r from-[#00b4d8] to-[#9b5de5] relative"
                    onClick={() => handleItemClick(copy)}
                  >
                    {isEditing === index ? (
                      <>
                        <input
                          type="text"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="p-2 rounded bg-[#16213e] text-white w-4/5"
                        />
                        <div className="mt-2 space-x-2">
                          <button
                            onClick={() => handleRename(index)}
                            className="bg-[#018749] text-white px-2 py-1 rounded-md hover:bg-[#1B4D3E] transition-all duration-300"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleRenameCancel}
                            className="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-gray-600 transition-all duration-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-lg font-semibold">{copy.title}</h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRenameStart(index, copy.title);
                          }}
                          className="absolute top-2 right-20 bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 transition-all duration-300"
                        >
                          Rename
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(index);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-all duration-300"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default PreviousCopies;
