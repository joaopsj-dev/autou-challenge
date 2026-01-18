import React, { useState, useEffect } from 'react';
import './App.css';
import EmailInput from './components/EmailInput';
import FileUpload from './components/FileUpload';
import LoadingSpinner from './components/LoadingSpinner';
import ResultDisplay from './components/ResultDisplay';
import History from './components/History';
import ConfirmModal from './components/ConfirmModal';
import { classifyEmail, checkHealth } from './services/api';

const HISTORY_KEY = 'email_classifier_history';

function App() {
  const [emailText, setEmailText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [serverStatus, setServerStatus] = useState('checking');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  useEffect(() => {
    checkHealth()
      .then(() => setServerStatus('online'))
      .catch(() => setServerStatus('offline'));
    
    loadHistory();
  }, []);

  const loadHistory = () => {
    try {
      const savedHistory = localStorage.getItem(HISTORY_KEY);
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    }
  };

  const saveToHistory = (data, emailContent) => {
    const historyItem = {
      id: Date.now(),
      timestamp: Date.now(),
      category: data.category,
      response: data.response,
      confidence: data.confidence,
      sender: data.sender,
      sender_email: data.sender_email,
      recipient: data.recipient,
      recipient_email: data.recipient_email,
      emailContent: emailContent.substring(0, 500),
      stats: data.stats
    };

    const newHistory = [historyItem, ...history];
    setHistory(newHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  };

  const deleteHistoryItem = (id) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
    setShowClearModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!emailText && !selectedFile) {
      setError('Por favor, digite um email ou selecione um arquivo');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = selectedFile ? { file: selectedFile } : { text: emailText };
      const response = await classifyEmail(data);
      setResult(response);
      
      if (response.category !== 'Spam') {
        const content = selectedFile ? selectedFile.name : emailText;
        saveToHistory(response, content);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setEmailText('');
    setSelectedFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>
            <span className="email-icon">✉</span> Email Classifier
          </h1>
          <p>Sistema Inteligente de Classificação de Emails</p>
          <div className="header-actions">
            <div className={`server-status ${serverStatus}`}>
              <span className="status-dot"></span>
              {serverStatus === 'checking' && 'Verificando servidor...'}
              {serverStatus === 'online' && 'Servidor Online'}
              {serverStatus === 'offline' && 'Servidor Offline'}
            </div>
            {!showHistory ? (
              <button 
                className="btn-history"
                onClick={() => setShowHistory(true)}
              >
                📜 Ver Histórico ({history.length})
              </button>
            ) : (
              <button 
                className="btn-back"
                onClick={() => setShowHistory(false)}
              >
                ← Voltar para Classificação
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {showHistory ? (
            <History 
              history={history}
              onDelete={deleteHistoryItem}
              onClear={() => setShowClearModal(true)}
              onBack={() => setShowHistory(false)}
            />
          ) : (
            <>
              <div className="info-section">
                <h2>Como funciona?</h2>
                <p>
                  Nosso sistema utiliza inteligência artificial para analisar emails e classificá-los em:
                </p>
                <div className="categories">
                  <div className="category-card produtivo">
                    <span className="icon">⚡</span>
                    <h3>Produtivo</h3>
                    <p>Emails que requerem ação ou resposta específica</p>
                  </div>
                  <div className="category-card improdutivo">
                    <span className="icon">💬</span>
                    <h3>Improdutivo</h3>
                    <p>Emails que não necessitam ação imediata</p>
                  </div>
                  <div className="category-card spam">
                    <span className="icon">⚠️</span>
                    <h3>Spam</h3>
                    <p>Emails suspeitos, fraudulentos ou indesejados (não são salvos no histórico)</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="classification-form">
                <EmailInput
                  value={emailText}
                  onChange={setEmailText}
                  disabled={loading || selectedFile !== null}
                />

                <div className="divider">
                  <span>OU</span>
                </div>

                <FileUpload
                  onFileSelect={setSelectedFile}
                  disabled={loading || emailText.length > 0}
                />

                {error && (
                  <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    {error}
                  </div>
                )}

                <div className="form-actions">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading || (!emailText && !selectedFile) || serverStatus === 'offline'}
                  >
                    {loading ? 'Analisando...' : 'Classificar Email'}
                  </button>
                  {(result || emailText || selectedFile) && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleReset}
                      disabled={loading}
                    >
                      Limpar
                    </button>
                  )}
                </div>
              </form>

              {loading && <LoadingSpinner />}
              {result && <ResultDisplay result={result} />}
            </>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>
          Feito por{' '}
          <a 
            href="https://www.linkedin.com/in/joaopsj-dev/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            João Pedro
          </a>
        </p>
        <p className="footer-secondary">Desenvolvido para o Desafio AutoU | Powered by OpenAI GPT</p>
      </footer>

      <ConfirmModal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={clearHistory}
        title="🗑️ Limpar Histórico"
        message="Tem certeza que deseja limpar todo o histórico de classificações? Esta ação não pode ser desfeita."
      />
    </div>
  );
}

export default App;
