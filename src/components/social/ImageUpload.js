import * as React from 'react';
import firebase from 'firebase';
import '@firebase/firestore';
import {Button, Image, View, KeyboardAvoidingView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {connectableObservableDescriptor} from 'rxjs/internal/observable/ConnectableObservable';
import {storage} from '../../../ApiKeys';

export default class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: ''
    };
  }

  render() {
    let {image} = this.state;
    console.log('HITTING HERE', this.props);
    return (
      <KeyboardAvoidingView>
        <Button
          title="Pick an image from camera roll"
          onPress={this.selectImage}
        />
        {image && (
          <Image source={{uri: image}} style={{width: 200, height: 200}} />
        )}
      </KeyboardAvoidingView>
    );
  }
  async uploadImage(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const uploadTask = storage
      .ref(`photos/${this.state.email}`)
      .put(this.state.email);
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
      () => {
        storage
          .ref('photos')
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({url});
            console.log(url);
            this.setState({url});
          });
      }
    );
  }
  componentDidMount() {
    this.getPermissionAsync();
    console.log('hi');
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

    console.log(result);

    if (!result.cancelled) {
      this.setState({image: result.uri});
      this.uploadImage(result.uri);
    }
  };
}
