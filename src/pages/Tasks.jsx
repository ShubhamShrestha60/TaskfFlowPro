import styled from 'styled-components';

const TasksContainer = styled.div`
  h1 {
    margin-bottom: 1.5rem;
  }
`;

const Tasks = () => {
  return (
    <TasksContainer>
      <h1>Tasks</h1>
      <p>Task management page will go here</p>
    </TasksContainer>
  );
};

export default Tasks;