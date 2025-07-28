import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
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
  margin-left: ${({ $isMobileNavOpen }) => $isMobileNavOpen ? '0' : '280px'};
  min-height: 100vh;
  width: ${({ $isMobileNavOpen }) => $isMobileNavOpen ? '100%' : 'calc(100% - 280px)'};
  background: ${({ theme }) => theme.bg};
  position: relative;
  isolation: isolate;
  transition: all ${({ theme }) => theme.transition.base};

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: ${({ $isMobileNavOpen }) => $isMobileNavOpen ? '0' : '280px'};
    right: 0;
    height: 100vh;
    background: ${({ theme }) => `linear-gradient(
      135deg,
      ${theme.primary}05,
      ${theme.secondary}05
    )`};
    z-index: -1;
    transition: left ${({ theme }) => theme.transition.base};
  }

  @media (max-width: 1400px) {
    padding: 1.25rem;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    padding: 1rem;
    transition: transform ${({ theme }) => theme.transition.base};
    transform: translateX(${({ $isMobileNavOpen }) => $isMobileNavOpen ? '280px' : '0'});

    &::before {
      left: 0;
    }
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

  @media (max-width: 768px) {
    padding: 0;
    width: calc(100% - 1rem);
    margin: 0 0.5rem;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: ${({ theme }) => theme.zIndex.overlay};
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Layout = ({ children, toggleTheme, theme }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <LayoutContainer>
      <Sidebar 
        toggleTheme={toggleTheme} 
        theme={theme} 
        isMobileNavOpen={isMobileNavOpen}
        toggleMobileNav={toggleMobileNav}
      />
      <MainContent
        $isMobileNavOpen={isMobileNavOpen}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <PageContent
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Navbar toggleMobileNav={toggleMobileNav} />
          {children}
        </PageContent>
      </MainContent>
      <AnimatePresence>
        {isMobileNavOpen && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobileNav}
          />
        )}
      </AnimatePresence>
    </LayoutContainer>
  );
};

export default Layout;