import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSearch, FiStar, FiPaperclip, FiMoreVertical, FiFilter } from 'react-icons/fi';

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

const SearchContainer = styled.div`
  position: relative;
  width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
  font-size: 0.875rem;
  transition: ${({ theme }) => theme.transition.base};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1.125rem;
`;

const ToolBar = styled.div`
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

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  overflow-y: auto;
`;

const MessageItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.cardBg};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.borderColor};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.base};

  &:hover {
    transform: translateX(4px);
    border-color: ${({ theme }) => theme.primary}40;
  }
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ $bg }) => $bg};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
`;

const MessageContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
`;

const Sender = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Time = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const Subject = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Preview = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MessageActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const ActionIcon = styled.button`
  padding: 0.25rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  transition: ${({ theme }) => theme.transition.base};

  &:hover {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.backgroundAlt};
  }
`;

const Badge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: 0.75rem;
  font-weight: 500;
  background: ${({ $type, theme }) => {
    switch ($type) {
      case 'work': return theme.primary + '20';
      case 'personal': return theme.success + '20';
      case 'social': return theme.warning + '20';
      default: return theme.gray + '20';
    }
  }};
  color: ${({ $type, theme }) => {
    switch ($type) {
      case 'work': return theme.primary;
      case 'personal': return theme.success;
      case 'social': return theme.warning;
      default: return theme.gray;
    }
  }};
`;

const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

const getRandomColor = () => {
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Inbox = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const messages = [
    {
      id: 1,
      sender: 'Shubham Shrestha',
      subject: 'Project Update Meeting',
      preview: 'Hi team, I wanted to share the latest updates from our project meeting yesterday...',
      time: '10:30 AM',
      category: 'work',
      hasAttachment: true,
      isStarred: false
    },
    {
      id: 2,
      sender: 'Sarah Wilson',
      subject: 'Weekend Plans',
      preview: 'Hey! Are you free this weekend? I was thinking we could grab lunch and catch up...',
      time: '9:15 AM',
      category: 'personal',
      hasAttachment: false,
      isStarred: true
    },
    {
      id: 3,
      sender: 'Tech Newsletter',
      subject: 'This Week in Tech: Latest Updates',
      preview: 'Discover the newest developments in AI, web development, and more in our weekly digest...',
      time: 'Yesterday',
      category: 'social',
      hasAttachment: false,
      isStarred: false
    },
    // Add more messages as needed
  ];

  return (
    <PageContainer>
      <Header>
        <Title>Inbox</Title>
        <SearchContainer>
          <SearchIcon />
          <SearchInput 
            placeholder="Search messages..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>
      </Header>

      <ToolBar>
        <FilterButton 
          $active={activeFilter === 'all'}
          onClick={() => setActiveFilter('all')}
        >
          <FiFilter /> All
        </FilterButton>
        <FilterButton 
          $active={activeFilter === 'work'}
          onClick={() => setActiveFilter('work')}
        >
          Work
        </FilterButton>
        <FilterButton 
          $active={activeFilter === 'personal'}
          onClick={() => setActiveFilter('personal')}
        >
          Personal
        </FilterButton>
        <FilterButton 
          $active={activeFilter === 'social'}
          onClick={() => setActiveFilter('social')}
        >
          Social
        </FilterButton>
      </ToolBar>

      <MessageList>
        {messages.map((message, index) => (
          <MessageItem
            key={message.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Avatar $bg={getRandomColor()}>
              {getInitials(message.sender)}
            </Avatar>

            <MessageContent>
              <MessageHeader>
                <Sender>{message.sender}</Sender>
                <Time>{message.time}</Time>
              </MessageHeader>
              <Subject>{message.subject}</Subject>
              <Preview>{message.preview}</Preview>
            </MessageContent>

            <MessageActions>
              {message.hasAttachment && (
                <ActionIcon>
                  <FiPaperclip />
                </ActionIcon>
              )}
              <ActionIcon>
                <FiStar fill={message.isStarred ? 'currentColor' : 'none'} />
              </ActionIcon>
              <ActionIcon>
                <FiMoreVertical />
              </ActionIcon>
            </MessageActions>

            <Badge $type={message.category}>
              {message.category}
            </Badge>
          </MessageItem>
        ))}
      </MessageList>
    </PageContainer>
  );
};

export default Inbox; 