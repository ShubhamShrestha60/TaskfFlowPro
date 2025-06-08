import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
  }

  #root {
    background: ${({ theme }) => theme.bg};
    min-height: 100vh;
    width: 100%;
    transition: all 0.3s ease;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.cardBg};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary}40;
    border-radius: 4px;
    
    &:hover {
      background: ${({ theme }) => theme.primary}60;
    }
  }

  ::selection {
    background: ${({ theme }) => theme.primary}40;
    color: ${({ theme }) => theme.text};
  }
`;

export default GlobalStyle; 