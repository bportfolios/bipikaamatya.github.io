/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useAppSelector } from '../store/hooks';
import { Briefcase, GraduationCap, Cpu, ShieldAlert, ArrowRight } from 'lucide-react';

interface HeroProps {
  onExploreCode: () => void;
  onContactClick: () => void;
}

export default function Hero({ onExploreCode, onContactClick }: HeroProps) {
  const { name, title, summary, experience, education } = useAppSelector((state) => state.portfolio);

  const totalExperienceYears = 9; // Dec 2009 to present is over 10 years, professional is nearly a decade (9+ years since 2014)

  return (
    <section className="relative overflow-hidden bg-[#FBFBFA] py-16 sm:py-24" id="portfolio-hero">
      {/* Visual background accents */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-[120px]" />
      <div className="absolute bottom-10 right-10 -z-10 h-72 w-72 rounded-full bg-cyan-500/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Copy Area */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-700 border border-indigo-500/10 w-fit mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
              Available for New Opportunities
            </span>

            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800">{name}</span>
            </h1>
            
            <p className="mt-3 text-lg font-medium text-zinc-700 sm:text-xl">
              {title}
            </p>

            <p className="mt-6 text-base text-zinc-500 leading-relaxed max-w-2xl">
              {summary}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={onExploreCode}
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800 transition-all shadow-md active:scale-95 cursor-pointer"
                id="btn-explore-code"
              >
                Interactive FastAPI Codebase
                <ArrowRight size={16} />
              </button>
              <button
                onClick={onContactClick}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-all active:scale-95 cursor-pointer"
                id="btn-contact"
              >
                Get In Touch
              </button>
            </div>
          </div>

          {/* Quick Info Grid / Metrics */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:pl-6">
            
            <div className="rounded-xl border border-zinc-200/80 bg-white p-6 shadow-sm hover:shadow-md hover:border-zinc-300/80 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 mb-4">
                <Cpu size={20} />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900">{totalExperienceYears}+ Years</h3>
              <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-semibold">
                Professional Tech Experience
              </p>
              <p className="text-xs text-zinc-400 mt-2">
                Specializing in robust backend systems, REST APIs, and database efficiency.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200/80 bg-white p-6 shadow-sm hover:shadow-md hover:border-zinc-300/80 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600 mb-4">
                <Briefcase size={20} />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900">4 Companies</h3>
              <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-semibold">
                Proven Track Record
              </p>
              <p className="text-xs text-zinc-400 mt-2">
                Across Finland & Nepal, in cloud integration, telecom, and healthcare metrics.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200/80 bg-white p-6 shadow-sm hover:shadow-md hover:border-zinc-300/80 transition-all sm:col-span-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 mb-4">
                <GraduationCap size={20} />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-zinc-900">Dual Master's Degrees</h3>
                  <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-semibold">
                    Highly Academic Foundations
                  </p>
                </div>
              </div>
              <p className="text-xs text-zinc-400 mt-2">
                M.Eng. Full Stack Software Development (ongoing) & M.Sc. Cognitive Computing, from leading universities in Finland.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
