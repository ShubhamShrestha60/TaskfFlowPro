import styled from 'styled-components';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import {
  FaCheckCircle,
  FaCommentAlt,
  FaPlusCircle,
  FaEdit,
  FaUserPlus
} from 'react-icons/fa';

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
  }
`;

const Timeline = styled.div`
  position: relative;
  padding-left: 2rem;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${({ theme }) => theme.borderColor};
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  padding-bottom: 2rem;

  &:last-child {
    padding-bottom: 0;
  }

  &::before {
    content: '';
    position: absolute;
    left: -2rem;
    top: 0;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: ${({ color, theme }) => theme[color]};
    border: 3px solid ${({ theme }) => theme.cardBg};
  }
`;

const TimelineContent = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 0.5rem;

  h3 {
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      color: ${({ color, theme }) => theme[color]};
    }
  }

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.textSecondary};
    line-height: 1.5;
  }
`;

const TimelineMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textSecondary};

  span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

const getActivityIcon = (type) => {
  switch (type) {
    case 'completed':
      return <FaCheckCircle />;
    case 'comment':
      return <FaCommentAlt />;
    case 'created':
      return <FaPlusCircle />;
    case 'updated':
      return <FaEdit />;
    case 'assigned':
      return <FaUserPlus />;
    default:
      return null;
  }
};

const getActivityColor = (type) => {
  switch (type) {
    case 'completed':
      return 'success';
    case 'comment':
      return 'info';
    case 'created':
      return 'primary';
    case 'updated':
      return 'warning';
    case 'assigned':
      return 'secondary';
    default:
      return 'primary';
  }
};

const ActivityTimeline = () => {
  const activities = [
    {
      id: 1,
      type: 'completed',
      title: 'Task Completed',
      description: 'Homepage redesign project has been completed and ready for review.',
      user: 'Shubham Shrestha',
      time: new Date(2024, 2, 15, 14, 30),
    },
    {
      id: 2,
      type: 'comment',
      title: 'New Comment',
      description: 'Left a comment on "API Integration" task regarding the authentication flow.',
      user: 'Sarah Wilson',
      time: new Date(2024, 2, 15, 13, 15),
    },
    {
      id: 3,
      type: 'created',
      title: 'New Task Created',
      description: 'Created a new task "Implement User Dashboard" in the Development project.',
      user: 'Mike Johnson',
      time: new Date(2024, 2, 15, 11, 45),
    },
    {
      id: 4,
      type: 'assigned',
      title: 'Task Assigned',
      description: 'Backend optimization task has been assigned to the DevOps team.',
      user: 'Emily Brown',
      time: new Date(2024, 2, 15, 10, 20),
    },
  ];

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Header>
        <h2>Recent Activity</h2>
      </Header>

      <Timeline>
        {activities.map((activity, index) => (
          <TimelineItem
            key={activity.id}
            color={getActivityColor(activity.type)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <TimelineContent color={getActivityColor(activity.type)}>
              <h3>
                {getActivityIcon(activity.type)}
                {activity.title}
              </h3>
              <p>{activity.description}</p>
            </TimelineContent>
            <TimelineMeta>
              <span>{activity.user}</span>
              <span>•</span>
              <span>{format(activity.time, 'h:mm a')}</span>
            </TimelineMeta>
          </TimelineItem>
        ))}
      </Timeline>
    </Card>
  );
};

export default ActivityTimeline;