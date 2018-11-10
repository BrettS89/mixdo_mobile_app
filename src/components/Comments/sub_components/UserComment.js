import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles';

const UserComment = ({ comment }) => {

  const renderProfileImage = () => {
    if(comment.user.photo) {
      return <Image style={styles.profileImage} resizeMode="cover" source={{ uri: comment.user.photo }}/>
    }
    return <Image style={styles.profileImage} source={require('../../../../assets/blank-profile.png')} />
  };

  return (
    <View style={{ padding: 15, justifyContent: 'center' }}>
      <View style={styles.userCardContainer}>
        <View style={styles.leftContent}>
          {renderProfileImage()}
          <View style={styles.rightContent}>
            <Text style={styles.typeText}>{comment.user.fullName}</Text>
          </View>
        </View>
      </View>
      <View style={{ marginLeft: 47 }}>
        <Text style={styles.commentText}>
          {comment.content}
        </Text>
      </View>
    </View>
  );
};

export default UserComment;
