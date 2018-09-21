import React from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { styles } from './styles';
import { apiUploadProfilePhoto } from '../../lib/api_calls';
import pushNotifications from '../../services/pushNotifications';
import Colors from '../../shared/colors'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Check2 from 'react-native-vector-icons/FontAwesome';
import Chevron from 'react-native-vector-icons/Entypo';

class Welcome extends React.Component {
  state = {
    fullName: '',
    photo: null,
  };

  async componentWillMount() {
    await this.props.getMyProfile();
    const { fullName, photo } = this.props.state.user.payload;
    this.setState({ fullName, photo });
  }

  renderProfileImage = () => {
    if(this.state.photo) {
      return <Image style={styles.profileImage} resizeMode="cover" source={{ uri: this.state.photo }}/>
    }
    return <Image style={styles.profileImage} source={require('../../../assets/blank-profile.png')} />
  };

  uploadImage = async () => {
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
      this.setState({ fullName: user.fullName, photo: user.photo });
    }
  };

  pressFinish = async () => {
    await pushNotifications();
    this.props.navigation.navigate('FindTodos');
  }

  displayAddImageText = () => {
    if(this.state.photo) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Check2 size={26} color={Colors.main} name="check" />
          <Text style={{ fontWeight: '600', color: Colors.main, marginLeft: 4 }}>Photo added</Text>
        </View>
      );
    }
    return (
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => this.uploadImage()}>
        <Icon size={26} color={Colors.main} name="image" />
        <Text style={{ fontWeight: '600', color: Colors.main, marginLeft: 3 }}>Add a profile photo</Text>
      </TouchableOpacity>
    )
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.centerContent}>
          <Text style={styles.welcomeText}>Welcome to Mixdo!</Text>
          {this.renderProfileImage()}
          {this.displayAddImageText()}

          <TouchableOpacity style={styles.finishButton} onPress={() => this.pressFinish()}>
            <Text style={styles.buttonText}>Finish</Text>
            <Chevron size={26} name="chevron-right" color={Colors.main} />
          </TouchableOpacity>

        </View>

      </View>
    );
  }
}

export default Welcome;
