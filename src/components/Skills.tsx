/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { Code2, Database, Laptop, Settings, Cpu, Search } from 'lucide-react';

export default function Skills() {
  const { skills } = useAppSelector((state) => state.portfolio);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'languages':
        return <Code2 className="text-indigo-600" size={18} />;
      case 'backend':
        return <Cpu className="text-indigo-600" size={18} />;
      case 'frontend':
        return <Laptop className="text-indigo-600" size={18} />;
      case 'databases':
        return <Database className="text-indigo-600" size={18} />;
      default:
        return <Settings className="text-indigo-600" size={18} />;
    }
  };

  // Filter skills based on search query and category
  const filteredSkills = skills.map(category => {
    // If we have selected a specific category, and this isn't it, return empty matches
    if (selectedCategory !== 'all' && category.id !== selectedCategory) {
      return { ...category, skills: [] };
    }
    
    // Filter skills inside the category by search query
    const matched = category.skills.filter(s => 
      s.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return {
      ...category,
      skills: matched
    };
  }).filter(category => category.skills.length > 0);

  return (
    <section className="bg-[#FBFBFA] py-16 border-y border-zinc-200/80" id="portfolio-skills">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            Core Competencies
          </h2>
          <p className="mt-3 text-zinc-500 max-w-xl">
            A specialized overview of programming ecosystems, database patterns, and cloud infrastructures built throughout nearly a decade of software development.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-zinc-50 p-4 rounded-xl border border-zinc-200/80">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              All Skills
            </button>
            {skills.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-zinc-900 text-white shadow-sm'
                    : 'bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative flex items-center w-full md:w-64">
            <Search className="absolute left-3 text-zinc-400" size={16} />
            <input
              type="text"
              placeholder="Search skill (e.g. FastAPI)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg bg-white py-2 pl-9 pr-4 text-sm text-zinc-800 placeholder-zinc-400 border border-zinc-200 focus:border-indigo-600 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.length > 0 ? (
            filteredSkills.map((cat) => (
              <div 
                key={cat.id} 
                className="rounded-xl border border-zinc-200/80 bg-white p-6 flex flex-col justify-between hover:shadow-md hover:border-zinc-300 transition-all shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-5 border-b border-zinc-100 pb-3">
                    {getCategoryIcon(cat.id)}
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                      {cat.name}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-zinc-50 border border-zinc-200/60 px-2.5 py-1 text-xs font-medium text-zinc-700 hover:border-indigo-600 hover:text-indigo-600 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Additional metadata context for the category */}
                <div className="text-[11px] text-zinc-400 mt-6 border-t border-zinc-100 pt-3">
                  {cat.id === 'backend' && 'Experience implementing async APIs, models, and background task architectures.'}
                  {cat.id === 'languages' && 'Extensive daily usage in high-concurrency systems and data engineering.'}
                  {cat.id === 'frontend' && 'Focusing on clean modular state, asynchronous side effects, and custom layouts.'}
                  {cat.id === 'databases' && 'Highly skilled in structural query optimizations, transactions and modeling.'}
                  {cat.id === 'tools' && 'Strong expertise in infrastructure, pipeline configuration and DevOps.'}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-zinc-400">
              <span className="text-sm font-medium mb-1">No matching skills found</span>
              <span className="text-xs">Try searching for a different term or clearing the search filter.</span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
