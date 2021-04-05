import React, { PureComponent } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import SpriteSheet from 'rn-sprite-sheet';

const { height } = Dimensions.get('window')
const { width } = Dimensions.get('window')

export class WarriorIdle extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loop: true,
      resetAfterFinish: false,
      fps: '16',
      hero: 'warrior',
      x: -width / 3,
      y: height / 3,
    };
  }

  componentDidMount() {
    this.play('idle');
  }

  play = type => {
    const { fps, loop, resetAfterFinish } = this.state;

    if (this.warrior) {
      this.warrior.play({
        type,
        fps: Number(fps),
        loop: loop,
        resetAfterFinish: resetAfterFinish,
        onFinish: () => console.log('hi')
      });
    }
  };

  stop = () => {
    this.warrior.stop(() => console.log('stopped'));
  };

  render() {
    const { x, y } = this.state;
    return (
      // <View style={{ left: x, top: y }}>
        <SpriteSheet
          ref={ref => (this.warrior = ref)}
          source={require('../../sprites/warrior/Idle.png')}
          columns={10}
          rows={1}
          width={225}
          animations={{
            idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          }}
        />
      // </View>
    );
  }
}

export class WarriorAttack extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loop: false,
      resetAfterFinish: true,
      fps: '16',
      hero: 'warrior',
      x: -width / 3,
      y: height / 3,
    };
  }

  componentDidMount() {
    this.play('attack');
  }

  play = type => {
    const { fps, loop, resetAfterFinish } = this.state;

    if (this.warrior) {
      this.warrior.play({
        type,
        fps: Number(fps),
        loop: loop,
        resetAfterFinish: resetAfterFinish,
        onFinish: () => console.log('hi')
      });
    }
  };

  stop = () => {
    this.warrior.stop(() => console.log('stopped'));
  };

  render() {
    const { x, y } = this.state;
    return (
      // <View style={{ left: x, top: y }}>
        <SpriteSheet
          ref={ref => (this.warrior = ref)}
          source={require('../../sprites/warrior/Attack1.png')}
          columns={4}
          rows={1}
          width={225}
          animations={{
            attack: [0, 1, 2, 3],
          }}
        />
      // </View>
    );
  }
}
