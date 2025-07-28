import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCheck, 
  FiX, 
  FiFilter, 
  FiClock,
  FiAlertCircle,
  FiMessageCircle,
  FiUserPlus,
  FiGitPullRequest,
  FiBell,
  FiStar,
  FiMoreVertical
} from 'react-icons/fi';

const PageContainer = styled.div`
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.backgroundAlt};
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.875rem;
  font-weight: 500;
  transition: ${({ theme }) => theme.transition.base};

  &:hover {
    background: ${({ theme }) => theme.primary}20;
    color: ${({ theme }) => theme.primary};
  }

  svg {
    font-size: 1.125rem;
  }
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: ${({ theme }) => theme.cardBg};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.borderColor};
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme, $active }) => $active ? theme.primary : 'transparent'};
  color: ${({ theme, $active }) => $active ? theme.white : theme.textSecondary};
  font-size: 0.875rem;
  font-weight: 500;
  transition: ${({ theme }) => theme.transition.base};

  &:hover {
    background: ${({ theme, $active }) => $active ? theme.primary : theme.backgroundAlt};
  }
`;

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
  overflow-y: auto;
`;

const NotificationItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.cardBg};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.borderColor};
  transition: ${({ theme }) => theme.transition.base};
  position: relative;
  cursor: pointer;

  ${({ $unread, theme }) => $unread && `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: ${theme.primary};
      border-radius: ${theme.radius.lg} 0 0 ${theme.radius.lg};
    }
  `}

  &:hover {
    transform: translateX(4px);
    border-color: ${({ theme }) => theme.primary}40;
  }
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ $type, theme }) => {
    switch ($type) {
      case 'message': return theme.primary + '20';
      case 'task': return theme.success + '20';
      case 'alert': return theme.error + '20';
      case 'mention': return theme.warning + '20';
      default: return theme.gray + '20';
    }
  }};
  color: ${({ $type, theme }) => {
    switch ($type) {
      case 'message': return theme.primary;
      case 'task': return theme.success;
      case 'alert': return theme.error;
      case 'mention': return theme.warning;
      default: return theme.gray;
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    font-size: 1.25rem;
  }
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.25rem;
`;

const Title2 = styled.h3`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.25rem;
`;

const Time = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textSecondary};
  white-space: nowrap;
`;

const Message = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.5;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const ActionLink = styled.button`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.primary};
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  transition: ${({ theme }) => theme.transition.base};

  &:hover {
    background: ${({ theme }) => theme.primary}10;
  }
`;

const getNotificationIcon = (type) => {
  switch (type) {
    case 'message':
      return <FiMessageCircle />;
    case 'task':
      return <FiCheck />;
    case 'alert':
      return <FiAlertCircle />;
    case 'mention':
      return <FiStar />;
    case 'team':
      return <FiUserPlus />;
    case 'update':
      return <FiGitPullRequest />;
    default:
      return <FiBell />;
  }
};

const getTimeAgo = (date) => {
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
};

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'message',
      title: 'New message from Sarah',
      message: 'Hey! I just reviewed the project proposal and left some comments...',
      time: new Date(Date.now() - 1800000),
      unread: true,
      actions: ['Reply', 'Mark as Read']
    },
    {
      id: 2,
      type: 'task',
      title: 'Task completed',
      message: 'Frontend development for the dashboard has been marked as complete.',
      time: new Date(Date.now() - 3600000),
      unread: true,
      actions: ['View Task', 'Dismiss']
    },
    {
      id: 3,
      type: 'alert',
      title: 'System Update',
      message: 'The system will undergo maintenance in 2 hours. Please save your work.',
      time: new Date(Date.now() - 7200000),
      unread: false,
      actions: ['Learn More']
    },
    {
      id: 4,
      type: 'mention',
      title: 'Mentioned in a comment',
      message: '@david What do you think about the new design system implementation?',
      time: new Date(Date.now() - 86400000),
      unread: true,
      actions: ['View Thread', 'Reply']
    },
    {
      id: 5,
      type: 'team',
      title: 'New team member',
      message: 'Emily Rodriguez has joined the Design team.',
      time: new Date(Date.now() - 172800000),
      unread: false,
      actions: ['Welcome', 'View Profile']
    }
  ]);

  // const handleMarkAsRead = (id) => {
  //   setNotifications(prev =>
  //     prev.map(notif =>
  //       notif.id === id ? { ...notif, unread: false } : notif
  //     )
  //   );
  // };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(notif => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return notif.unread;
    return notif.type === activeFilter;
  });

  return (
    <PageContainer>
      <Header>
        <Title>Notifications</Title>
        <HeaderActions>
          <ActionButton onClick={handleClearAll}>
            <FiX /> Clear All
          </ActionButton>
          <ActionButton>
            <FiClock /> Mark All Read
          </ActionButton>
        </HeaderActions>
      </Header>

      <FilterBar>
        <FilterButton 
          $active={activeFilter === 'all'}
          onClick={() => setActiveFilter('all')}
        >
          <FiFilter /> All
        </FilterButton>
        <FilterButton 
          $active={activeFilter === 'unread'}
          onClick={() => setActiveFilter('unread')}
        >
          Unread
        </FilterButton>
        <FilterButton 
          $active={activeFilter === 'message'}
          onClick={() => setActiveFilter('message')}
        >
          Messages
        </FilterButton>
        <FilterButton 
          $active={activeFilter === 'task'}
          onClick={() => setActiveFilter('task')}
        >
          Tasks
        </FilterButton>
        <FilterButton 
          $active={activeFilter === 'alert'}
          onClick={() => setActiveFilter('alert')}
        >
          Alerts
        </FilterButton>
      </FilterBar>

      <NotificationList>
        <AnimatePresence>
          {filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              $unread={notification.unread}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <IconWrapper $type={notification.type}>
                {getNotificationIcon(notification.type)}
              </IconWrapper>

              <Content>
                <NotificationHeader>
                  <Title2>{notification.title}</Title2>
                  <Time>{getTimeAgo(notification.time)}</Time>
                </NotificationHeader>
                <Message>{notification.message}</Message>
                
                <Actions>
                  {notification.actions.map((action, index) => (
                    <ActionLink key={index}>
                      {action}
                    </ActionLink>
                  ))}
                </Actions>
              </Content>

              <ActionButton>
                <FiMoreVertical />
              </ActionButton>
            </NotificationItem>
          ))}
        </AnimatePresence>
      </NotificationList>
    </PageContainer>
  );
};

export default Notifications; 