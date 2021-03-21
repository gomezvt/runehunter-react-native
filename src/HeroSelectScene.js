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
        <Text style={styles.title}>Hero Select Scene</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.setSceneState("menu")}>
          <Image source={startButton} style={styles.button} />
          <Text>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.setSceneState("world")}>
          <Image source={startButton} style={styles.button} />
          <Text>world</Text>
        </TouchableOpacity>
      </>
    );
  }
}
