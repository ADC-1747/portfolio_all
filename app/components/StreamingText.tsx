
"use client";

import { useEffect, useState } from "react";

type StreamingCLIProps = {
  commands: string[];        // ["Point 1", "Point 2"]
  typingSpeed?: number;      // ms per character
  deletingSpeed?: number;    // ms per character
  pauseAfterType?: number;   // ms before deleting
  loop?: boolean;
  className?: string;
  isParagraph?: boolean;     // types all points as a single block
  showPrefix?: boolean;      // show terminal $ prefix
};

export default function StreamingText({
  commands,
  typingSpeed = 30,
  deletingSpeed = 20,
  pauseAfterType = 2000,
  loop = true,
  className = "",
  isParagraph = false,
  showPrefix = true,
}: StreamingCLIProps) {
  const [text, setText] = useState("");
  const [cmdIndex, setCmdIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // If paragraph mode, the "current" string is all commands joined by newlines with a prefix
  const fullText = isParagraph ? commands.map(cmd => `• ${cmd}`).join("\n") : commands[cmdIndex];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (text.length < fullText.length) {
        timeout = setTimeout(() => {
          setText(fullText.slice(0, text.length + 1));
        }, typingSpeed);
      } else if (loop) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseAfterType);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(text.slice(0, -1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        if (!isParagraph) {
          setCmdIndex((prev) => (prev + 1) % commands.length);
        }
      }
    }

    return () => clearTimeout(timeout);
  }, [
    text,
    isDeleting,
    cmdIndex,
    commands,
    fullText,
    typingSpeed,
    deletingSpeed,
    pauseAfterType,
    loop,
    isParagraph
  ]);

  return (
    <div
      className={`flex font-mono text-sm whitespace-pre-line ${className}`}
    >
      {showPrefix && <span className="mr-1 mt-1 text-zinc-500 shrink-0">$</span>}
      <div className="flex-1 min-h-[1.5em]">
        <span>{text}</span>
        <span className="ml-[2px] animate-pulse">▍</span>
      </div>
    </div>
  );
}
