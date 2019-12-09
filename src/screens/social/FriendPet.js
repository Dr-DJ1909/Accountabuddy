import React, { Component } from 'react';
import { Text, Image, View } from 'react-native';
import { FriendTextView,  FriendPetView,} from '../../styles';
import { Content } from 'native-base';

class FriendPet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      on: true,
    }
    this.displayLeftOne

    this.intervalId = setInterval(() => {
      this.setState(previousState => {
        return {
          on: !previousState.on,
        };
      });
    }, 1200);
  }

  componentDidMount() {
    this.intervalId;

    const friendPetHP = (this.props.friendPet.ChoresHP+this.props.friendPet.ExerciseHP)/2

    const userPetHP = (this.props.userPet.ChoresHP+this.props.userPet.ExerciseHP)/2

    if(friendPetHP >userPetHP){

    }

  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    let friendPetName = this.props.friendPet.Name
    let userPetName = this.props.userPet.Name



    let sprite = this.state.on
      ? <Image
        source={require('../../assets/img/cat/CatInteract01b.png')}
        style={{height: 400, width: 300}}
        />
      : <Image
        source={require('../../assets/img/cat/CatInteract02b.png')}
        style={{height: 400, width: 300}}
        />
    return (

      <FriendPetView>
       <FriendTextView>

        <Text>
        Your pet, {userPetName}
        </Text>
        <Text>
        Your friend's pet, {friendPetName}
        </Text>

       </FriendTextView>


          {sprite}
      </FriendPetView>
    );
  }
}

export default FriendPet;

