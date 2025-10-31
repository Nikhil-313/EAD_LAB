import React, { useState } from "react";
import "./PasswordStrengthChecker.css";

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");

  const checkPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return "Weak";
    else if (score === 3 || score === 4) return "Medium";
    else return "Strong";
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setPassword(input);
    setStrength(checkPasswordStrength(input));
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Password Strength Checker</h2>
        <input
          type="password"
          value={password}
          onChange={handleChange}
          placeholder="Enter your password"
        />

        <div className="bar-container">
          <div className={`bar ${strength.toLowerCase()}`}></div>
        </div>

        <p className={`strength-text ${strength.toLowerCase()}`}>
          {strength ? `${strength} Password` : "Enter a password to check strength"}
        </p>
      </div>
    </div>
  );
};

export default PasswordStrengthChecker;
