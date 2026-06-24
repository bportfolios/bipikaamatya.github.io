/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { submitContactForm, resetContactStatus } from '../store/portfolioSlice';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, Linkedin, Github } from 'lucide-react';

export default function Contact() {
  const dispatch = useAppDispatch();
  const { contactForm, messages, email, linkedin, github } = useAppSelector((state) => state.portfolio);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Reset contact form feedback status on unmount
  useEffect(() => {
    return () => {
      dispatch(resetContactStatus());
    };
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;
    
    dispatch(submitContactForm(formData));
  };

  // Reset form inputs upon successful submit
  useEffect(() => {
    if (contactForm.status === 'success') {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }
  }, [contactForm.status]);

  return (
    <section className="bg-[#0A0A0B] py-16 border-t border-white/5" id="portfolio-contact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Get In Touch
          </h2>
          <p className="mt-3 text-zinc-400 max-w-xl">
            Interested in starting a project, collaborating, or discussing software engineering roles? Send me a message!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Quick Contact info Card */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="rounded-2xl border border-white/5 bg-zinc-900/10 p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-white">Contact Information</h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 text-zinc-300">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Email Direct</p>
                    <a href={`mailto:${email}`} className="hover:text-indigo-400 transition-colors">{email}</a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-zinc-300">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Linkedin size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">LinkedIn Network</p>
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">bipika-amatya</a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-zinc-300">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                    <Github size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Github Repositories</p>
                    <a href={github} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">bportfolios</a>
                  </div>
                </div>
              </div>

              {/* Notice of simulated state explanation */}
              <div className="border-t border-white/5 pt-5 text-xs text-zinc-500 leading-relaxed">
                <p>
                  <strong>Note:</strong> Submitting this contact form dispatches a Redux Thunk action, simulating a live FastAPI insertion and updating the local portfolio messages state.
                </p>
              </div>
            </div>

            {/* Simulated Live Messages Logs (Only displays if user submits a message!) */}
            {messages.length > 0 && (
              <div className="rounded-2xl border border-indigo-500/25 bg-indigo-500/5 p-6 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">
                    Redux Store Logs ({messages.length})
                  </h4>
                  <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-[9px] font-mono text-indigo-400 border border-indigo-500/20">
                    Active State Saved
                  </span>
                </div>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {messages.map((msg) => (
                    <div key={msg.id} className="text-xs bg-zinc-950/85 p-3 rounded-lg border border-white/5">
                      <div className="flex justify-between font-bold text-white">
                        <span>{msg.name}</span>
                        <span className="text-zinc-500 font-mono text-[9px] font-normal">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-indigo-400 font-semibold mt-1">{msg.subject}</p>
                      <p className="text-zinc-400 mt-1 line-clamp-2 italic">"{msg.message}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 rounded-2xl border border-white/5 bg-zinc-900/10 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5" id="form-contact">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-bold uppercase text-zinc-400">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={contactForm.status === 'submitting'}
                    placeholder="John Doe"
                    className="rounded-lg bg-[#050506] border border-white/5 px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-indigo-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-bold uppercase text-zinc-400">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={contactForm.status === 'submitting'}
                    placeholder="john@example.com"
                    className="rounded-lg bg-[#050506] border border-white/5 px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-indigo-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-xs font-bold uppercase text-zinc-400">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={contactForm.status === 'submitting'}
                  placeholder="Collaboration Opportunities"
                  className="rounded-lg bg-[#050506] border border-white/5 px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-bold uppercase text-zinc-400">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={contactForm.status === 'submitting'}
                  placeholder="Describe your project, role, or proposal in details..."
                  className="rounded-lg bg-[#050506] border border-white/5 px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-indigo-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Form Feedback */}
              {contactForm.status === 'success' && (
                <div className="flex items-center gap-2 rounded-lg bg-green-500/10 border border-green-500/25 p-3.5 text-xs text-green-400">
                  <CheckCircle2 size={16} className="shrink-0" />
                  <span>Success! Your message was dispatched and saved locally. View the store logs!</span>
                </div>
              )}

              {contactForm.status === 'error' && (
                <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/25 p-3.5 text-xs text-red-400">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>Error: {contactForm.error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={contactForm.status === 'submitting'}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/15 disabled:opacity-50 disabled:pointer-events-none active:scale-98 cursor-pointer"
                id="btn-submit"
              >
                {contactForm.status === 'submitting' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Sending Message via Thunk...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
