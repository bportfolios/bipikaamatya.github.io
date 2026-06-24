/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { PortfolioState, ContactMessage } from '../types';
import { backendCodeFiles } from '../data/backendCode';

// Async Thunk simulating a post request to a backend API (FastAPI) to submit a contact message
export const submitContactForm = createAsyncThunk(
  'portfolio/submitContactForm',
  async (messageData: Omit<ContactMessage, 'id' | 'timestamp'>, { rejectWithValue }) => {
    try {
      // Simulate network request to our FastAPI server
      await new Promise((resolve) => setTimeout(resolve, 1200));
      
      // In a real environment, this would be:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(messageData),
      // });
      // if (!response.ok) throw new Error('Failed to submit message');
      // return await response.json();

      const successMessage: ContactMessage = {
        id: Math.random().toString(36).substring(2, 9),
        ...messageData,
        timestamp: new Date().toISOString(),
      };
      return successMessage;
    } catch (err: any) {
      return rejectWithValue(err.message || 'An unexpected error occurred');
    }
  }
);

const initialState: PortfolioState = {
  name: "Bipika Amatya",
  title: "Experienced Software & Backend Developer",
  email: "bipika.amatya@gmail.com",
  linkedin: "https://www.linkedin.com/in/bipika-amatya",
  github: "https://www.github.com/bportfolios",
  location: "Tampere, Finland",
  summary: "Experienced Software Developer with nearly a decade of expertise specializing in Application and Backend Development. Dedicated team player with a focus on user satisfaction. Passionate about taking on complex web technology challenges and leveraging years of production experience to deliver high-quality, high-performance web systems and APIs.",
  skills: [
    {
      id: "languages",
      name: "Programming Languages",
      skills: ["Python", "JavaScript", "TypeScript", "SQL", "Java", "C/C++", "PL/SQL", "HTML/CSS"]
    },
    {
      id: "backend",
      name: "Backend Frameworks & Libs",
      skills: ["FastAPI", "Express.js", "Node.js", "SQLAlchemy ORM", "Alembic", "Entity Framework", "Pydantic"]
    },
    {
      id: "frontend",
      name: "Frontend Frameworks & Libs",
      skills: ["React", "Redux Toolkit", "Vue.js", "Thunk", "Tailwind CSS", "jQuery", "AJAX"]
    },
    {
      id: "databases",
      name: "Database Systems",
      skills: ["PostgreSQL", "MongoDB", "Oracle PL/SQL", "Microsoft SQL Server", "PL/SQL"]
    },
    {
      id: "tools",
      name: "Industry Tools & DevOps",
      skills: ["Docker", "Docker Compose", "Poetry", "Git / GitLab CI", "SVN", "Google Cloud", "Upcloud", "Swagger / OpenAPI", "JIRA", "Confluence"]
    }
  ],
  experience: [
    {
      id: "bithouse",
      role: "Software Developer",
      company: "Bithouse Oy",
      location: "Tampere, Finland",
      period: "October 2020 – Present",
      responsibilities: [
        "Design, develop, and deploy cloud-scale web applications and APIs utilizing Python and FastAPI.",
        "Maintain high-integrity PostgreSQL schemas, orchestrating complex database normalization, data modeling, and migrations.",
        "Document and secure asynchronous REST APIs via Swagger/OpenAPI integration.",
        "Implement containerized deployments utilizing Docker and Docker Compose.",
        "Build, deploy, and maintain cloud-based software architectures on Google Cloud Services and Upcloud, optimizing scalability and operational performance.",
        "Set up robust CI/CD pipelines in GitLab to facilitate rapid, tested deployments and code quality checks.",
        "Collaborate actively in Agile/Scrum cross-functional team sprints to evaluate and architect technical requirements."
      ]
    },
    {
      id: "teleste",
      role: "Software Developer",
      company: "Teleste Information Solutions",
      location: "Tampere, Finland",
      period: "Nov 2019 – Nov 2020",
      responsibilities: [
        "Conducted in-depth analysis and technical research on passenger announcement systems to optimize public transport integration.",
        "Developed and successfully deployed sophisticated synthetic/artificial voice announcement solutions using Java, C/C++, Maven, and PostgreSQL.",
        "Conducted rigorous unit testing and integration audits for client-specific changes, significantly reducing runtime anomalies.",
        "Utilized Mockito for mocking behavior and comprehensive coverage testing."
      ]
    },
    {
      id: "cotiviti",
      role: "Software / Data Engineer",
      company: "Cotiviti Nepal Pvt. Ltd.",
      location: "Kathmandu, Nepal (Subsidiary of Cotiviti Healthcare, USA)",
      period: "Aug 2014 – Jul 2018",
      responsibilities: [
        "Designed, optimized, and maintained mission-critical ETL data pipelines dealing with healthcare metrics using Oracle PL/SQL.",
        "Reviewed, audited, and tested high-throughput code for specialized database change requests to ensure strict compliance.",
        "Optimized database execution paths and ETL jobs, resulting in a remarkable 60% – 70% reduction in processing time through job parallelization, query tuning, and index redesigning.",
        "Successfully guided and executed legacy system migrations to modern ODI (Oracle Data Integrator) environments, maintaining absolute business continuity."
      ]
    },
    {
      id: "braindigit",
      role: "Software Developer Intern",
      company: "Braindigit IT Solution",
      location: "Kathmandu, Nepal",
      period: "Feb 2014 – Apr 2014",
      responsibilities: [
        "Contributed to full-stack web applications utilizing ASP.NET, C#, and jQuery.",
        "Built and queried relational schemas on Microsoft SQL Server 2012, utilizing T-SQL stored procedures and Entity Framework.",
        "Leveraged AJAX for asynchronous front-to-back state transfers, enhancing modern client experiences.",
        "Gained direct exposure to professional software engineering standards, version control systems, and release cadences."
      ]
    }
  ],
  education: [
    {
      id: "edu-meng",
      degree: "Master of Engineering",
      field: "Full Stack Software Development",
      period: "August 2022 – Present",
      institution: "Jyväskylä University of Applied Sciences",
      location: "Jyväskylä, Finland"
    },
    {
      id: "edu-msc",
      degree: "Master of Science",
      field: "Cognitive Computing and Collective Intelligence",
      period: "August 2018 – June 2020",
      institution: "University of Jyväskylä",
      location: "Jyväskylä, Finland"
    },
    {
      id: "edu-beng",
      degree: "Bachelor's in Engineering",
      field: "Computer Engineering",
      period: "December 2009 – June 2014",
      institution: "Tribhuvan University",
      location: "Kathmandu, Nepal"
    }
  ],
  projects: [
    {
      id: "proj-fastapi",
      title: "FastAPI + Postgres Template System",
      description: "A production-grade, highly architectural backend template featuring async database connections, robust container configuration, migrations control via Alembic, and Pydantic validation.",
      techStack: ["FastAPI", "Python", "SQLAlchemy ORM", "PostgreSQL", "Alembic", "Poetry", "Docker", "Docker Compose"],
      type: "backend-example"
    },
    {
      id: "proj-dentist",
      title: "Dentist Reservation System Backend",
      description: "A secure scheduling and reservations management backend supporting calendar lookups, user confirmation triggers, and slot conflict guards.",
      techStack: ["Javascript", "Node.js", "Express.js", "MongoDB"],
      link: "https://github.com/bportfolios",
      type: "personal"
    },
    {
      id: "proj-shop",
      title: "Interactive E-Commerce Shop",
      description: "A responsive React web store featuring category filtering, reactive basket tallies, and live Firebase client synchronization.",
      techStack: ["Javascript", "React.js", "React Hooks", "Firebase"],
      link: "https://github.com/bportfolios",
      type: "personal"
    },
    {
      id: "proj-dating",
      title: "Full-Featured Dating App",
      description: "A sleek swipe-based profile finder complete with mutual match triggers and real-time chatting functions.",
      techStack: ["Javascript", "React.js", "React Hooks", "Firebase"],
      link: "https://github.com/bportfolios",
      type: "personal"
    },
    {
      id: "proj-video",
      title: "WebRTC Video Call Hub",
      description: "A real-time WebRTC browser-to-browser peer calling application featuring dynamic camera toggle toggles and immediate signaling relays.",
      techStack: ["Javascript", "React.js", "React Hooks", "Firebase"],
      link: "https://github.com/bportfolios",
      type: "personal"
    }
  ],
  backendFiles: backendCodeFiles,
  selectedFilePath: "app/main.py",
  contactForm: {
    status: 'idle',
    error: null,
  },
  messages: []
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setSelectedFilePath(state, action: PayloadAction<string>) {
      state.selectedFilePath = action.payload;
    },
    resetContactStatus(state) {
      state.contactForm.status = 'idle';
      state.contactForm.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.contactForm.status = 'submitting';
        state.contactForm.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state, action: PayloadAction<ContactMessage>) => {
        state.contactForm.status = 'success';
        state.messages.push(action.payload);
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.contactForm.status = 'error';
        state.contactForm.error = (action.payload as string) || 'Could not send message.';
      });
  }
});

export const { setSelectedFilePath, resetContactStatus } = portfolioSlice.actions;
export default portfolioSlice.reducer;
