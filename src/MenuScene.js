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
export default class MenuScene extends PureComponent {
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
        <View style={{ height: 70, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <TouchableOpacity
            style={styles.menubutton}
            onPress={() => {}}>
            <Image source={startButton} style={styles.menubutton} />
            <Text>About</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menubutton}
            onPress={() => {}}>
            <Image source={startButton} style={styles.menubutton} />
            <Text>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menubutton}
            onPress={() => {}}>
            <Image source={startButton} style={styles.menubutton} />
            <Text>Face</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menubutton}
            onPress={() => {}}>
            <Image source={startButton} style={styles.menubutton} />
            <Text>Rem Ads</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
