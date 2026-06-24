/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useAppSelector } from '../store/hooks';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  const { name, github, linkedin, email, location } = useAppSelector((state) => state.portfolio);

  const navigationItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'explorer', label: 'FastAPI Explorer' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/85 backdrop-blur-md" id="portfolio-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-zinc-900 rounded-lg flex items-center justify-center font-bold text-white text-base shadow-sm">B</div>
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight text-zinc-900 sm:text-lg">
              {name} <span className="text-zinc-300">/</span> <span className="text-zinc-500 font-normal">Full Stack</span>
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
              <MapPin size={11} className="text-indigo-600" />
              <span>{location}</span>
            </div>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold tracking-wide uppercase transition-all cursor-pointer ${
                activeSection === item.id
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/60'
              }`}
              id={`nav-btn-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Socials & Contact Actions */}
        <div className="flex items-center space-x-2">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
            title="GitHub Profile"
            id="social-github"
          >
            <Github size={18} />
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
            title="LinkedIn Profile"
            id="social-linkedin"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${email}`}
            className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
            title="Email Bipika"
            id="social-email"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>

      {/* Navigation - Mobile (Horizontal Scrollable) */}
      <div className="flex md:hidden border-t border-zinc-200/80 bg-white px-2 py-1 overflow-x-auto scrollbar-none gap-1">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`flex-none rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              activeSection === item.id
                ? 'bg-zinc-900 text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
            id={`mob-nav-btn-${item.id}`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}
