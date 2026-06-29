import { useState } from "react";
import Header from "../components/Header";
import ResumeUpload from "../components/ResumeUpload";
import LoadingSpinner from "../components/LoadingSpinner";
import ScoreCard from "../components/ScoreCard";
import ProfileCard from "../components/ProfileCard";
import QuestionCard from "../components/QuestionCard";
import SuggestionsPanel from "../components/SuggestionsPanel";
import {
  parsePdfResume,
  parseImageResume,
  generateInterviewQuestions
} from "../services/api";
import { normalizeInterviewResponse } from "../utils/formatResponse";

const Home = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [isResumeExtracted, setIsResumeExtracted] = useState(false);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setResumeText("");
    setResult(null);
    setError("");
    setIsResumeExtracted(false);
  };

  const onParseResume = async () => {
    if (!file) return;

    try {
      setLoading(true);
      setError("");
      setResult(null);
      setIsResumeExtracted(false);

      const isPdf = file.type === "application/pdf";
      const response = isPdf
        ? await parsePdfResume(file)
        : await parseImageResume(file);

      const extractedText = response?.text || "";
      setResumeText(extractedText);

      if (extractedText.trim()) {
        setIsResumeExtracted(true);
      } else {
        setError("No text could be extracted from the uploaded resume.");
      }
    } catch (err) {
      setResumeText("");
      setIsResumeExtracted(false);
      setError(err.response?.data?.message || "Failed to parse resume.");
    } finally {
      setLoading(false);
    }
  };

  const onGenerate = async () => {
    if (!resumeText.trim()) {
      setError("Please extract resume text first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const response = await generateInterviewQuestions({ resumeText });
      const normalized = normalizeInterviewResponse(response);

      setResult(normalized);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate interview set.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <Header />

      <section className="hero-panel glass-panel glass-panel-hero">
        <div className="hero-copy">
          <p className="hero-kicker">Minimal premium interview workspace</p>
          <h2>Extract your resume and generate polished interview practice in one flow</h2>
          <p className="muted hero-description">
            Upload a PDF or image resume, extract the text, and generate focused
            interview questions, short answers, and practical suggestions.
          </p>
        </div>
      </section>

      <section className="workspace-grid">
        <ResumeUpload
          file={file}
          setFile={handleFileSelect}
          onParseResume={onParseResume}
          loading={loading}
        />

        <section className="card editor-card">
          <div className="editor-head">
            <div>
              <h2>Extracted Resume Text</h2>
              <p className="muted">
                Review the extracted content, make quick edits if needed, and generate your interview set.
              </p>
            </div>
          </div>

          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows="14"
            placeholder="Your extracted resume text will appear here..."
            disabled={!isResumeExtracted}
          />

          <button
            className="primary-btn generate-btn"
            onClick={onGenerate}
            disabled={loading || !isResumeExtracted}
          >
            {loading ? "Generating..." : "Generate Interview Set"}
          </button>
        </section>
      </section>

      {loading && <LoadingSpinner />}

      {error && <div className="error-box">{error}</div>}

      {result && (
        <section className="results">
          <div className="result-top-grid">
            <ProfileCard
              profileType={result.profileType}
              experience={result.experienceLevel}
            />
            <ScoreCard data={result} />
          </div>

          <section className="results-group">
            <div className="section-head">
              <h2>Interview Questions</h2>
              <p className="muted">
                Practice these answers aloud and refine them using your real project details.
              </p>
            </div>

            <div className="questions-grid">
              {result.questions?.map((item, index) => (
                <QuestionCard key={item.id || index} item={item} index={index} />
              ))}
            </div>
          </section>

          <SuggestionsPanel suggestions={result.suggestions || []} />
        </section>
      )}
    </main>
  );
};

export default Home;