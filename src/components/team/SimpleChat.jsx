import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Container = styled(motion.div)`
  width: 100%;
  max-width: 500px;
  height: 600px;
  background: ${props => props.theme.cardBg};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #3B82F6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${props => props.online ? props.theme.success : props.theme.gray};
    border: 2px solid ${props => props.theme.cardBg};
  }
`;

const UserInfo = styled.div`
  flex: 1;
  h3 {
    margin: 0;
    color: ${props => props.theme.text};
  }
  span {
    color: ${props => props.theme.textSecondary};
    font-size: 0.875rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.textSecondary};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;

  &:hover {
    background: ${props => props.theme.bgSecondary};
  }
`;

const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  max-width: 80%;
  align-self: ${props => props.sent ? 'flex-end' : 'flex-start'};
`;

const Bubble = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 12px;
  background: ${props => props.sent ? props.theme.primary : props.theme.bgSecondary};
  color: ${props => props.sent ? 'white' : props.theme.text};
`;

const Time = styled.span`
  font-size: 0.75rem;
  color: ${props => props.theme.textSecondary};
  text-align: ${props => props.sent ? 'right' : 'left'};
`;

const InputArea = styled.form`
  padding: 1rem;
  border-top: 1px solid ${props => props.theme.borderColor};
  display: flex;
  gap: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 8px;
  background: ${props => props.theme.bg};
  color: ${props => props.theme.text};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }
`;

const SendButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.theme.secondary};
  }
`;

const SimpleChat = ({ isOpen, onClose, recipient }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi there!', time: '10:30 AM', sent: false },
    { id: 2, text: 'Hello! How can I help?', time: '10:31 AM', sent: true }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sent: true
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <Container
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <Header>
              <Avatar online>
                {recipient.charAt(0).toUpperCase()}
              </Avatar>
              <UserInfo>
                <h3>{recipient}</h3>
                <span>Online</span>
              </UserInfo>
              <CloseButton onClick={onClose}>
                <FaTimes />
              </CloseButton>
            </Header>

            <Messages>
              {messages.map(msg => (
                <Message key={msg.id} sent={msg.sent}>
                  <Bubble sent={msg.sent}>
                    {msg.text}
                  </Bubble>
                  <Time sent={msg.sent}>
                    {msg.time}
                  </Time>
                </Message>
              ))}
            </Messages>

            <InputArea onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              <SendButton type="submit">
                <FaPaperPlane /> Send
              </SendButton>
            </InputArea>
          </Container>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default SimpleChat; 