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
  Easing,
  StatusBar
} from 'react-native';
import Floor from './Floor';

import { Warrior, WarriorAttack, WarriorIdle, WarriorRun } from "./heroes/Warrior";
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
let engine = Matter.Engine.create({ enableSleeping: false });
let world = engine.world;
let hero = Matter.Bodies.rectangle(width / 4, height / 2, 50, 50);
let floor = Matter.Bodies.rectangle(width / 2, height - 25, width, 50, { isStatic: true });
Matter.World.add(world, [hero, floor]);

const Physics = (entities, { time }) => {
  let engine = entities.physics.engine;
  Matter.Engine.update(engine, time.delta);
  return entities;
};

export default class GameScene extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hero: 'warrior',
      type: 'idleright',
      running: true,
    };
  }

  render() {
    const { type } = this.state;
    return (
      // <>
      //   <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-evenly' }}>
      //     <TouchableOpacity
      //       style={styles.inGameButton}
      //       onPress={() => { this.props.setSceneState('menu') }}>
      //       <Image source={menuButton} style={styles.inGameButton} />
      //     </TouchableOpacity>
      //     <TouchableOpacity
      //       style={styles.inGameButton}
      //       onPress={() => { }}>
      //       <Image source={pauseButton} style={styles.inGameButton} />
      //     </TouchableOpacity>
      //   </View>
        <GameEngine
          style={styles.gameContainer}
          systems={[Physics]}
          entities={{
            physics: { engine: engine, world: world },
            hero: { body: hero, size: [50, 50], renderer: WarriorIdle },
            floor: { body: floor, size: [width, 150], color: "green", renderer: Floor },
          }}>
          <StatusBar hidden={true} />
        </GameEngine>
      //   <View style={{ width: '100%', flexDirection: 'row' }}>
      //     <View style={{ flexDirection: 'row' }}>
      //       <TouchableOpacity
      //         style={{ height: 90, width: 90 }}
      //       >
      //         <Image style={{ opacity: 0.7, height: 90, width: 90 }} source={leftButton} />
      //       </TouchableOpacity>
      //       <TouchableOpacity
      //         style={{ height: 90, width: 90 }}
      //       >
      //         <Image style={{ opacity: 0.7, height: 90, width: 90 }} source={rightButton} />
      //       </TouchableOpacity>
      //     </View>
      //     <View style={{ flexDirection: 'row', position: 'absolute', right: 0 }}>
      //       <TouchableOpacity
      //         style={{ height: 90, width: 90 }}
      //       >
      //         <Image style={{ opacity: 0.7, height: 90, width: 90 }} source={attackButton} />
      //       </TouchableOpacity>
      //       <TouchableOpacity
      //         onPress={() => { }}
      //         style={{ height: 90, width: 90 }}
      //       >
      //         <Image style={{ opacity: 0.7, height: 90, width: 90 }} source={jumpButton} />
      //       </TouchableOpacity>
      //       <TouchableOpacity
      //         onPress={() => { }}
      //         style={{ height: 90, width: 90 }}
      //       >
      //         <Image style={{ opacity: 0.7, height: 90, width: 90 }} source={specialButton} />
      //       </TouchableOpacity>
      //     </View>
      //   </View>
      // </>
    );
  }
}

// import React from 'react';
// import { Dimensions, StyleSheet, Text, View, StatusBar } from 'react-native';
// import Matter from "matter-js";
// import { GameEngine } from "react-native-game-engine";
// import Box from '../Box';

// const { width, height } = Dimensions.get("screen");
// const boxSize = Math.trunc(Math.max(width, height) * 0.075);
// const engine = Matter.Engine.create({ enableSleeping: false });
// const world = engine.world;
// const initialBox = Matter.Bodies.rectangle(width / 2, height / 2, boxSize, boxSize);
// const floor = Matter.Bodies.rectangle(width / 2, height - boxSize / 2, width, boxSize, { isStatic: true });
// Matter.World.add(world, [initialBox, floor]);

// const Physics = (entities, { time }) => {
//   let engine = entities["physics"].engine;
//   Matter.Engine.update(engine, time.delta);
//   return entities;
// };

// export default class App extends React.Component {
//   render() {
//     return (
//       <GameEngine
//         style={styles.container}
//         systems={[Physics]}
//         entities={{
//           physics: { engine: engine, world: world },
//           floor: { body: floor, size: [width, boxSize], color: "green", renderer: Box },
//           initialBox: { body: initialBox, size: [boxSize, boxSize], color: 'red', renderer: Box }
//         }}
//       >
//         <StatusBar hidden={true} />
//       </GameEngine>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });