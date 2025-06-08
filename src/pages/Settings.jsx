import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  FaUser,
  FaBell,
  FaPalette,
  FaLock,
  FaGlobe,
  FaCog,
  FaToggleOn,
  FaToggleOff,
  FaCheck,
  FaChevronRight,
  FaShieldAlt,
  FaLanguage,
  FaKey,
  FaEnvelope
} from 'react-icons/fa';

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
  padding: 2rem;
  max-width: 1600px;
  margin: 0 auto;
  min-height: calc(100vh - 4rem);

  @media (max-width: 1024px) {
    grid-template-columns: 220px 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }
`;

const Sidebar = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.borderColor};
  padding: 1.25rem 1rem;
  height: fit-content;
  position: sticky;
  top: 2rem;
  box-shadow: 0 2px 8px ${({ theme }) => theme.shadowColor};

  @media (max-width: 768px) {
    position: relative;
    top: 0;
    margin-bottom: 1rem;
  }
`;

const NavItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ $active, theme }) => $active ? theme.primary : theme.textSecondary};
  background: ${({ $active, theme }) => $active ? theme.primary + '15' : 'transparent'};
  font-size: 0.9375rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: ${({ theme }) => theme.primary}10;
    color: ${({ theme }) => theme.primary};
    transform: translateX(4px);
  }

  svg {
    font-size: 1.25rem;
    flex-shrink: 0;
  }

  & + & {
    margin-top: 0.5rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 900px;
  width: 100%;
`;

const Header = styled.div`
  position: relative;
  padding: 1.5rem 2rem;
  background: ${({ theme }) => theme.cardBg};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ theme }) => `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`};
    border-radius: ${({ theme }) => theme.radius.lg} ${({ theme }) => theme.radius.lg} 0 0;
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const HeaderInfo = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  svg {
    color: ${({ theme }) => theme.primary};
    font-size: 1.25rem;
  }
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.875rem;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
    padding-top: 0.5rem;
    border-top: 1px solid ${({ theme }) => theme.borderColor};
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.bgSecondary};
  border: 1px solid ${({ theme }) => theme.borderColor};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.bg};
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
  }

  svg {
    font-size: 1rem;
  }
`;

const Section = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.borderColor};
  overflow: hidden;
  box-shadow: 0 2px 8px ${({ theme }) => theme.shadowColor};
`;

const SectionHeader = styled.div`
  padding: 1.75rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.bgSecondary};

  h2 {
    font-size: 1.375rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${({ theme }) => theme.textSecondary};
    font-size: 0.9375rem;
    line-height: 1.6;
  }
`;

const SettingsList = styled.div`
  padding: 1.5rem;
`;

const SettingItem = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  transition: all 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => theme.bgSecondary};
  }

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const SettingInfo = styled.div`
  flex: 1;
  margin-right: 3rem;

  @media (max-width: 640px) {
    margin-right: 0;
  }
`;

const SettingTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const SettingDescription = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.875rem;
  line-height: 1.6;
  max-width: 500px;
`;

const Toggle = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  color: ${({ $isActive, theme }) => 
    $isActive ? theme.primary : theme.textSecondary};
  font-size: 1.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.sm};

  &:hover {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary}15;
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-size: 0.9375rem;
  min-width: 200px;
  cursor: pointer;
  transition: all 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${({ theme }) => 
    encodeURIComponent(theme.textSecondary)}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  padding-right: 2.5rem;

  &:hover, &:focus {
    border-color: ${({ theme }) => theme.primary};
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}20;
  }

  @media (max-width: 640px) {
    width: 100%;
  }

  option {
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
  }
`;

