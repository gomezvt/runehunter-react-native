import React, { Component } from 'react';
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
  Easing,
  StatusBar
} from 'react-native';
import Floor from './Floor';

// import { WarriorIdle, WarriorAttack, WarriorRun } from "./heroes/Warrior";
import Warrior from "./heroes/Warrior";
import { play } from "./heroes/Warrior";

import Box from "../Box";

import { GameEngine, GameLoop } from 'react-native-game-engine';
import { EventRegister } from 'react-native-event-listeners'
import Matter from "matter-js";

const { height } = Dimensions.get('window')
const { width } = Dimensions.get('window')
const pauseButton = require('../img/pause.png');
const menuButton = require('../img/menu.png');
const leftButton = require('../img/controls/LEFT_BUTTON.png');
const rightButton = require('../img/controls/RIGHT_BUTTON.png');
const attackButton = require('../img/controls/A_BUTTON.png');
const jumpButton = require('../img/controls/B_BUTTON.png');
const specialButton = require('../img/controls/X_BUTTON.png');

const boxSize = Math.trunc(Math.max(width, height) * 0.075);
const initialBox = Matter.Bodies.rectangle(width / 2, height / 2, boxSize, boxSize);

let engine = Matter.Engine.create({ enableSleeping: false });
let world = engine.world;
world.gravity.y = 2;
let floor = Matter.Bodies.rectangle(width / 2, height - 100, width, 50, { isStatic: true });
Matter.World.add(world, [initialBox, floor]);

const Physics = (entities, { time }) => {
  let engine = entities.physics.engine;
  Matter.Engine.update(engine, time.delta);
  return entities;
};



export default class GameScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'idle',
      direction: 'right',
    };
  }

  // updateGame = (entities, { touches, dispatch }) => {

  //   if ( /* SOME CONDITION */ ) {
  //     dispatch({ type: "game-over" });
  //   }

  //   return entities;
  // }

  renderLeftRightButtons = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ height: 90, width: 90 }}
        >
          <Image style={{ opacity: 0.7, height: 90, width: 90 }} source={leftButton} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ height: 90, width: 90 }}
        >
          <Image style={{ opacity: 0.7, height: 90, width: 90 }} source={rightButton} />
        </TouchableOpacity>
      </View>
    )
  }

  renderABXButtons = () => {
    return (
      <View style={{ flexDirection: 'row', position: 'absolute', right: 0 }}>
        <TouchableOpacity
          style={{ height: 90, width: 90 }}
          onPress={() => {
            EventRegister.emit('type', 'attack')
            setTimeout(() => { EventRegister.emit('type', 'idle') }, 300)
            // this.setState({ type: 'attack' }, () => this.engine.swap(this.getEntities()))
            // this.setState({ type: 'attack' }, () => this.engine.swap(this.getEntities()))
            // setTimeout(() => { this.setState({ type: 'idle' }, () => this.engine.swap(this.getEntities())) }, 100);
          }}
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
    );
  }

  renderMenuPauseButtons = () => {
    return (
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
    );
  }

  getEntities = () => {
    const { type, direction } = this.state;
    return {
      physics: { engine: engine, world: world },
      floor: { body: floor, size: [width, boxSize], color: "green", renderer: Floor },
      initialBox: {
        body: initialBox, size: [225, 225], color: 'red', renderer: <Warrior type={type} direction={direction} />
      }
    };
  };

  // handleEvent = (ev) => {
  //   if (this.state.type == 'attack') {
  //     this.engine.swap(this.getEntities());
  //   }
  // };

  render() {
    return (
      <>
        {this.renderMenuPauseButtons()}
        <GameEngine
          ref={ref => (this.engine = ref)}
          style={styles.gameContainer}
          systems={[Physics]}
          entities={this.getEntities()}
        // onEvent={this.handleEvent}
        >
          <StatusBar hidden={true} />
        </GameEngine>
        <View style={{ width: '100%', flexDirection: 'row' }}>
          {this.renderLeftRightButtons()}
          {this.renderABXButtons()}
        </View>
      </>
    );
  }
}