import styled from 'styled-components/native';

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
  justify-content: flex-start;
  padding-top: 70;
`;

export const PageWrapperKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #7cc6fe;
  align-items: center;
  justify-content: flex-start;
  padding-top: 70;
`;

export const Divider = styled.View`
  height: 20px;
`

export const HeaderWrapperView = styled.View`
  height: 90;
  padding-top: 30;
  margin-bottom: 40;
`;

export const PetView = styled.View`
  flex-basis: 75%;
  align-items: center;
  justify-content: center;
  height: 380px;
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
  background-color: #FF6700;
  border-style: solid;
  border-width: 3px;
  padding: 5px;
`;

export const TaskBtns = styled.View`
  display: flex;
  position: absolute;
  height: 60;
  left: 5;
  top: 6;
  justify-content: space-between;
  align-items: flex-start;
`

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
  color: #0A369D;
  margin-bottom: 10px;
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

export const UsersView = styled.View`
  flex: 1;
  background-color: #7cc6fe;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
export const MessageText = styled.Text`
  font-size: 16px;
  align-self: center;
`;

export const TaskText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  align-self: center;
  color: #000000;
`;

export const OrangeButton = styled.TouchableOpacity`
  color: #ffffff;
  background-color: #FF6700;
  border: solid 2px #FF6700;
  border-radius: 1px;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 35px;
  width: auto;
  elevation: 3;
`

export const BlueButton = styled.TouchableOpacity`
  color: #ffffff;
  background-color: #0A369D;
  border: solid 2px #0A369D;
  border-radius: 1px;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 35px;
  width: auto;
  elevation: 3;
`

export const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 16;
  font-family: 'normal';
  text-align: center;
  margin-left: 5px;
  margin-right: 5px;
  text-transform: uppercase;
  font-weight: bold;
`

export const TextInput = styled.TextInput`
  height: 50;
  font-size: 14;
  background-color: #EBEBEB;
  border-color: #0A369D;
  border-width: 4px;
  width: 300px;
  align-self: center;
  margin: 10px;
  padding: 5px;
  padding-left: 15px;
`
export const Picker = styled.Picker`
  height: 50;
  width: 300px;
  margin: 10px;
`

