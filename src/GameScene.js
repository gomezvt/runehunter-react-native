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
import { Finger } from "./renderers";
import { MoveFinger } from "./systems";
import { GameEngine } from 'react-native-game-engine';

export default class GameScene extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <GameEngine
        style={styles.game_container}
        systems={[MoveFinger]}
        entities={{
          1: { position: [40,  200], renderer: <Finger />}, //-- Notice that each entity has a unique id (required)
          2: { position: [100, 200], renderer: <Finger />}, //-- and a renderer property (optional). If no renderer
          3: { position: [160, 200], renderer: <Finger />}, //-- is supplied with the entity - it won't get displayed.
          4: { position: [220, 200], renderer: <Finger />},
          5: { position: [280, 200], renderer: <Finger />}
        }}> 
      </GameEngine>
    );
  }
}
 
