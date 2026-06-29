import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="header-shell glass-panel">
      <div className="header-top">
        <div className="brand-pill">IBM Granite Interview Trainer</div>
        <ThemeToggle />
      </div>

      <div className="header-content">
        <h1>Practice role-based interview questions with resume-aware answers</h1>
        <p className="header-text">
          Upload your resume, extract the content, and generate focused interview questions,
          concise answers, and practical suggestions in one clean workspace.
        </p>
      </div>
    </header>
  );
};

export default Header;