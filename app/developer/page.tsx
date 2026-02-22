'use client';

import { useState } from 'react';

export default function Portfolio() {
  const projects = [
    {
      id: 1,
      title: "DHARANI Project",
      description: "Full-stack shopping platform with cart and payment integration",
      url: "https://brainportal.humanbrain.in/code/2dviewer/annotation/public?data=3&region=-1&section=1291",
      tags: ["Angular", "Django", "MySQL"]
    },
    {
      id: 2,
      title: "Portfolio",
      description: "Collaborative task tracker with real-time updates",
      url: "https://white-flower-06778ef00.1.azurestaticapps.net/",
      tags: ["Next.js", "TypeScript", "Tailwind"]
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Beautiful weather app with location-based forecasts",
      url: "https://example.com",
      tags: ["React", "API", "Charts"]
    }
  ];

  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8 font-sans">
      <div className="max-w-7xl mx-auto pt-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
            My Projects
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-lg">
            Check out some of my recent work
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${selectedProject.id === project.id
                  ? 'ring-2 ring-zinc-900 dark:ring-zinc-100 shadow-lg'
                  : ''
                }`}
            >
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{project.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex gap-2 flex-wrap">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-xs text-zinc-600 dark:text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Main Display - Laptop and Mobile */}
        <div className="mb-12">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-24">
            {/* iPhone Display - LEFT (FULL MOBILE IFRAME) */}
            <div className="relative" style={{ width: '330px' }}>
              {/* iPhone Frame - Outer black bezel */}
              <div
                className="relative bg-zinc-200 dark:bg-zinc-800 p-2.5 shadow-2xl border-4 border-zinc-300 dark:border-zinc-700"
                style={{ borderRadius: '55px' }}
              >
                {/* Inner frame */}
                <div className="relative bg-zinc-100 dark:bg-zinc-900" style={{ borderRadius: '48px', padding: '2px' }}>
                  {/* Notch (visual only) */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-7 bg-zinc-200 dark:bg-zinc-800 rounded-b-3xl z-10 border-b-4 border-zinc-300 dark:border-zinc-700"></div>

                  {/* Screen container */}
                  <div
                    className="relative overflow-hidden"
                    style={{ height: '620px', borderRadius: '45px', background: '#000' }}
                  >
                    {/* Full-size iframe covering the entire screen area */}
                    <iframe
                      src={selectedProject.url}
                      title={`${selectedProject.title} - Mobile`}
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-none"
                      style={{ borderRadius: '45px', display: 'block' }}
                    />
                  </div>
                </div>

                {/* Side Buttons */}
                <div className="absolute left-[-3px] top-28 w-1 h-10 bg-zinc-300 dark:bg-zinc-700 rounded-l"></div>
                <div className="absolute left-[-3px] top-40 w-1 h-14 bg-zinc-300 dark:bg-zinc-700 rounded-l"></div>
                <div className="absolute left-[-3px] top-56 w-1 h-14 bg-zinc-300 dark:bg-zinc-700 rounded-l"></div>
                <div className="absolute right-[-3px] top-32 w-1 h-16 bg-zinc-300 dark:bg-zinc-700 rounded-r"></div>
              </div>
            </div>

            {/* Laptop Display - CENTER */}
            <div className="relative" style={{ width: '850px' }}>
              {/* Laptop Frame */}
              <div className="relative bg-zinc-200 dark:bg-zinc-800 rounded-t-3xl p-3 shadow-2xl border-4 border-zinc-300 dark:border-zinc-700 border-b-0">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-6 bg-zinc-200 dark:bg-zinc-800 rounded-b-2xl z-10 border-b-4 border-zinc-300 dark:border-zinc-700 flex items-start justify-center pt-1">
                  <div className="w-20 h-1 bg-zinc-400 dark:bg-zinc-600 rounded-full"></div>
                </div>

                {/* Camera - now inside notch */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-zinc-400 dark:bg-zinc-600 rounded-full z-20"></div>

                {/* Screen */}
                <div className="bg-white dark:bg-zinc-950 rounded-2xl overflow-hidden aspect-video border-2 border-zinc-300 dark:border-zinc-900" style={{ minHeight: '420px' }}>
                  {/* Browser Chrome */}
                  <div className="bg-zinc-100 dark:bg-zinc-900 px-4 py-2.5 flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 mx-4 bg-white dark:bg-zinc-800 rounded-md px-3 py-1 text-xs text-zinc-500 dark:text-zinc-400 truncate">
                      {selectedProject.url}
                    </div>
                  </div>

                  {/* Iframe Container - show actual site */}
                  <div className="bg-white dark:bg-zinc-950 h-full relative overflow-hidden">
                    <iframe
                      src={selectedProject.url}
                      className="w-full h-full border-none"
                      title={selectedProject.title}
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      style={{ display: 'block' }}
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>

              {/* Laptop Base */}
              <div className="relative">
                <div className="h-2 bg-zinc-300 dark:bg-zinc-700"></div>
                <div className="relative h-4 bg-gradient-to-b from-zinc-400 to-zinc-500 dark:from-zinc-700 dark:to-zinc-800 rounded-b-3xl shadow-2xl" style={{ marginLeft: '-80px', marginRight: '-80px' }}>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-2 bg-zinc-400 dark:bg-zinc-700 rounded-t-xl"></div>
                </div>
              </div>

              {/* Bottom Shadow */}
              <div className="absolute bottom-[-10px] left-0 right-0 h-3 bg-gradient-to-b from-black/20 dark:from-black/60 to-transparent rounded-full blur-md" style={{ marginLeft: '-80px', marginRight: '-80px' }}></div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 text-sm text-zinc-500 dark:text-zinc-400">
          <p>Click on any project card above to view it in the displays</p>
        </div>
      </div>
    </div>
  );
}
