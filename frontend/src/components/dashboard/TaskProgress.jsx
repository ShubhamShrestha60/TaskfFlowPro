import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const TimeFilter = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProgressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1.5rem;
  flex: 1;
  align-items: end;
`;

const ProgressItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  position: relative;
`;

const BarContainer = styled.div`
  width: 100%;
  height: 180px;
  position: relative;
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-end;
`;

const Bar = styled(motion.div)`
  width: 100%;
  background: ${({ $color }) => $color};
  border-radius: 8px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }
`;

const BarLabel = styled.div`
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ $color }) => $color};
  white-space: nowrap;
`;

const CategoryName = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  margin-top: 0.5rem;
`;

const TaskCount = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textTertiary};
  margin-top: 0.25rem;
`;

const TaskProgress = () => {
  const progressData = [
    { category: 'High Priority', progress: 75, tasks: 12, color: '#ef4444' },
    { category: 'In Progress', progress: 60, tasks: 8, color: '#3b82f6' },
    { category: 'Completed', progress: 90, tasks: 15, color: '#10b981' },
    { category: 'Upcoming', progress: 30, tasks: 6, color: '#8b5cf6' },
    { category: 'Overdue', progress: 45, tasks: 4, color: '#f59e0b' }
  ];

  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Header>
        <Title>Task Progress</Title>
        <TimeFilter>This Week</TimeFilter>
      </Header>

      <ProgressGrid>
        {progressData.map((item, index) => (
          <ProgressItem
            key={item.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <BarContainer>
              <BarLabel $color={item.color}>{item.progress}%</BarLabel>
              <Bar
                $color={item.color}
                initial={{ height: 0 }}
                animate={{ height: `${item.progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </BarContainer>
            <CategoryName>{item.category}</CategoryName>
            <TaskCount>{item.tasks} tasks</TaskCount>
          </ProgressItem>
        ))}
      </ProgressGrid>
    </Container>
  );
};

export default TaskProgress;