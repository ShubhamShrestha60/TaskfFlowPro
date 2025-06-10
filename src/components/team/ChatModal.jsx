import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane, FaSmile, FaPaperclip } from 'react-icons/fa';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
  padding: 1rem;
  isolation: isolate;
`;

const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  border-radius: ${({ theme }) => theme.radius.lg};
  width: 100%;
  max-width: 500px;
  height: 600px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  flex-direction: column;
  z-index: ${({ theme }) => theme.zIndex.modal + 1};
`;

const ModalHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${({ theme }) => theme.cardBg};
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ $bg }) => $bg};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ theme, $online, $away }) => 
      $online ? theme.success : 
      $away ? theme.warning : 
      theme.gray
    };
    border: 2px solid ${({ theme }) => theme.cardBg};
  }
`;

const UserInfo = styled.div`
  flex: 1;

  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    margin: 0;
  }

  span {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.textSecondary};
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

const ChatContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  max-width: 80%;
  align-self: ${({ $isSent }) => $isSent ? 'flex-end' : 'flex-start'};
`;

const MessageBubble = styled.div`
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  font-size: 0.9375rem;
  background: ${({ theme, $isSent }) => $isSent ? theme.primary : theme.bgSecondary};
  color: ${({ theme, $isSent }) => $isSent ? 'white' : theme.text};
  border-bottom-right-radius: ${({ theme, $isSent }) => $isSent ? theme.radius.sm : theme.radius.lg};
  border-bottom-left-radius: ${({ theme, $isSent }) => $isSent ? theme.radius.lg : theme.radius.sm};
`;

const MessageTime = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textSecondary};
  text-align: ${({ $isSent }) => $isSent ? 'right' : 'left'};
`;

const InputArea = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.cardBg};
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.bg};
  border: 1.5px solid ${({ theme }) => theme.borderColor};

  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: none;
  padding: 0.5rem;
  color: ${({ theme }) => theme.text};
  font-size: 0.9375rem;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textSecondary};
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  svg {
    font-size: 1.25rem;
  }
`;

const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

const ChatModal = ({ isOpen, onClose, recipient, status }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: 'Hi there! How can I help you today?',
      time: '10:30 AM',
      isSent: false
    },
    {
      id: 2,
      content: 'I had a question about the latest project updates.',
      time: '10:31 AM',
      isSent: true
    },
    {
      id: 3,
      content: 'Sure, I'd be happy to help. What specifically would you like to know?',
      time: '10:32 AM',
      isSent: false
    }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      content: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSent: true
    };

    setMessages([...messages, newMessage]);
    setMessage('');
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
              <Avatar 
                $bg="#3B82F6" 
                $online={status === 'online'}
                $away={status === 'away'}
              >
                {getInitials(recipient)}
              </Avatar>
              <UserInfo>
                <h3>{recipient}</h3>
                <span>{status}</span>
              </UserInfo>
              <CloseButton onClick={onClose}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>

            <ChatContainer>
              {messages.map(msg => (
                <Message key={msg.id} $isSent={msg.isSent}>
                  <MessageBubble $isSent={msg.isSent}>
                    {msg.content}
                  </MessageBubble>
                  <MessageTime $isSent={msg.isSent}>
                    {msg.time}
                  </MessageTime>
                </Message>
              ))}
            </ChatContainer>

            <InputArea>
              <form onSubmit={handleSend}>
                <InputContainer>
                  <IconButton type="button">
                    <FaPaperclip />
                  </IconButton>
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <IconButton type="button">
                    <FaSmile />
                  </IconButton>
                  <IconButton type="submit">
                    <FaPaperPlane />
                  </IconButton>
                </InputContainer>
              </form>
            </InputArea>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default ChatModal; 