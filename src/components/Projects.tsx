/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { ExternalLink, Github, Layers, AppWindow } from 'lucide-react';

export default function Projects() {
  const { projects } = useAppSelector((state) => state.portfolio);
  const [filter, setFilter] = useState<'all' | 'backend' | 'frontend'>('all');

  const filteredProjects = projects.filter((proj) => {
    if (filter === 'backend') {
      return proj.type === 'backend-example' || proj.techStack.some(t => ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL'].includes(t));
    }
    if (filter === 'frontend') {
      return proj.type === 'personal' && proj.techStack.some(t => ['React.js', 'React Hooks', 'Firebase'].includes(t));
    }
    return true;
  });

  return (
    <section className="bg-[#0A0A0B] py-16" id="portfolio-projects">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Personal & Showcase Projects
            </h2>
            <p className="mt-3 text-zinc-400 max-w-xl">
              A curated catalog of client-side web application prototypes and robust database API projects.
            </p>
          </div>

          {/* Type Filter Tabs */}
          <div className="flex rounded-lg bg-zinc-900 p-1 border border-white/5 self-start md:self-end">
            <button
              onClick={() => setFilter('all')}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => filter !== 'backend' && setFilter('backend')}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                filter === 'backend'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Backend / DBs
            </button>
            <button
              onClick={() => filter !== 'frontend' && setFilter('frontend')}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                filter === 'frontend'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              React / Web
            </button>
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <div 
              key={proj.id}
              className="group relative flex flex-col justify-between rounded-xl border border-white/5 bg-zinc-900/10 p-6 backdrop-blur-sm hover:border-white/10 transition-all shadow-md"
            >
              <div>
                {/* Project Header Icons */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-zinc-400 border border-white/5">
                    {proj.type === 'backend-example' ? (
                      <Layers size={16} className="text-cyan-400" />
                    ) : (
                      <AppWindow size={16} className="text-indigo-400" />
                    )}
                  </div>
                  
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-white transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github size={16} />
                    </a>
                  )}
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {proj.title}
                </h3>

                <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed">
                  {proj.description}
                </p>
              </div>

              {/* Footer Tech Stack & Link */}
              <div className="mt-6 pt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-zinc-950 border border-white/5 px-2 py-0.5 text-[10px] font-medium text-zinc-400 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    View Repo on GitHub
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
