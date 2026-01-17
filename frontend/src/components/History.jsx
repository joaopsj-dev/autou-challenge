import React from 'react';

const History = ({ history, onDelete, onClear }) => {
  if (history.length === 0) {
    return (
      <div className="history-container empty">
        <h2>📜 Histórico de Classificações</h2>
        <p className="empty-message">Nenhuma classificação realizada ainda.</p>
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
        <h2>📜 Histórico de Classificações</h2>
        <button className="btn-clear-history" onClick={onClear}>
          Limpar Histórico
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
                title="Remover"
              >
                🗑️
              </button>
            </div>

            <div className="history-item-content">
              {item.sender && (
                <div className="history-field">
                  <strong>De:</strong> {item.sender}
                </div>
              )}
              {item.recipient && (
                <div className="history-field">
                  <strong>Para:</strong> {item.recipient}
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
