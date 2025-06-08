import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCamera, FaLock, FaPalette } from 'react-icons/fa';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: ${({ theme }) => theme.zIndex.modal};
  isolation: isolate;
`;

const ModalContent = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 600px;
  background: ${({ theme }) => theme.cardBg};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid ${({ theme }) => theme.borderColor};
  overflow: hidden;
  z-index: ${({ theme }) => theme.zIndex.modal + 1};
`;

const ModalHeader = styled.div`
  padding: 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textSecondary};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.bgSecondary};
    color: ${({ theme }) => theme.text};
  }

  svg {
    font-size: 1.25rem;
  }
`;

const TabList = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  padding: 0 1.25rem;
`;

const Tab = styled.button`
  padding: 1rem 1.5rem;
  color: ${({ $active, theme }) => $active ? theme.primary : theme.textSecondary};
  border-bottom: 2px solid ${({ $active, theme }) => $active ? theme.primary : 'transparent'};
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  margin-bottom: 1.5rem;
`;

const AvatarUpload = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover .upload-overlay {
    opacity: 1;
  }
`;

const UploadOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.2s ease;
  cursor: pointer;

  svg {
    color: white;
    font-size: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1.5px solid ${({ theme }) => theme.borderColor};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-size: 0.9375rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }
`;

const ThemeSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const ThemeCard = styled.button`
  padding: 1rem;
  border: 1.5px solid ${({ $active, theme }) => $active ? theme.primary : theme.borderColor};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
  text-align: left;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }

  h4 {
    margin: 0 0 0.5rem;
    font-size: 0.875rem;
  }

  .theme-preview {
    height: 60px;
    border-radius: ${({ theme }) => theme.radius.sm};
    background: ${({ $isDark }) => $isDark ? '#1a1a1a' : '#ffffff'};
    border: 1px solid ${({ theme }) => theme.borderColor};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ $variant, theme }) =>
    $variant === 'primary'
      ? `
    background: ${theme.primary};
    color: white;
    border: none;

    &:hover {
      background: ${theme.secondary};
    }
  `
      : `
    background: transparent;
    color: ${theme.textSecondary};
    border: 1.5px solid ${theme.borderColor};

    &:hover {
      background: ${theme.bgSecondary};
      color: ${theme.text};
    }
  `}
`;

function ProfileSettings({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: 'Shubham Shrestha',
    email: 'shubham@example.com',
    role: 'Project Manager',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [selectedTheme, setSelectedTheme] = useState('light');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form data:', formData);
    onClose();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <>
            <ProfileSection>
              <AvatarUpload>
                <img src="https://ui-avatars.com/api/?name=Shubham+Shrestha&background=random" alt="Profile" />
                <UploadOverlay className="upload-overlay">
                  <FaCamera />
                </UploadOverlay>
              </AvatarUpload>
            </ProfileSection>

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Full Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label>Role</Label>
                <Input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                />
              </FormGroup>

              <ButtonGroup>
                <Button type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" $variant="primary">
                  Save Changes
                </Button>
              </ButtonGroup>
            </Form>
          </>
        );

      case 'security':
        return (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Current Password</Label>
              <Input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>New Password</Label>
              <Input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Confirm New Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </FormGroup>

            <ButtonGroup>
              <Button type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" $variant="primary">
                Update Password
              </Button>
            </ButtonGroup>
          </Form>
        );

      case 'appearance':
        return (
          <>
            <h3>Theme</h3>
            <ThemeSection>
              <ThemeCard
                $active={selectedTheme === 'light'}
                onClick={() => setSelectedTheme('light')}
              >
                <h4>Light</h4>
                <div className="theme-preview" />
              </ThemeCard>

              <ThemeCard
                $active={selectedTheme === 'dark'}
                onClick={() => setSelectedTheme('dark')}
                $isDark
              >
                <h4>Dark</h4>
                <div className="theme-preview" />
              </ThemeCard>
            </ThemeSection>

            <ButtonGroup>
              <Button type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" $variant="primary">
                Save Theme
              </Button>
            </ButtonGroup>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <ModalHeader>
              <h2>Profile Settings</h2>
              <CloseButton onClick={onClose}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>

            <TabList>
              <Tab
                $active={activeTab === 'profile'}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </Tab>
              <Tab
                $active={activeTab === 'security'}
                onClick={() => setActiveTab('security')}
              >
                Security
              </Tab>
              <Tab
                $active={activeTab === 'appearance'}
                onClick={() => setActiveTab('appearance')}
              >
                Appearance
              </Tab>
            </TabList>

            <Content>
              {renderContent()}
            </Content>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
}

export default ProfileSettings;