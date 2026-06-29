const ProfileCard = ({ profileType, experience }) => {
  if (!profileType && !experience) return null;

  return (
    <section className="card stat-card">
      <p className="stat-label">Detected Profile</p>
      <h3 className="stat-value">{profileType || "General Candidate"}</h3>
      <p className="muted">Experience Level: {experience || "Not specified"}</p>
    </section>
  );
};

export default ProfileCard;