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
import { Finger, WarriorIdle } from "./heroes/Warrior";
import { MoveFinger } from "./systems";
import { GameEngine } from 'react-native-game-engine';
import SpriteSheet from 'rn-sprite-sheet';

const { height } = Dimensions.get('window')
const { width } = Dimensions.get('window')

export default class GameScene extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loop: true,
      resetAfterFinish: false,
      fps: '16',
      hero: 'warrior',
    };
  }

  render() {
    return (
      <>
          <GameEngine
          style={styles.gameContainer}
            systems={[MoveFinger]}
            entities={{
              1: {
                position: [-width / 3, height / 2], renderer: <WarriorIdle />
              },
          }}>
          </GameEngine> 
        {/* <GameEngine
          style={styles.game_container}
          systems={[MoveFinger]}
          entities={{
            1: { position: [40, 200], renderer: <Finger /> }, //-- Notice that each entity has a unique id (required)
            2: { position: [100, 200], renderer: <Finger /> }, //-- and a renderer property (optional). If no renderer
            3: { position: [160, 200], renderer: <Finger /> }, //-- is supplied with the entity - it won't get displayed.
            4: { position: [220, 200], renderer: <Finger /> },
            5: { position: [280, 200], renderer: <Finger /> }
          }}>
        </GameEngine> */}
      </>
    );
  }
}

