import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../style/centerstyle';
import Icon from 'react-native-vector-icons/MaterialIcons'
export default class Menu extends Component {
  static navigationOptions ={ 
    headerTitle:"MENU",
    tabBarLabel: "More",
    tabBarIcon: () => <Icon size={24} name="menu" color="#ffffff" />
  }
  render() {
    return (
      <View style={styles.spinnerStyle}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333333', marginTop: 100 }}>
          Show More screens
        </Text>
      </View>
    );
  }
}
