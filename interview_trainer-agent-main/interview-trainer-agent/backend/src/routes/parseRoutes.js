import express from "express";
import multer from "multer";
import fs from "fs";
import { extractTextFromPdf } from "../services/pdfService.js";
import {
  extractTextFromImage,
  extractTextFromScannedPdf
} from "../services/ocrService.js";
import { cleanResumeText } from "../utils/cleanText.js";

const router = express.Router();

const pdfUpload = multer({ dest: "uploads/" });
const imageUpload = multer({ storage: multer.memoryStorage() });

router.post("/pdf", pdfUpload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF file uploaded"
      });
    }

    let rawText = await extractTextFromPdf(req.file.path);
    let text = cleanResumeText(rawText);

    if (!text) {
      rawText = await extractTextFromScannedPdf(req.file.path);
      text = cleanResumeText(rawText);
    }

    if (req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(200).json({
      success: true,
      text
    });
  } catch (error) {
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
});

router.post("/image", imageUpload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded"
      });
    }

    const rawText = await extractTextFromImage(req.file.buffer);
    const text = cleanResumeText(rawText);

    return res.status(200).json({
      success: true,
      text
    });
  } catch (error) {
    next(error);
  }
});

export default router;