import { useState } from "react";

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  return (
    <button className="copy-btn" onClick={handleCopy}>
      {copied ? "Copied" : "Copy Answer"}
    </button>
  );
};

export default CopyButton;