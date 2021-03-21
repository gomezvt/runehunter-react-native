import React, { PureComponent } from 'react';
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
export default class WorldScene extends PureComponent {
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
        <Text style={styles.title}>World Scene</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.setSceneState("hero")}>
          <Image source={startButton} style={styles.button} />
          <Text>Hero</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.setSceneState("level")}>
          <Image source={startButton} style={styles.button} />
          <Text>Level</Text>
        </TouchableOpacity>
      </>
    );
  }
}
