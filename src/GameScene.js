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
import LeftWall from './LeftWall';
import RightWall from './RightWall';
import WarriorIdle from "./heroes/WarriorIdle";
import WarriorAttack from './heroes/WarriorAttack';
import WarriorRun from './heroes/WarriorRun';
import WarriorJump from './heroes/WarriorJump';
import WarriorFall from './heroes/WarriorFall';

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
const hero = Matter.Bodies.rectangle(width / 2, height / 2, boxSize, boxSize);

let engine = Matter.Engine.create({ enableSleeping: false });
let world = engine.world;
world.gravity.y = 2;
let floor = Matter.Bodies.rectangle(width / 2, height - 100, width, 50, { isStatic: true });
let leftWall = Matter.Bodies.rectangle(50, height - 100, width, 50, { isStatic: true });
let rightWall = Matter.Bodies.rectangle(50, height - 100, width, 50, { isStatic: true });

Matter.World.add(world, [hero, leftWall, rightWall, floor]);

const Physics = (entities, { time }) => {
  let engine = entities.physics.engine;
  Matter.Engine.update(engine, time.delta);

  return entities;
};



export default class GameScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: 0,
      left: 0,
      direction: 'right',
    }
    this.selectedHero = null;
    this.offsetX = 0;
  }

  componentDidMount() {
    this.listener = EventRegister.addEventListener('offsetX', (value) => {
      console.log('check the incoming value', value)
      this.offsetX = value;
    });

    Matter.Events.on(engine, 'collisionStart', (event) => {
      var pairs = event.pairs;
      const t = pairs;
      //TODO check if hero hits a wall and stop them in the eventhandler func
      // this.gameEngine.dispatch({ type: "game-over" });
    });
  }

  run = () => {
    EventRegister.emit('direction', this.state.direction);
    this.timer = setTimeout(this.run, 200);
    console.log('direction =====>', this.state.direction)
  }

  stopMoving = (type) => {
    this.setState({ type });
    clearTimeout(this.timer);
    console.log('the stopped offsetX', this.offsetX)
  }

  renderLeftRightButtons = () => {
    const { direction } = this.state;
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ height: 90, width: 90 }}
          onPressIn={() => {
            if (direction !== 'left') {
              this.setState({ direction: 'left' });
            }
            this.run();
            this.engine.swap(this.getEntities('run', 'left'));
          }}
          onPressOut={() => {
            if (direction !== 'left') {
              this.setState({ direction: 'left' });
            }
            this.stopMoving('idle');
            this.engine.swap(this.getEntities('idle', 'left'));
          }}
        >
          <Image style={{ opacity: 0.7, height: 90, width: 90 }} source={leftButton} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ height: 90, width: 90 }}
          onPressIn={() => {
            if (direction !== 'right') {
              this.setState({ direction: 'right' });
            }
            this.run();
            this.engine.swap(this.getEntities('run', 'right'));
          }}
          onPressOut={() => {
            if (direction !== 'right') {
              this.setState({ direction: 'right' });
            }
            this.stopMoving('idle');
            this.engine.swap(this.getEntities('idle', 'right'));
          }}
        >
          <Image style={{ opacity: 0.7, height: 90, width: 90 }} source={rightButton} />
        </TouchableOpacity>
      </View>
    )
  }

  renderABXButtons = () => {
    const { direction } = this.state;
    return (
      <View style={{ flexDirection: 'row', position: 'absolute', right: 0 }}>
        <TouchableOpacity
          style={{ height: 90, width: 90 }}
          onPress={() => {
            this.engine.swap(this.getEntities('attack', direction))
            setTimeout(() => { this.engine.swap(this.getEntities('idle', direction)) }, 300);
          }}
        >
          <Image style={{ opacity: 0.7, height: 90, width: 90 }} source={attackButton} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { }}
          style={{ height: 90, width: 90 }}
          onPress={() => {
            this.engine.swap(this.getEntities('jump', direction))
            setTimeout(() => { this.engine.swap(this.getEntities('fall', direction)) }, 600)
          }}
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

  onEvent = (e) => {
    if (e.type === "game-over") {
      //Alert.alert("Game Over");
      this.setState({
        running: false
      });
    }
  }

  updateHandler = (ev) => {
    console.log('*** timer ***', ev);
  };

  getEntities = (type, direction) => {
    const selectedHero = type == 'attack' ? <WarriorAttack offsetX={this.offsetX} direction={direction} /> :
      type == 'run' ? <WarriorRun offsetX={this.offsetX} direction={direction} /> :
        type == 'jump' ? <WarriorJump direction={direction} /> :
          type == 'fall' ? <WarriorFall direction={direction} /> :
            <WarriorIdle offsetX={this.offsetX} direction={direction} />

    console.log('switched entities with offsetX', this.offsetX)
    this.selectedHero = selectedHero;

    return {
      physics: { engine: engine, world: world },
      floor: { body: floor, size: [width, boxSize], color: "green", renderer: Floor },
      leftWall: { body: leftWall, size: [boxSize, boxSize], color: "red", renderer: LeftWall },
      rightWall: { body: rightWall, width: width, size: [boxSize, boxSize], color: "blue", renderer: RightWall },
      hero: {
        body: hero, size: [225, 225], color: 'red', renderer: selectedHero
      }
    };
  };

  render() {
    return (
      <>
        {this.renderMenuPauseButtons()}
        <GameEngine
          ref={ref => (this.engine = ref)}
          style={styles.gameContainer}
          systems={[Physics]}
          entities={this.getEntities()}
          onEvent={this.onEvent}
          timer={this.updateHandler()}
          running
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