import styled from 'styled-components';

const CalendarContainer = styled.div`
  h1 {
    margin-bottom: 1.5rem;
  }
`;

const Calendar = () => {
  return (
    <CalendarContainer>
      <h1>Calendar</h1>
      <p>Calendar view will go here</p>
    </CalendarContainer>
  );
};

export default Calendar;