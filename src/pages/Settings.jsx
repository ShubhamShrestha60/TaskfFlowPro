import styled from 'styled-components';

const SettingsContainer = styled.div`
  h1 {
    margin-bottom: 1.5rem;
  }
`;

const Settings = () => {
  return (
    <SettingsContainer>
      <h1>Settings</h1>
      <p>Application settings will go here</p>
    </SettingsContainer>
  );
};

export default Settings;