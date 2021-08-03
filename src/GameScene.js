import React, { Component } from 'react';
import { styles } from '../styles';
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar
} from 'react-native';
import Floor from './Floor';
import WarriorIdle from "./heroes/WarriorIdle";
import WarriorAttack from './heroes/WarriorAttack';
import WarriorRun from './heroes/WarriorRun';
import WarriorJump from './heroes/WarriorJump';
import WarriorFall from './heroes/WarriorFall';

import { GameEngine } from 'react-native-game-engine';
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
const hero = Matter.Bodies.rectangle(100, 100, boxSize, boxSize);

let engine = Matter.Engine.create({ enableSleeping: false });
let floor = Matter.Bodies.rectangle(width / 2, height - 150, width, 50, { isStatic: true });
let world = engine.world;

Matter.World.add(world, [hero, floor]);

export default class GameScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: 0,
      left: 0,
      direction: 'right',
      isRunningLeft: false,
      isRunningRight: false,
      didJump: false,
      didAttack: false
    }
    this.selectedHero = null;
    this.offsetX = 0;
    this.offsetY = height / 7
    this.runValue = 0;
  }

  componentDidMount() {
    // Matter.Events.on(engine, 'collisionStart', (event) => {
    //   var pairs = event.pairs;
    //   const t = pairs;
    // });
  }

  jump = () => {
    this.engine.swap(this.getEntities('jump')).then(() => {
      this.setState({ didJump: true })
      console.log('jumping');
      setTimeout(() => {
        this.engine.swap(this.getEntities('fall')).then(() => {
          console.log('falling');
          setTimeout(() => {
            this.setState({ didJump: false })
            this.idle()
          }, 150)
        })
      }, 150)
    })
  }

  run = () => {
    // this.timer = setTimeout(this.run, 200);
    if (this.state.direction == undefined) {
      console.log('check undefined')
    }

    // if (this.state.direction == 'left' && this.offsetX > -25) {
    //   this.offsetX -= 1
    //   // console.log('offsetX = ', this.offsetX)
    // } else if (this.state.direction == 'left' && this.offsetX <= -25) {
    //   // do nothing
    // }

    // if (this.state.direction == 'right' && this.offsetX < width / 2 - 100) {
    //   this.offsetX += 1
    //   // console.log('offsetX = ', this.offsetX)
    // } else if (this.state.direction == 'right' && this.offsetX >= width / 2 - 100) {
    //   // do nothing
    // }
    this.engine.swap(this.getEntities('run')).then(() => {
      console.log(`running ${this.state.direction}`);
    })
  }

  idle = () => {
    // clearTimeout(this.timer);
    this.engine.swap(this.getEntities('idle')).then(() => {
      console.log('idling');
    })
  }

  renderLeftRightButtons = () => {
    const { direction } = this.state;
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ height: 90, width: 90 }}
          onPressIn={() => {
            if (direction !== 'left') {
              this.setState({ direction: 'left', isRunningLeft: true }, () => this.run());
            } else {
              this.setState({ isRunningLeft: true }, () => this.run());
            }
          }}
          onPressOut={() => {
            this.setState({ isRunningLeft: false }, () => this.idle());
          }}
        >
          <Image style={{ opacity: 0.7, height: 90, width: 90 }} source={leftButton} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ height: 90, width: 90 }}
          onPressIn={() => {
            if (direction !== 'right') {
              this.setState({ direction: 'right', isRunningRight: true }, () => this.run());
            } else {
              this.setState({ isRunningRight: true }, () => this.run());
            }
          }}
          onPressOut={() => {
            this.setState({ isRunningRight: false }, () => this.idle());
          }}
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
          disabled={this.state.didAttack}
          style={{ height: 90, width: 90 }}
          onPress={() => {
            this.engine.swap(this.getEntities('attack')).then(() => {
              this.setState({ didAttack: true })
              console.log('attacking');
              setTimeout(() => {
                this.idle();
                this.setState({ didAttack: false })
              }, 150);
            })
          }}
        >
          <Image style={{ opacity: 0.7, height: 90, width: 90 }} source={attackButton} />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={this.state.didJump}
          style={{ height: 90, width: 90 }}
          onMoveShouldSetResponder
          onPress={() => {
            this.jump();
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
    // console.log('Dispatched event = ', e.type);
    // if (e.type === "game-over") {
    //Alert.alert("Game Over");
    //   this.setState({
    //     running: false
    //   });
    // }
  }

  // GameEngine timer
  updateHandler = (ev) => {
  };

  // GameEngine system
  updateGame = (entities, { dispatch, events, screen, time, touches }) => {
    // console.log('updated game');
    let engine = entities.physics.engine;
    Matter.Engine.update(engine, time.delta);

    if (this.state.direction == 'left' && this.offsetX < -25) {
      console.log('hero body x', entities.hero.body.position.x)
    }

    if (this.state.direction == 'right' && this.offsetX > width / 2 - 100) {
      console.log('hero body x', entities.hero.body.position.x)
    }

    if (this.offsetY !== height / 7) {
      console.log('hero body y', entities.hero.body.position.y)
    }

    entities.hero.body.position.y = this.offsetY
    // entities.hero.body.position.x = this.offsetX

    if (this.state.isRunningLeft || this.state.isRunningRight) {
      // TODO: get run logic to increment and decrement run value here then pass it to the component
      this.run();
    }

    return entities;
  }

  getOffsetX = (x) => {
    if (x !== this.offsetX) {
      this.offsetX = x;
    }
  }

  getEntities = (type) => {
    const { direction } = this.state;
    const selectedHero = type == 'attack' ? <WarriorAttack offsetY={this.offsetY} offsetX={this.offsetX} direction={direction} /> :
      type == 'run' ? <WarriorRun getOffsetX={this.getOffsetX} offsetY={this.offsetY} offsetX={this.offsetX} direction={direction} /> :
        type == 'jump' ? <WarriorJump offsetY={this.offsetY} offsetX={this.offsetX} direction={direction} /> :
          type == 'fall' ? <WarriorFall offsetY={this.offsetY} offsetX={this.offsetX} direction={direction} /> :
            <WarriorIdle offsetY={this.offsetY} offsetX={this.offsetX} direction={direction} />
    // console.log(`switched entities with offsetX' ${this.offsetX} and offsetY ${this.offsetY}`);
    this.selectedHero = selectedHero;

    return {
      physics: { engine: engine, world: world },
      floor: { body: floor, size: [width, boxSize], color: "green", renderer: Floor },
      hero: {
        body: hero, size: [100, 100], renderer: selectedHero
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
          systems={[this.updateGame]}
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