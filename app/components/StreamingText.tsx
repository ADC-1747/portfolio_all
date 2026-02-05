
"use client";

import { useEffect, useState } from "react";

type StreamingCLIProps = {
  commands: string[];        // ["npm run build", "pnpm dev"]
  typingSpeed?: number;      // ms per character
  deletingSpeed?: number;    // ms per character
  pauseAfterType?: number;   // ms before deleting
  loop?: boolean;
  className?: string;
};

export default function StreamingText({
  commands,
  typingSpeed = 40,
  deletingSpeed = 25,
  pauseAfterType = 1200,
  loop = true,
  className = "",
}: StreamingCLIProps) {
  const [text, setText] = useState("");
  const [cmdIndex, setCmdIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const current = commands[cmdIndex];

    if (!isDeleting) {
      // Typing
      if (text.length < current.length) {
        timeout = setTimeout(() => {
          setText(current.slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseAfterType);
      }
    } else {
      // Deleting
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(text.slice(0, -1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setCmdIndex((prev) =>
          loop ? (prev + 1) % commands.length : prev
        );
      }
    }

    return () => clearTimeout(timeout);
  }, [
    text,
    isDeleting,
    cmdIndex,
    commands,
    typingSpeed,
    deletingSpeed,
    pauseAfterType,
    loop,
  ]);

  return (
    <div
      className={`flex items-center font-mono text-sm ${className}`}
    >
      <span className="mr-1 text-zinc-500">$</span>
      <span>{text}</span>
      <span className="ml-[2px] animate-pulse">▍</span>
    </div>
  );
}
