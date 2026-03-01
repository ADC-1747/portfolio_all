'use client';

import { useState, useRef } from 'react';
import SectionContainer from '../components/SectionContainer';

export default function Portfolio() {
  const projects = [
    {
      id: 1,
      title: "DHARANI Project",
      description: "A brain atlas viewer and annotation platform, developed by Sudha Gopalakrishnan Brain Centre, IIT Madras, where I worked as a Full Stack Developer",
      disclaimer: "I served as a core developer on specific features; I do not own the entire platform.",
      url: "https://brainportal.humanbrain.in/code/2dviewer/annotation/public?data=3&region=-1&section=1291",
      tags: ["Angular", "Django", "MySQL"],
      contributions: [
        "Led the migration from GeoJSON to TopoJSON based data structure for faster rendering of large brain atlas data, using openlayers.",
        "Added tissue level and structure level view using realtime merging on region in runtime, using turf.js",
        "Added a Graph-RAG based search engine for the brain atlas data, using neo4j and openai api."
      ],
      fullStack: ["Angular", "Django", "MySQL", "Redis", "Neo4j", "OpenAI API"],
      features: [
        "Real-time brain atlas data visualization",
        "Graph-RAG based search engine for the brain atlas data",
        "Tissue level and structure level view using realtime merging on region in runtime"
      ]
    },
    {
      id: 2,
      title: "Portfolio",
      description: "My portfolio website, where I showcase my projects and skills.",
      url: "https://white-flower-06778ef00.1.azurestaticapps.net/",
      tags: ["Next.js", "TypeScript", "Tailwind"],
      contributions: [
        "Designed high-fidelity mockups in Figma for multiple themes",
        "Built responsive Next.js frontend with complex device mockups",
        "Automated CI/CD deployment pipelines using GitHub Actions"
      ],
      fullStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"],
      features: [
        "Universal light/dark mode support",
        "Interactive AI/ML chat with streaming text",
        "Dynamic project previewer with mockups"
      ]
    },
    {
      id: 3,
      title: "Trading App",
      description: "A trading app similar to a stock exchange, where users can trade stocks.",
      url: "https://github.com/ADC-1747/Trading_App",
      tags: ["Python", "React", "FastAPI", "PostgreSQL", "Redis", "Docker"],
      contributions: [
        "Designed the architecture of the trading app similar to a stock exchange",
        "Implemented real-time order matching engine",
        "Implemented concurrent order matching",
        "Implemented real-time market data fetching",
        "Implemented real-time order book using websockets and redis"
      ],
      fullStack: ["Python", "React", "FastAPI", "PostgreSQL", "Redis", "Docker"],
      features: [
        "Real-time order matching engine",
        "Concurrent order matching",
        "Real-time market data fetching",
        "Real-time order book using websockets and redis"
      ]
    },
    {
      id: 4,
      title: "Store Provisioning platform",
      description: "A platform for provisioning stores on a single click.",
      url: "https://github.com/ADC-1747/store-platform",
      tags: ["React", "Kubernetes", "Helm", "Node.js", "PostgreSQL"],
      contributions: [
        "The admin can create a store and deploy it on a single click.",
        "Supports Medusa.js and WooCommerce",
        "Full support for production and development environments with proper security",
        "Auto scaling of the stores based on the traffic"
      ],
      fullStack: ["React", "Kubernetes", "Helm", "Node.js", "PostgreSQL"],
      features: [
        "7-day hourly weather projection",
        "Historical weather trend analytics",
        "Dynamic background based on weather conditions"
      ]
    },
    {
      id: 5,
      title: "Stock Price Predictor",
      description: "LSTM-based stock price movement prediction tool",
      url: "https://example.com/stocks",
      tags: ["Python", "PyTorch", "Finance"],
      contributions: [
        "Engineered temporal data pipelines for OHLCV financial data",
        "Developed and fine-tuned LSTM neural network architectures",
        "Built an interactive dashboard for backtesting results"
      ],
      fullStack: ["Python", "PyTorch", "Pandas", "Scikit-Learn", "Streamlit"],
      features: [
        "92% directional accuracy on major indices",
        "Integrated real-time data fetching from YFinance",
        "Sharpe ratio and volatility risk assessment tools"
      ]
    },
    {
      id: 6,
      title: "AI Chatbot",
      description: "Intelligent personal assistant with streaming responses",
      url: "/aiml",
      tags: ["LLM", "Next.js", "RAG"],
      contributions: [
        "Architected a Retrieval-Augmented Generation (RAG) system",
        "Implemented streaming text animations for better UX",
        "Integrated vector database (Pinecone) for long-term memory"
      ],
      fullStack: ["OpenAI API", "LangChain", "Pinecone", "Next.js", "Vercel AI"],
      features: [
        "Near-zero latency streaming responses",
        "Context-aware project knowledge base",
        "Smart prompt auto-completion"
      ]
    },
    {
      id: 7,
      title: "Neural Style Transfer",
      description: "Artistic style transfer using pre-trained VGG-19",
      url: "https://example.com/art",
      tags: ["PyTorch", "CV", "Generative"],
      contributions: [
        "Ported pre-trained CNN models to a web-based inference engine",
        "Optimized style-loss calculations for faster processing",
        "Implemented image preprocessing pipelines with OpenCV"
      ],
      fullStack: ["PyTorch", "Flask", "OpenCV", "AWS Lambda", "React"],
      features: [
        "Style transfer under 5 seconds per image",
        "Support for user-uploaded custom style images",
        "Multiple artistic filters including Van Gogh & Picasso"
      ]
    },
    {
      id: 8,
      title: "Order Book Prediction",
      description: "High-frequency trading signal generation from LOB data",
      url: "https://example.com/quant",
      tags: ["Keras", "LOB", "Trading"],
      contributions: [
        "Processed gigabytes of L2 Limit Order Book (LOB) tick data",
        "Implemented Temporal Convolutional Networks (TCN) for HFT",
        "Designed a low-latency signal generation engine"
      ],
      fullStack: ["Keras", "TensorFlow", "Kafka", "NumPy", "Apache Spark"],
      features: [
        "Microsecond-level prediction latency",
        "Capture of market microstructure alpha signals",
        "High-fidelity backtesting with slippage modeling"
      ]
    }
  ];

  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());
  const [isInsightsExpanded, setIsInsightsExpanded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const selectProject = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsInsightsExpanded(false);
  };

  const toggleExpand = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setExpandedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const isEmbeddable = (url: string) => {
    if (!url) return false;
    if (url.startsWith('/')) return true; // Local routes
    const nonEmbeddable = ['github.com', 'gitlab.com', 'bitbucket.org', 'stackoverflow.com'];
    return !nonEmbeddable.some(domain => url.toLowerCase().includes(domain));
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const card = container.firstElementChild as HTMLElement;
      if (card) {
        const cardWidth = card.offsetWidth;
        const gap = 24; // gap-6
        const scrollAmount = cardWidth + gap;
        const { scrollLeft } = container;
        const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
        container.scrollTo({ left: scrollTo, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8 font-sans">
      <SectionContainer variant="full" className="pt-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
            My Projects
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-lg">
            Check out some of my recent work
          </p>
        </div>

        {/* Project Carousel Section */}
        <div className="relative max-w-5xl mx-auto mb-16 group">
          {/* Nav Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-[-50px] top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Previous project"
          >
            <svg className="w-5 h-5 text-zinc-600 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-[-50px] top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Next project"
          >
            <svg className="w-5 h-5 text-zinc-600 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pt-6 px-8"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              scrollPaddingLeft: '2rem',
              scrollPaddingRight: '2rem'
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => selectProject(project)}
                className={`flex-none w-[calc((100%-48px-64px)/3)] snap-start bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl ${selectedProject.id === project.id
                  ? 'ring-2 ring-zinc-900 dark:ring-zinc-100 shadow-xl scale-[1.02]'
                  : 'opacity-60 hover:opacity-100'
                  }`}
              >
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{project.title}</h3>
                <p className={`text-zinc-600 dark:text-zinc-400 text-xs mb-2 leading-relaxed ${expandedProjects.has(project.id) ? '' : 'line-clamp-2'}`}>
                  {project.description}
                </p>
                {project.description.length > 60 && (
                  <button
                    onClick={(e) => toggleExpand(e, project.id)}
                    className="text-[10px] font-bold text-zinc-900 dark:text-zinc-100 mb-4 hover:underline"
                  >
                    {expandedProjects.has(project.id) ? 'Show Less' : 'Read More'}
                  </button>
                )}
                {project.disclaimer && (
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 italic mb-4">
                    Note: {project.disclaimer}
                  </p>
                )}
                <div className="flex gap-1.5 flex-wrap">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-[10px] text-zinc-600 dark:text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Interaction Guide */}
        <div className="max-w-md mx-auto mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <div className="inline-flex flex-col items-center gap-2 p-4 bg-zinc-100/50 dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Scroll or use arrows to explore <br />
              <span className="text-zinc-900 dark:text-zinc-100 font-bold">Click a card to live preview below</span>
            </p>
            <div className="animate-bounce mt-1">
              <svg className="w-5 h-5 text-zinc-400 dark:text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Display - Laptop and Mobile */}
        <div className="mb-20">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-24">
            {/* iPhone Display - LEFT */}
            <div className="relative shrink-0" style={{ width: '310px' }}>
              <div
                className="relative bg-zinc-200 dark:bg-zinc-800 p-2.5 shadow-2xl border-4 border-zinc-300 dark:border-zinc-700"
                style={{ borderRadius: '55px' }}
              >
                <div className="relative bg-zinc-100 dark:bg-zinc-900" style={{ borderRadius: '48px', padding: '2px' }}>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-zinc-200 dark:bg-zinc-800 rounded-b-2xl z-10 border-b-2 border-zinc-300 dark:border-zinc-700"></div>
                  <div
                    className="relative overflow-hidden flex flex-col items-center justify-center p-6 text-center"
                    style={{ height: '580px', borderRadius: '45px', background: 'linear-gradient(135deg, #111, #222)' }}
                  >
                    {isEmbeddable(selectedProject.url) ? (
                      <iframe
                        src={selectedProject.url}
                        title={`${selectedProject.title} - Mobile`}
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full border-none"
                        style={{ borderRadius: '45px', display: 'block' }}
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-6 animate-in fade-in duration-700">
                        <div className="w-20 h-20 rounded-3xl bg-zinc-800 flex items-center justify-center border border-zinc-700 shadow-2xl">
                          <svg className="w-10 h-10 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-zinc-100 font-bold text-lg px-4">{selectedProject.title}</h4>
                          <p className="text-zinc-500 text-xs px-8">Repository preview limited due to security policies.</p>
                        </div>
                        <a
                          href={selectedProject.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 bg-zinc-100 text-zinc-950 rounded-full text-xs font-bold hover:bg-white transition-all shadow-lg active:scale-95"
                        >
                          Visit Project
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Laptop Display - RIGHT */}
            <div className="relative w-full max-w-4xl">
              <div className="relative bg-zinc-200 dark:bg-zinc-800 rounded-t-3xl p-3 shadow-2xl border-4 border-zinc-300 dark:border-zinc-700 border-b-0">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-6 bg-zinc-200 dark:bg-zinc-800 rounded-b-2xl z-10 border-b-4 border-zinc-300 dark:border-zinc-700 flex items-start justify-center pt-1">
                  <div className="w-20 h-1 bg-zinc-400 dark:bg-zinc-600 rounded-full"></div>
                </div>
                <div className="bg-white dark:bg-zinc-950 rounded-2xl overflow-hidden aspect-video border-2 border-zinc-300 dark:border-zinc-900 shadow-inner">
                  <div className="bg-zinc-100 dark:bg-zinc-900 px-4 py-2 flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex-1 mx-4 bg-white dark:bg-zinc-800 rounded px-3 py-1 text-[10px] text-zinc-400 truncate font-mono">
                      {selectedProject.url}
                    </div>
                    {selectedProject.disclaimer && (
                      <div className="text-[10px] text-zinc-400 italic font-medium px-2 truncate max-w-[200px]" title={selectedProject.disclaimer}>
                        {selectedProject.disclaimer}
                      </div>
                    )}
                  </div>
                  <div className="bg-white dark:bg-zinc-950 h-full relative overflow-hidden flex flex-col items-center justify-center p-12 text-center">
                    {isEmbeddable(selectedProject.url) ? (
                      <iframe
                        src={selectedProject.url}
                        className="w-full h-full border-none"
                        title={selectedProject.title}
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        style={{ display: 'block' }}
                        allowFullScreen
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-8 animate-in fade-in zoom-in-95 duration-700">
                        <div className="flex gap-4">
                          <div className="w-24 h-24 rounded-3xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center border-2 border-zinc-200 dark:border-zinc-800 shadow-xl">
                            <svg className="w-12 h-12 text-zinc-400 dark:text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="text-zinc-900 dark:text-zinc-100 font-bold text-2xl tracking-tight">{selectedProject.title}</h4>
                          <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm">
                            This project is hosted on GitHub. Security restrictions prevent live embedding within this frame.
                          </p>
                        </div>
                        <a
                          href={selectedProject.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-950 rounded-2xl text-sm font-bold hover:shadow-2xl transition-all active:scale-95"
                        >
                          Visit Repository
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="h-2.5 bg-zinc-300 dark:bg-zinc-700"></div>
                <div className="relative h-4 bg-gradient-to-b from-zinc-400 to-zinc-500 dark:from-zinc-700 dark:to-zinc-800 rounded-b-3xl shadow-2xl" style={{ marginLeft: '-60px', marginRight: '-60px' }}>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-2.5 bg-zinc-400 dark:bg-zinc-700 rounded-t-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Insights Section */}
        <div className="max-w-5xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col gap-8 p-8 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl">
            {selectedProject.disclaimer && (
              <div className="p-4 bg-zinc-100/50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 italic">
                  <span className="font-bold not-italic text-zinc-700 dark:text-zinc-300 mr-1">Project Note:</span>
                  {selectedProject.disclaimer}
                </p>
              </div>
            )}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Tech Stack */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.fullStack.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-950 text-[10px] font-bold rounded-full shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contributions */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Contributions</h4>
                <ul className="space-y-2">
                  {(isInsightsExpanded ? selectedProject.contributions : selectedProject.contributions.slice(0, 3)).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                {selectedProject.contributions.length > 3 && (
                  <button
                    onClick={() => setIsInsightsExpanded(!isInsightsExpanded)}
                    className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mt-2 hover:underline"
                  >
                    {isInsightsExpanded ? 'Show Less' : 'Show All'}
                  </button>
                )}
              </div>

              {/* Key Features */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Key Features</h4>
                <ul className="space-y-2">
                  {selectedProject.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-medium text-zinc-900 dark:text-zinc-100">
                      <svg className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
