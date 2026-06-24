/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import CodeExplorer from './components/CodeExplorer';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { Server, ShieldCheck, Terminal, Heart } from 'lucide-react';

function PortfolioContent() {
  const [activeSection, setActiveSection] = useState('about');

  // Smooth scroll handler helper
  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    
    let elementId = '';
    if (sectionId === 'about') elementId = 'portfolio-hero';
    else if (sectionId === 'experience') elementId = 'portfolio-experience';
    else if (sectionId === 'skills') elementId = 'portfolio-skills';
    else if (sectionId === 'explorer') elementId = 'portfolio-explorer';
    else if (sectionId === 'projects') elementId = 'portfolio-projects';
    else if (sectionId === 'contact') elementId = 'portfolio-contact';

    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-200 flex flex-col font-sans selection:bg-indigo-500/20 selection:text-indigo-300">
      
      {/* Header */}
      <Header activeSection={activeSection} setActiveSection={handleNavigateSection} />

      {/* Main Sections */}
      <main className="flex-grow">
        <Hero 
          onExploreCode={() => handleNavigateSection('explorer')} 
          onContactClick={() => handleNavigateSection('contact')} 
        />
        <Experience />
        <Skills />
        <CodeExplorer />
        <Education />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#080809] py-12 text-zinc-500 text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="font-semibold text-zinc-400">
              Bipika Amatya &copy; {new Date().getFullYear()}
            </span>
            <span>Software Developer | Vantaa, Finland</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-600">
            <Server size={12} className="text-indigo-500" />
            <span>FastAPI Example Engine Active</span>
            <span className="h-1 w-1 rounded-full bg-indigo-500" />
            <ShieldCheck size={12} className="text-indigo-500" />
            <span>State Managed by Redux Toolkit + Thunk</span>
          </div>

          <div className="flex items-center gap-1 text-zinc-600">
            <span>Built with React 19 & Tailwind</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PortfolioContent />
    </Provider>
  );
}