const Settings = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [settings, setSettings] = useState({
    account: {
      email: 'user@example.com',
      language: 'english',
      timezone: 'UTC+0',
    },
    notifications: {
      email: true,
      push: true,
      desktop: false,
      mentions: true,
      updates: true
    },
    appearance: {
      theme: 'dark',
      density: 'comfortable',
      animations: true,
      fontSize: 'medium',
      contrast: 'default'
    },
    privacy: {
      profileVisibility: 'public',
      activityStatus: true,
      dataSharing: false,
      twoFactor: true
    },
  });

  const sections = [
    { id: 'account', icon: <FaUser />, label: 'Account' },
    { id: 'notifications', icon: <FaBell />, label: 'Notifications' },
    { id: 'appearance', icon: <FaPalette />, label: 'Appearance' },
    { id: 'privacy', icon: <FaLock />, label: 'Privacy & Security' },
    { id: 'language', icon: <FaLanguage />, label: 'Language' },
    { id: 'security', icon: <FaShieldAlt />, label: 'Security' }
  ];

  const handleToggle = (section, setting) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [setting]: !prev[section][setting],
      },
    }));
  };

  const handleSelect = (section, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [setting]: value,
      },
    }));
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'account':
        return (
          <Section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SectionHeader>
              <h2>Account Settings</h2>
              <p>Manage your account information and preferences</p>
            </SectionHeader>
            <SettingsList>
              <SettingItem>
                <SettingInfo>
                  <SettingTitle>Email Address</SettingTitle>
                  <SettingDescription>Your primary email for notifications and account recovery</SettingDescription>
                </SettingInfo>
                <Select value={settings.account.email} onChange={(e) => handleSelect('account', 'email', e.target.value)}>
                  <option value="user@example.com">user@example.com</option>
                </Select>
              </SettingItem>
              <SettingItem>
                <SettingInfo>
                  <SettingTitle>Language</SettingTitle>
                  <SettingDescription>Choose your preferred language</SettingDescription>
                </SettingInfo>
                <Select value={settings.account.language} onChange={(e) => handleSelect('account', 'language', e.target.value)}>
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                </Select>
              </SettingItem>
            </SettingsList>
          </Section>
        );

      case 'notifications':
        return (
          <Section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SectionHeader>
              <h2>Notification Preferences</h2>
              <p>Control how and when you receive notifications</p>
            </SectionHeader>
            <SettingsList>
              <SettingItem>
                <SettingInfo>
                  <SettingTitle>Email Notifications</SettingTitle>
                  <SettingDescription>Receive important updates via email</SettingDescription>
                </SettingInfo>
                <Toggle
                  $isActive={settings.notifications.email}
                  onClick={() => handleToggle('notifications', 'email')}
                >
                  {settings.notifications.email ? <FaToggleOn /> : <FaToggleOff />}
                </Toggle>
              </SettingItem>
              <SettingItem>
                <SettingInfo>
                  <SettingTitle>Push Notifications</SettingTitle>
                  <SettingDescription>Get instant notifications in your browser</SettingDescription>
                </SettingInfo>
                <Toggle
                  $isActive={settings.notifications.push}
                  onClick={() => handleToggle('notifications', 'push')}
                >
                  {settings.notifications.push ? <FaToggleOn /> : <FaToggleOff />}
                </Toggle>
              </SettingItem>
            </SettingsList>
          </Section>
        );

      case 'appearance':
        return (
          <Section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SectionHeader>
              <h2>Appearance Settings</h2>
              <p>Customize how TaskFlow looks and feels</p>
            </SectionHeader>
            <SettingsList>
              <SettingItem>
                <SettingInfo>
                  <SettingTitle>Theme</SettingTitle>
                  <SettingDescription>Choose between light and dark mode</SettingDescription>
                </SettingInfo>
                <Select value={settings.appearance.theme} onChange={(e) => handleSelect('appearance', 'theme', e.target.value)}>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </Select>
              </SettingItem>
              <SettingItem>
                <SettingInfo>
                  <SettingTitle>Animations</SettingTitle>
                  <SettingDescription>Enable smooth transitions and animations</SettingDescription>
                </SettingInfo>
                <Toggle
                  $isActive={settings.appearance.animations}
                  onClick={() => handleToggle('appearance', 'animations')}
                >
                  {settings.appearance.animations ? <FaToggleOn /> : <FaToggleOff />}
                </Toggle>
              </SettingItem>
            </SettingsList>
          </Section>
        );

      case 'privacy':
        return (
          <Section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SectionHeader>
              <h2>Privacy & Security</h2>
              <p>Manage your privacy preferences and security settings</p>
            </SectionHeader>
            <SettingsList>
              <SettingItem>
                <SettingInfo>
                  <SettingTitle>Profile Visibility</SettingTitle>
                  <SettingDescription>Control who can see your profile</SettingDescription>
                </SettingInfo>
                <Select value={settings.privacy.profileVisibility} onChange={(e) => handleSelect('privacy', 'profileVisibility', e.target.value)}>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="team">Team Only</option>
                </Select>
              </SettingItem>
              <SettingItem>
                <SettingInfo>
                  <SettingTitle>Two-Factor Authentication</SettingTitle>
                  <SettingDescription>Add an extra layer of security to your account</SettingDescription>
                </SettingInfo>
                <Toggle
                  $isActive={settings.privacy.twoFactor}
                  onClick={() => handleToggle('privacy', 'twoFactor')}
                >
                  {settings.privacy.twoFactor ? <FaToggleOn /> : <FaToggleOff />}
                </Toggle>
              </SettingItem>
            </SettingsList>
          </Section>
        );

      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <Sidebar>
        {sections.map((section) => (
          <NavItem
            key={section.id}
            $active={activeSection === section.id}
            onClick={() => setActiveSection(section.id)}
          >
            {section.icon}
            {section.label}
          </NavItem>
        ))}
      </Sidebar>

      <Content>
        <Header>
          <HeaderLeft>
            <HeaderInfo>
              <Title>
                <FaCog /> Settings
              </Title>
              <Subtitle>Manage your account settings and preferences</Subtitle>
            </HeaderInfo>
          </HeaderLeft>
          <HeaderActions>
            <ActionButton>
              <FaCheck /> Save Changes
            </ActionButton>
          </HeaderActions>
        </Header>
        {renderSectionContent()}
      </Content>
    </PageContainer>
  );
};

export default Settings;