import { createContext, useContext, useState } from 'react';

// 🎨 Tema CLARO — as cores que você já usa hoje
const temaClaro = {
  bg: '#f5f7fa',        // fundo geral da página
  surface: '#ffffff',   // cards, dropdowns, painéis
  surfaceAlt: '#f9fafb',// cabeçalho de tabela, hover sutil
  text: '#1a1a2e',      // texto principal
  textMuted: '#8e9aaf', // texto secundário
  border: '#e9ecef',    // bordas e divisores
  primary: '#4f46e5',   // cor de destaque/ação
  primaryText: '#ffffff',// texto sobre a cor de destaque
  danger: '#e74c3c',    // vermelho (deletar, erros)
};

// 🌙 Tema ESCURO — cinza suave (estilo GitHub/Notion)
const temaEscuro = {
  bg: '#1a1d21',
  surface: '#24282e',
  surfaceAlt: '#2c3138',
  text: '#e4e6eb',
  textMuted: '#9aa0a6',
  border: '#3a3f44',
  primary: '#6366f1',
  primaryText: '#ffffff',
  danger: '#f87171',
};

const ThemeContext = createContext();

// O "Provider" envolve o app e fornece o tema pra todos
export const ThemeProvider = ({ children }) => {
  // Lê o tema salvo no navegador (se não houver, começa no claro)
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('tema') === 'escuro';
  });

  const theme = isDark ? temaEscuro : temaClaro; // escolhe o kit ativo
const toggleTheme = () => {
    const novoValor = !isDark;
    setIsDark(novoValor);
    localStorage.setItem('tema', novoValor ? 'escuro' : 'claro');
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook pra qualquer tela "pegar" o tema facilmente
export const useTheme = () => useContext(ThemeContext);