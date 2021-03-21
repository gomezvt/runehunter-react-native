import React, { Component } from 'react';
import { styles } from '../styles';
import LevelScene from './LevelScene';

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
export default class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // TODO: Change path to GameScene bg after it's decided
    // render controls component here at bottom left corner of screen
    // render pause button at top right corner to go back to menu etc.
    const startButton = require('../img/start.png');
    return (
        <>
          <Text style={styles.title}>Lava Pit</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.setSceneState("hero")}>
            <Image source={startButton} style={styles.button} />
          </TouchableOpacity>
          <View style={{ width: '100%', justifyContent: 'space-evenly', flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => { }}>
              <Text>About</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => { }}>
              <Text>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => { }}>
              <Text>More Games</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => { }}>
              <Text>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => { }}>
              <Text>Remove Ads</Text>
            </TouchableOpacity>
          </View>
        </>
    );
  }
}
