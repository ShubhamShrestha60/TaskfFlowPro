import styled from 'styled-components';
import { motion } from 'framer-motion';
import StatsCard from '../components/dashboard/StatsCard';
import TaskProgress from '../components/dashboard/TaskProgress';
import RecentTasks from '../components/dashboard/RecentTasks';
import ActivityTimeline from '../components/dashboard/ActivityTimeline';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const Section = styled(motion.section)`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const Dashboard = () => {
  const stats = [
    { title: 'Total Tasks', value: 24, icon: '📝', trend: 'up' },
    { title: 'Completed', value: 12, icon: '✅', trend: 'up' },
    { title: 'In Progress', value: 8, icon: '⏳', trend: 'down' },
    { title: 'Overdue', value: 4, icon: '⚠️', trend: 'same' },
  ];

  return (
    <>
      <h1>Dashboard Overview</h1>
      <DashboardContainer>
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </DashboardContainer>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TaskProgress />
        </Section>
        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <RecentTasks />
        </Section>
      </div>

      <Section
        style={{ marginTop: '1.5rem' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ActivityTimeline />
      </Section>
    </>
  );
};

export default Dashboard;