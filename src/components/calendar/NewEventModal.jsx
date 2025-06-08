import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaClock, FaMapMarkerAlt, FaUsers, FaTag } from 'react-icons/fa';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
  padding: 1rem;
  overflow-y: auto;

  @media (min-height: 800px) {
    align-items: center;
  }
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
  margin: 2rem auto;
  max-height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.cardBg};
  position: sticky;
  top: 0;
  z-index: 1;

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
  flex: 1;
`;

const FormContent = styled.div`
  padding-bottom: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.text};
    font-weight: 500;
    font-size: 0.875rem;
  }
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
  padding: 0.75rem 2.75rem 0.75rem 2.75rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${({ theme }) => 
    encodeURIComponent(theme.textSecondary)}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}20;
  }

  &:hover {
    border-color: ${({ theme }) => theme.primary}80;
  }
`;

const DateTimeGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const IconInput = styled.div`
  position: relative;

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.textSecondary};
    font-size: 1rem;
    z-index: 1;
    pointer-events: none;
  }

  input, select {
    padding-left: 2.75rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.cardBg};
  position: sticky;
  bottom: 0;
  z-index: 1;
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

    &:active {
      background: ${theme.bgSecondary};
    }
  `}
`;

const NewEventModal = ({ isOpen, onClose, onSubmit }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: '',
    category: 'meeting',
    participants: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(eventData);
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
              <h2>Create New Event</h2>
              <CloseButton onClick={onClose}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <label>Event Title</label>
                <Input
                  type="text"
                  name="title"
                  value={eventData.title}
                  onChange={handleChange}
                  placeholder="Enter event title"
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>Description</label>
                <TextArea
                  name="description"
                  value={eventData.description}
                  onChange={handleChange}
                  placeholder="Enter event description"
                />
              </FormGroup>

              <DateTimeGroup>
                <FormGroup>
                  <label>Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    value={eventData.startDate}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Start Time</label>
                  <Input
                    type="time"
                    name="startTime"
                    value={eventData.startTime}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </DateTimeGroup>

              <DateTimeGroup>
                <FormGroup>
                  <label>End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    value={eventData.endDate}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>End Time</label>
                  <Input
                    type="time"
                    name="endTime"
                    value={eventData.endTime}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </DateTimeGroup>

              <FormGroup>
                <label>Location</label>
                <IconInput>
                  <FaMapMarkerAlt />
                  <Input
                    type="text"
                    name="location"
                    value={eventData.location}
                    onChange={handleChange}
                    placeholder="Enter location"
                  />
                </IconInput>
              </FormGroup>

              <FormGroup>
                <label>Category</label>
                <IconInput>
                  <FaTag />
                  <Select
                    name="category"
                    value={eventData.category}
                    onChange={handleChange}
                  >
                    <option value="meeting">Meeting</option>
                    <option value="task">Task</option>
                    <option value="reminder">Reminder</option>
                    <option value="deadline">Deadline</option>
                    <option value="other">Other</option>
                  </Select>
                </IconInput>
              </FormGroup>

              <FormGroup>
                <label>Participants</label>
                <IconInput>
                  <FaUsers />
                  <Input
                    type="text"
                    name="participants"
                    value={eventData.participants}
                    onChange={handleChange}
                    placeholder="Enter participant names or emails"
                  />
                </IconInput>
              </FormGroup>

              <ButtonGroup>
                <Button type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" $variant="primary">
                  Create Event
                </Button>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default NewEventModal; 