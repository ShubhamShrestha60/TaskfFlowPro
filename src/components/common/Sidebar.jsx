import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiCheckSquare, FiCalendar, FiSettings, FiMoon, FiSun } from 'react-icons/fi';

const SidebarContainer = styled(motion.aside)`
  width: 280px;
  background: ${({ theme }) => theme.glassMorphism};
  backdrop-filter: ${({ theme }) => theme.backdropFilter};
  height: 100vh;
  position: fixed;
  padding: 2rem 1.5rem;
  border-right: ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  z-index: 100;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    position: relative;
  }
`;

const Logo = styled(motion.h2)`
  color: ${({ theme }) => theme.primary};
  margin-bottom: 3rem;
  padding-left: 0.5rem;
  font-size: 1.75rem;
  font-weight: 700;
  background: ${({ theme }) => theme.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 0;
    width: 40%;
    height: 3px;
    background: ${({ theme }) => theme.gradientPrimary};
    border-radius: 2px;
  }
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.25rem;
  border-radius: 12px;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.text};
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
  background: transparent;

  svg {
    font-size: 1.25rem;
    transition: all 0.3s ease;
  }

  &:hover {
    background: ${({ theme }) => `${theme.cardBg}60`};
    color: ${({ theme }) => theme.primary};
    transform: translateX(5px);

    svg {
      transform: scale(1.1);
    }
  }

  &.active {
    background: ${({ theme }) => theme.cardBg};
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
    box-shadow: 0 4px 12px ${({ theme }) => `${theme.primary}15`};

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: ${({ theme }) => theme.gradientPrimary};
      border-radius: 3px;
    }
  }
`;

const ThemeToggle = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.25rem;
  border-radius: 12px;
  margin-top: auto;
  color: ${({ theme }) => theme.text};
  transition: all 0.3s ease;
  font-weight: 500;
  background: ${({ theme }) => `${theme.cardBg}60`};
  border: ${({ theme }) => theme.border};
  cursor: pointer;

  svg {
    font-size: 1.25rem;
    transition: all 0.3s ease;
  }

  &:hover {
    background: ${({ theme }) => theme.cardBg};
    transform: translateY(-2px);

    svg {
      transform: rotate(15deg) scale(1.1);
    }
  }
`;

const Sidebar = ({ toggleTheme, theme }) => {
  return (
    <SidebarContainer
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Logo
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        TaskFlow Pro
      </Logo>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <NavItem to="/" end>
          <FiHome />
          <span>Dashboard</span>
        </NavItem>
        <NavItem to="/tasks">
          <FiCheckSquare />
          <span>Tasks</span>
        </NavItem>
        <NavItem to="/calendar">
          <FiCalendar />
          <span>Calendar</span>
        </NavItem>
        <NavItem to="/settings">
          <FiSettings />
          <span>Settings</span>
        </NavItem>
      </motion.nav>
      <ThemeToggle
        onClick={toggleTheme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        {theme === 'light' ? <FiMoon /> : <FiSun />}
        <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
      </ThemeToggle>
    </SidebarContainer>
  );
};

export default Sidebar;