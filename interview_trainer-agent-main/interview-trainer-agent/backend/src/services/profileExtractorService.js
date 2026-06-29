export const extractProfileData = ({
  name = "",
  role = "",
  experienceLevel = "",
  education = "",
  skills = [],
  projects = [],
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

  const inferredRole =
    role ||
    (resumeText?.toLowerCase().includes("react") ? "Frontend Developer" : "General Candidate");

  return {
    name: name || "Candidate",
    role: inferredRole,
    experienceLevel: experienceLevel || "Fresher",
    education: education || "",
    skills: normalizedSkills,
    projects: normalizedProjects,
    certifications: certifications || "",
    resumeText: resumeText || ""
  };
};