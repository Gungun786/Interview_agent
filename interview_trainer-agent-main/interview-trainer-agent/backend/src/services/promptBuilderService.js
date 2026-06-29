export const buildInterviewPrompt = ({
  name = "Candidate",
  role = "General Candidate",
  experienceLevel = "Fresher",
  skills = [],
  projects = [],
  education = "",
  certifications = "",
  resumeText = ""
}) => {
  const normalizedSkills = Array.isArray(skills)
    ? skills
    : typeof skills === "string"
    ? skills.split(",").map((item) => item.trim()).filter(Boolean)
    : [];

  const normalizedProjects = Array.isArray(projects)
    ? projects
    : typeof projects === "string"
    ? projects.split(",").map((item) => item.trim()).filter(Boolean)
    : [];

  return `
You are an Interview Trainer Agent powered by IBM Granite.

Your task is to generate interview preparation content based only on the candidate data below.

CANDIDATE DETAILS:
Name: ${name || "Candidate"}
Role: ${role || "General Candidate"}
Experience Level: ${experienceLevel || "Fresher"}
Education: ${education || "Not provided"}
Skills: ${normalizedSkills.length ? normalizedSkills.join(", ") : "Not provided"}
Projects: ${normalizedProjects.length ? normalizedProjects.join(", ") : "Not provided"}
Certifications: ${certifications || "Not provided"}
Resume Text: ${resumeText || "Not provided"}

STRICT RULES:
1. Use only the skills, projects, education, certifications, and resume content provided above.
2. Do not invent tools, certifications, companies, internships, achievements, or technologies.
3. Do not add anything that is not clearly present in the provided candidate data.
4. Write all answers in first person.
5. Make the answers sound natural, simple, and student-friendly.
6. Keep each answer to 2 to 3 short lines only.
7. Generate exactly 5 interview questions only.
8. Each question must be one line only.
9. Questions should cover technical, project, behavioral, and HR areas relevant to the role.
10. Add exactly 3 short and practical suggestions for resume or role improvement.
11. Keep suggestions specific to missing keywords, project clarity, or role alignment.
12. Add a profileType field.
13. Add a resumeScore field out of 100.
14. Add a breakdown object with these keys only:
   - keywordMatch
   - projectClarity
   - communication
   - roleFit
   - readiness
15. Return valid JSON only.
16. Do not use markdown.
17. Do not wrap JSON in code fences.
18. Do not write any explanation before or after the JSON.

RETURN THIS EXACT JSON SHAPE:
{
  "profileType": "Frontend Developer",
  "resumeScore": 78,
  "breakdown": {
    "keywordMatch": 20,
    "projectClarity": 18,
    "communication": 15,
    "roleFit": 15,
    "readiness": 10
  },
  "questions": [
    {
      "question": "string",
      "answer": "string"
    },
    {
      "question": "string",
      "answer": "string"
    },
    {
      "question": "string",
      "answer": "string"
    },
    {
      "question": "string",
      "answer": "string"
    },
    {
      "question": "string",
      "answer": "string"
    }
  ],
  "suggestions": [
    "string",
    "string",
    "string"
  ]
}
`.trim();
};