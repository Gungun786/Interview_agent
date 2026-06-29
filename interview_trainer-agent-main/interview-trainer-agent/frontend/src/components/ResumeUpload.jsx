const ResumeUpload = ({ file, setFile, onParseResume, loading }) => {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <section className="card">
      <h2>Upload Resume</h2>
      <p className="muted">Supported formats: PDF, JPG, JPEG, PNG</p>

      <input
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        onChange={handleFileChange}
      />

      {file && (
        <p className="file-name">
          Selected file: <span>{file.name}</span>
        </p>
      )}

      <button
        className="primary-btn"
        onClick={onParseResume}
        disabled={!file || loading}
      >
        {loading ? "Parsing..." : "Extract Resume Text"}
      </button>
    </section>
  );
};

export default ResumeUpload;