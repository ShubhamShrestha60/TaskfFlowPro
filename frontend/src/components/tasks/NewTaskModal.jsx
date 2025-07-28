import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, 
  FaRegCalendarAlt, 
  FaRegClock,
  FaRegFlag,
  FaTags,
  FaUserPlus,
  FaPaperclip,
  FaRegCheckCircle
} from 'react-icons/fa';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: ${({ theme }) => theme.zIndex.modal};
`;

const ModalContent = styled(motion.div)`
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  background: ${({ theme }) => theme.cardBg};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid ${({ theme }) => theme.borderColor};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  padding: 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.cardBg};

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
  overflow-y: auto;
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
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const TextArea = styled(Input).attrs({ as: 'textarea' })`
  min-height: 100px;
  resize: vertical;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1.5px solid ${({ theme }) => theme.borderColor};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1rem;
  padding-right: 2.5rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Tag = styled.div`
  padding: 0.25rem 0.75rem;
  background: ${({ $color, theme }) => theme[$color]}20;
  color: ${({ $color, theme }) => theme[$color]};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $color, theme }) => theme[$color]}30;
  }
`;

const AssigneeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Assignee = styled.div`
  padding: 0.25rem 0.75rem;
  background: ${({ theme }) => theme.bgSecondary};
  color: ${({ theme }) => theme.text};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
`;

const AttachmentArea = styled.div`
  border: 2px dashed ${({ theme }) => theme.borderColor};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.textSecondary};
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
  display: flex;
  align-items: center;
  gap: 0.5rem;

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

function NewTaskModal({ isOpen, onClose, onSubmit }) {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    dueTime: '',
    priority: 'medium',
    category: 'general',
    tags: [],
    assignees: [],
    attachments: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(taskData);
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
              <h2>Create New Task</h2>
              <CloseButton onClick={onClose}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Task Title</Label>
                <Input
                  type="text"
                  name="title"
                  value={taskData.title}
                  onChange={handleChange}
                  placeholder="Enter task title"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Description</Label>
                <TextArea
                  name="description"
                  value={taskData.description}
                  onChange={handleChange}
                  placeholder="Enter task description"
                />
              </FormGroup>

              <Row>
                <FormGroup>
                  <Label>Due Date</Label>
                  <Input
                    type="date"
                    name="dueDate"
                    value={taskData.dueDate}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Due Time</Label>
                  <Input
                    type="time"
                    name="dueTime"
                    value={taskData.dueTime}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Row>

              <Row>
                <FormGroup>
                  <Label>Priority</Label>
                  <Select
                    name="priority"
                    value={taskData.priority}
                    onChange={handleChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label>Category</Label>
                  <Select
                    name="category"
                    value={taskData.category}
                    onChange={handleChange}
                  >
                    <option value="general">General</option>
                    <option value="development">Development</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="research">Research</option>
                  </Select>
                </FormGroup>
              </Row>

              <FormGroup>
                <Label>Tags</Label>
                <TagsContainer>
                  <Tag $color="primary">Feature</Tag>
                  <Tag $color="success">In Progress</Tag>
                  <Tag $color="warning">Review</Tag>
                  <Tag $color="error">Bug</Tag>
                </TagsContainer>
              </FormGroup>

              <FormGroup>
                <Label>Assignees</Label>
                <AssigneeList>
                  <Assignee>
                    <img src="https://ui-avatars.com/api/?name=John+Doe" alt="John Doe" />
                    John Doe
                  </Assignee>
                  <Assignee>
                    <img src="https://ui-avatars.com/api/?name=Jane+Smith" alt="Jane Smith" />
                    Jane Smith
                  </Assignee>
                </AssigneeList>
              </FormGroup>

              <FormGroup>
                <Label>Attachments</Label>
                <AttachmentArea>
                  <FaPaperclip />
                  <div>Drop files here or click to attach</div>
                </AttachmentArea>
              </FormGroup>

              <ButtonGroup>
                <Button type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" $variant="primary">
                  <FaRegCheckCircle /> Create Task
                </Button>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
}

export default NewTaskModal; 