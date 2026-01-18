import React from 'react';
import EmailButton from './EmailButton';

const History = ({ history, onDelete, onClear, onBack }) => {
  if (history.length === 0) {
    return (
      <div className="history-container empty">
        <div className="empty-header">
          <button className="btn-back-inline" onClick={onBack}>
            ← Voltar
          </button>
          <h2>📜 Histórico de Classificações</h2>
        </div>
        <p className="empty-message">Nenhuma classificação realizada ainda.</p>
        <p className="empty-hint">Classifique seu primeiro email para vê-lo aqui!</p>
      </div>
    );
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="history-container">
      <div className="history-header">
        <div className="history-title-group">
          <button className="btn-back-inline" onClick={onBack} title="Voltar para classificação">
            ← Voltar
          </button>
          <h2>📜 Histórico de Classificações ({history.length})</h2>
        </div>
        <button className="btn-clear-history" onClick={onClear}>
          🗑️ Limpar Tudo
        </button>
      </div>

      <div className="history-list">
        {history.map((item) => (
          <div key={item.id} className={`history-item ${item.category.toLowerCase()}`}>
            <div className="history-item-header">
              <span className={`category-tag ${item.category.toLowerCase()}`}>
                {item.category}
              </span>
              <span className="history-date">{formatDate(item.timestamp)}</span>
              <button 
                className="btn-delete-item"
                onClick={() => onDelete(item.id)}
                title="Remover este item"
              >
                🗑️
              </button>
            </div>

            <div className="history-item-content">
              {item.sender && (
                <div className="history-field">
                  <strong>De:</strong> {item.sender}
                  {item.sender_email && (
                    <span className="email-display"> ({item.sender_email})</span>
                  )}
                </div>
              )}
              {item.recipient && (
                <div className="history-field">
                  <strong>Para:</strong> {item.recipient}
                  {item.recipient_email && (
                    <span className="email-display"> ({item.recipient_email})</span>
                  )}
                </div>
              )}
              <div className="history-field">
                <strong>Email:</strong>
                <p className="email-preview">{item.emailContent}</p>
              </div>
              <div className="history-field">
                <strong>Resposta Sugerida:</strong>
                <p className="response-preview">{item.response}</p>
              </div>
              <div className="history-meta">
                <span className="confidence-tag">
                  Confiança: {item.confidence}
                </span>
              </div>
              
              {item.sender_email && (
                <div className="history-email-action">
                  <EmailButton 
                    senderEmail={item.sender_email}
                    response={item.response}
                    subject={`Re: ${item.category === 'Produtivo' ? 'Sua solicitação' : 'Sua mensagem'}`}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
