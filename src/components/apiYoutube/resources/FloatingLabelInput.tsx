import React, { useState } from "react";
import "./FloatingLabelInput.css";

interface FloatingLabelInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  handleKeyDown?: (event: { key: string }) => void;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  handleKeyDown,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(!!value);

  return (
    <div className={`floating-label-input ${isFocused || value ? "active" : ""}`}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={(e) => handleKeyDown(e)}
        className="floating-input"
      />
      <label className="floating-label">{label}</label>
    </div>
  );
};

export default FloatingLabelInput;
