import React from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { ImagePicker, Permissions, ImageManipulator  } from 'expo';
import { Buffer } from 'buffer';
import { styles } from './styles';
import Colors from '../../shared/colors';
import { apiUploadProfilePhoto } from '../../lib/api_calls';

class Settings extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    fullName: '',
    photo: false
  }

  async componentWillMount() {
    await this.props.getMyProfile();
    const { firstName, lastName, fullName, photo } = this.props.state.profile.payload
    this.setState({ firstName, lastName, photo, fullName });
  }

  renderProfileImage = () => {
    if(this.state.photo) {
      return <Image style={styles.profileImage} resizeMode="cover" source={{ uri: this.state.photo }}/>
    }
    return <Image style={styles.profileImage} source={require('../../../assets/blank-profile.png')} />
  };

  uploadProfilePhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    const manipResult = await ImageManipulator.manipulate(
      result.uri,
      [{ resize: { width: 1080, height: 1080 }}],
      { base64: true, compress: 0.2 }
    );

    if (!result.cancelled) {
      const buf = new Buffer(manipResult.base64, 'base64');
      const splitURI = result.uri.split('.');
      const lastItem = splitURI.length - 1;
      const type = splitURI[lastItem];
      await this.props.getAwsUrl(type);
      axios.put(this.props.state.awsUrl.url, buf, {
        headers: {
          'Content-Type': `image/${type}`,
          'Content-Encoding': 'base64',
        }
      });

      const user = await apiUploadProfilePhoto({ photo: `https://s3.amazonaws.com/${this.props.state.awsUrl.bucket}/${this.props.state.awsUrl.key}` });
      this.setState({ firstName: user.firstName, lastName: user.lastName, fullName: user.fullName, photo: user.photo });
    }
  }

  onLogout = async () => {
    try {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Login');
    }
    catch(e) {
      alert('There was an error logging you out');
    }
  };

  deleteUser = async () => {
    await this.props.deleteUser();
    if (this.props.state.deleteUser.status === true) {
      alert('Your account was successfuly deleted');
      this.onLogout();
    }
    alert('There was a problem deleting your account');
  };

  render() {
    return (
      <View style={styles.mainConainer}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Activity')}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>  
        <View style={styles.subContainer}>
          <View style={styles.backButton}>

          </View>

          <View style={styles.photoContainer}>
            {this.renderProfileImage()}
          </View>
          <View style={styles.uploadContainer}>
            <TouchableOpacity onPress={() => this.uploadProfilePhoto()}>
              <Text style={styles.uploadText}>Upload Photo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.contentTop}>
              <View style={styles.nameContainer}>
                <Text style={styles.nameText}>{`${this.state.fullName}`}</Text>
              </View>
              <View style={styles.contactRow}>
                <Text style={{ fontWeight: '600' }}>Contact us</Text>
                <Text>support@mixdo.com</Text>
              </View>
              <TouchableOpacity onPress={() => this.onLogout()}>
                <Text style={{ fontWeight: '600', color: Colors.main }}>Log out</Text>
              </TouchableOpacity>  
            </View>

            <View style={styles.contentBottom}>
              <TouchableOpacity onPress={() => this.deleteUser()}>
                <Text style={{ fontWeight: '500', color: '#FE4C4B', fontSize: 13 }}>Deactivate account</Text>
              </TouchableOpacity>  
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Settings;
