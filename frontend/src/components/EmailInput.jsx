import React from 'react';

const EmailInput = ({ value, onChange, disabled }) => {
  return (
    <div className="email-input-container">
      <label htmlFor="email-text">
        <h3>Digite o conteúdo do email</h3>
      </label>
      <textarea
        id="email-text"
        className="email-textarea"
        placeholder="Cole aqui o texto do email que deseja classificar..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        rows={10}
      />
    </div>
  );
};

export default EmailInput;
