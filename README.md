# Interview Trainer Agent

**Interview Trainer Agent** is an AI-powered interview preparation assistant that helps users prepare for job interviews efficiently and intelligently. Instead of relying on generic question banks, the system analyzes a candidate's resume, skills, experience, and target role to generate highly personalized interview questions, short model answers, and resume improvement suggestions.

Built with **IBM watsonx.ai, IBM Granite Models, Langflow, and React**, the project leverages **Retrieval-Augmented Generation (RAG)** to ground interview questions in real-world HR guidelines, industry expectations, and role-specific knowledge bases.

---

## Features

- **Resume Parsing & OCR**: Upload PDF or image-based resumes. The system extracts text automatically, handling scanned files through OCR.
- **Profile Analysis**: Identifies core skills, projects, education, domain, seniority, and role alignment.
- **Role-Based RAG Retrieval**: Fetches relevant contextual data (HR expectations, technical domains, behavioral scenarios) using Milvus Vector DB.
- **Personalized Q&A Generation**: Uses **IBM Granite Models** to generate 5-10 targeted interview questions (technical, behavioral, HR) and 2-3 line model answers.
- **Resume & Role Fit Suggestions**: Provides actionable feedback on missing keywords, project phrasing, and role alignment.
- **Multi-Agent Orchestration**: Powered by **Langflow** to route prompts between specialized agents (Question Generation, Answer Support, Readiness Evaluation).

---

## Architecture Overview

1. **User Inputs**: Candidate uploads resume and specifies Target Role, Skills, and Experience via a React dashboard.
2. **Data Pipeline**: Node.js/Express backend handles uploads, text cleaning, and profile extraction.
3. **RAG Layer**: Role embeddings are stored in a Vector DB. A retriever agent fetches relevant interview context.
4. **Agentic Planner (Langflow)**: Orchestrates the prompt chains, tool routing, and agent interactions.
5. **AI Generation (IBM watsonx.ai)**: IBM Granite LLM processes the context and generates safe, personalized interview content.
6. **User Outputs**: Structured Q&A, readiness score, and suggestions are returned to the user interface.

*(An architecture blueprint diagram can be found in the `docs/` or `screenshots/` folder).*

---

## Tech Stack

- **Frontend**: React, Vite
- **Backend**: Node.js, Express.js, Axios, Multer
- **AI & Models**: IBM watsonx.ai, IBM Granite Models (`Granite-4.0-8B-Instruct`)
- **Orchestration**: Langflow
- **Data & RAG**: Vector Database (Milvus / FAISS), LangChain
- **Processing**: PDF Parsing, Tesseract.js (OCR), Poppler Utilities
- **Deployment**: Render, IBM Cloud Lite

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- IBM Cloud Account with `watsonx.ai` access
- Tesseract OCR installed locally (for image parsing)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YourUsername/interview_trainer-agent.git
   cd interview_trainer-agent
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   # Create a .env file based on .env.example with your IBM watsonx credentials
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the application:**
   Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

---

## Future Scope

- **AI-Powered Mock Interview Simulation**: Conduct real-time voice-based mock interviews with active evaluation of clarity, confidence, and communication.
- **Company-Specific Guidance**: Tailor preparation sets based on the interview patterns of specific target companies.
- **Advanced Dashboard Analytics**: Track practice consistency, skill gaps, and readiness trends over multiple sessions.

---

## Disclaimer

*Interview Trainer Agent provides AI-generated interview guidance based on user-provided profile details. It is designed as a practice support system and does not guarantee job selection, official evaluation, or professional recruitment decisions.*

---
**Prepared by:** Gungun
