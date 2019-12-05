import * as React from 'react';
import firebase from 'firebase';
import '@firebase/firestore';
import {Button, Image, View, KeyboardAvoidingView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {connectableObservableDescriptor} from 'rxjs/internal/observable/ConnectableObservable';
import labelImage from '../../../src/api/UserRoute';

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
    console.log('HITTING HERE', this.props);
    console.log('this is the state', this.state);
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
    console.log('this is the uri', uri);
    console.log('and this is the state', this.state);
    const {image} = this.state;
    const response = await fetch(uri);
    const blob = await response.blob();
    const uploadTask = firebase
      .storage()
      .ref(`images/${image.name}`)
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
      () => {
        firebase()
          .storage.ref('images')
          .child(image)
          .getDownloadURL()
          .then(url => {
            this.setState({url});
            console.log('SOS', this.state.url);
          });
        // labelImage();
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

    console.log('this is the', result);

    if (!result.cancelled) {
      this.setState({image: result.uri});
      console.log('HIII', result.uri);
      console.log('state', this.state);
      this.uploadImage(result.uri);
    }
  };
}
