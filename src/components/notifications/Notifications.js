import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from './styles';
import NotificationCard from './sub_components/NotificationCard';

class Notifications extends React.Component {
  state = {
    notifications: [],
    refreshing: false
  };

  componentWillMount() {
    this.getNotifications();
  }

  getNotifications = async () => {
    this.setState({ refreshing: true });
    await this.props.getNotifications();
    if(this.props.state.notifications.payload) {
      this.setState({ notifications: this.props.state.notifications.payload, refreshing: false });
    } else {
      this.setState({ refreshing: false });
    }
  };

  renderItem(notification) {
    return <NotificationCard notification={notification.item} />
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <FlatList 
          data={this.state.notifications}
          renderItem={this.renderItem}
          keyExtractor={notification => notification._id}
          refreshing={this.state.refreshing}
          onRefresh={this.getNotifications}
        />
      </View>
    );
  }
}

export default Notifications;
