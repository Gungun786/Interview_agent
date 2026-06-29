import fs from "fs";
import path from "path";
import os from "os";
import { promisify } from "util";
import { execFile } from "child_process";
import pdfParse from "pdf-parse-debugging-disabled";

const execFileAsync = promisify(execFile);

const safeUnlink = (filePath) => {
  try {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error("Failed to delete file:", filePath, error.message);
  }
};

export const extractTextFromPdf = async (pdfPathOrBuffer) => {
  if (!pdfPathOrBuffer) {
    throw new Error("PDF input is required");
  }

  if (Buffer.isBuffer(pdfPathOrBuffer)) {
    const parsed = await pdfParse(pdfPathOrBuffer);
    return parsed.text || "";
  }

  const pdfPath = pdfPathOrBuffer;
  const outputBase = path.join(
    os.tmpdir(),
    `resume-${Date.now()}-${Math.random().toString(36).slice(2)}`
  );
  const outputTxtPath = `${outputBase}.txt`;

  try {
    await execFileAsync("pdftotext", ["-layout", pdfPath, outputTxtPath], {
      maxBuffer: 20 * 1024 * 1024
    });

    if (!fs.existsSync(outputTxtPath)) {
      return "";
    }

    const text = fs.readFileSync(outputTxtPath, "utf8");
    return text || "";
  } catch (error) {
    console.error("pdftotext failed:", error.message);

    const fileBuffer = fs.readFileSync(pdfPath);
    const parsed = await pdfParse(fileBuffer);
    return parsed.text || "";
  } finally {
    safeUnlink(outputTxtPath);
  }
};

export const convertPdfFirstPageToPng = async (pdfPath) => {
  if (!pdfPath) {
    throw new Error("PDF path is required");
  }

  const outputBase = path.join(
    os.tmpdir(),
    `pdf-page-${Date.now()}-${Math.random().toString(36).slice(2)}`
  );
  const outputPngPath = `${outputBase}.png`;

  await execFileAsync(
    "pdftoppm",
    ["-png", "-f", "1", "-singlefile", pdfPath, outputBase],
    { maxBuffer: 20 * 1024 * 1024 }
  );

  if (!fs.existsSync(outputPngPath)) {
    throw new Error("Failed to generate PNG from PDF");
  }

  return outputPngPath;
};

export const cleanupTempFile = safeUnlink;