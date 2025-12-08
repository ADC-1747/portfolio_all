'use client';

import { useState, useRef, useEffect } from 'react';

export default function Aiml() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Show typing indicator
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage = {
        sender: 'ai',
        text: `You asked: "${input}". I'm Ayush, an AI/ML engineer. Here's some info about my skills, projects, and experiences in AI/ML.`
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4">
      <div className="flex flex-col w-full max-w-xl h-[80vh] bg-gray-850 rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="p-5 bg-gray-900 text-white text-center font-bold text-2xl border-b border-gray-700 shadow-sm">
          AI/ML Portfolio Chat
        </div>

        {/* Chat area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 flex flex-col">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[75%] p-4 rounded-2xl break-words shadow-sm transform transition duration-200 ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white self-end hover:scale-105'
                  : 'bg-gray-700 text-gray-100 self-start hover:scale-105'
              }`}
            >
              <strong>{msg.sender === 'user' ? 'You' : 'Ayush'}:</strong> {msg.text}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="max-w-[50%] p-3 rounded-2xl bg-gray-700 text-gray-100 self-start animate-pulse">
              Ayush is typing...
            </div>
          )}

          <div ref={chatEndRef}></div>
        </div>

        {/* Input area */}
        <div className="p-5 bg-gray-900 border-t border-gray-700 flex gap-3">
          <input
            className="flex-1 p-4 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about AI/ML..."
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            className="px-6 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold shadow-lg transition transform hover:-translate-y-0.5"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
