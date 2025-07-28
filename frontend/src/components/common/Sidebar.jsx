import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTasks,
  FaCalendarAlt,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaInbox,
  FaRegBell
} from 'react-icons/fa';

/* Styled Components */
const SidebarContainer = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${({ $isCollapsed }) => ($isCollapsed ? '80px' : '280px')};
  background: ${({ theme }) => theme.cardBg};
  border-right: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  z-index: 1000; /* High z-index to ensure it's above everything */
  overflow-x: hidden;

  @media (max-width: 768px) {
    width: 280px;
    transform: ${({ $isMobileNavOpen }) => 
      $isMobileNavOpen ? 'translateX(0)' : 'translateX(-100%)'};
    box-shadow: ${({ $isMobileNavOpen }) =>
      $isMobileNavOpen ? '5px 0 15px rgba(0, 0, 0, 0.1)' : 'none'};
    ${({ $isMobileNavOpen }) => !$isMobileNavOpen && 'pointer-events: none;'};
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999; /* Just below sidebar */
  backdrop-filter: blur(2px);
  pointer-events: ${({ $isVisible }) => ($isVisible ? 'auto' : 'none')};

  @media (min-width: 769px) {
    display: none;
  }
`;

const Logo = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 80px;
  position: relative;

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    background: linear-gradient(135deg, #3B82F6, #8B5CF6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
  }
`;

const NavSection = styled.div`
  padding: 1rem;
  flex: 1;
  overflow-y: auto;

  h2 {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 1rem 0;
    opacity: ${({ $isCollapsed }) => ($isCollapsed ? 0 : 1)};
    transition: opacity 0.2s ease;

    @media (max-width: 768px) {
      opacity: 1;
    }
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 1rem;
  color: ${({ theme, $isActive }) => ($isActive ? '#3B82F6' : theme.textSecondary)};
  border-radius: 0.5rem;
  margin-bottom: 0.25rem;
  transition: all 0.2s ease;
  text-decoration: none;

  ${({ $isActive }) => $isActive && `
    background: rgba(59, 130, 246, 0.1);
    font-weight: 500;
  `}

  &:hover {
    background: rgba(59, 130, 246, 0.1);
    color: #3B82F6;
    transform: translateX(4px);
  }

  svg {
    font-size: 1.25rem;
    min-width: 1.25rem;
    margin-right: ${({ $isCollapsed }) => ($isCollapsed ? '0' : '1rem')};

    @media (max-width: 768px) {
      margin-right: 1rem;
    }
  }

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    opacity: ${({ $isCollapsed }) => ($isCollapsed ? '0' : '1')};
    transition: opacity 0.2s ease;

    @media (max-width: 768px) {
      opacity: 1;
    }
  }
`;

const BottomSection = styled.div`
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.textSecondary};
  transition: all 0.2s ease;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background: rgba(59, 130, 246, 0.1);
    color: #3B82F6;
  }

  svg {
    font-size: 1.25rem;
  }
`;

const CollapseButton = styled(IconButton)`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CloseButton = styled(IconButton)`
  display: none;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;

  @media (max-width: 768px) {
    display: flex;
  }
`;

/* Sidebar Component */
const Sidebar = ({ toggleTheme, theme, isMobileNavOpen, toggleMobileNav }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth <= 768;
      setIsMobile(isNowMobile);
      
      // Auto-close sidebar when resizing to desktop if mobile nav was open
      if (!isNowMobile && isMobileNavOpen) {
        toggleMobileNav();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileNavOpen, toggleMobileNav]);

  const mainNavItems = [
    { path: '/', icon: <FaChartBar />, label: 'Dashboard' },
    { path: '/tasks', icon: <FaTasks />, label: 'Tasks' },
    { path: '/inbox', icon: <FaInbox />, label: 'Inbox' },
    { path: '/calendar', icon: <FaCalendarAlt />, label: 'Calendar' }
  ];

  const secondaryNavItems = [
    { path: '/team', icon: <FaUsers />, label: 'Team' },
    { path: '/notifications', icon: <FaRegBell />, label: 'Notifications' },
    { path: '/settings', icon: <FaCog />, label: 'Settings' }
  ];

  return (
    <>
      <AnimatePresence>
        <SidebarContainer
          $isCollapsed={isCollapsed}
          $isMobileNavOpen={isMobileNavOpen}
          initial={isMobile ? { x: -280 } : { x: 0 }}
          animate={{ x: isMobile ? (isMobileNavOpen ? 0 : -280) : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <Logo>
            {(!isCollapsed || isMobileNavOpen) && (
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                TaskFlow
              </motion.h1>
            )}
            {!isMobileNavOpen ? (
              <CollapseButton
                onClick={() => setIsCollapsed(!isCollapsed)}
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isCollapsed ? <FaBars /> : <FaTimes />}
              </CollapseButton>
            ) : (
              <CloseButton
                onClick={toggleMobileNav}
                aria-label="Close sidebar"
              >
                <FaTimes />
              </CloseButton>
            )}
          </Logo>

          <NavSection $isCollapsed={isCollapsed}>
            <h2>Main Menu</h2>
            {mainNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                $isActive={location.pathname === item.path}
                $isCollapsed={isCollapsed && !isMobileNavOpen}
                onClick={() => isMobile && toggleMobileNav()}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}

            <h2>Other</h2>
            {secondaryNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                $isActive={location.pathname === item.path}
                $isCollapsed={isCollapsed && !isMobileNavOpen}
                onClick={() => isMobile && toggleMobileNav()}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </NavSection>

          <BottomSection>
            <IconButton
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </IconButton>
          </BottomSection>
        </SidebarContainer>

        {/* Overlay for mobile */}
        {isMobile && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: isMobileNavOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            onClick={toggleMobileNav}
            $isVisible={isMobileNavOpen}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;