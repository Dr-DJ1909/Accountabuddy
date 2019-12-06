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

  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    console.log("WHATS HERE ???????", this.props)
    let friendPetName = this.props.friendPet.Name
    let userPetName = this.props.userPet.Name
    let sprite = this.state.on
      ? <Image
        source={require('../../assets/img/cat/CatSquat01.png')}
        style={{height: 300, width: 300}}
        />
      : <Image
        source={require('../../assets/img/cat/CatSquat02.png')}
        style={{height: 300, width: 300}}
        />
    return (

      <FriendPetView>
       <FriendTextView>

        <Text>
        {friendPetName}
        </Text>
        <Text>
        {userPetName}
        </Text>

       </FriendTextView>


          {sprite}
      </FriendPetView>
    );
  }
}

export default FriendPet;

