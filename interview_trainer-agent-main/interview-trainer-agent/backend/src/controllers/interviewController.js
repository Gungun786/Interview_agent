import { buildInterviewPrompt } from "../services/promptBuilderService.js";
import { generateInterviewContent } from "../services/llamaService.js";

const extractJsonString = (rawText) => {
  if (!rawText || typeof rawText !== "string") return null;

  const cleaned = rawText
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    return null;
  }

  return cleaned.slice(firstBrace, lastBrace + 1);
};

const normalizeCsvField = (value) => {
  if (Array.isArray(value)) return value;

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

export const generateInterview = async (req, res, next) => {
  try {
    const {
      name,
      location,
      education,
      experienceLevel,
      jobRole,
      skills,
      projects,
      certifications,
      resumeText
    } = req.body;

    if (!resumeText && !jobRole) {
      return res.status(400).json({
        success: false,
        message: "resumeText or jobRole is required"
      });
    }

    const prompt = buildInterviewPrompt({
      name,
      location,
      education,
      experienceLevel,
      role: jobRole,
      skills: normalizeCsvField(skills),
      projects: normalizeCsvField(projects),
      certifications,
      resumeText
    });

    const output = await generateInterviewContent(prompt);
    const jsonString = extractJsonString(output);

    if (!jsonString) {
      return res.status(500).json({
        success: false,
        message: "Model did not return valid JSON",
        rawOutput: output
      });
    }

    const parsed = JSON.parse(jsonString);

    return res.status(200).json({
      success: true,
      data: parsed
    });
  } catch (error) {
    next(error);
  }
};