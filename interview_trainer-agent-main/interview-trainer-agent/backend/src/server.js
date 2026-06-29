import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import interviewRoutes from "./routes/interviewRoutes.js";
import parseRoutes from "./routes/parseRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Interview Trainer Backend Running"
  });
});

app.use("/api/interview", interviewRoutes);
app.use("/api/parse", parseRoutes);

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  let message = err.message || "Internal Server Error";
  let status = 500;

  try {
    const parsed = JSON.parse(err.message);
    status = parsed.status || 500;
    message =
      typeof parsed.data === "string"
        ? parsed.data
        : parsed.data?.errors?.[0]?.message ||
          parsed.data?.error ||
          JSON.stringify(parsed.data);
  } catch {
    status = err.status || 500;
  }

  res.status(status).json({
    success: false,
    message
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});