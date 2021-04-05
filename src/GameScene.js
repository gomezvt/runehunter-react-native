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
import { WarriorIdle, WarriorAttack } from "./heroes/Warrior";
import { GameEngine, GameLoop } from 'react-native-game-engine';

const { height } = Dimensions.get('window')
const { width } = Dimensions.get('window')
const pauseButton = require('../img/pause.png');
const menuButton = require('../img/menu.png');

export default class GameScene extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hero: 'warrior',
      attacked: false,
      x: -width / 3,
      y: height / 2,
    };
  }

  updateHandler = ({ touches, screen, layout, time }) => {
    let move = touches.find(x => x.type === "move");
    if (move) {
      this.setState({
        x: this.state.x + move.delta.pageX,
        y: this.state.y + move.delta.pageY,
      });
    }

    const { attacked } = this.state;
    let press = touches.find(x => x.type === "press");
    if (press) {
      this.setState({ attacked: true });
    } else if (attacked) {
      setTimeout(() => { this.setState({ attacked: false }) }, 300);
    }
  };

  render() {
    return (
      <>
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <TouchableOpacity
            style={styles.inGameButton}
            onPress={() => {this.props.setSceneState('menu')}}>
            <Image source={menuButton} style={styles.inGameButton} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.inGameButton}
            onPress={() => { }}>
            <Image source={pauseButton} style={styles.inGameButton} />
          </TouchableOpacity>
        </View>
        <GameLoop style={styles.gameContainer} onUpdate={this.updateHandler}>
          {this.state.attacked ? <WarriorAttack /> : <WarriorIdle />}
        </GameLoop>
      </>
    );
  }
}

