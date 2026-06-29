const SuggestionsPanel = ({ suggestions = [] }) => {
  if (!suggestions.length) return null;

  return (
    <section className="card">
      <h2>Suggestions</h2>
      <ul className="suggestions-list">
        {suggestions.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </section>
  );
};

export default SuggestionsPanel;