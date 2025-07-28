import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Modern CSS Reset */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    height: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    font-family: ${({ theme }) => theme.fontPrimary};
    font-size: ${({ theme }) => theme.fontSize.base};
    line-height: 1.5;
    color: ${({ theme }) => theme.text};
    background: ${({ theme }) => theme.bg};
    min-height: 100%;
    position: relative;
    overflow-x: hidden;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fontSecondary};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    line-height: 1.2;
    color: ${({ theme }) => theme.text};
    margin-bottom: 0.5em;
  }

  h1 { font-size: ${({ theme }) => theme.fontSize['4xl']}; }
  h2 { font-size: ${({ theme }) => theme.fontSize['3xl']}; }
  h3 { font-size: ${({ theme }) => theme.fontSize['2xl']}; }
  h4 { font-size: ${({ theme }) => theme.fontSize.xl}; }
  h5 { font-size: ${({ theme }) => theme.fontSize.lg}; }
  h6 { font-size: ${({ theme }) => theme.fontSize.base}; }

  p {
    margin-bottom: 1em;
    color: ${({ theme }) => theme.textSecondary};
  }

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    transition: ${({ theme }) => theme.transition.fast};

    &:hover {
      color: ${({ theme }) => theme.secondary};
    }
  }

  /* Form elements */
  input, textarea, select, button {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    transition: ${({ theme }) => theme.transition.base};

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  /* Utility classes */
  .text-ellipsis {
    ${({ theme }) => theme.mixins.textEllipsis}
  }

  .flex-center {
    ${({ theme }) => theme.mixins.flexCenter}
  }

  .flex-between {
    ${({ theme }) => theme.mixins.flexBetween}
  }

  /* Scrollbar styling */
  * {
    ${({ theme }) => theme.mixins.scrollbar(theme)}
  }

  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes slideDown {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes slideLeft {
    from { transform: translateX(20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes slideRight {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  /* Dark mode transitions */
  body, * {
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }

  /* Glass effect utility class */
  .glass {
    ${({ theme }) => theme.mixins.glassmorphism(theme)}
  }

  /* Container utility classes */
  .container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.md};

    @media (max-width: 1400px) {
      max-width: 1200px;
    }

    @media (max-width: 1200px) {
      max-width: 1024px;
    }

    @media (max-width: 1024px) {
      max-width: 768px;
    }

    @media (max-width: 768px) {
      padding: 0 ${({ theme }) => theme.spacing.sm};
    }
  }
`;

export default GlobalStyle; 