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
import { Warrior } from "./heroes/Warrior";
import { GameEngine, GameLoop } from 'react-native-game-engine';

const { height } = Dimensions.get('window')
const { width } = Dimensions.get('window')
const pauseButton = require('../img/pause.png');
const menuButton = require('../img/menu.png');
// const gamepad = require('../img/gamepad.png');

export default class GameScene extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hero: 'warrior',
      type: 'idle',
      x: -width / 3,
      y: height / 2,
    };
  }

  updateHandler = ({ touches, screen, layout, time }) => {

    // let move = touches.find(x => x.type === "move");
    // if (move) {
    //   this.setState({
    //     x: this.state.x + move.delta.pageX,
    //     y: this.state.y + move.delta.pageY,
    //   });
    // }

    let press = touches.find(x => x.type === "press");
    if (press) {
      this.setState({
        type: 'attack'
      }, () => {
        setTimeout(() => { this.setState({ type: 'idle' }) }, 300)
      });
    }
  };

  render() {
    const { type } = this.state;
    return (
      <>
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <TouchableOpacity
            style={styles.inGameButton}
            onPress={() => { this.props.setSceneState('menu') }}>
            <Image source={menuButton} style={styles.inGameButton} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.inGameButton}
            onPress={() => { }}>
            <Image source={pauseButton} style={styles.inGameButton} />
          </TouchableOpacity>
        </View>
        <GameLoop style={styles.gameContainer} onUpdate={this.updateHandler}>
          <Warrior type={type} loop={true} resetAfterFinish={false} />
          {/* <TouchableOpacity
            onPress={() => { }}
            style={{ left: 25, top: -50 }}
          >
            <Image source={gamepad} />
          </TouchableOpacity> */}
        </GameLoop>
      </>
    );
  }
}

