import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock, FiAlertCircle, FiPlusCircle } from 'react-icons/fi';

const TimelineContainer = styled(motion.div)`
  padding: 1.5rem;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const TimelineTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.textGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  z-index: 1;
`;

const ViewAll = styled.button`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background: ${({ theme }) => theme.cardBg};
  border: ${({ theme }) => theme.border};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.glassMorphism};
    border-color: ${({ theme }) => theme.primary};
  }
`;

const TimelineList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  z-index: 1;
  padding: 0.5rem;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  gap: 1.25rem;
  position: relative;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.glassMorphismDark};
  border: ${({ theme }) => theme.border};
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(8px);
    background: ${({ theme }) => theme.glassMorphism};
    border-color: ${({ theme }) => theme.primary};
  }

  &::before {
    content: '';
    position: absolute;
    left: -2px;
    top: 0;
    bottom: 0;
    width: 3px;
    background: ${({ status, theme }) => 
      status === 'completed' ? theme.gradientSuccess :
      status === 'pending' ? theme.gradientWarning :
      theme.gradientDanger};
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    gap: 1rem;
  }
`;

const TimelineIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: ${({ status, theme }) => 
    status === 'completed' ? theme.gradientSuccess :
    status === 'pending' ? theme.gradientWarning :
    theme.gradientDanger};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  position: relative;
  box-shadow: 0 8px 16px ${({ theme }) => `${theme.primary}20`};

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 14px;
    padding: 2px;
    background: inherit;
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.5;
  }

  svg {
    font-size: 1.25rem;
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    border-radius: 10px;

    svg {
      font-size: 1.1rem;
    }
  }
`;

const TimelineContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const TimelineText = styled.p`
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const TimelineTime = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.gray};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: currentColor;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const Decoration = styled.div`
  position: absolute;
  right: -50px;
  bottom: -50px;
  width: 200px;
  height: 200px;
  background: ${({ theme }) => theme.gradientPrimary};
  filter: blur(60px);
  opacity: 0.05;
  border-radius: 50%;
  pointer-events: none;
`;

const ActivityTimeline = () => {
  const activities = [
    {
      id: 1,
      title: 'Task "Create dashboard" completed',
      time: '10 minutes ago',
      status: 'completed',
      icon: <FiCheckCircle size={18} />
    },
    {
      id: 2,
      title: 'New task "Fix responsive issues" assigned',
      time: '1 hour ago',
      status: 'pending',
      icon: <FiClock size={18} />
    },
    {
      id: 3,
      title: 'Task "Implement dark mode" overdue',
      time: '2 hours ago',
      status: 'overdue',
      icon: <FiAlertCircle size={18} />
    },
    {
      id: 4,
      title: 'Project kickoff meeting completed',
      time: 'Yesterday',
      status: 'completed',
      icon: <FiCheckCircle size={18} />
    },
    {
      id: 5,
      title: 'New feature "Export tasks" added',
      time: '2 days ago',
      status: 'completed',
      icon: <FiPlusCircle size={18} />
    }
  ];

  return (
    <TimelineContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Decoration />
      <TimelineTitle>
        Recent Activity
        <ViewAll>View All</ViewAll>
      </TimelineTitle>
      <TimelineList>
        {activities.map((activity, index) => (
          <TimelineItem
            key={activity.id}
            status={activity.status}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <TimelineIcon status={activity.status}>
              {activity.icon}
            </TimelineIcon>
            <TimelineContent>
              <TimelineText>{activity.title}</TimelineText>
              <TimelineTime>{activity.time}</TimelineTime>
            </TimelineContent>
          </TimelineItem>
        ))}
      </TimelineList>
    </TimelineContainer>
  );
};

export default ActivityTimeline;