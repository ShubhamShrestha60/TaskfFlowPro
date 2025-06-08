import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperclip, FaPaperPlane } from 'react-icons/fa';

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
`;

const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  border-radius: ${({ theme }) => theme.radius.lg};
  width: 100%;
  max-width: 600px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid ${({ theme }) => theme.borderColor};
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
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

const Form = styled.form`
  padding: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  font-size: 0.875rem;
`;

const Input = styled.input`
  width: 100%;
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
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}20;
  }

  &:hover {
    border-color: ${({ theme }) => theme.primary}80;
  }
`;

const TextArea = styled(Input).attrs({ as: 'textarea' })`
  min-height: 200px;
  resize: vertical;
`;

const AttachmentArea = styled.div`
  border: 2px dashed ${({ theme }) => theme.borderColor};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
  }

  svg {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
    box-shadow: 0 2px 4px ${theme.primary}40;

    &:hover {
      background: ${theme.secondary};
      transform: translateY(-1px);
      box-shadow: 0 4px 8px ${theme.primary}40;
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 1px 2px ${theme.primary}40;
    }
  `
      : `
    background: ${theme.bg};
    color: ${theme.text};
    border: 1.5px solid ${theme.borderColor};

    &:hover {
      background: ${theme.bgSecondary};
      border-color: ${theme.primary}80;
    }
  `}
`;

const MessageModal = ({ isOpen, onClose, recipient }) => {
  const [messageData, setMessageData] = useState({
    subject: '',
    message: '',
    attachment: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessageData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle message submission here
    console.log('Message Data:', messageData);
    onClose();
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
              <h2>New Message to {recipient}</h2>
              <CloseButton onClick={onClose}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Subject</Label>
                <Input
                  type="text"
                  name="subject"
                  value={messageData.subject}
                  onChange={handleChange}
                  placeholder="Enter message subject"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Message</Label>
                <TextArea
                  name="message"
                  value={messageData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  required
                />
              </FormGroup>

              <AttachmentArea>
                <FaPaperclip />
                <div>Drop files here or click to attach</div>
              </AttachmentArea>

              <ButtonGroup>
                <Button type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" $variant="primary">
                  <FaPaperPlane /> Send Message
                </Button>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default MessageModal; 