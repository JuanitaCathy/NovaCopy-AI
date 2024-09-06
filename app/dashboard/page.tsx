'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  IconButton,
  AppBar,
  Container,
  Toolbar
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb" 
import React from "react";

export default function Dashboard() {
  const [userInput, setUserInput] = useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [message, setMessage] = useState("");

  const sendUserInput = async () => {
    if (userInput.trim() === "") return;
    setUserInput("");
    setMessage(userInput);

    const response = fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    }).then(async (res) => {
      if (!res.body) {
        throw new Error("Response body is null");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let result = "";
      return reader.read().then(function processText({ done, value }): Promise<string> {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Int8Array(), { stream: true });
        result += text;
        return reader.read().then(processText);
      });
    });
  };

  return (
            <main className="relative min-h-screen overflow-hidden flex flex-col">
                   <Toolbar disableGutters className="bg-[#0f172a] drop-shadow-md">
                      <Link href="/">
                        <Image
                          src="/NovaCopy_white_transparent.png"
                          alt="NovaCopy Logo"
                          width={70}
                          height={70}
                          className="pl-4"
                        />
                      </Link>
                   </Toolbar>
                      <div className="flex flex-grow">
                        {/* Side bar */}
                        <section className="w-1/6 bg-gray-800 p-4">
                          {/* <div className="h-64 p-2 border border-gray-300 rounded"></div> */}
                          <div className="h-64 p-2 rounded">
                            <ul>
                              <li><Button className="text-zinc-50">Profile</Button></li>
                              <li><Button className="text-zinc-50">Create New Project</Button></li>
                              <li><Button className="text-zinc-50">My Projects</Button></li>
                              <li><Button className="text-zinc-50">Support & Feedback</Button></li>
                              <li><Button className="text-zinc-50">Home</Button></li>
                            </ul>
                          </div>
                        </section>

                        {/* User Input Field */}
                        <section className="w-1/2 p-4">
                          <h2 className="text-xl font-semibold py-2">Prompt</h2>
                          <TextField
                          className="bg-white h-64"
                            label="Type your message"
                            fullWidth
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            multiline
                            variant="outlined"
                            maxRows={12}
                          ></TextField>

                            <h2 className="text-xl font-semibold pt-8">Tone</h2>
                            <textarea
                              className="w-full h-30 p-2 border border-gray-300 rounded"
                              placeholder="Please enter here..."
                            ></textarea>
                          <Button variant="contained"
                            color="primary"
                            onClick={sendUserInput}>
                              Generate
                          </Button>
                        </section>

                        {/* AI Response Field */}
                        <section className="w-1/2 bg-gray-500 p-4">
                          <h2 className="text-xl font-semibold py-2">AI Response</h2>
                          <div className="h-64 p-2 border border-gray-300 rounded"></div>
                        </section>
                     </div>
            </main>
        
  );
}
