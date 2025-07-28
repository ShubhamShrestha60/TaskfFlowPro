import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 16px;
  padding: 1.5rem;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
  }
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  overflow-y: auto;
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.borderColor}20;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.borderColor};
    border-radius: 3px;
  }
`;

const TaskItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.borderColor};
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(4px);
    border-color: ${({ theme }) => theme.primary}40;
  }
`;

const TaskContent = styled.div`
  flex: 1;
  min-width: 0;

  h3 {
    font-size: 0.95rem;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
    margin-bottom: 0.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const StatusBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  background: ${({ $status, theme }) =>
    $status === 'completed'
      ? theme.success + '20'
      : $status === 'in_progress'
      ? theme.warning + '20'
      : theme.error + '20'};
  color: ${({ $status, theme }) =>
    $status === 'completed'
      ? theme.success
      : $status === 'in_progress'
      ? theme.warning
      : theme.error};

  svg {
    font-size: 1rem;
  }
`;

const getStatusIcon = (status) => {
  switch (status) {
    case 'completed':
      return <FaCheckCircle />;
    case 'in_progress':
      return <FaClock />;
    case 'overdue':
      return <FaExclamationCircle />;
    default:
      return null;
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'in_progress':
      return 'In Progress';
    case 'overdue':
      return 'Overdue';
    default:
      return status;
  }
};

const RecentTasks = () => {
  const tasks = [
    {
      id: 1,
      title: 'Design System Updates',
      project: 'Website Redesign',
      status: 'completed',
    },
    {
      id: 2,
      title: 'API Integration',
      project: 'Mobile App',
      status: 'in_progress',
    },
    {
      id: 3,
      title: 'User Authentication',
      project: 'Backend Services',
      status: 'in_progress',
    },
    {
      id: 4,
      title: 'Performance Optimization',
      project: 'Dashboard',
      status: 'overdue',
    },
    {
      id: 5,
      title: 'Database Migration',
      project: 'Infrastructure',
      status: 'completed',
    },
  ];

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Header>
        <h2>Recent Tasks</h2>
      </Header>

      <TaskList>
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <TaskContent>
              <h3>{task.title}</h3>
              <p>{task.project}</p>
            </TaskContent>
            <StatusBadge $status={task.status}>
              {getStatusIcon(task.status)}
              {getStatusText(task.status)}
            </StatusBadge>
          </TaskItem>
        ))}
      </TaskList>
    </Card>
  );
};

export default RecentTasks;