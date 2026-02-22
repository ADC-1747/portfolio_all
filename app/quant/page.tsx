'use client';

import React from 'react';

function TerminalIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function Sparkline({ data = [3, 4, 5, 4, 6, 7, 8, 7, 9], color = "#22c55e" }: { data?: number[], color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 180;
  const h = 50;
  const gap = w / (data.length - 1);
  const points = data.map((d, i) => {
    const x = i * gap;
    const y = h - ((d - min) / (max - min || 1)) * h;
    return `${x},${y}`;
  }).join(' ');
  return (
    <div className="relative group">
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="inline-block overflow-visible drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]">
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-500"
        />
        {data.map((d, i) => {
          const x = i * gap;
          const y = h - ((d - min) / (max - min || 1)) * h;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={2}
              fill={color}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          );
        })}
      </svg>
    </div>
  );
}

function StatTile({ label, value, sub, trend = 'up' }: { label: string, value: string, sub?: string, trend?: 'up' | 'down' | 'neutral' }) {
  return (
    <div className="bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl flex flex-col gap-1 hover:border-green-500/30 transition-colors group">
      <span className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-mono group-hover:text-green-500/70 transition-colors">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100 font-mono tracking-tighter">{value}</span>
        {trend === 'up' && <span className="text-[10px] text-green-500 font-bold">▲</span>}
        {trend === 'down' && <span className="text-[10px] text-red-500 font-bold">▼</span>}
      </div>
      {sub && <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">{sub}</span>}
    </div>
  );
}

export default function QuantTerminal() {
  const tickerItems = [
    { code: 'PYTHON', val: '9.8', change: '+0.2' },
    { code: 'TSCRIPT', val: '9.2', change: '+0.1' },
    { code: 'SQL', val: '9.5', change: '+0.0' },
    { code: 'PYTORCH', val: '8.8', change: '+0.4' },
    { code: 'NEXTJS', val: '9.4', change: '+0.1' },
    { code: 'RUST', val: '7.8', change: '+0.5' },
    { code: 'SHARPE', val: '2.4', change: '+0.2' },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-600 dark:text-zinc-300 p-4 md:p-8 font-mono overflow-x-hidden selection:bg-green-500/30 selection:text-green-500">
      <div className="max-w-7xl mx-auto space-y-6 pt-16">

        {/* Top Market Ticker */}
        <div className="bg-white/80 dark:bg-zinc-900/80 border-y border-zinc-200 dark:border-zinc-800 py-2 -mx-8 relative overflow-hidden group">
          <div className="flex animate-marquee whitespace-nowrap gap-12 text-xs items-center">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <div key={i} className="flex gap-2 items-center">
                <span className="text-zinc-400 dark:text-zinc-500 font-bold">{item.code}</span>
                <span className="text-zinc-900 dark:text-zinc-100">{item.val}</span>
                <span className={item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                  {item.change}
                </span>
              </div>
            ))}
          </div>
          <style jsx>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 30s linear infinite;
            }
          `}</style>
        </div>

        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-green-500 text-[10px] font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              LIVE DATA CONNECTION ESTABLISHED
            </div>
            <h1 className="text-3xl font-black text-zinc-950 dark:text-white tracking-tighter">QUANT_TERMINAL_v1.0</h1>
            <p className="text-xs text-zinc-500">AYUSH: SENIOR QUANTITATIVE RESEARCHER & FULL-STACK ENGINEER</p>
          </div>
          <div className="text-right space-y-1">
            <div className="text-[10px] text-zinc-500">SYSTEM DATE</div>
            <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{new Date().toLocaleDateString()}</div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Left Column: Core Stats */}
          <div className="lg:col-span-1 space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              <StatTile label="Fit Score" value="8.7/10" sub="Top 2% of cohort" />
              <StatTile label="Experience" value="5 Yrs" sub="Alpha generation focus" />
              <StatTile label="Backtests" value="120+" sub="98% confidence level" />
              <StatTile label="Live Strategies" value="2" sub="Real-money execution" />
            </div>
          </div>

          {/* Middle: Assessment & Risk */}
          <div className="lg:col-span-2 space-y-6">
            {/* Assessment Tile */}
            <div className="bg-white dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-30 transition-opacity">
                <TerminalIcon className="w-24 h-24" />
              </div>
              <h3 className="text-sm font-bold text-green-500 mb-4 tracking-widest uppercase">Executive Assessment</h3>
              <div className="space-y-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                <p>
                  <span className="text-zinc-900 dark:text-zinc-100 font-bold border-b border-green-500/50 pb-0.5 mr-1">STRATEGY_THESIS:</span>
                  Ayush combines statistical rigor with high-performance engineering. Demonstrates deep proficiency in
                  <span className="text-zinc-800 dark:text-zinc-200"> time-series analysis</span> and <span className="text-zinc-800 dark:text-zinc-200">vectorized backtesting</span>.
                  Unique ability to traverse from mathematical concept to production-level C++/Python code.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px]">
                      <span>ALGO_RESEARCH</span>
                      <span className="text-green-500 font-bold">92%</span>
                    </div>
                    <div className="h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[92%]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px]">
                      <span>SYSTEMS_INFRA</span>
                      <span className="text-green-500 font-bold">88%</span>
                    </div>
                    <div className="h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[88%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Factors Tile */}
            <div className="bg-white dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl">
              <h3 className="text-sm font-bold text-red-500 mb-4 tracking-widest uppercase">Risk & Mitigants</h3>
              <div className="space-y-4">
                <div className="flex gap-4 items-start border-l-2 border-red-500/30 pl-4 py-1">
                  <div className="text-[10px] font-bold text-red-500 mt-1 shrink-0">RISK_01</div>
                  <p className="text-xs text-zinc-500 italic">"Limited exposure to ultra-low latency FPGA-level execution."</p>
                  <div className="text-[10px] font-bold text-green-500 mt-1 ml-auto">MITIGATED</div>
                </div>
                <div className="flex gap-4 items-start border-l-2 border-zinc-200 dark:border-zinc-800 pl-4 py-1">
                  <div className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 mt-1 shrink-0">RISK_02</div>
                  <p className="text-xs text-zinc-500 italic">"Focused primarily on mid-to-high frequency windows."</p>
                  <div className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 mt-1 ml-auto">MONITORED</div>
                </div>
              </div>
            </div>

            {/* Backtest Visualization Tile */}
            <div className="bg-white dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl group">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-green-500 tracking-widest uppercase">Strategy_Backtest_Sim</h3>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 animate-pulse">POLLING_LIVE_FEED...</span>
              </div>
              <div className="h-32 w-full relative">
                <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#22c55e', stopOpacity: 0.2 }} />
                      <stop offset="100%" style={{ stopColor: '#22c55e', stopOpacity: 0 }} />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 80 Q 50 70, 100 85 T 200 60 T 300 40 T 400 10"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2"
                    className="drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                  />
                  <path
                    d="M0 80 Q 50 70, 100 85 T 200 60 T 300 40 T 400 10 V 100 H 0 Z"
                    fill="url(#grad)"
                  />
                  <line x1="0" y1="0" x2="0" y2="100" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4" />
                  <line x1="100" y1="0" x2="100" y2="100" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4" />
                  <line x1="200" y1="0" x2="200" y2="100" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4" />
                  <line x1="300" y1="0" x2="300" y2="100" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4" />
                </svg>
                <div className="absolute top-2 left-[300px] bg-green-500 text-black text-[8px] font-bold px-1 rounded animate-bounce">
                  ALPHA_SPIKE
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="space-y-1">
                  <div className="text-[8px] text-zinc-500 uppercase">Max Drawdown</div>
                  <div className="text-xs text-red-500 font-bold">-4.2%</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[8px] text-zinc-500 uppercase">Win Rate</div>
                  <div className="text-xs text-green-500 font-bold">68.4%</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[8px] text-zinc-500 uppercase">Profit Factor</div>
                  <div className="text-xs text-zinc-900 dark:text-zinc-100 font-bold">2.14</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Performance & Next Steps */}
          <div className="lg:col-span-1 space-y-6">
            {/* Performance Sparkline */}
            <div className="bg-white dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl flex flex-col gap-4">
              <h3 className="text-[10px] text-zinc-500 tracking-widest uppercase">Signal Alpha Flow</h3>
              <Sparkline />
              <div className="flex justify-between items-center text-[10px] text-zinc-500">
                <span>30D_HISTORY</span>
                <span className="text-green-500 font-bold">+18.4%</span>
              </div>
            </div>

            {/* Next Steps List */}
            <div className="bg-green-500/5 dark:bg-green-500/5 backdrop-blur-md border border-green-500/20 p-6 rounded-2xl space-y-4">
              <h3 className="text-[10px] text-green-500 font-bold tracking-widest uppercase italic">Deploy Procedures</h3>
              <ul className="space-y-3">
                {[
                  'Final Systems Deep-Dive',
                  'Portfolio Strategy Pitch',
                  '4-Week Production Pilot'
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 items-center group cursor-pointer">
                    <span className="w-5 h-5 rounded border border-green-500/30 flex items-center justify-center text-[10px] text-green-500 group-hover:bg-green-500 group-hover:text-black transition-colors">{i + 1}</span>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Terminal Output */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-lg flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-zinc-500">
          <div className="flex items-center gap-4">
            <span className="text-green-500 font-bold">TERM_STATUS: IDLE</span>
            <span className="hidden md:inline border-r border-zinc-200 dark:border-zinc-800 h-4"></span>
            <span>ENCRYPTION: AES-256</span>
            <span className="hidden md:inline border-r border-zinc-200 dark:border-zinc-800 h-4"></span>
            <span>BUFFER_HEALTH: 100%</span>
          </div>
          <div className="italic">Property of Ayush — For quantitative verification only</div>
        </div>
      </div>
    </div>
  );
}
