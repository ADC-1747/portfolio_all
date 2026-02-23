"use client";

import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import StreamingText from '../components/StreamingText';

function ChatInterface() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const queryHandled = useRef(false);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (customInput?: string) => {
    const textToSend = customInput || input;
    if (!textToSend.trim()) return;

    const userMessage = { sender: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    if (!customInput) setInput('');

    // Show typing indicator
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage = {
        sender: 'ai',
        text: getHardcodedResponse(textToSend)
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  useEffect(() => {
    const query = searchParams.get('q');
    if (query && !queryHandled.current) {
      handleSend(query);
      queryHandled.current = true;
      // Clear query from URL without refreshing
      router.replace('/aiml', { scroll: false });
    }
  }, [searchParams, router]);

  const examplePrompts = [
    "Tell me about your core AI/ML skills.",
    "Details on the sales forecasting project?",
    "How did you use LLMs for alpha generation?",
    "Experience with Order Book prediction?"
  ];

  const getHardcodedResponse = (query: string) => {
    const q = query.toLowerCase();

    if (q.includes("skills") || q.includes("expertise")) {
      return "I specialize in Large Language Models (LLMs), Computer Vision, and Quantitative Finance. My tech stack includes Python (PyTorch, TensorFlow, JAX), Scikit-Learn, and various RAG frameworks. I also have deep experience in building data pipelines using Apache Spark and Kafka.";
    }

    if (q.includes("sales forecasting") || q.includes("mape")) {
      return "In my sales forecasting project at IIT Madras, I trained Neural Networks that reduced the Mean Absolute Percentage Error (MAPE) from 16% to just 2%. I focused on handling seasonality and holiday effects using hybrid LSTM-CNN architectures.";
    }

    if (q.includes("llm") || q.includes("alpha generation")) {
      return "I've designed fully automated pipelines for alpha generation using LLMs. This involved fine-tuning models via LoRA to extract sentiment and entity relationships from financial news, which then fueled quantitative trading signals.";
    }

    if (q.includes("order book") || q.includes("lstm")) {
      return "I developed LSTM-based models for L1 and L2 level Order Book prediction. These models capture high-frequency market dynamics to predict price movement and spread changes over short time horizons.";
    }

    if (q.includes("project associate") || q.includes("department of data science and ai")) {
      return "As a Project Associate at IIT Madras in the Department of Data Science and AI, I work on DHARANI. My responsibilities include designing pipelines for alpha generation using LLMs, fine-tuning models with LoRA, and developing neural networks for high-precision sales forecasting (reducing MAPE from 16% to 2%). I also work on high-frequency market data like L1 and L2 Order Book prediction using LSTMs.";
    }

    if (q.includes("full stack") || q.includes("dharani")) {
      return "As a Full Stack Developer at the Sudha Gopalakrishnan Brain Centre, IIT Madras, I've been a key contributor to the DHARANI project. I built scalable systems and internal platforms, including AI pipelines that are now used in production. My work focused on creating robust backend architectures and responsive, data-driven frontends to handle complex brain imaging data.";
    }

    if (q.includes("quant research") || q.includes("worldquant")) {
      return "At WorldQuant, I serve as a Quant Research Consultant. My work involves high-level alpha research, factor modeling, and signal validation. I use various statistical and machine learning techniques to develop and backtest trading signals, ensuring they are robust across different market conditions.";
    }

    if (q.includes("experience") || q.includes("work")) {
      return "I'm currently a Project Associate at IIT Madras (DS & AI Dept) working on DHARANI. I've also been a Quant Research Consultant at WorldQuant and a Full Stack Developer at the Sudha Gopalakrishnan Brain Centre.";
    }

    return "That's a great question! I'm Ayush, and I'm passionate about building scalable AI systems. Whether it's fine-tuning LLMs, predicting market movements, or developing full-stack platforms, I love tackling complex technical challenges.";
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-black p-4">
      <div className="flex flex-col w-full max-w-xl h-[80vh] bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
        {/* Header */}
        <div className="p-5 bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 text-center font-bold text-2xl border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
          AI/ML Portfolio Chat
        </div>

        {/* Chat area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 flex flex-col">
          {messages.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Welcome to my AI/ML Chat!</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Ask me anything about my projects and expertise.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {examplePrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="p-4 text-left text-xs font-medium bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors text-zinc-700 dark:text-zinc-300 shadow-sm"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[85%] p-4 rounded-2xl break-words shadow-sm transform transition duration-200 ${msg.sender === 'user'
                ? 'bg-zinc-900 text-zinc-50 self-end hover:scale-105 dark:bg-zinc-100 dark:text-zinc-950'
                : 'bg-zinc-100 text-zinc-900 self-start hover:scale-105 dark:bg-zinc-800 dark:text-zinc-100'
                }`}
            >
              <strong>{msg.sender === 'user' ? 'You' : 'Ayush'}:</strong>{' '}
              <div className="inline">
                {msg.sender === 'ai' && idx === messages.length - 1 ? (
                  <StreamingText
                    commands={[msg.text]}
                    loop={false}
                    showPrefix={false}
                    typingSpeed={20}
                    className="mt-1"
                  />
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="max-w-[50%] p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 self-start animate-pulse">
              Ayush is thinking...
            </div>
          )}

          <div ref={chatEndRef}></div>
        </div>

        {/* Example prompts (as tiny suggestions when chat is not empty) */}
        {messages.length > 0 && (
          <div className="px-5 py-2 flex gap-2 overflow-x-auto no-scrollbar border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50">
            {examplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-3 py-1.5 text-[10px] h-fit font-medium bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors text-zinc-600 dark:text-zinc-400"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input area */}
        <div className="p-5 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 flex gap-3">
          <input
            className="flex-1 p-4 rounded-xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 transition border border-zinc-200 dark:border-zinc-800"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about AI/ML..."
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            className="px-6 py-4 bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-white rounded-xl font-semibold shadow-lg transition transform hover:-translate-y-0.5 active:scale-95"
            onClick={() => handleSend()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Aiml() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-black p-4">
        <div className="text-zinc-500 animate-pulse">Loading Chat...</div>
      </div>
    }>
      <ChatInterface />
    </Suspense>
  );
}
