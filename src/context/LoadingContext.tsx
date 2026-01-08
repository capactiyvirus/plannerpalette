'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

const LoadingContext = createContext({
  isLoading: false,
  setLoading: () => {},
});

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const setLoading = (loading: boolean) => {
    if (loading) {
      setIsVisible(true);
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  };
  
  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {isVisible && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'linear-gradient(135deg, #192121 0%, #0f1515 100%)',
          backdropFilter: 'blur(10px)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"Playfair Display", serif',
          opacity: isLoading ? 1 : 0,
          transition: 'opacity 0.3s ease-out',
        }}>
          <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }
      .spinner-container {
        animation: fadeIn 0.3s ease-out;
      }
      .spinner {
        width: 80px;
        height: 80px;
        border: 4px solid rgba(245, 230, 211, 0.15);
        border-top: 4px solid #F5E6D3;
        border-right: 4px solid #F5E6D3;
        border-radius: 50%;
        animation: spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        box-shadow: 0 0 30px rgba(245, 230, 211, 0.2);
      }
      .loading-text {
        color: #F5E6D3;
        font-size: 1.5rem;
        font-weight: 600;
        margin-top: 32px;
        letter-spacing: 0.05em;
        animation: pulse 2s ease-in-out infinite;
      }
      .loading-subtitle {
        color: rgba(245, 230, 211, 0.6);
        font-size: 0.9rem;
        margin-top: 12px;
        font-style: italic;
        animation: pulse 2s ease-in-out infinite;
        animation-delay: 0.2s;
      }
    `}</style>
    <div className="spinner-container" style={{ textAlign: 'center' }}>
      <div className="spinner"></div>
      <div className="loading-text">Literary Haven</div>
      <div className="loading-subtitle">Preparing your experience...</div>
    </div>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);