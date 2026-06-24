/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  period: string;
  institution: string;
  location: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  type: 'personal' | 'backend-example';
}

export interface BackendFile {
  path: string;
  name: string;
  language: string;
  content: string;
  description: string;
}

export interface PortfolioState {
  name: string;
  title: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
  summary: string;
  skills: SkillCategory[];
  experience: WorkExperience[];
  education: EducationItem[];
  projects: ProjectItem[];
  backendFiles: BackendFile[];
  selectedFilePath: string;
  contactForm: {
    status: 'idle' | 'submitting' | 'success' | 'error';
    error: string | null;
  };
  messages: ContactMessage[];
}
