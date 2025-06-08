import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiMail, FiMessageSquare, FiMoreVertical } from 'react-icons/fi';
import MessageModal from '../components/team/MessageModal';
import SimpleChat from '../components/team/SimpleChat';

const PageContainer = styled.div`
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const MemberCard = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.borderColor};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: ${({ theme }) => theme.transition.base};

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.primary}40;
    box-shadow: 0 4px 12px ${({ theme }) => theme.shadowColor};
  }
`;

const MemberHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ $bg }) => $bg};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ $status, theme }) => {
      switch ($status) {
        case 'online': return theme.success;
        case 'away': return theme.warning;
        case 'offline': return theme.gray;
        default: return theme.gray;
      }
    }};
    border: 2px solid ${({ theme }) => theme.cardBg};
  }
`;

const MemberInfo = styled.div`
  flex: 1;
`;

const Name = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.25rem;
`;

const Role = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1rem 0;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ProjectList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ProjectBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: 0.75rem;
  font-weight: 500;
  background: ${({ $color }) => $color}20;
  color: ${({ $color }) => $color};
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
`;

const ActionButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.backgroundAlt};
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.875rem;
  transition: ${({ theme }) => theme.transition.base};

  &:hover {
    background: ${({ theme }) => theme.primary}20;
    color: ${({ theme }) => theme.primary};
  }

  svg {
    font-size: 1rem;
  }
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

const Team = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [messageModal, setMessageModal] = useState({ isOpen: false, recipient: null });
  const [chatModal, setChatModal] = useState({ isOpen: false, recipient: null });

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Product Manager',
      status: 'online',
      stats: {
        projects: 12,
        tasks: 34,
        completed: 89
      },
      projects: [
        { name: 'Mobile App', color: '#3B82F6' },
        { name: 'Dashboard', color: '#10B981' }
      ]
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Senior Developer',
      status: 'away',
      stats: {
        projects: 8,
        tasks: 27,
        completed: 92
      },
      projects: [
        { name: 'API Integration', color: '#F59E0B' },
        { name: 'Cloud Migration', color: '#8B5CF6' }
      ]
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'UI/UX Designer',
      status: 'online',
      stats: {
        projects: 15,
        tasks: 41,
        completed: 95
      },
      projects: [
        { name: 'Design System', color: '#EF4444' },
        { name: 'Mobile App', color: '#3B82F6' }
      ]
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Frontend Developer',
      status: 'offline',
      stats: {
        projects: 6,
        tasks: 19,
        completed: 87
      },
      projects: [
        { name: 'Dashboard', color: '#10B981' },
        { name: 'Website Redesign', color: '#8B5CF6' }
      ]
    }
  ];

  return (
    <PageContainer>
      <Header>
        <Title>Team Members</Title>
        <SearchContainer>
          <SearchIcon />
          <SearchInput 
            placeholder="Search team members..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>
      </Header>

      <FilterBar>
        <FilterButton 
          $active={activeFilter === 'all'}
          onClick={() => setActiveFilter('all')}
        >
          <FiFilter /> All
        </FilterButton>
        <FilterButton 
          $active={activeFilter === 'developers'}
          onClick={() => setActiveFilter('developers')}
        >
          Developers
        </FilterButton>
        <FilterButton 
          $active={activeFilter === 'designers'}
          onClick={() => setActiveFilter('designers')}
        >
          Designers
        </FilterButton>
        <FilterButton 
          $active={activeFilter === 'managers'}
          onClick={() => setActiveFilter('managers')}
        >
          Managers
        </FilterButton>
      </FilterBar>

      <TeamGrid>
        {teamMembers.map((member, index) => (
          <MemberCard
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <MemberHeader>
              <Avatar $bg={getRandomColor()} $status={member.status}>
                {getInitials(member.name)}
              </Avatar>
              <MemberInfo>
                <Name>{member.name}</Name>
                <Role>{member.role}</Role>
              </MemberInfo>
            </MemberHeader>

            <Stats>
              <StatItem>
                <StatValue>{member.stats.projects}</StatValue>
                <StatLabel>Projects</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{member.stats.tasks}</StatValue>
                <StatLabel>Tasks</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{member.stats.completed}%</StatValue>
                <StatLabel>Success</StatLabel>
              </StatItem>
            </Stats>

            <ProjectList>
              {member.projects.map((project) => (
                <ProjectBadge key={project.name} $color={project.color}>
                  {project.name}
                </ProjectBadge>
              ))}
            </ProjectList>

            <Actions>
              <ActionButton onClick={() => setMessageModal({ isOpen: true, recipient: member.name })}>
                <FiMail /> Message
              </ActionButton>
              <ActionButton onClick={() => setChatModal({ isOpen: true, recipient: member.name })}>
                <FiMessageSquare /> Chat
              </ActionButton>
              <ActionButton>
                <FiMoreVertical />
              </ActionButton>
            </Actions>
          </MemberCard>
        ))}
      </TeamGrid>

      <MessageModal
        isOpen={messageModal.isOpen}
        onClose={() => setMessageModal({ isOpen: false, recipient: null })}
        recipient={messageModal.recipient}
      />

      <SimpleChat
        isOpen={chatModal.isOpen}
        onClose={() => setChatModal({ isOpen: false, recipient: null })}
        recipient={chatModal.recipient}
      />
    </PageContainer>
  );
};

export default Team; 