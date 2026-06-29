const StatsCards = ({ profileType, resumeScore }) => {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-label">Profile Type</div>
        <div className="stat-value">{profileType || "Not detected"}</div>
      </div>

      <div className="stat-card">
        <div className="stat-label">Resume Score</div>
        <div className="stat-value">
          {resumeScore !== undefined && resumeScore !== null ? resumeScore : "--"}
        </div>
      </div>
    </div>
  );
};

export default StatsCards;