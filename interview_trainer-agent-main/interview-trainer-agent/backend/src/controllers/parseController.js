import fs from "fs";
import { extractTextFromPdf } from "../services/pdfService.js";
import { extractTextFromImage } from "../services/ocrService.js";

export const parsePdfResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF file uploaded"
      });
    }

    const text = await extractTextFromPdf(req.file.path);

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
};

export const parseImageResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded"
      });
    }

    const text = await extractTextFromImage(req.file.buffer);

    return res.status(200).json({
      success: true,
      text
    });
  } catch (error) {
    next(error);
  }
};