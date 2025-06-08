import styled from 'styled-components';
import { motion } from 'framer-motion';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressContainer = styled(motion.div)`
  padding: 1.5rem;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  background: ${({ theme }) => theme.textGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const TimeFilter = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background: ${({ theme }) => theme.cardBg};
  border: ${({ theme }) => theme.border};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.gray};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primary};
  }
`;

const ProgressBars = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
  position: relative;
  z-index: 1;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ProgressItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.glassMorphismDark};
  border-radius: 16px;
  border: ${({ theme }) => theme.border};
`;

const ProgressLabel = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ProgressValue = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ color }) => color};
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

const TaskProgress = () => {
  const progressData = [
    { label: 'Design', value: 75, color: '#2563eb' },
    { label: 'Development', value: 50, color: '#4f46e5' },
    { label: 'Testing', value: 30, color: '#7c3aed' },
    { label: 'Deployment', value: 10, color: '#9333ea' },
  ];

  return (
    <ProgressContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Decoration />
      <ProgressHeader>
        <Title>Task Progress</Title>
        <TimeFilter>Last 7 days</TimeFilter>
      </ProgressHeader>
      <ProgressBars>
        {progressData.map((item, index) => (
          <ProgressItem
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div style={{ width: 120, height: 120 }}>
              <CircularProgressbarWithChildren
                value={item.value}
                styles={buildStyles({
                  pathColor: item.color,
                  trailColor: 'rgba(200, 200, 200, 0.1)',
                  strokeLinecap: 'round',
                  pathTransition: 'stroke-dashoffset 0.5s ease',
                })}
              >
                <ProgressValue style={{ color: item.color }}>
                  {item.value}%
                </ProgressValue>
              </CircularProgressbarWithChildren>
            </div>
            <ProgressLabel>{item.label}</ProgressLabel>
          </ProgressItem>
        ))}
      </ProgressBars>
    </ProgressContainer>
  );
};

export default TaskProgress;