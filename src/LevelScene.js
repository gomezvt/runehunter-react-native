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
      <View style={{ width: "100%", height: 75, flexDirection: 'row', justifyContent: 'space-evenly' }}>
      <TouchableOpacity
          style={styles.menubutton}
          onPress={() => this.props.setSceneState("game")}>
          <Image source={startButton} style={styles.menubutton} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menubutton}
          onPress={() => this.props.setSceneState("game")}>
          <Image source={startButton} style={styles.menubutton} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menubutton}
          onPress={() => this.props.setSceneState("game")}>
          <Image source={startButton} style={styles.menubutton} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menubutton}
          onPress={() => this.props.setSceneState("game")}>
          <Image source={startButton} style={styles.menubutton} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menubutton}
          onPress={() => this.props.setSceneState("game")}>
          <Image source={startButton} style={styles.menubutton} />
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%", height: 75, flexDirection: 'row', justifyContent: 'space-evenly' }}>
      <TouchableOpacity
          style={styles.menubutton}
          onPress={() => this.props.setSceneState("game")}>
          <Image source={startButton} style={styles.menubutton} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menubutton}
          onPress={() => this.props.setSceneState("game")}>
          <Image source={startButton} style={styles.menubutton} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menubutton}
          onPress={() => this.props.setSceneState("game")}>
          <Image source={startButton} style={styles.menubutton} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menubutton}
          onPress={() => this.props.setSceneState("game")}>
          <Image source={startButton} style={styles.menubutton} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menubutton}
          onPress={() => this.props.setSceneState("game")}>
          <Image source={startButton} style={styles.menubutton} />
        </TouchableOpacity>
      </View>
      </>
    );
  }
}
