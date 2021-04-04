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
export default class WorldSelectScene extends PureComponent {
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
        <View style={{ width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.8)', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <View style={{ width: 100, marginTop: 15, justifyContent: 'space-evenly', alignItems: 'center' }}><Text style={{ color: '#fff' }}>Caves</Text></View>
          <View style={{ width: 100, marginTop: 15, justifyContent: 'space-evenly', alignItems: 'center' }}><Text style={{ color: '#fff' }}>Firelands</Text></View>
          <View style={{ width: 100, marginTop: 15, justifyContent: 'space-evenly', alignItems: 'center' }}><Text style={{ color: '#fff' }}>Catacombs</Text></View>
          <View style={{ width: 100, marginTop: 15, justifyContent: 'space-evenly', alignItems: 'center' }}><Text style={{ color: '#fff' }}>Icelands</Text></View>
        </View>
        <View style={{ height: 130, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.8)', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
        <TouchableOpacity
          style={styles.worldButton}
          onPress={() => this.props.setSceneState("level")}>
          <Image source={startButton} style={styles.worldButton} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.worldButton}
          onPress={() => this.props.setSceneState("level")}>
          <Image source={startButton} style={styles.worldButton} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.worldButton}
          onPress={() => this.props.setSceneState("level")}>
          <Image source={startButton} style={styles.worldButton} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.worldButton}
          onPress={() => this.props.setSceneState("level")}>
          <Image source={startButton} style={styles.worldButton} />
        </TouchableOpacity>
      </View>
      </>
    );
  }
}
