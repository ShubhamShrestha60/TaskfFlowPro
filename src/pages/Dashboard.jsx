import styled from 'styled-components';
import { motion } from 'framer-motion';
import StatsCard from '../components/dashboard/StatsCard';
import TaskProgress from '../components/dashboard/TaskProgress';
import ActivityTimeline from '../components/dashboard/ActivityTimeline';
import RecentTasks from '../components/dashboard/RecentTasks';

const DashboardContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  max-width: 1400px;
  margin: 0 auto;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const WelcomeSection = styled(motion.div)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WelcomeText = styled.div`
  h1 {
    font-size: ${({ theme }) => theme.fontSize.xxl};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.text};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  p {
    color: ${({ theme }) => theme.textSecondary};
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

const DateDisplay = styled.div`
  text-align: right;
  color: ${({ theme }) => theme.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.sm};

  .date {
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    color: ${({ theme }) => theme.text};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;

const Dashboard = () => {
  const stats = [
    { title: 'Total Tasks', value: '248', trend: '+12%', color: 'primary' },
    { title: 'In Progress', value: '45', trend: '+5%', color: 'warning' },
    { title: 'Completed', value: '189', trend: '+18%', color: 'success' },
    { title: 'Overdue', value: '14', trend: '-2%', color: 'error' },
  ];

  const today = new Date();
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <DashboardContainer>
      <WelcomeSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <WelcomeText>
          <h1>Welcome back, Shubham! 👋</h1>
          <p>Here's what's happening with your projects today.</p>
        </WelcomeText>
        <DateDisplay>
          <div className="date">{today.toLocaleDateString(undefined, dateOptions)}</div>
          <div>Last updated: Just now</div>
        </DateDisplay>
      </WelcomeSection>

      <DashboardGrid>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </DashboardGrid>

      <MainContent>
        <TaskProgress />
        <RecentTasks />
      </MainContent>

      <ActivityTimeline />
    </DashboardContainer>
  );
};

export default Dashboard;