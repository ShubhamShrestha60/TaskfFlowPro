import { useState } from 'react';
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

const SidebarContainer = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${props => props.$isCollapsed ? '80px' : '280px'};
  background: ${({ theme }) => theme.cardBg};
  border-right: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  flex-direction: column;
  transition: all ${({ theme }) => theme.transition.base};
  z-index: ${({ theme }) => theme.zIndex.sidebar};
  overflow-x: hidden;
  ${({ theme }) => theme.mixins.scrollbar(theme)};

  @media (max-width: 768px) {
    transform: translateX(${({ $isMobileNavOpen }) => $isMobileNavOpen ? '0' : '-100%'});
    width: 280px !important;
    z-index: ${({ theme }) => theme.zIndex.modal};
  }
`;

const Logo = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  ${({ theme }) => theme.mixins.flexBetween};
  min-height: 80px;

  h1 {
    font-family: ${({ theme }) => theme.fontSecondary};
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
  }
`;

const NavSection = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  flex: 1;
  overflow-y: auto;

  h2 {
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: ${({ theme }) => theme.spacing.md} 0;
    transition: opacity ${({ theme }) => theme.transition.base};
    opacity: ${props => props.$isCollapsed ? 0 : 1};

    @media (max-width: 768px) {
      opacity: 1;
    }
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme, $isActive }) => $isActive ? theme.primary : theme.textSecondary};
  border-radius: ${({ theme }) => theme.radius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  position: relative;
  transition: all ${({ theme }) => theme.transition.base};

  ${({ $isActive, theme }) => $isActive && `
    background: ${theme.primary}10;
    font-weight: ${theme.fontWeight.medium};
  `}

  &:hover {
    background: ${({ theme }) => theme.primary}10;
    color: ${({ theme }) => theme.primary};
    transform: translateX(4px);
  }

  svg {
    font-size: 1.25rem;
    min-width: 1.25rem;
    margin-right: ${props => props.$isCollapsed ? 0 : '1rem'};

    @media (max-width: 768px) {
      margin-right: 1rem;
    }
  }

  span {
    ${({ theme }) => theme.mixins.textEllipsis};
    opacity: ${props => props.$isCollapsed ? 0 : 1};
    transition: opacity ${({ theme }) => theme.transition.base};

    @media (max-width: 768px) {
      opacity: 1;
    }
  }
`;

const BottomSection = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  ${({ theme }) => theme.mixins.flexBetween};
`;

const IconButton = styled(motion.button)`
  ${({ theme }) => theme.mixins.flexCenter};
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.lg};
  color: ${({ theme }) => theme.textSecondary};
  transition: all ${({ theme }) => theme.transition.base};

  &:hover {
    background: ${({ theme }) => theme.primary}10;
    color: ${({ theme }) => theme.primary};
  }

  svg {
    font-size: 1.25rem;
  }
`;

const CollapseButton = styled(IconButton)`
  position: absolute;
  right: ${({ theme }) => theme.spacing.sm};
  top: ${({ theme }) => theme.spacing.sm};

  @media (max-width: 768px) {
    display: none;
  }
`;

const CloseButton = styled(IconButton)`
  display: none;
  position: absolute;
  right: ${({ theme }) => theme.spacing.sm};
  top: ${({ theme }) => theme.spacing.sm};

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Sidebar = ({ toggleTheme, theme, isMobileNavOpen, toggleMobileNav }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const mainNavItems = [
    { path: '/', icon: <FaChartBar />, label: 'Dashboard' },
    { path: '/tasks', icon: <FaTasks />, label: 'Tasks' },
    { path: '/inbox', icon: <FaInbox />, label: 'Inbox' },
    { path: '/calendar', icon: <FaCalendarAlt />, label: 'Calendar' },
  ];

  const secondaryNavItems = [
    { path: '/team', icon: <FaUsers />, label: 'Team' },
    { path: '/notifications', icon: <FaRegBell />, label: 'Notifications' },
    { path: '/settings', icon: <FaCog />, label: 'Settings' },
  ];

  return (
    <SidebarContainer
      $isCollapsed={isCollapsed}
      $isMobileNavOpen={isMobileNavOpen}
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <Logo>
        <AnimatePresence>
          {(!isCollapsed || isMobileNavOpen) && (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              TaskFlow
            </motion.h1>
          )}
        </AnimatePresence>
        <CollapseButton
          onClick={() => setIsCollapsed(!isCollapsed)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isCollapsed ? <FaBars /> : <FaTimes />}
        </CollapseButton>
        <CloseButton
          onClick={toggleMobileNav}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaTimes />
        </CloseButton>
      </Logo>

      <NavSection $isCollapsed={isCollapsed}>
        <h2>Main Menu</h2>
        {mainNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            $isActive={location.pathname === item.path}
            $isCollapsed={isCollapsed}
            onClick={() => {
              if (window.innerWidth <= 768) {
                toggleMobileNav();
              }
            }}
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
            $isCollapsed={isCollapsed}
            onClick={() => {
              if (window.innerWidth <= 768) {
                toggleMobileNav();
              }
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </NavSection>

      <BottomSection>
        <IconButton
          onClick={toggleTheme}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </IconButton>
      </BottomSection>
    </SidebarContainer>
  );
};

export default Sidebar;