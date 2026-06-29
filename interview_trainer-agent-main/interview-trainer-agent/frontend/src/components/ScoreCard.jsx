const ScoreCard = ({ data }) => {
  if (!data) return null;

  const breakdown = data.breakdown || {};

  return (
    <section className="card">
      <h2>Profile Review</h2>
      <div className="score-top">
        <div>
          <p className="muted small-label">Profile Type</p>
          <h3>{data.profileType || "Not detected"}</h3>
        </div>
        <div className="score-badge">{data.resumeScore ?? "--"}/100</div>
      </div>

      <div className="breakdown-grid">
        <div className="mini-stat">
          <span>Keyword Match</span>
          <strong>{breakdown.keywordMatch ?? 0}/25</strong>
        </div>
        <div className="mini-stat">
          <span>Project Clarity</span>
          <strong>{breakdown.projectClarity ?? 0}/25</strong>
        </div>
        <div className="mini-stat">
          <span>Communication</span>
          <strong>{breakdown.communication ?? 0}/20</strong>
        </div>
        <div className="mini-stat">
          <span>Role Fit</span>
          <strong>{breakdown.roleFit ?? 0}/15</strong>
        </div>
        <div className="mini-stat">
          <span>Readiness</span>
          <strong>{breakdown.readiness ?? 0}/15</strong>
        </div>
      </div>
    </section>
  );
};

export default ScoreCard;