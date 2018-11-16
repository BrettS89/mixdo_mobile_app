import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ImagePicker, Permissions, ImageManipulator } from 'expo';
import { imageUpload } from '../../services/imageUpload';
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

  async componentDidMount() {
    await this.props.getMyProfile();
    const { fullName, photo } = this.props.state.user.payload;
    this.setState({ fullName, photo });
  }

  renderProfileImage = () => {
    if(this.state.photo) {
      return <Image 
              style={styles.profileImage} 
              resizeMode="cover" 
              source={{ uri: this.state.photo }}
            />
    }
    return <Image 
            style={styles.profileImage} 
            source={require('../../../assets/blank-profile.png')}
          />
  };

  uploadImage = async () => {
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
      { base64: false, compress: 0.2 }
    );

    if (!result.cancelled) {
      const splitURI = result.uri.split('.');
      const lastItem = splitURI.length - 1;
      const type = splitURI[lastItem];
      const imageToSave = await imageUpload({ file: manipResult, type });
      const user = await apiUploadProfilePhoto({ photo: imageToSave });
      this.setState({ fullName: user.fullName, photo: user.photo });
    }
  };

  pressFinish = () => {
    const { navigation } = this.props;
    pushNotifications().then(() => {
      navigation.navigate('FindTodos');
    }).catch((e) => {
      navigation.navigate('FindTodos');
    }); 
  };

  displayAddImageText = () => {
    if(this.state.photo) {
      return (
        <View style={styles.photoAdded}>
          <Check2 
            size={26} 
            color={Colors.main} 
            name="check" 
          />
          <Text style={styles.photoAddedText}>Photo added</Text>
        </View>
      );
    }
    return (
      <TouchableOpacity 
        style={styles.addPhoto} 
        onPress={() => this.uploadImage()}
      >
        <Icon 
          size={26} 
          color={Colors.main} 
          name="image" 
        />
        <Text style={styles.photoAddedText}>Add a profile photo</Text>
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
          <TouchableOpacity 
            style={styles.finishButton} 
            onPress={() => this.pressFinish()}
          >
            <Text style={styles.buttonText}>Finish</Text>
            <Chevron 
              size={26} 
              name="chevron-right" 
              color={Colors.main} 
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Welcome;
