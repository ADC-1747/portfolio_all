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

    // --- GENERAL & IDENTITY ---
    if (q.includes("who are you") || q.includes("tell me about yourself") || q.includes("background")) {
      return "I'm Ayush, an AI/ML Engineer, Full-Stack Engineer, and Quantitative Research Consultant with over 2 years of experience. I specialize in combining statistical rigor with high-performance engineering, working across AI/ML, Quant Finance, and Scalable Systems. Currently, I'm a Project Associate at IIT Madras (DS & AI) and a Quant Research Consultant at WorldQuant.";
    }

    if (q.includes("career") || q.includes("goal") || q.includes("objective")) {
      return "My objective is to bridge the gap between mathematical concepts and production-level execution. I aim to build intelligent systems that can model complex market dynamics or process massive-scale biological data, always keeping performance and scalability at the forefront.";
    }

    // --- AI/ML EXPERTISE ---
    if (q.includes("skills") || q.includes("expertise") || q.includes("tech stack")) {
      return "My core expertise lies in Large Language Models (LLMs), Computer Vision, and Quantitative Finance. My stack includes Python (PyTorch, TensorFlow, JAX), RAG frameworks (LangChain, Pinecone), and high-performance backend tools like Django, FastAPI, and Kubernetes. For frontends, I primarily use Next.js, React, and Angular.";
    }

    if (q.includes("llm") || q.includes("alpha generation") || q.includes("rag")) {
      return "I've designed fully automated pipelines for alpha generation using LLMs. This involved fine-tuning models via LoRA to extract sentiment from financial news. I've also built Graph-RAG based search engines for the DHARANI brain atlas, leveraging Neo4j and OpenAI API for context-aware discovery.";
    }

    // --- QUANT & FINANCE ---
    if (q.includes("quant") || q.includes("trading") || q.includes("worldquant") || q.includes("alpha")) {
      return "At WorldQuant, I serve as a Quant Research Consultant, focusing on alpha factor modeling and signal validation. I use statistical and machine learning techniques to develop trading signals that are robust across market conditions. I've also worked on high-frequency market dynamics, specifically L1/L2 Order Book prediction using LSTMs.";
    }

    if (q.includes("order book") || q.includes("lob") || q.includes("lstm") || q.includes("market microstructure") || q.includes("order book models")) {
      return "I developed LSTM-based models for L1 and L2 level Order Book prediction. This involves processing gigabytes of tick data to capture market microstructure signals, achieving microsecond-level prediction latency for price movements and spread changes.";
    }

    if (q.includes("stock price predictor") || q.includes("prediction tool") || q.includes("stock predictor tech")) {
      return "I built an LSTM-based stock price movement prediction tool that engineered temporal data pipelines for OHLCV data. It includes an interactive dashboard for backtesting and has achieved ~92% directional accuracy on major indices.";
    }

    // --- FULL-STACK & SYSTEMS ---
    if (q.includes("project associate") || q.includes("dept. of data science") || q.includes("alpha generation pipelines")) {
      return "As a Project Associate in the Dept. of Data Science and AI at IIT Madras (Jan 2025 — Present), I design and build high-precision AI pipelines. My work includes developing LLM-based alpha generation systems, fine-tuning models via LoRA, and training neural networks for sales forecasting where I successfully reduced MAPE from 16% to 2%.";
    }

    if (q.includes("full stack developer") || q.includes("dharani") || q.includes("brain centre") || q.includes("topojson migration")) {
      return "As a Full Stack Developer at the Sudha Gopalakrishnan Brain Centre, IIT Madras (Jul 2024 — Dec 2024), I architected scalable systems for the DHARANI brain portal. I built production-ready internal platforms, optimized backends for real-time visualization, and managed complex data migrations including TopoJSON processing for high-resolution brain atlases.";
    }

    if (q.includes("iit madras") || q.includes("work at iit madras")) {
      return "At IIT Madras, I've held two distinct roles: currently as a Project Associate focusing on AI/ML pipelines in the Dept. of Data Science and AI, and previously as a Full Stack Developer at the Sudha Gopalakrishnan Brain Centre building the DHARANI platform.";
    }

    if (q.includes("store platform") || q.includes("kubernetes") || q.includes("helm") || q.includes("provisioning") || q.includes("k8s store platform")) {
      return "I developed a 'Store Provisioning Platform' that allows one-click deployment of Medusa.js and WooCommerce stores on Kubernetes. It uses Helm charts for environment consistency and supports auto-scaling based on traffic, designed for both production and development workflows.";
    }

    if (q.includes("style transfer") || q.includes("cv") || q.includes("computer vision") || q.includes("style transfer fix")) {
      return "I worked on Neural Style Transfer using pre-trained VGG-19 models. I optimized style-loss calculations and ported models to a web-based inference engine, enabling artistic filters with under 5-second processing times.";
    }

    // --- ACHIEVEMENTS & METRICS ---
    if (q.includes("mape") || q.includes("sales forecasting") || q.includes("forecast") || q.includes("mape reduction details")) {
      return "In my sales forecasting project at IIT Madras, I trained neural networks that reduced Mean Absolute Percentage Error (MAPE) from 16% to just 2%. I achieved this by handling seasonality and holiday effects using hybrid LSTM-CNN architectures.";
    }

    if (q.includes("metrics") || q.includes("performance") || q.includes("experience")) {
      return "I have over 2 years of experience in the field, with a track record of high-impact results, such as reducing MAPE by 87.5% in forecasting tasks. I've been ranked in the top 2% of my cohort for quantitative fitness and have processed gigabytes of live market and biological data.";
    }

    // --- EDUCATION ---
    if (q.includes("education") || q.includes("college") || q.includes("university") || q.includes("degree") || q.includes("study") || q.includes("graduat")) {
      return "I have a dual undergraduate background. I completed my B.Tech in Electronics and Telecommunication Engineering from Government College of Engineering, Nagpur (2020-2024). Simultaneously, I am pursuing a B.S. in Data Science from IIT Madras, which I started in 2021. This unique combination allows me to bridge the gap between hardware/electronics and advanced data-driven engineering.";
    }

    if (q.includes("iitm") || q.includes("iit madras bs") || q.includes("data science degree")) {
      return "I am currently pursuing a B.S. in Data Science from IIT Madras (started 2021). This program has provided me with a strong foundation in statistics, machine learning, and data engineering, which I apply directly in my work at the IITM Dept. of Data Science & AI.";
    }

    if (q.includes("gcoe") || q.includes("nagpur") || q.includes("electronics") || q.includes("telecommunication")) {
      return "I hold a B.Tech in Electronics and Telecommunication Engineering from the Government College of Engineering, Nagpur (Class of 2024). My engineering background gives me a deep understanding of signal processing and systems, which complements my AI and Quant research work.";
    }

    // --- DEFAULT ---
    return "That's an interesting question! I can provide specific details about my work in Quant Research, AI/ML (like LLMs and RAG), or my Full-Stack systems projects like the DHARANI brain portal and my K8s-based store platform. What would you like to dive into first?";
  };

  const promptCategories = [
    {
      name: "Experience",
      prompts: [
        "Tell me about yourself.",
        "Your core skills?",
        "Work at IIT Madras?",
        "WorldQuant role?"
      ]
    },
    {
      name: "AI/ML",
      prompts: [
        "DHARANI Graph-RAG?",
        "LLMs for Alpha Gen?",
        "MAPE reduction details?",
        "Style Transfer fix?"
      ]
    },
    {
      name: "Quant",
      prompts: [
        "Quant thesis?",
        "Order Book models?",
        "Stock predictor tech?",
        "Market alpha stats?"
      ]
    },
    {
      name: "Education",
      prompts: [
        "Your education info?",
        "Dual UG background?",
        "B.S. in Data Science?",
        "B.Tech in Electronics?"
      ]
    },
    {
      name: "Projects",
      prompts: [
        "K8s Store Platform?",
        "DHARANI Backend?",
        "TopoJSON migration?",
        "Tech stack details?"
      ]
    }
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-black p-4 pt-20">
      <div className="flex flex-col w-full max-w-2xl h-[85vh] bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
        {/* Header */}
        <div className="p-5 bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-zinc-50 dark:text-zinc-950 font-bold">
              A
            </div>
            <div>
              <div className="font-bold text-lg leading-tight">Ayush's Assistant</div>
              <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                SYSTEM_ONLINE
              </div>
            </div>
          </div>
          <button
            onClick={() => setMessages([])}
            className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors"
            title="Clear Chat"
          >
            <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        {/* Chat area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 flex flex-col no-scrollbar">
          {messages.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-start py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">Portfolio Assistant</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
                  Ask about my projects, technical skills, or quant research experience.
                </p>
              </div>

              <div className="w-full space-y-6">
                {promptCategories.map((category, catIdx) => (
                  <div key={catIdx} className="space-y-3">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 px-1">
                      {category.name}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {category.prompts.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(prompt)}
                          className="p-3 text-left text-[11px] font-medium bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-all text-zinc-700 dark:text-zinc-300 shadow-sm hover:shadow-md"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[85%] p-4 rounded-2xl break-words shadow-sm transform transition duration-300 ${msg.sender === 'user'
                ? 'bg-zinc-900 text-zinc-50 self-end dark:bg-zinc-100 dark:text-zinc-950 rounded-tr-none translate-x-0'
                : 'bg-zinc-100 text-zinc-900 self-start dark:bg-zinc-800 dark:text-zinc-100 rounded-tl-none'
                }`}
            >
              <div className="text-[10px] font-bold mb-1 opacity-50 uppercase tracking-tight">
                {msg.sender === 'user' ? 'User' : 'Ayush'}
              </div>
              <div className="text-sm leading-relaxed">
                {msg.sender === 'ai' && idx === messages.length - 1 ? (
                  <StreamingText
                    commands={[msg.text]}
                    loop={false}
                    showPrefix={false}
                    typingSpeed={15}
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
            <div className="max-w-[50%] p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 self-start rounded-tl-none flex gap-2 items-center">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Thinking</span>
            </div>
          )}

          <div ref={chatEndRef}></div>
        </div>

        {/* Suggestion Bubbles (when chat is active) */}
        {messages.length > 0 && (
          <div className="px-5 py-3 flex gap-2 overflow-x-auto no-scrollbar border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50">
            {promptCategories.flatMap(c => c.prompts).slice(0, 8).map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-4 py-2 text-[10px] font-medium bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full hover:border-zinc-900 dark:hover:border-zinc-100 transition-all text-zinc-600 dark:text-zinc-400 shadow-sm"
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
