import React, { Component } from 'react';
import { styles } from '../styles';
import {
  Platform,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
export default class HeroSelectScene extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const startButton = require('../img/start.png');
    return (
      <>
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <TouchableOpacity
            style={styles.worldButton}
            onPress={() => { }}>
            <Image source={startButton} style={styles.worldButton} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.worldButton}
            onPress={() => { }}>
            <Image source={startButton} style={styles.worldButton} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.worldButton}
            onPress={() => { }}>
            <Image source={startButton} style={styles.worldButton} />
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
