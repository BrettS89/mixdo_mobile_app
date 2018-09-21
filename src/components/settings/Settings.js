import React from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { Buffer } from 'buffer';
import { styles } from './styles';
import Colors from '../../shared/colors';
import { apiUploadProfilePhoto } from '../../lib/api_calls';

class Settings extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    photo: false
  }

  async componentWillMount() {
    await this.props.getMyProfile();
    const { firstName, lastName, photo } = this.props.state.profile.payload
    this.setState({ firstName, lastName, photo });
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
      base64: true,
      allowsEditing: true,
      aspect: [1, 1],
      exif: false,
    });

    if (!result.cancelled) {
      const buf = new Buffer(result.base64, 'base64');
      const splitURI = result.uri.split('.');
      const lastItem = splitURI.length - 1;
      const type = splitURI[lastItem];
      await this.props.getAwsUrl(type);
      await axios.put(this.props.state.awsUrl.url, buf, {
        headers: {
          'Content-Type': `image/${type}`,
          'Content-Encoding': 'base64',
        }
      });

      const user = await apiUploadProfilePhoto({ photo: `https://s3.amazonaws.com/mixdodev/${this.props.state.awsUrl.key}` });
      this.setState({ firstName: user.firstName, lastName: user.lastName, photo: user.photo });
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
                <Text style={styles.nameText}>{`${this.state.firstName} ${this.state.lastName}`}</Text>
              </View>
              <View style={styles.contactRow}>
                <Text style={{ fontWeight: '600' }}>Contact us</Text>
                <Text>support@projectq.com</Text>
              </View>
              <TouchableOpacity onPress={() => this.onLogout()}>
                <Text style={{ fontWeight: '600', color: Colors.main }}>Log out</Text>
              </TouchableOpacity>  
            </View>

            <View style={styles.contentBottom}>
              <TouchableOpacity>
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
