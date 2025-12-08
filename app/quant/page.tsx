'use client';

import React from 'react';

function Sparkline({ data = [3,4,5,4,6,7,8,7,9] }: { data?: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 140;
  const h = 40;
  const gap = w / (data.length - 1);
  const points = data.map((d, i) => {
    const x = i * gap;
    const y = h - ((d - min) / (max - min || 1)) * h;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="inline-block">
      <polyline points={points} fill="none" stroke="#60a5fa" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => {
        const x = i * gap;
        const y = h - ((d - min) / (max - min || 1)) * h;
        return <circle key={i} cx={x} cy={y} r={1.6} fill="#60a5fa" />;
      })}
    </svg>
  );
}

export default function QuantReport() {
  // Replace these with real data/content
  const recommendation = 'STRONG HIRE'; // options: STRONG HIRE / HIRE / NEUTRAL / NO HIRE
  const recColor =
    recommendation === 'STRONG HIRE' ? 'bg-green-600' :
    recommendation === 'HIRE' ? 'bg-green-500' :
    recommendation === 'NEUTRAL' ? 'bg-yellow-600' : 'bg-red-600';

  const metrics = [
    { k: 'Experience (yrs)', v: '5' },
    { k: 'Backtests Run', v: '120+' },
    { k: 'Live Strategies', v: '2' },
    { k: 'Languages', v: 'Python, C++, SQL' },
    { k: 'Focus Areas', v: 'Algos, Risk, Execution' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-gradient-to-b from-gray-850 to-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">Quantitative Research Report</h1>
            <p className="text-gray-400 mt-1">Candidate: Ayush — Quantitative Analyst</p>
            <p className="text-sm text-gray-500 mt-1">Analyst: Ayush • Date: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className={`px-4 py-2 rounded-full text-sm font-semibold tracking-wide ${recColor} text-white shadow`}>
              {recommendation}
            </div>

            <div className="text-right">
              <div className="text-xs text-gray-400">Fit Score</div>
              <div className="text-2xl font-semibold text-white">8.7 / 10</div>
            </div>
          </div>
        </div>

        {/* Summary + Key metrics */}
        <div className="p-6 md:p-8 border-t border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <section>
              <h2 className="text-lg font-semibold text-white">Executive Summary</h2>
              <p className="text-gray-300 leading-relaxed mt-2">
                Ayush is a data-driven quantitative analyst with demonstrated experience building
                and deploying algorithmic trading strategies. The candidate combines strong
                engineering skills with statistical rigor, making them well-suited for roles that
                require rapid prototyping, robust backtesting, and production-level code.
              </p>
            </section>

            <section className="mt-4">
              <h3 className="text-sm text-gray-400 uppercase tracking-wide">Hiring (Thesis)</h3>
              <ul className="list-disc pl-5 mt-2 text-gray-300 space-y-1">
                <li>Deep experience in Python for research and backtesting.</li>
                <li>Strong risk modeling background and familiarity with portfolio-level metrics.</li>
                <li>Track record of building low-latency pipelines and automation for strategy execution.</li>
              </ul>
            </section>
          </div>

          <aside className="bg-gray-820 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-400">Recent Performance</div>
                <div className="text-sm text-gray-200 font-medium">Signal Quality (last 30 days)</div>
              </div>
              <Sparkline data={[2,3,4,6,5,7,8,9,9]} />
            </div>

            <div className="mt-4 space-y-2">
              {metrics.map((m, idx) => (
                <div key={idx} className="flex justify-between text-sm text-gray-200">
                  <div className="text-gray-400">{m.k}</div>
                  <div className="font-medium text-white">{m.v}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* Report body */}
        <div className="p-6 md:p-8 space-y-8 border-t border-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-white">Detailed Assessment</h2>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 text-gray-300 leading-relaxed">
                <p className="mb-3"><strong>Technical & Research Skills:</strong> Proficient in time-series analysis, statistical feature engineering, and cross-validation techniques. Comfortable implementing vectorized backtests and integrating market microstructure considerations when required.</p>
                <p className="mb-3"><strong>Engineering:</strong> Produces maintainable, documented code. Familiar with CI pipelines and packaging research into production tasks. Able to reduce latency through optimized data structures and efficient I/O patterns.</p>
                <p className="mb-3"><strong>Soft Skills & Team Fit:</strong> Clear communicator; experience collaborating with PMs and engineers. Demonstrates a bias for action and ownership over end-to-end features.</p>
              </div>

              <div className="bg-gray-820 p-4 rounded-lg border border-gray-700">
                <div className="text-sm text-gray-400">Quant Scores</div>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between"><span className="text-gray-300">Research</span><span className="font-semibold">8.8</span></div>
                  <div className="flex justify-between"><span className="text-gray-300">Engineering</span><span className="font-semibold">8.4</span></div>
                  <div className="flex justify-between"><span className="text-gray-300">Product Sense</span><span className="font-semibold">8.0</span></div>
                  <div className="flex justify-between"><span className="text-gray-300">Execution</span><span className="font-semibold">8.6</span></div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Risk & Mitigants</h2>
            <ul className="list-disc pl-5 mt-3 text-gray-300 space-y-2">
              <li><strong>Risk:</strong> Candidate has limited experience with ultra-low latency execution stacks. <strong>Mitigant:</strong> Pair with senior infra engineer and provide ramp-up time.</li>
              <li><strong>Risk:</strong> Smaller live track record on production strategies. <strong>Mitigant:</strong> Start with sandboxed POC and deploy monitored pilots.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Hiring Recommendation Rationale</h2>
            <p className="text-gray-300 mt-3">
              Recommendation: <span className="font-semibold text-white">{recommendation}</span>. The candidate demonstrates strong analytical ability, robust coding practices, and a good balance between research rigour and engineering pragmatism. Their skill set maps well to quantitative research and prototyping roles with a clear path to production ownership.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Next Steps</h2>
            <ol className="list-decimal pl-5 mt-3 text-gray-300 space-y-2">
              <li>Arrange a systems / infra interview to validate low-latency experience.</li>
              <li>Ask for a short code/sample of a backtest or a research notebook.</li>
              <li>Run a 4–6 week pilot project with measurable KPIs.</li>
            </ol>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-900 border-t border-gray-700 text-sm text-gray-500 flex justify-between items-center">
          <div>Confidential — For internal hiring use only</div>
          <div>Report generated on {new Date().toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
}
