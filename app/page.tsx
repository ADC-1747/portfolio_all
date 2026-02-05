
import Link from "next/link";
import GitHubContributions from "./components/GitHubContributions";
import LeetCodeContributions from "./components/LeetCodeContributions";
import StreamingText from "./components/StreamingText";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col justify-between bg-white py-32 px-16 dark:bg-black">
        <section className="flex flex-col gap-10 text-center sm:text-left">
          {/* Name & Role */}
          <div className="space-y-2">
            <h2 className="text-sm font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
              Ayush Chavne  </h2>

            <h2 className="text-sm font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
            
              · AI/ML Engineer · Full Stack Developer · Quant            </h2>
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Welcome to my portfolio.
            </h1>
          </div>

          {/* Summary */}
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            I design and build data-driven systems spanning applied machine learning, quantitative
            finance, scalable software.
          </p>

          {/* Experience Cards */}

          {/* AI / ML Experience + Streaming */}
          <div className="w-full">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-black">
              {/* Header */}
              <div className="mb-2">
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Project Associate
                </h3>
                <p className="text-xs text-zinc-500">
                  Department of Data Science and AI, IIT Madras · Jan 2025 — Present
                </p>
              </div>

              {/* Live indicator */}
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs text-zinc-500">AI / ML Work</span>
              </div>

              {/* Streaming text */}
              <div className="w-full overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 bg-zinc-50 dark:bg-zinc-900">
                <div className="inline-block min-w-max">
                  <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <p className="typing-loop delay-1 cursor">
                      Designed pipeline for alpha generation using LLMs.
                    </p>
                    <p className="typing-loop delay-2 cursor">
                      Fine-tuning LLMs using LoRA and parameter-efficient methods.
                    </p>
                    <p className="typing-loop delay-3 cursor">
                      Trained NNs for sales forecasting, reduced MAPE from 16% to 2%.
                    </p>
                    <p className="typing-loop delay-4 cursor">
                      Trained LSTM for L1 and L2 level Order Book prediction.
                    </p>
                    <p className="typing-loop delay-5 cursor">
                      Designed fully automated data scraping pipeline for data collection.
                    </p>
                  </div>
                </div>
              </div>

              {/* Know more link */}
              <Link
                href="/aiml"
                className="mt-3 inline-block text-xs font-medium text-zinc-900 hover:underline dark:text-zinc-100"
              >
                Know more →
              </Link>
            </div>
          </div>

          {/* Full Stack Developer */}
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Full Stack Developer
            </h3>
            <p className="text-xs text-zinc-500">
              Sudha Gopalakrishnan Brain Centre, IIT Madras · Jul 2024 — Dec 2025
            </p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Contributed to the DHARANI project and built scalable systems, internal platforms, and AI pipelines used in production.
            </p>
            {/* Links */}
              <div className="mt-2 flex gap-4">
                <Link
                  href="/developer"
                  className="text-xs font-medium text-zinc-900 hover:underline dark:text-zinc-100"
                >
                  Know more →
                </Link>
                <Link
                  href="/aiml"
                  className="text-xs font-medium text-zinc-900 hover:underline dark:text-zinc-100"
                >
                  Ask AI →
                </Link>
              </div>
          </div>

          {/* Quant Research Consultant */}
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Quant Research Consultant
            </h3>
            <p className="text-xs text-zinc-500">WorldQuant · 2024 — Present</p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Alpha research, factor modeling, backtesting, and signal validation.
            </p>

            {/* Links */}
            <div className="mt-2 flex gap-4">
              <Link
                href="/quant"
                className="text-xs font-medium text-zinc-900 hover:underline dark:text-zinc-100"
              >
                Know more →
              </Link>
              <Link
                href="/aiml"
                className="text-xs font-medium text-zinc-900 hover:underline dark:text-zinc-100"
              >
                Ask AI →
              </Link>
            </div>
          </div>
            


          {/* Persona Links */}
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Who are you looking for?
            <br />
            <span className="inline-flex flex-wrap gap-1">
              <Link
                href="/quant"
                className="font-medium text-zinc-950 hover:underline dark:text-zinc-50"
              >
                The Quant guy
              </Link>
              <span>or</span>
              <Link
                href="/developer"
                className="font-medium text-zinc-950 hover:underline dark:text-zinc-50"
              >
                The Developer
              </Link>
              <span>or</span>
              <Link
                href="/aiml"
                className="font-medium text-zinc-950 hover:underline dark:text-zinc-50"
              >
                The AI/ML guy
              </Link>
            </span>
          </p>

          {/* Resume */}
          <a
            href="/resume.pdf"
            download
            className="inline-block text-sm font-medium text-zinc-950 hover:underline dark:text-zinc-50"
          >
            Download Resume
          </a>

      <GitHubContributions />
      <LeetCodeContributions />



<StreamingText
  commands={[
    "npm run build",
    "pnpm dev",
    "git commit -m \"initial commit\"",
  ]}
  className="text-green-500"
/>

        {/* Social Links */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
          {/* GitHub */}
          <a
            href="https://github.com/ADC-1747"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:underline"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current"
              aria-hidden="true"
            >
              <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.11 3.29 9.44 7.86 10.97.58.11.79-.25.79-.56v-2.02c-3.2.7-3.88-1.55-3.88-1.55-.53-1.36-1.3-1.72-1.3-1.72-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.79 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.4-5.25 5.68.42.36.8 1.08.8 2.18v3.24c0 .31.21.68.8.56a11.53 11.53 0 0 0 7.86-10.97C23.5 5.74 18.27.5 12 .5z" />
            </svg>
            GitHub
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/ayush-c-86a3492a4/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:underline"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current"
              aria-hidden="true"
            >
              <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.98h4.56V24H.22V8.98zM8.98 8.98h4.37v2.05h.06c.61-1.16 2.1-2.37 4.32-2.37 4.62 0 5.48 3.04 5.48 6.99V24h-4.56v-6.5c0-1.55-.03-3.55-2.17-3.55-2.17 0-2.5 1.69-2.5 3.43V24H8.98V8.98z" />
            </svg>
            LinkedIn
          </a>

          {/* LeetCode */}
          <a
            href="https://leetcode.com/u/adc_17/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:underline"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current"
              aria-hidden="true"
            >
              <path d="M13.483 0L4.418 9.065a6.03 6.03 0 000 8.528l2.99 2.99a6.03 6.03 0 008.528 0l2.2-2.2-2.12-2.12-2.2 2.2a3.03 3.03 0 01-4.285 0l-2.99-2.99a3.03 3.03 0 010-4.285l9.065-9.065L13.483 0zM17.243 5.758l-1.758 1.758 2.12 2.12 1.758-1.758-2.12-2.12z" />
            </svg>
            LeetCode
          </a>
        </div>

          {/* Static Activity Summary */}
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            • Active LeetCode problems solver · Active open-source contributor
          </p>
        </section>
      </main>
    </div>
  );
}
