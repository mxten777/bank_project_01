import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { WhiteLabelConfig } from '../types';
import { DEFAULT_CONFIG } from '../lib/whitelabel';

interface WhiteLabelContextType {
  config: WhiteLabelConfig;
  updateConfig: (newConfig: Partial<WhiteLabelConfig>) => void;
}

const WhiteLabelContext = createContext<WhiteLabelContextType | undefined>(undefined);

export const WhiteLabelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<WhiteLabelConfig>(() => {
    const saved = localStorage.getItem('whitelabel-config');
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });

  useEffect(() => {
    localStorage.setItem('whitelabel-config', JSON.stringify(config));
  }, [config]);

  const updateConfig = (newConfig: Partial<WhiteLabelConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  return (
    <WhiteLabelContext.Provider value={{ config, updateConfig }}>
      {children}
    </WhiteLabelContext.Provider>
  );
};

export const useWhiteLabel = () => {
  const context = useContext(WhiteLabelContext);
  if (!context) {
    throw new Error('useWhiteLabel must be used within WhiteLabelProvider');
  }
  return context;
};
