import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaBell, 
  FaUserCircle, 
  FaCog, 
  FaSignOutAlt,
  FaChevronDown
} from 'react-icons/fa';
import ProfileSettings from './ProfileSettings';

const NavbarContainer = styled(motion.nav)`
  position: sticky;
  top: 0;
  right: 0;
  left: 280px;
  height: 80px;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.cardBg};
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  z-index: ${({ theme }) => theme.zIndex.navbar};
  ${({ theme }) => theme.mixins.flexBetween};
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 ${({ theme }) => theme.spacing.xl};
`;

const SearchInput = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  padding-left: 48px;
  background: ${({ theme }) => theme.bgSecondary};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: ${({ theme }) => theme.radius.full};
  color: ${({ theme }) => theme.text};
  font-size: ${({ theme }) => theme.fontSize.base};
  transition: ${({ theme }) => theme.transition.base};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.cardBg};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: ${({ theme }) => theme.spacing.lg};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1.1rem;
  pointer-events: none;
`;

const NavActions = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  gap: ${({ theme }) => theme.spacing.md};
`;

const IconButton = styled(motion.button)`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.lg};
  color: ${({ theme }) => theme.textSecondary};
  ${({ theme }) => theme.mixins.flexCenter};
  transition: ${({ theme }) => theme.transition.base};

  &:hover {
    background: ${({ theme }) => theme.bgSecondary};
    color: ${({ theme }) => theme.text};
  }

  svg {
    font-size: 1.25rem;
  }
`;

const NotificationBadge = styled(motion.span)`
  position: absolute;
  top: -2px;
  right: -2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: ${({ theme }) => theme.error};
  color: white;
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  ${({ theme }) => theme.mixins.flexCenter};
  border: 2px solid ${({ theme }) => theme.cardBg};
`;

const ProfileButton = styled(motion.button)`
  ${({ theme }) => theme.mixins.flexCenter};
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: transparent;
  transition: ${({ theme }) => theme.transition.base};

  &:hover {
    background: ${({ theme }) => theme.bgSecondary};
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
  }

  .profile-info {
    text-align: left;
    margin-right: ${({ theme }) => theme.spacing.sm};

    h3 {
      color: ${({ theme }) => theme.text};
      font-size: ${({ theme }) => theme.fontSize.base};
      font-weight: ${({ theme }) => theme.fontWeight.medium};
      margin: 0;
    }

    p {
      color: ${({ theme }) => theme.textSecondary};
      font-size: ${({ theme }) => theme.fontSize.sm};
      margin: 0;
    }
  }

  svg {
    color: ${({ theme }) => theme.textSecondary};
    font-size: 1rem;
    transition: transform ${({ theme }) => theme.transition.base};
    transform: ${({ isOpen }) => isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const ProfileDropdown = styled(motion.div)`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 240px;
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: 0 4px 20px ${({ theme }) => theme.shadowColor};
  overflow: hidden;
`;

const DropdownItem = styled(motion.button)`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  ${({ theme }) => theme.mixins.flexBetween};
  color: ${({ theme, danger }) => danger ? theme.error : theme.text};
  transition: ${({ theme }) => theme.transition.base};

  &:hover {
    background: ${({ theme }) => theme.bgSecondary};
  }

  svg {
    font-size: 1.1rem;
  }
`;

const dropdownVariants = {
  hidden: { 
    opacity: 0, 
    y: -10,
    transition: {
      duration: 0.2
    }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.2
    }
  }
};

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [notifications] = useState(3);

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
  };

  return (
    <NavbarContainer
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SearchContainer>
        <SearchIcon />
        <SearchInput
          type="text"
          placeholder="Search tasks, projects, or team members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>

      <NavActions>
        <IconButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaBell />
          {notifications > 0 && (
            <NotificationBadge
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              {notifications}
            </NotificationBadge>
          )}
        </IconButton>

        <div style={{ position: 'relative' }}>
          <ProfileButton
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            isOpen={isProfileOpen}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img src="https://ui-avatars.com/api/?name=Shubham+Shrestha&background=random" alt="Profile" />
            <div className="profile-info">
              <h3>Shubham Shrestha</h3>
              <p>Project Manager</p>
            </div>
            <FaChevronDown />
          </ProfileButton>

          <AnimatePresence>
            {isProfileOpen && (
              <ProfileDropdown
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={dropdownVariants}
              >
                <DropdownItem onClick={() => {
                  setIsSettingsOpen(true);
                  setIsProfileOpen(false);
                }}>
                  <span>Settings</span>
                  <FaCog />
                </DropdownItem>
                <DropdownItem onClick={handleLogout} danger>
                  <span>Logout</span>
                  <FaSignOutAlt />
                </DropdownItem>
              </ProfileDropdown>
            )}
          </AnimatePresence>
        </div>
      </NavActions>

      <ProfileSettings 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </NavbarContainer>
  );
};

export default Navbar;