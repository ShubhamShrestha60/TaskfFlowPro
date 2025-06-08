import styled from 'styled-components';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.glassMorphismDark};
  backdrop-filter: ${({ theme }) => theme.backdropFilter};
  border-radius: 16px;
  padding: 1.5rem;
  border: ${({ theme }) => theme.border};
  height: 100%;
  position: relative;
  overflow: hidden;
  min-height: 160px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ theme, trend }) => 
      trend === 'up' ? theme.gradientSuccess :
      trend === 'down' ? theme.gradientDanger :
      theme.gradientPrimary};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.25rem;
  position: relative;
  z-index: 1;
`;

const Title = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.grayLight};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Value = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin: 0.5rem 0;
  background: ${({ theme }) => theme.textGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  z-index: 1;
`;

const Trend = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background: ${({ theme, positive }) => 
    positive ? `${theme.success}15` : `${theme.danger}15`};
  color: ${({ theme, positive }) => 
    positive ? theme.success : theme.danger};
  width: fit-content;
  position: relative;
  z-index: 1;
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: ${({ theme }) => theme.gradientPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 8px 16px ${({ theme }) => `${theme.primary}20`};
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 16px;
    padding: 2px;
    background: ${({ theme }) => theme.gradientPrimary};
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.5;
  }
`;

const Decoration = styled.div`
  position: absolute;
  right: -20px;
  bottom: -20px;
  width: 120px;
  height: 120px;
  background: ${({ theme }) => theme.gradientPrimary};
  filter: blur(40px);
  opacity: 0.1;
  border-radius: 50%;
  pointer-events: none;
`;

const StatsCard = ({ title, value, icon, trend }) => {
  const isPositive = trend === 'up';
  
  return (
    <Card
      trend={trend}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <Decoration />
      <CardHeader>
        <Title>{title}</Title>
        <IconWrapper>{icon}</IconWrapper>
      </CardHeader>
      <Value>{value}</Value>
      <Trend positive={isPositive}>
        {isPositive ? '↑' : '↓'} {trend === 'up' ? 'Increased' : trend === 'down' ? 'Decreased' : 'No change'}
      </Trend>
    </Card>
  );
};

export default StatsCard;