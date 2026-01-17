import React from 'react';

const EmailButton = ({ senderEmail, response, subject }) => {
  if (!senderEmail) return null;

  const handleSendEmail = () => {
    const defaultSubject = subject || 'Resposta ao seu email';
    const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(senderEmail)}&su=${encodeURIComponent(defaultSubject)}&body=${encodeURIComponent(response || '')}`;
    
    window.open(mailtoUrl, '_blank');
  };

  return (
    <div className="email-action-section">
      <button 
        className="btn btn-email"
        onClick={handleSendEmail}
        title="Abrir no Gmail com resposta pronta"
      >
        📧 Enviar Resposta via Gmail
      </button>
      <p className="email-hint">
        ℹ️ O Gmail será aberto em uma nova aba com a resposta pronta para envio
      </p>
    </div>
  );
};

export default EmailButton;
