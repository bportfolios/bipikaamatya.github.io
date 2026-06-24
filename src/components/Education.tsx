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
    <section className="bg-[#FBFBFA] py-16 border-t border-zinc-200/80" id="portfolio-education">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            Education
          </h2>
          <p className="mt-3 text-zinc-500 max-w-xl">
            Strong academic base in computer systems engineering and advanced full-stack software architectures.
          </p>
        </div>

        {/* Education Timeline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {education.map((edu, index) => (
            <div 
              key={edu.id}
              className="relative overflow-hidden rounded-xl border border-zinc-200/80 bg-white p-6 flex flex-col justify-between hover:shadow-md hover:border-zinc-300 transition-all group shadow-sm"
            >
              {/* Highlight bar for first item (ongoing master) */}
              {index === 0 && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-indigo-800" />
              )}

              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 mb-5 group-hover:scale-105 transition-transform">
                  <GraduationCap size={20} />
                </div>

                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                  {edu.degree}
                </span>

                <h3 className="text-base font-bold text-zinc-900 mt-1.5 leading-snug">
                  {edu.field}
                </h3>

                <p className="text-xs text-zinc-500 mt-2 font-medium">
                  {edu.institution}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-400">
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
