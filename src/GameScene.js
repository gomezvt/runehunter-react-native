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
import { Warrior, WarriorAttack, WarriorIdle } from "./heroes/Warrior";
import { GameEngine, GameLoop } from 'react-native-game-engine';
import { EventRegister } from 'react-native-event-listeners'

const { height } = Dimensions.get('window')
const { width } = Dimensions.get('window')
const pauseButton = require('../img/pause.png');
const menuButton = require('../img/menu.png');
const leftButton = require('../img/controls/LEFT_BUTTON.png');
const rightButton = require('../img/controls/RIGHT_BUTTON.png');
const attackButton = require('../img/controls/A_BUTTON.png');
const jumpButton = require('../img/controls/B_BUTTON.png');
const specialButton = require('../img/controls/X_BUTTON.png');

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

    // let press = touches.find(x => x.type === "press");
    // if (press) {
    //   this.setState({
    //     type: 'attack'
    //   }, () => {
    //     setTimeout(() => { this.setState({ type: 'idle' }) }, 300)
    //   });
    // }
  };

  // handleAttack = () => {
  //   this.setState({
  //     type: 'attack'
  //   }, () => {
  //     setTimeout(() => { this.setState({ type: 'idle' }) }, 300)
  //   });
  // }

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
          {type == 'attack' ? <WarriorAttack /> : <WarriorIdle />}
          {/* <Warrior /> */}
        </GameLoop>
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => { }}
              style={{ height: 90, width: 90 }}
            >
              <Image style={{ opacity: 0.7, height: 90, width: 90 }} source={leftButton} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { }}
              style={{ height: 90, width: 90 }}
            >
              <Image style={{ opacity: 0.7, height: 90, width: 90 }} source={rightButton} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', position: 'absolute', right: 0 }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ 'type': 'attack' });
                setTimeout(() => { this.setState({ 'type': 'idle'}) }, 300);
              }}
              style={{ height: 90, width: 90 }}
            >
              <Image style={{ opacity: 0.7, height: 90, width: 90 }} source={attackButton} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { }}
              style={{ height: 90, width: 90 }}
            >
              <Image style={{ opacity: 0.7, height: 90, width: 90 }} source={jumpButton} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { }}
              style={{ height: 90, width: 90 }}
            >
              <Image style={{ opacity: 0.7, height: 90, width: 90 }} source={specialButton} />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}

