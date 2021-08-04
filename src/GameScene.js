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

const engine = Matter.Engine.create({ enableSleeping: false });
const floor = Matter.Bodies.rectangle(width / 2, height - 150, width, 50, { isStatic: true });
const world = engine.world;

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

    this.offsetX = 0;
    this.offsetY = height / 7
  }

  componentDidMount() {
    // Matter.Events.on(engine, 'collisionStart', (event) => {
    //   var pairs = event.pairs;
    //   const t = pairs;
    // });
  }

  jump = () => {
    this.engine.swap(this.getEntities('jump')).then(() => {
      console.log('jumping');
      this.setState({ didJump: true })
      setTimeout(() => {
        this.fall();
      }, 150)
    })
  }

  fall = () => {
    this.engine.swap(this.getEntities('fall')).then(() => {
      console.log('End fall');
      setTimeout(() => {
        this.idle()
        this.setState({ didJump: false })
      }, 150)
    })
  }

  attack = () => {
    this.engine.swap(this.getEntities('attack')).then(() => {
      this.setState({ didAttack: true })
    })
  }

  run = () => {
    this.engine.swap(this.getEntities('run')).then(() => {
      console.log(`running ${this.state.direction}`);
    })
  }

  idle = () => {
    this.engine.swap(this.getEntities('idle')).then(() => {
      console.log('idling');
    })
  }

  renderLeftButton = () => {
    const { direction } = this.state;
    return <View onTouchStart={() => {
      if (direction !== 'left') {
        this.setState({ direction: 'left', isRunningLeft: true }, () => this.run());
      } else {
        this.setState({ isRunningLeft: true }, () => this.run());
      }
    }}
      onTouchEnd={() => this.setState({ isRunningLeft: false }, () => this.idle())}>
      <Image style={{ opacity: 0.7, height: 90, width: 90 }} source={leftButton} />
    </View>
  }

  renderRightButton = () => {
    const { direction } = this.state;
    return <View onTouchStart={() => {
      if (direction !== 'right') {
        this.setState({ direction: 'right', isRunningRight: true }, () => this.run());
      } else {
        this.setState({ isRunningRight: true }, () => this.run());
      }
    }}
      onTouchEnd={() => this.setState({ isRunningRight: false }, () => this.idle())}>
      <Image style={{ opacity: 0.7, height: 90, width: 90 }} source={rightButton} />
    </View>
  }

  renderAttackButton = () => {
    return <View onTouchStart={() => {
      if (!this.state.didAttack) {
        this.attack();
      }
    }}
      onTouchEnd={() => {
        setTimeout(() => {
          this.idle();
          this.setState({ didAttack: false })
        }, 150);
      }}>
      <Image style={{ opacity: 0.7, height: 90, width: 90 }} source={attackButton} />
    </View>
  }

  renderJumpButton = () => {
    return <View onTouchStart={() => {
      if (!this.state.didJump) {
        this.jump();
      }
    }}
      onTouchEnd={() => { }}>
      <Image style={{ opacity: 0.7, height: 90, width: 90 }} source={jumpButton} />
    </View>
  }

  renderSpecialButton = () => {
    return <View onTouchStart={() => console.log("Start special move")} onTouchEnd={() => console.log('End special move')}>
      <Image style={{ opacity: 0.7, height: 90, width: 90 }} source={specialButton} />
    </View>
  }

  renderABXButtons = () => {
    return (
      <View style={{ flexDirection: 'row', position: 'absolute', right: 0 }}>
        {this.renderAttackButton()}
        {this.renderJumpButton()}
        {this.renderSpecialButton()}
      </View >
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
    entities.hero.body.position.x = this.offsetX

    if (this.state.isRunningLeft || this.state.isRunningRight) {
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
          {this.renderLeftButton()}
          {this.renderRightButton()}
          {this.renderABXButtons()}
        </View>
      </>
    );
  }
}