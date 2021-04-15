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
  Animated,
  Easing
} from 'react-native';
import { Warrior, WarriorAttack, WarriorIdle, WarriorRun } from "./heroes/Warrior";
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
      type: 'idleright',
    };
    this.offsetX = new Animated.Value(0);
  }

  run = (type) => {
    if (type !== 'runleft' && type !== 'runright') {
      return;
    }

    console.log('hi');
    if (type !== this.state.type) {
      this.setState({ type });
    }

    const offsetX = this.offsetX.__getValue();
    const runValue = type == 'runleft' ? offsetX - 5 : offsetX + 5;
    Animated.spring(
      this.offsetX,
      {
        toValue: runValue,
        useNativeDriver: false,
      },
    ).start();
    this.timer = setTimeout(this.run, 200);
  }

  stopMoving = (type) => {
    this.setState({ type });
    clearTimeout(this.timer);
  }

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
        <Animated.View style={{ transform: [{ translateX: this.offsetX }] }}>
          {type == 'attackright' || type == 'attackleft' ? <WarriorAttack direction={type} /> :
            type == 'runleft' || type == 'runright' ? <WarriorRun direction={type} /> :
              <WarriorIdle direction={type} />}
        </Animated.View>
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPressOut={() => this.stopMoving('idleleft')}
              onPressIn={() => this.run('runleft')}
              style={{ height: 90, width: 90 }}
            >
              <Image style={{ opacity: 0.7, height: 90, width: 90 }} source={leftButton} />
            </TouchableOpacity>
            <TouchableOpacity
              onPressOut={() => this.stopMoving('idleright')}
              onPressIn={() => this.run('runright')}
              style={{ height: 90, width: 90 }}
            >
              <Image style={{ opacity: 0.7, height: 90, width: 90 }} source={rightButton} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', position: 'absolute', right: 0 }}>
            <TouchableOpacity
              onPress={() => {
                if (this.state.type == 'idleleft') {
                  this.setState({ type: 'attackleft' });
                  setTimeout(() => { this.setState({ type: 'idleleft' }) }, 300);
                } else {
                  this.setState({ 'type': 'attackright' });
                  setTimeout(() => { this.setState({ type: 'idleright' }) }, 300);
                }
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

