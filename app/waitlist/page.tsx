"use client";
import { useState, useEffect } from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import SubmitButton from "@/components/ui/SubmitButton";
import NavbarDemo from "@/components/Header";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Waitlist() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveFormData = useMutation(api.formData.saveFormData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
    };

    try {
      // Call the mutation to save form data
      await saveFormData(formData);
      console.log(formData, "Form data saved successfully");
      setSubmitted(true);
      setEmail("");
      setFirstName("");
      setLastName("");
      setError(null); // Clear error if submission is successful
    } catch (error) {
      console.error("Error saving form data:", error);
      setError("Email already exists. Please use a different email address."); // Set error message
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* Background Effects */}
      <StarsBackground />
      <ShootingStars />
      <div className="z-10 w-full max-w-5xl text-center p-4 md:p-24 mt-24 md:mt-32">
        <NavbarDemo />
        <h1 className="text-4xl md:text-5xl font-bold mb-12 mt-12">Waitlist</h1>

        {!submitted ? (
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform scale-75 top-3 -translate-y-6 origin-[0] left-0 peer-focus:font-medium peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="floating_first_name"
                  id="floating_first_name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_first_name"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform scale-75 top-3 -translate-y-6 origin-[0] left-0 peer-focus:font-medium peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  First name
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="floating_last_name"
                  id="floating_last_name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_last_name"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform scale-75 top-3 -translate-y-6 origin-[0] left-0 peer-focus:font-medium peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Last name
                </label>
              </div>
            </div>

            <SubmitButton />
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          </form>
        ) : (
          <>
            <div className="text-2xl">Thank you for joining the waitlist!</div>
            <div className="text-2xl">We will keep you posted!</div>
          </>
        )}
      </div>
    </main>
  );
}
