export const normalizeInterviewResponse = (payload) => {
  const raw = payload?.data ?? payload ?? {};

  let normalizedRaw = raw;

  if (typeof raw.output === "string") {
    try {
      const parsed = JSON.parse(raw.output);
      normalizedRaw = { ...raw, ...parsed };
    } catch {
      normalizedRaw = raw;
    }
  }

  const profileType =
    normalizedRaw.profileType ||
    normalizedRaw.profile ||
    normalizedRaw.role ||
    normalizedRaw.jobRole ||
    "Candidate";

  const experienceLevel =
    normalizedRaw.experienceLevel ||
    normalizedRaw.experience ||
    normalizedRaw.level ||
    "";

  const resumeScore =
    normalizedRaw.resumeScore ??
    normalizedRaw.score ??
    normalizedRaw.matchScore ??
    0;

  const breakdown =
    normalizedRaw.scoreBreakdown ||
    normalizedRaw.breakdown ||
    {};

  const questions = Array.isArray(normalizedRaw.questions)
    ? normalizedRaw.questions.map((item, index) => {
        if (typeof item === "string") {
          return {
            id: index + 1,
            question: item,
            answer: ""
          };
        }

        return {
          id: item.id || index + 1,
          question: item.question || `Question ${index + 1}`,
          answer: item.answer || ""
        };
      })
    : [];

  const suggestions = Array.isArray(normalizedRaw.suggestions)
    ? normalizedRaw.suggestions
    : [];

  return {
    profileType,
    experienceLevel,
    resumeScore,
    breakdown,
    questions,
    suggestions
  };
};