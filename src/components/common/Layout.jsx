import styled from 'styled-components';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  overflow-x: hidden;
  position: relative;
`;

const MainContent = styled(motion.main)`
  flex: 1;
  padding: 1.5rem;
  margin-left: 280px;
  min-height: 100vh;
  width: calc(100% - 280px);
  background: ${({ theme }) => theme.bg};
  position: relative;
  isolation: isolate;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 280px;
    right: 0;
    height: 100vh;
    background: ${({ theme }) => `linear-gradient(
      135deg,
      ${theme.primary}05,
      ${theme.secondary}05
    )`};
    z-index: -1;
  }

  @media (max-width: 1400px) {
    padding: 1.25rem;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    padding: 1rem;
  }
`;

const PageContent = styled(motion.div)`
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0.5rem;

  @media (max-width: 1400px) {
    max-width: 100%;
  }
`;

const Layout = ({ children, toggleTheme, theme }) => {
  return (
    <LayoutContainer>
      <Sidebar toggleTheme={toggleTheme} theme={theme} />
      <MainContent
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <PageContent
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Navbar />
          {children}
        </PageContent>
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;