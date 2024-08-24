// app/components/Footer.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    alert("Coming soon");
  };

  return (
    <footer
      id="footer"
      style={{ backgroundColor: "#1a1b20" }}
      className="footer w-full footer-center bg-base-200 text-base-content rounded p-10"
    >
      <div className="flex justify-center">
      <Image src="/NovaCopy_white_transparent.png" alt="NovaCopy Logo" width={90} height={90} />
      </div>
      <div className="container mx-auto">
        <ul className="flex justify-center space-x-4 my-4">
          <li>
            <Link href="https://www.linkedin.com" legacyBehavior>
              <a
                onClick={handleClick}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-300 transition"
                title="LinkedIn"
              >
                <i className="fab fa-linkedin fa-2x"></i>
                <span className="sr-only">LinkedIn</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="https://www.instagram.com" legacyBehavior>
              <a
                onClick={handleClick}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-300 transition"
                title="Instagram"
              >
                <i className="fab fa-instagram fa-2x"></i>
                <span className="sr-only">Instagram</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="https://www.facebook.com" legacyBehavior>
              <a
                onClick={handleClick}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-300 transition"
                title="Facebook"
              >
                <i className="fab fa-facebook fa-2x"></i>
                <span className="sr-only">Facebook</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="mailto:spongheen@gmail.com" legacyBehavior>
              <a
                className="text-white hover:text-pink-300 transition"
                title="Email"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-envelope fa-2x"></i>
                <span className="sr-only">Email</span>
              </a>
            </Link>
          </li>
        </ul>
        <ul className="flex justify-center text-sm text-zinc-200">
          <li>&copy; NovaCopy AI 2024</li>
        </ul>
      </div>
    </footer>
  );
}
