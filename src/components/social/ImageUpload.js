import * as React from 'react';
import firebase from 'firebase';
import '@firebase/firestore';
import {Button, Image, View, KeyboardAvoidingView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {connectableObservableDescriptor} from 'rxjs/internal/observable/ConnectableObservable';
import labelImage from '../../../src/api/UserRoute';
import {updateAvatar} from '../../api/UserRoute';
import {red} from 'ansi-colors';

export default class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0
    };
  }
  render() {
    let {image} = this.state;
    return (
      <KeyboardAvoidingView>
        <Button
          title="Pick an image from camera roll"
          onPress={this.selectImage}
        />
      </KeyboardAvoidingView>
    );
  }
  async uploadImage(uri) {
    const {image} = this.state;
    const email = this.props.user.email;
    const response = await fetch(uri);
    const blob = await response.blob();
    const uploadTask = firebase
      .storage()
      .ref(`avatar/${email}`)
      .put(blob);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({progress});
      },
      error => {
        console.log(error);
      },
      async () => {
        const url = await firebase
          .storage()
          .ref(`avatar/${email}`)
          .getDownloadURL();
        console.log('URL', url);
        updateAvatar(uId, url);
      }
    );
  }
  componentDidMount() {
    this.getPermissionAsync();
    const uId = this.props.uId;
    const email = this.props.user.email;
    console.log('total user info', this.props.user);
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      this.setState({image: result.uri});
      this.uploadImage(result.uri);
      console.log('state', this.state);
    }
  };
}
