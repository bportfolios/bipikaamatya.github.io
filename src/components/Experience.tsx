/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { Calendar, MapPin, Briefcase, ChevronRight, Circle } from 'lucide-react';

export default function Experience() {
  const { experience } = useAppSelector((state) => state.portfolio);
  const [selectedExp, setSelectedExp] = useState<string>(experience[0]?.id || '');

  return (
    <section className="bg-[#0A0A0B] py-16" id="portfolio-experience">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Professional Experience
          </h2>
          <p className="mt-3 text-zinc-400 max-w-xl">
            Developing backend engines, database transformations, cloud containers, and voice synthesis solutions across leading tech businesses.
          </p>
        </div>

        {/* Layout split: Left is company selectors, Right is rich details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Company Side Selectors */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto scrollbar-none lg:overflow-visible gap-2 border-b lg:border-b-0 lg:border-l border-white/5 pb-4 lg:pb-0 lg:pl-0">
            {experience.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setSelectedExp(exp.id)}
                className={`flex-none lg:w-full flex items-center justify-between text-left rounded-lg lg:rounded-l-none lg:rounded-r-lg px-4 py-3.5 text-sm transition-all border cursor-pointer ${
                  selectedExp === exp.id
                    ? 'bg-zinc-900/85 text-indigo-400 border-white/5 lg:border-l-2 lg:border-l-indigo-500 lg:-ml-[2px]'
                    : 'text-zinc-400 border-transparent hover:bg-zinc-900/30 hover:text-white'
                }`}
                id={`exp-select-${exp.id}`}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold">{exp.company}</span>
                  <span className="text-xs text-zinc-500 font-medium">{exp.role}</span>
                </div>
                <ChevronRight size={14} className={`hidden lg:block transition-transform ${selectedExp === exp.id ? 'translate-x-1 text-indigo-400' : 'text-zinc-600'}`} />
              </button>
            ))}
          </div>

          {/* Details Column */}
          <div className="lg:col-span-8 bg-zinc-900/10 border border-white/5 rounded-2xl p-6 sm:p-8 backdrop-blur-sm min-h-[400px]">
            {experience.map((exp) => {
              if (exp.id !== selectedExp) return null;

              return (
                <div key={exp.id} className="animate-fade-in">
                  
                  {/* Job Title & Metadata */}
                  <div className="border-b border-white/5 pb-5 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2 flex-wrap">
                        <span className="text-indigo-400">{exp.role}</span>
                        <span className="text-zinc-400 font-medium text-lg">@ {exp.company}</span>
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs text-zinc-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} className="text-zinc-500" />
                        {exp.period}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-zinc-700 hidden sm:inline" />
                      <span className="flex items-center gap-1">
                        <MapPin size={13} className="text-zinc-500" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Responsibilities list */}
                  <h4 className="text-xs uppercase tracking-wider font-bold text-zinc-500 mb-4">
                    Key Roles & Contributions
                  </h4>
                  <ul className="space-y-4">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm leading-relaxed">
                        <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
