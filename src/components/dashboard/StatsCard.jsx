import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.borderColor};
  transition: ${({ theme }) => theme.transition.base};
  overflow: hidden;

  &:hover {
    border-color: ${({ theme, $color }) => theme[$color]};
    transform: translateY(-4px);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 40%;
    height: 100%;
    background: ${({ theme, $color }) => theme[$color]}10;
    clip-path: polygon(100% 0, 100% 100%, 0 100%, 60% 0);
    transition: ${({ theme }) => theme.transition.base};
  }

  &:hover::after {
    width: 60%;
    background: ${({ theme, $color }) => theme[$color]}15;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  position: relative;
  z-index: 1;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const Trend = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  background: ${({ $isPositive, theme }) => 
    $isPositive ? theme.success + '15' : theme.error + '15'};
  color: ${({ $isPositive, theme }) => 
    $isPositive ? theme.success : theme.error};

  svg {
    font-size: 0.75rem;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
`;

const Value = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.text};
  line-height: 1;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Subtitle = styled.div`
  color: ${({ theme }) => theme.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  strong {
    color: ${({ theme }) => theme.text};
  }
`;

const getSubtitle = (title, value) => {
  switch (title.toLowerCase().split(' ')[0]) {
    case 'total':
      return `${value} tasks in total`;
    case 'in':
      return 'Active tasks in progress';
    case 'completed':
      return 'Tasks completed this month';
    case 'overdue':
      return 'Tasks past due date';
    default:
      return '';
  }
};

const StatsCard = ({ title, value, trend, color = 'primary' }) => {
  const isPositive = trend.startsWith('+');

  return (
    <Card
      $color={color}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Header>
        <Title>{title}</Title>
        <Trend $isPositive={isPositive}>
          {isPositive ? <FaArrowUp /> : <FaArrowDown />}
          {trend}
        </Trend>
      </Header>

      <Content>
        <Value>{value}</Value>
        <Subtitle>
          {getSubtitle(title, value)}
        </Subtitle>
      </Content>
    </Card>
  );
};

export default StatsCard;