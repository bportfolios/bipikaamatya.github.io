/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setSelectedFilePath } from '../store/portfolioSlice';
import { 
  FileCode, Folder, FolderOpen, Terminal, Check, Copy, 
  Search, ShieldCheck, HelpCircle, Server, Database, Cpu 
} from 'lucide-react';

export default function CodeExplorer() {
  const dispatch = useAppDispatch();
  const { backendFiles, selectedFilePath } = useAppSelector((state) => state.portfolio);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Find active file
  const activeFile = useMemo(() => {
    return backendFiles.find((f) => f.path === selectedFilePath) || backendFiles[0];
  }, [backendFiles, selectedFilePath]);

  // Handle copying code
  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Directory structure organization
  const filesByDir = useMemo(() => {
    const rootFiles: typeof backendFiles = [];
    const appFiles: typeof backendFiles = [];
    const migrationsFiles: typeof backendFiles = [];

    backendFiles.forEach((file) => {
      if (file.path.startsWith('app/')) {
        appFiles.push(file);
      } else if (file.path.startsWith('migrations/')) {
        migrationsFiles.push(file);
      } else {
        rootFiles.push(file);
      }
    });

    return { rootFiles, appFiles, migrationsFiles };
  }, [backendFiles]);

  // Syntax highlighting helper for presentation
  const highlightedCode = useMemo(() => {
    const code = activeFile.content;
    if (!searchQuery) {
      return code;
    }
    
    // Simple text search highlighting
    const escapedQuery = searchQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    return code.replace(regex, '<mark class="bg-indigo-500/30 text-white rounded px-0.5">$1</mark>');
  }, [activeFile.content, searchQuery]);

  return (
    <section className="bg-[#FBFBFA] py-16 border-b border-zinc-200/80" id="portfolio-explorer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 border border-indigo-100 mb-3">
            <Terminal size={12} />
            Interactive Code Showcase
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            Asynchronous FastAPI Backend Codebase
          </h2>
          <p className="mt-3 text-zinc-500 max-w-2xl text-sm leading-relaxed">
            Examine my backend architecture patterns! Use the explorer tree to navigate schemas, databases, dockerization, and migrations. Search inside code or copy sections for your projects.
          </p>
        </div>

        {/* The IDE container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl border border-zinc-200 bg-zinc-950 overflow-hidden shadow-xl">
          
          {/* 1. Folder File Tree Sidebar (lg:col-span-3) */}
          <div className="lg:col-span-3 border-r border-white/5 bg-[#0D0D0E]/80 p-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider font-bold text-zinc-500 mb-4 border-b border-white/5 pb-2">
              <span>Workspace Files</span>
              <Terminal size={12} className="text-zinc-600" />
            </div>

            <div className="space-y-4 text-sm select-none">
              
              {/* App Directory */}
              <div>
                <div className="flex items-center gap-1.5 text-zinc-300 font-semibold px-2 py-1">
                  <FolderOpen size={16} className="text-indigo-400" />
                  <span>app /</span>
                </div>
                <div className="ml-4 border-l border-white/5 pl-1.5 space-y-0.5 mt-1">
                  {filesByDir.appFiles.map((file) => (
                    <button
                      key={file.path}
                      onClick={() => dispatch(setSelectedFilePath(file.path))}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left text-xs font-medium transition-colors cursor-pointer ${
                        selectedFilePath === file.path
                          ? 'bg-zinc-900 text-indigo-400'
                          : 'text-zinc-400 hover:bg-zinc-900/40 hover:text-zinc-200'
                      }`}
                      id={`file-tree-${file.name.replace('.', '-')}`}
                    >
                      <FileCode size={14} className={selectedFilePath === file.path ? 'text-indigo-400' : 'text-zinc-500'} />
                      <span>{file.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Migrations Directory */}
              <div>
                <div className="flex items-center gap-1.5 text-zinc-300 font-semibold px-2 py-1">
                  <Folder size={16} className="text-cyan-400" />
                  <span>migrations /</span>
                </div>
                <div className="ml-4 border-l border-white/5 pl-1.5 space-y-0.5 mt-1">
                  {filesByDir.migrationsFiles.map((file) => (
                    <button
                      key={file.path}
                      onClick={() => dispatch(setSelectedFilePath(file.path))}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left text-xs font-medium transition-colors cursor-pointer ${
                        selectedFilePath === file.path
                          ? 'bg-zinc-900 text-indigo-400'
                          : 'text-zinc-400 hover:bg-zinc-900/40 hover:text-zinc-200'
                      }`}
                      id={`file-tree-${file.name.replace('.', '-')}`}
                    >
                      <FileCode size={14} className={selectedFilePath === file.path ? 'text-indigo-400' : 'text-zinc-500'} />
                      <span>{file.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Root Files */}
              <div className="space-y-0.5 pt-2 border-t border-white/5">
                {filesByDir.rootFiles.map((file) => (
                  <button
                    key={file.path}
                    onClick={() => dispatch(setSelectedFilePath(file.path))}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left text-xs font-medium transition-colors cursor-pointer ${
                      selectedFilePath === file.path
                        ? 'bg-zinc-900 text-indigo-400'
                        : 'text-zinc-400 hover:bg-zinc-900/40 hover:text-zinc-200'
                    }`}
                    id={`file-tree-${file.name.replace('.', '-')}`}
                  >
                    <FileCode size={14} className={selectedFilePath === file.path ? 'text-indigo-400' : 'text-zinc-500'} />
                    <span>{file.name}</span>
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* 2. Main IDE code view area (lg:col-span-9) */}
          <div className="lg:col-span-9 flex flex-col bg-[#080809]">
            
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 px-4 py-3 bg-[#0D0D0E]/50">
              
              {/* Filename & Info */}
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded bg-zinc-900 border border-white/10 px-2 py-1 font-mono text-indigo-400">
                  {activeFile.path}
                </span>
                <span className="text-zinc-600">|</span>
                <span className="text-zinc-400 font-medium line-clamp-1">
                  {activeFile.description}
                </span>
              </div>

              {/* Action Buttons: Copy, Search */}
              <div className="flex items-center gap-2 justify-end">
                {/* Search Bar inside file */}
                <div className="relative flex items-center w-44 sm:w-48">
                  <Search className="absolute left-2.5 text-zinc-500" size={13} />
                  <input
                    type="text"
                    placeholder="Find in code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded bg-zinc-900 py-1 pl-7 pr-2.5 text-[11px] text-white placeholder-zinc-600 border border-white/5 focus:border-indigo-500 focus:outline-none transition-colors font-mono"
                  />
                </div>

                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded bg-zinc-900 border border-white/5 px-2.5 py-1 text-xs font-semibold text-zinc-300 hover:bg-zinc-850 hover:text-white transition-colors cursor-pointer"
                  id="btn-copy-code"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="text-green-400" />
                      <span className="text-green-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Main Code Editor Window */}
            <div className="relative flex-1 overflow-auto max-h-[500px] min-h-[380px] p-4 font-mono text-xs text-zinc-300 leading-relaxed scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
              
              {/* Highlight markings inside pre */}
              {searchQuery ? (
                <pre className="whitespace-pre overflow-x-auto selection:bg-zinc-850 select-text">
                  <code 
                    dangerouslySetInnerHTML={{ __html: highlightedCode }} 
                    className="block font-mono text-[11.5px]"
                  />
                </pre>
              ) : (
                <div className="flex select-text">
                  {/* Fake Line Numbers for IDE look */}
                  <div className="text-zinc-600 text-right pr-4 select-none border-r border-white/5 font-mono text-[11px] w-8 shrink-0">
                    {activeFile.content.split('\n').map((_, index) => (
                      <div key={index}>{index + 1}</div>
                    ))}
                  </div>
                  {/* Real Code */}
                  <pre className="pl-4 whitespace-pre overflow-x-auto selection:bg-zinc-850">
                    <code className="block text-[11.5px] font-mono leading-relaxed text-zinc-300">
                      {activeFile.content}
                    </code>
                  </pre>
                </div>
              )}

            </div>

            {/* Editor Status Bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#0D0D0E] border-t border-white/5 text-[10px] text-zinc-500 font-semibold select-none">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-indigo-400">
                  <ShieldCheck size={12} />
                  Strict Types Enabled
                </span>
                <span>Language: <span className="text-zinc-400 uppercase font-mono">{activeFile.language}</span></span>
              </div>
              <div>
                <span>UTF-8</span>
              </div>
            </div>

          </div>

        </div>

        {/* Integration Explanation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          
          <div className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-3">
              <Server size={16} className="text-indigo-600" />
              <h4 className="text-sm font-bold text-zinc-900">FastAPI & Pydantic</h4>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Provides near-instant request-response loops with standard Swagger UI. Schema validations guarantee absolute model safety.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-3">
              <Database size={16} className="text-cyan-600" />
              <h4 className="text-sm font-bold text-zinc-900">SQLAlchemy & Alembic</h4>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Full async session handling prevents blocking Node-like threads. Auto-generates versions for schema change auditing.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-3">
              <Cpu size={16} className="text-indigo-600" />
              <h4 className="text-sm font-bold text-zinc-900">Docker & Poetry</h4>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Containerizes dependencies cleanly under single isolation. Compose binds services so local and production stay uniform.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
