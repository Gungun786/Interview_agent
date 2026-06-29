export const cleanResumeText = (text) => {
  return text
    .replace(/\[([^\]]+)\]\(mailto:[^)]+\)/g, "$1")
    .replace(/\r/g, "")
    .replace(/-\n/g, "")
    .replace(/\n(?=[a-z])/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n\n")
    .trim();
};