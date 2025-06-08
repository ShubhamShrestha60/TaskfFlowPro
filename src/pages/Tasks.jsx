import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaPlus, 
  FaTags, 
  FaFilter, 
  FaSort,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
  FaTrash,
  FaEdit,
  FaFlag
} from 'react-icons/fa';

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

const ToolBar = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
`;

const SearchBar = styled.div`
  flex: 1;
  min-width: 280px;
  position: relative;

  input {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.md};
    padding-left: 2.5rem;
    border-radius: ${({ theme }) => theme.radius.lg};
    border: 1px solid ${({ theme }) => theme.borderColor};
    background: ${({ theme }) => theme.cardBg};
    color: ${({ theme }) => theme.text};
    font-size: ${({ theme }) => theme.fontSize.base};
    transition: ${({ theme }) => theme.transition.base};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.primary};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}20;
    }
  }

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.textSecondary};
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
  
  ${({ $variant, theme }) => 
    $variant === 'primary' ? `
      background: ${theme.primary};
      color: white;
      
      &:hover {
        background: ${theme.secondary};
      }
    ` : `
      background: ${theme.cardBg};
      color: ${theme.textSecondary};
      border: 1px solid ${theme.borderColor};
      
      &:hover {
        border-color: ${theme.primary};
        color: ${theme.primary};
      }
    `}
`;

const TaskGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const TaskCard = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.borderColor};
  padding: ${({ theme }) => theme.spacing.lg};
  transition: ${({ theme }) => theme.transition.base};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px ${({ theme }) => theme.shadowColor};
    border-color: ${({ theme }) => theme.primary}40;
  }
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TaskTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const TaskDescription = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.base};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.5;
`;

const TaskMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const TaskTags = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const Tag = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.fontSize.sm};
  background: ${({ $color, theme }) => theme[$color]}20;
  color: ${({ $color, theme }) => theme[$color]};
`;

const PriorityBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.fontSize.sm};
  background: ${({ $priority, theme }) => 
    $priority === 'high' ? theme.error + '20' :
    $priority === 'medium' ? theme.warning + '20' :
    theme.success + '20'
  };
  color: ${({ $priority, theme }) => 
    $priority === 'high' ? theme.error :
    $priority === 'medium' ? theme.warning :
    theme.success
  };
`;

const TaskActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

const IconButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radius.full};
  color: ${({ theme }) => theme.textSecondary};
  transition: ${({ theme }) => theme.transition.base};

  &:hover {
    background: ${({ theme }) => theme.primary}10;
    color: ${({ theme }) => theme.primary};
  }
`;

const Tasks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const tasks = [
    {
      id: 1,
      title: 'Implement Authentication',
      description: 'Add user authentication using JWT tokens and implement secure password hashing.',
      status: 'in_progress',
      priority: 'high',
      dueDate: '2024-03-25',
      tags: ['backend', 'security'],
    },
    {
      id: 2,
      title: 'Design System Updates',
      description: 'Update component library with new design tokens and improve accessibility.',
      status: 'todo',
      priority: 'medium',
      dueDate: '2024-03-28',
      tags: ['design', 'ui'],
    },
    {
      id: 3,
      title: 'API Documentation',
      description: 'Create comprehensive API documentation using Swagger/OpenAPI.',
      status: 'completed',
      priority: 'low',
      dueDate: '2024-03-20',
      tags: ['documentation', 'api'],
    },
    {
      id: 4,
      title: 'Performance Optimization',
      description: 'Optimize application performance and reduce loading times.',
      status: 'in_progress',
      priority: 'high',
      dueDate: '2024-03-22',
      tags: ['optimization', 'frontend'],
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle />;
      case 'in_progress':
        return <FaClock />;
      default:
        return <FaExclamationCircle />;
    }
  };

  const getPriorityLabel = (priority) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  return (
    <PageContainer>
      <Header>
        <Title>Tasks</Title>
        <Subtitle>Manage and organize your tasks efficiently</Subtitle>
      </Header>

      <ToolBar>
        <SearchBar>
          <FaSearch />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBar>

        <Button
          $variant="primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaPlus />
          New Task
        </Button>

        <Button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <FaFilter />
          Filter
        </Button>

        <Button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <FaSort />
          Sort
        </Button>
      </ToolBar>

      <TaskGrid>
        <AnimatePresence>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <TaskHeader>
                <div>
                  <TaskTitle>{task.title}</TaskTitle>
                  <TaskMeta>
                    {getStatusIcon(task.status)}
                    <span>Due {task.dueDate}</span>
                  </TaskMeta>
                </div>
                <PriorityBadge $priority={task.priority}>
                  <FaFlag />
                  {getPriorityLabel(task.priority)}
                </PriorityBadge>
              </TaskHeader>

              <TaskTags>
                {task.tags.map((tag) => (
                  <Tag key={tag} $color="primary">
                    {tag}
                  </Tag>
                ))}
              </TaskTags>

              <TaskDescription>{task.description}</TaskDescription>

              <TaskActions>
                <IconButton
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaEdit />
                </IconButton>
                <IconButton
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTrash />
                </IconButton>
              </TaskActions>
            </TaskCard>
          ))}
        </AnimatePresence>
      </TaskGrid>
    </PageContainer>
  );
};

export default Tasks;