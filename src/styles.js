import styled from 'styled-components';

export const PageWrapperView = styled.View`
  flex: 1;
  background-color: #7cc6fe;
  align-items: center;
  justify-content: center;
`;

export const PetView = styled.View`
  flex-basis: 75%;
  align-items: center;
  justify-content: center;
  height: 400px;
  width: 300px;
  background-color: #FFF8F3;
  border-width: 3px;
  border-color: #0A369D;
`

export const AbsolutePositionPetView = styled.View`
  position: absolute;
  top: 0;
`

export const AbsolutePositionBubbleView = styled.View`
  position: absolute;
  top: 42px;
  left: 47px;
  width: 200px;
`

export const AddTaskBtnView = styled.View`
  position: absolute;
  top: 430px;
  left: 250px;
  z-index: 2;
`

export const HeaderText = styled.Text`
  font-size: 30px;
  color: #4472CA;
`

export const BubbleText = styled.Text`
  font-size: 16px;
  color: #000;
  z-index: 2;
`
