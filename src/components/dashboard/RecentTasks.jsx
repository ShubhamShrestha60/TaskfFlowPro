import styled from 'styled-components';

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.cardBg};
`;

const TaskInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const TaskStatus = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ status }) => 
    status === 'completed' ? '#4cc9f0' : 
    status === 'in-progress' ? '#4895ef' : '#f72585'};
`;

const RecentTasks = () => {
  const tasks = [
    { id: 1, title: 'Create dashboard layout', status: 'completed' },
    { id: 2, title: 'Implement dark mode', status: 'in-progress' },
    { id: 3, title: 'Fix responsive issues', status: 'pending' },
    { id: 4, title: 'Add task creation form', status: 'pending' },
  ];

  return (
    <div>
      <h3>Recent Tasks</h3>
      <TaskList>
        {tasks.map(task => (
          <TaskItem key={task.id}>
            <TaskInfo>
              <TaskStatus status={task.status} />
              <span>{task.title}</span>
            </TaskInfo>
            <span>{task.status}</span>
          </TaskItem>
        ))}
      </TaskList>
    </div>
  );
};

export default RecentTasks;