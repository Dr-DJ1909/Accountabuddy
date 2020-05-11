import styled from "styled-components/native";
import { createGlobalStyle } from 'styled-components/native';
// import Raleway-Medium

// const GlobalStyle = createGlobalStyle`
//   @font-face {
//     font-family: pala;
//     src: url(${pala}) format('truetype');
//     font-weight: normal;
//     font-style: normal;
//   }
//   html {
//     font-size: 10px;
//   }
// `;

export const TopHeader = styled.View`
  position: absolute;
  top: 0;
  justify-content: space-between;
  align-items: center;
  display: flex;
  background-color: #E39774;
  align-self: flex-start;
  padding-top: 40px;
  width: 100%;
  height: 90px;
  z-index: 2;
`;

export const PageWrapperView = styled.View`
  flex: 1;
  background-color: #5C9EAD;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
`;

export const PageWrapperViewLight = styled.View`
  flex: 1;
  background-color: #ebebeb;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
`;

export const ProfileHeaderView = styled.View`
  background-color: #e39774;
`;

export const ProfileWrapperView = styled.View`
  flex: 1;
  background-color: #ffe4e1;
  align-items: center;
`;

export const PageWrapperAlignTopView = styled.View`
  flex: 1;
  background-color: #5C9EAD;
  align-items: center;
  justify-content: flex-start;
  padding-top: 110px;
`;

export const PageWrapperAlignTopViewLight = styled.View`
  flex: 1;
  background-color: #ebebeb;
  align-items: center;
  justify-content: flex-start;
  padding-top: 110px;
`;

export const PageWrapperKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #5C9EAD;
  align-items: center;
  justify-content: flex-start;
  padding-top: 70;
  height: 500px;
`;

export const Divider = styled.View`
  height: 5px;
`;

export const DividerLarge = styled.View`
  height: 20px;
`;

export const DividerHeader = styled.View`
  height: 80px;
`;

export const HeaderWrapperView = styled.View`
  height: 90;
  padding-top: 30;
  margin-bottom: 40;
`;

export const PetView = styled.View`
  align-items: center;
  justify-content: center;
  height: 450px;
  width: 300px;
  background-color: #fff8f3;
  border-width: 3px;
  border-color: #0a369d;
`;

export const FriendPetView = styled.View`
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  height: 450px;
  width: 100%;
  background-color: #fff8f3;
  border-width: 3px;
  border-color: #0a369d;
`;
export const FriendTextView = styled.View`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  width: 75%;
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
  width: 90%;
  align-self: center;
  background-color: #fff8f3;
  border-style: solid;
  border-width: 3px;
  padding: 5px;
`;

export const ProfileView = styled.View`
  height: 150;
  background-color: #eeeeee
  border-style: solid;
  border-width: 6px;
  border-color: #5c9ead;
  padding: 5px;
  border-radius: 0px;

`;

export const TaskBtns = styled.View`
  display: flex;
  position: absolute;
  height: 60;
  left: 5;
  top: 6;
  justify-content: space-between;
  align-items: flex-start;
`;

export const TaskBtnsRight = styled.View`
  display: flex;
  position: absolute;
  height: 60;
  right: 5;
  top: 6;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const AddTaskBtnView = styled.View`
  position: absolute;
  top: 430px;
  left: 250px;
  z-index: 2;
`;

export const MessageView = styled.View`
  padding: 5px;
  margin-left: 10px;
  margin-right: 5px;
`;

export const TaskNavBtnView = styled.View`
  align-self: flex-start;
  margin-top: -30px;
  z-index: 3;
`;

export const TopHeaderText = styled.Text`
  font-size: 30px;
  color: #fff;
  font-family: 'Raleway-ExtraBold';
`;

export const HeaderText = styled.Text`
  font-size: 24px;
  color: #fff;
  font-family: 'Raleway-Medium';
`;

export const BubbleText = styled.Text`
  font-size: 16px;
  color: #000;
  z-index: 2;
  font-family: 'Raleway-Medium';
`;

export const HeaderTasksText = styled.Text`
  font-size: 50px;
  align-self: center;
  z-index: 2;
  font-family: 'Raleway-Medium';
`;

export const LabelText = styled.Text`
  font-size: 20px;
  align-self: center;
  z-index: 2;
  color: #fff;
  font-family: 'Raleway-Medium';
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
  color: #fff;
  font-family: 'Raleway-Medium';
`;

export const MessageTextLarge = styled.Text`
  font-size: 20px;
  align-self: center;
  color: #fff;
  font-family: 'Raleway-Medium';
`;

export const TaskText = styled.Text`
  font-size: 16px;
  align-self: center;
  color: #000000;
  font-family: 'Raleway-ExtraBold';
`;

export const OrangeButton = styled.TouchableOpacity`
  color: #ffffff;
  background-color: #ff6700;
  border: solid 2px #ff6700;
  border-radius: 1px;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 35px;
  width: auto;
  elevation: 3;
`;

export const BlueButton = styled.TouchableOpacity`
  color: #ffffff;
  background-color: #0a369d;
  border: solid 2px #0a369d;
  border-radius: 1px;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 35px;
  width: auto;
  elevation: 3;
`;

export const BlueButtonLarge = styled.TouchableOpacity`
  color: #ffffff;
  background-color: #0a369d;
  border: solid 2px #0a369d;
  border-radius: 1px;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 85px;
  width: auto;
  elevation: 3;
  padding: 10px;
`;

export const BlueButtonWidth = styled.TouchableOpacity`
  color: #ffffff;
  background-color: #0A369D;
  border: solid 2px #0A369D;
  border-radius: 1px;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 55px;
  width: 200px;
  elevation: 3;
  margin-bottom: 3px;
  margin-vertical: 10px;
`;

export const BlueButtonWidthTwo = styled.TouchableOpacity`
  color: #ffffff;
  background-color: #0A369D;
  border: solid 2px #0A369D;
  border-radius: 1px;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: auto;
  width: 200px;
  elevation: 3;
  margin-bottom: 3px;
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 16;
  text-align: center;
  margin-left: 5px;
  margin-right: 5px;
  text-transform: uppercase;
  font-family: 'Raleway-ExtraBold';
`;

export const TextInput = styled.TextInput`
  height: 50;
  font-size: 14;
  background-color: #fff;
  border-color: #0a369d;
  border-width: 4px;
  width: 300px;
  align-self: center;
  margin: 10px;
  padding: 5px;
  padding-left: 15px;
  font-family: 'Raleway-Medium';
`;
export const Picker = styled.Picker`
  height: 50px;
  width: 300px;
  margin: 10px;
`;
export const ChatHeader = styled.Text`
  padding-top:50px;
  align-self: center;
  font-size:25;
`
