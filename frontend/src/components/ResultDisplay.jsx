import React from 'react';
import EmailButton from './EmailButton';

const ResultDisplay = ({ result }) => {
  if (!result) return null;

  const isProdutivo = result.category === 'Produtivo';

  return (
    <div className={`result-container ${isProdutivo ? 'produtivo' : 'improdutivo'}`}>
      <div className="result-header">
        <span className="result-icon">{isProdutivo ? '⚡' : '💬'}</span>
        <h2>Resultado da Análise</h2>
      </div>

      {(result.sender || result.recipient) && (
        <div className="result-participants">
          {result.sender && (
            <div className="participant-field">
              <label>De:</label>
              <span>
                {result.sender}
                {result.sender_email && (
                  <span className="email-display"> ({result.sender_email})</span>
                )}
              </span>
            </div>
          )}
          {result.recipient && (
            <div className="participant-field">
              <label>Para:</label>
              <span>
                {result.recipient}
                {result.recipient_email && (
                  <span className="email-display"> ({result.recipient_email})</span>
                )}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="result-category">
        <label>Categoria:</label>
        <span className={`category-badge ${isProdutivo ? 'produtivo' : 'improdutivo'}`}>
          {result.category}
        </span>
        {result.confidence && (
          <span className="confidence-badge">
            Confiança: {result.confidence}
          </span>
        )}
      </div>

      <div className="result-response">
        <label>Resposta Sugerida:</label>
        <div className="response-text">
          {result.response}
        </div>
      </div>

      <EmailButton 
        senderEmail={result.sender_email}
        response={result.response}
        subject={`Re: ${result.category === 'Produtivo' ? 'Sua solicitação' : 'Sua mensagem'}`}
      />

      {result.stats && (
        <div className="result-stats">
          <h4>Estatísticas da Análise</h4>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Caracteres:</span>
              <span className="stat-value">{result.stats.original_length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Palavras:</span>
              <span className="stat-value">{result.stats.word_count}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Indicadores Produtivos:</span>
              <span className="stat-value">{result.stats.produtivo_indicators}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Indicadores Improdutivos:</span>
              <span className="stat-value">{result.stats.improdutivo_indicators}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
