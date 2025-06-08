import styled from 'styled-components';
import { FiSearch, FiBell, FiSettings } from 'react-icons/fi';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: ${({ theme }) => theme.glassMorphismDark};
  backdrop-filter: ${({ theme }) => theme.backdropFilter};
  border-radius: 16px;
  border: ${({ theme }) => theme.border};
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.cardBg};
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  width: 360px;
  border: ${({ theme }) => theme.border};
  transition: all 0.3s ease;

  &:focus-within {
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.primary}30`};
    border-color: ${({ theme }) => theme.primary};
  }

  input {
    border: none;
    background: transparent;
    margin-left: 0.75rem;
    width: 100%;
    color: ${({ theme }) => theme.text};
    font-size: 0.95rem;

    &::placeholder {
      color: ${({ theme }) => theme.gray};
    }

    &:focus {
      outline: none;
    }
  }

  svg {
    color: ${({ theme }) => theme.gray};
    min-width: 20px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const ActionButton = styled.button`
  background: ${({ theme }) => theme.cardBg};
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.glassMorphism};
    border-color: ${({ theme }) => theme.primary};
  }

  svg {
    font-size: 1.25rem;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: ${({ theme }) => theme.gradientDanger};
  color: white;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.cardBg};
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${({ theme }) => theme.cardBg};
  padding: 0.5rem;
  padding-right: 1.25rem;
  border-radius: 12px;
  border: ${({ theme }) => theme.border};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.glassMorphism};
    border-color: ${({ theme }) => theme.primary};
  }

  @media (max-width: 768px) {
    flex: 1;
    justify-content: space-between;
  }
`;

const Avatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: ${({ theme }) => theme.gradientPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
`;

const UserInfo = styled.div`
  text-align: left;
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.text};
`;

const UserRole = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.gray};
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <SearchBar>
        <FiSearch />
        <input type="text" placeholder="Search tasks, projects, or team members..." />
      </SearchBar>
      <UserActions>
        <ActionButton>
          <FiBell />
          <NotificationBadge>3</NotificationBadge>
        </ActionButton>
        <ActionButton>
          <FiSettings />
        </ActionButton>
        <UserProfile>
          <Avatar>JD</Avatar>
          <UserInfo>
            <UserName>John Doe</UserName>
            <UserRole>Project Manager</UserRole>
          </UserInfo>
        </UserProfile>
      </UserActions>
    </NavbarContainer>
  );
};

export default Navbar;