'use client';

import { useState } from 'react';

export default function Portfolio() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack shopping platform with cart and payment integration",
      url: "http://localhost:3000/",
      tags: ["React", "Node.js", "MongoDB"]
    },
    {
      id: 2,
      title: "Book Management App",
      description: "Collaborative task tracker with real-time updates",
      url: "http://localhost:3002",
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
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            My Projects
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Check out some of my recent work
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`bg-gradient-to-b from-gray-850 to-gray-800 rounded-lg border border-gray-700 p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                selectedProject.id === project.id
                  ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/30'
                  : ''
              }`}
            >
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex gap-2 flex-wrap">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-820 border border-gray-700 rounded text-xs text-gray-300"
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
                className="relative bg-gray-800 p-2.5 shadow-2xl border-4 border-gray-700"
                style={{ borderRadius: '55px' }}
              >
                {/* Inner frame */}
                <div className="relative bg-gray-900" style={{ borderRadius: '48px', padding: '2px' }}>
                  {/* Notch (visual only) */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-7 bg-gray-800 rounded-b-3xl z-10 border-b-4 border-gray-700"></div>

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
                <div className="absolute left-[-3px] top-28 w-1 h-10 bg-gray-900 rounded-l"></div>
                <div className="absolute left-[-3px] top-40 w-1 h-14 bg-gray-900 rounded-l"></div>
                <div className="absolute left-[-3px] top-56 w-1 h-14 bg-gray-900 rounded-l"></div>
                <div className="absolute right-[-3px] top-32 w-1 h-16 bg-gray-900 rounded-r"></div>
              </div>
            </div>

            {/* Laptop Display - CENTER */}
            <div className="relative" style={{ width: '850px' }}>
              {/* Laptop Frame */}
              <div className="relative bg-gray-800 rounded-t-3xl p-3 shadow-2xl border-4 border-gray-700 border-b-0">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-6 bg-gray-800 rounded-b-2xl z-10 border-b-4 border-gray-700 flex items-start justify-center pt-1">
                  <div className="w-20 h-1 bg-gray-700 rounded-full"></div>
                </div>

                {/* Camera - now inside notch */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-600 rounded-full z-20"></div>

                {/* Screen */}
                <div className="bg-white rounded-2xl overflow-hidden aspect-video border-2 border-gray-900" style={{ minHeight: '420px' }}>
                  {/* Browser Chrome */}
                  <div className="bg-gray-200 px-4 py-2.5 flex items-center gap-2 border-b border-gray-300">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 mx-4 bg-white rounded-md px-3 py-1 text-xs text-gray-500 truncate">
                      {selectedProject.url}
                    </div>
                  </div>

                  {/* Iframe Container - show actual site */}
                  <div className="bg-gray-800 h-full relative overflow-hidden">
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
                <div className="h-2 bg-gray-700"></div>
                <div className="relative h-4 bg-gradient-to-b from-gray-600 to-gray-500 rounded-b-3xl shadow-2xl" style={{ marginLeft: '-80px', marginRight: '-80px' }}>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-2 bg-gray-600 rounded-t-xl"></div>
                </div>
              </div>

              {/* Bottom Shadow */}
              <div className="absolute bottom-[-10px] left-0 right-0 h-3 bg-gradient-to-b from-gray-900/60 to-transparent rounded-full blur-md" style={{ marginLeft: '-80px', marginRight: '-80px' }}></div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 text-sm text-gray-500">
          <p>Click on any project card above to view it in the displays</p>
        </div>
      </div>
    </div>
  );
}
