import { useEffect, useRef } from "react";

const RoleForm = ({ formData, setFormData, onGenerate, loading }) => {
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = formData.resumeText ? `${el.scrollHeight}px` : "120px";
  }, [formData.resumeText]);

  return (
    <section className="card">
      <div className="card-header">
        <h2 className="section-title">Candidate Details</h2>
        <span className="section-chip">Interview Input</span>
      </div>

      <div className="form-grid">
        <div>
          <label>Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Frontend Developer"
          />
        </div>

        <div>
          <label>Experience</label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Fresher"
          />
        </div>
      </div>

      <div>
        <label>Resume Text</label>
        <textarea
          ref={textareaRef}
          name="resumeText"
          value={formData.resumeText}
          onChange={handleChange}
          placeholder="Paste extracted resume text here or type a short profile summary..."
          className="resume-textarea"
        />
      </div>

      <button className="primary-btn" onClick={onGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Interview Set"}
      </button>
    </section>
  );
};

export default RoleForm;