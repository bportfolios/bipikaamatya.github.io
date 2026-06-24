/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useAppSelector } from '../store/hooks';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

export default function Education() {
  const { education } = useAppSelector((state) => state.portfolio);

  return (
    <section className="bg-[#0A0A0B] py-16 border-t border-white/5" id="portfolio-education">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Education
          </h2>
          <p className="mt-3 text-zinc-400 max-w-xl">
            Strong academic base in computer systems engineering and advanced full-stack software architectures.
          </p>
        </div>

        {/* Education Timeline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {education.map((edu, index) => (
            <div 
              key={edu.id}
              className="relative overflow-hidden rounded-xl border border-white/5 bg-zinc-900/10 p-6 flex flex-col justify-between hover:border-white/10 transition-all group"
            >
              {/* Highlight bar for first item (ongoing master) */}
              {index === 0 && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500" />
              )}

              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 mb-5 group-hover:scale-105 transition-transform">
                  <GraduationCap size={20} />
                </div>

                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">
                  {edu.degree}
                </span>

                <h3 className="text-base font-bold text-white mt-1.5 leading-snug">
                  {edu.field}
                </h3>

                <p className="text-xs text-zinc-400 mt-2 font-medium">
                  {edu.institution}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {edu.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} />
                  {edu.location.split(',')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
