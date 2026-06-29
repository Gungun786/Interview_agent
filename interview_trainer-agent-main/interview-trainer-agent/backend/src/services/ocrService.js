import fs from "fs";
import path from "path";
import os from "os";
import { promisify } from "util";
import { execFile } from "child_process";
import Tesseract from "tesseract.js";

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

const getPdftoppmCommand = () => {
  if (process.env.POPPLER_PATH) {
    return path.join(process.env.POPPLER_PATH, "pdftoppm");
  }
  return "pdftoppm";
};

export const extractTextFromImage = async (imageBuffer) => {
  if (!imageBuffer) {
    throw new Error("Image buffer is required");
  }

  const result = await Tesseract.recognize(imageBuffer, "eng");
  return result?.data?.text || "";
};

export const extractTextFromScannedPdf = async (pdfPath) => {
  if (!pdfPath) {
    throw new Error("PDF path is required");
  }

  const outputBase = path.join(
    os.tmpdir(),
    `scanned-pdf-${Date.now()}-${Math.random().toString(36).slice(2)}`
  );
  const outputPngPath = `${outputBase}.png`;

  try {
    await execFileAsync(
      getPdftoppmCommand(),
      ["-png", "-f", "1", "-singlefile", pdfPath, outputBase],
      { maxBuffer: 20 * 1024 * 1024 }
    );

    if (!fs.existsSync(outputPngPath)) {
      throw new Error("Failed to convert scanned PDF page to image");
    }

    const imageBuffer = fs.readFileSync(outputPngPath);
    const result = await Tesseract.recognize(imageBuffer, "eng");

    return result?.data?.text || "";
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(
        "Poppler is not installed or pdftoppm is not in PATH. Install Poppler and set POPPLER_PATH if needed."
      );
    }
    throw error;
  } finally {
    safeUnlink(outputPngPath);
  }
};