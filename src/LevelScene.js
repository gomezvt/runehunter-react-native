import React, { PureComponent } from 'react';
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
export default class LevelScene extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const startButton = require('../img/start.png');
    return (
      <>
        <Text style={styles.title}>Level Scene</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.setSceneState("world")}>
          <Image source={startButton} style={styles.button} />
          <Text>World</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.setSceneState("game")}>
          <Image source={startButton} style={styles.button} />
          <Text>Game</Text>
        </TouchableOpacity>
      </>
    );
  }
}
