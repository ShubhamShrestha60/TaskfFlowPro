import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCalendarPlus,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaEllipsisH
} from 'react-icons/fa';
import NewEventModal from '../components/calendar/NewEventModal';

const PageContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.lg};
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  gap: 2rem;
`;

const MonthNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-left: auto;

  h2 {
    font-size: ${({ theme }) => theme.fontSize.xl};
    color: ${({ theme }) => theme.text};
    min-width: 200px;
    text-align: center;
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const IconButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.full};
  color: ${({ theme }) => theme.textSecondary};
  transition: ${({ theme }) => theme.transition.base};
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.borderColor};

  &:hover {
    background: ${({ theme }) => theme.primary}10;
    color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Button = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.lg};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSize.base};
  transition: ${({ theme }) => theme.transition.base};
  background: ${({ theme }) => theme.primary};
  color: white;

  &:hover {
    background: ${({ theme }) => theme.secondary};
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const WeekDay = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const DayCell = styled(motion.div)`
  aspect-ratio: 1;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.cardBg};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.base};
  position: relative;

  ${({ $isToday, theme }) => $isToday && `
    border-color: ${theme.primary};
    background: ${theme.primary}10;
  `}

  ${({ $isSelected, theme }) => $isSelected && `
    border-color: ${theme.primary};
    background: ${theme.primary}20;
  `}

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    transform: translateY(-2px);
  }
`;

const DayNumber = styled.span`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme, $isToday }) => $isToday ? theme.primary : theme.text};
`;

const EventIndicator = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme, $color }) => theme[$color]};
  margin: 2px;
`;

const EventIndicators = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  margin-top: 4px;
`;

const EventsList = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const EventCard = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.borderColor};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  transition: ${({ theme }) => theme.transition.base};

  &:hover {
    transform: translateX(4px);
    border-color: ${({ theme }) => theme.primary}40;
  }
`;

const EventTime = styled.div`
  min-width: 100px;
  color: ${({ theme }) => theme.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const EventContent = styled.div`
  flex: 1;
`;

const EventTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  font-size: ${({ theme }) => theme.fontSize.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const EventMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};

  svg {
    font-size: 1rem;
  }
`;

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const events = [
    {
      id: 1,
      title: 'Team Meeting',
      date: '2024-03-20',
      time: '10:00 AM',
      duration: '1h',
      location: 'Conference Room A',
      attendees: 5,
      color: 'primary'
    },
    {
      id: 2,
      title: 'Project Review',
      date: '2024-03-20',
      time: '2:00 PM',
      duration: '2h',
      location: 'Virtual',
      attendees: 8,
      color: 'secondary'
    },
    {
      id: 3,
      title: 'Client Meeting',
      date: '2024-03-22',
      time: '11:00 AM',
      duration: '1h 30m',
      location: 'Meeting Room B',
      attendees: 4,
      color: 'success'
    }
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const isToday = (date) => {
    const today = new Date();
    return date && 
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date) => {
    return date && selectedDate && 
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + direction,
      1
    ));
  };

  const handleNewEvent = (eventData) => {
    // Here you would typically save the event to your backend
    console.log('New event:', eventData);
    // For now, we'll just close the modal
    setIsNewEventModalOpen(false);
  };

  return (
    <PageContainer>
      <Header>
        <Title>Calendar</Title>
        <Subtitle>Schedule and manage your events</Subtitle>
      </Header>

      <CalendarHeader>
        <Button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsNewEventModalOpen(true)}
        >
          <FaCalendarPlus /> New Event
        </Button>
        
        <MonthNavigation>
          <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
          <NavigationButtons>
            <IconButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateMonth(-1)}
            >
              <FaChevronLeft />
            </IconButton>
            <IconButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateMonth(1)}
            >
              <FaChevronRight />
            </IconButton>
          </NavigationButtons>
        </MonthNavigation>
      </CalendarHeader>

      <CalendarGrid>
        {weekDays.map(day => (
          <WeekDay key={day}>{day}</WeekDay>
        ))}
        
        {getDaysInMonth(currentDate).map((date, index) => (
          <DayCell
            key={index}
            $isToday={isToday(date)}
            $isSelected={isSelected(date)}
            onClick={() => date && setSelectedDate(date)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {date && (
              <>
                <DayNumber $isToday={isToday(date)}>
                  {date.getDate()}
                </DayNumber>
                <EventIndicators>
                  {getEventsForDate(date).map(event => (
                    <EventIndicator 
                      key={event.id}
                      $color={event.color}
                    />
                  ))}
                </EventIndicators>
              </>
            )}
          </DayCell>
        ))}
      </CalendarGrid>

      <EventsList>
        <AnimatePresence>
          {getEventsForDate(selectedDate).map(event => (
            <EventCard
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <EventTime>
                <div>{event.time}</div>
                <div>{event.duration}</div>
              </EventTime>
              
              <EventContent>
                <EventTitle>{event.title}</EventTitle>
                <EventMeta>
                  <span>
                    <FaClock /> {event.duration}
                  </span>
                  <span>
                    <FaMapMarkerAlt /> {event.location}
                  </span>
                  <span>
                    <FaUsers /> {event.attendees} attendees
                  </span>
                </EventMeta>
              </EventContent>

              <IconButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaEllipsisH />
              </IconButton>
            </EventCard>
          ))}
        </AnimatePresence>
      </EventsList>

      <NewEventModal
        isOpen={isNewEventModalOpen}
        onClose={() => setIsNewEventModalOpen(false)}
        onSubmit={handleNewEvent}
      />
    </PageContainer>
  );
};

export default Calendar;