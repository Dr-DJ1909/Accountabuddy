import styled from 'styled-components';

export const PageWrapperView = styled.View`
  flex: 1;
  background-color: #7cc6fe;
  align-items: center;
  justify-content: center;
`;

export const PageWrapperAlignTopView = styled.View`
  flex: 1;
  background-color: #7cc6fe;
  align-items: center;
  justify-content: center;
`;

export const HeaderWrapperView = styled.View`
  height: 90;
  padding-top: 30;
  margin-bottom: 40;
`;

export const PetView = styled.View`
  flex-basis: 75%;
  align-items: center;
  justify-content: center;
  height: 400px;
  width: 300px;
  background-color: #fff8f3;
  border-width: 3px;
  border-color: #0a369d;
`;

export const AbsolutePositionPetView = styled.View`
  position: absolute;
  top: 0;
`;

export const AbsolutePositionBubbleView = styled.View`
  position: absolute;
  top: 42px;
  left: 47px;
  width: 200px;
`;

export const TaskView = styled.View`
  height: 80;
  background-color: #9acd32;
  border-style: solid;
  border-width: 3px;
`;

export const AddTaskBtnView = styled.View`
  position: absolute;
  top: 430px;
  left: 250px;
  z-index: 2;
`;

export const TaskNavBtnView = styled.View`
  padding-top: 40;
  align-self: flex-start;
  z-index: 2;
`;

export const HeaderText = styled.Text`
  font-size: 30px;
  color: #4472ca;
`;

export const BubbleText = styled.Text`
  font-size: 16px;
  color: #000;
  z-index: 2;
`;

export const HeaderTasksText = styled.Text`
  font-size: 50px;
  align-self: center;
  z-index: 2;
`;

export const LabelText = styled.Text`
  font-size: 20px;
  align-self: center;
  z-index: 2;
`;
