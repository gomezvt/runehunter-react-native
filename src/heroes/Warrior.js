import React, { PureComponent } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import SpriteSheet from 'rn-sprite-sheet';

const { height } = Dimensions.get('window')
const { width } = Dimensions.get('window')

export class Warrior extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loop: props.loop,
      resetAfterFinish: props.resetAfterFinish,
      fps: 16,
      x: -width / 3,
      y: height / 3,
    };
  }

  componentDidMount() {
    this.play(this.props.type);
  }

  play = type => {
    const { fps, loop, resetAfterFinish } = this.state;
    this.warrior.play({
      type,
      fps: Number(fps),
      loop: loop,
      resetAfterFinish: resetAfterFinish,
      onFinish: () => console.log('finished')
    });
  };

  stop = () => {
    this.warrior.stop(() => console.log('stopped'));
  };

  getSpriteData = () => {
    switch (this.props.type) {
      case 'idle':
        return { source: require('../../sprites/warrior/Idle.png'), cols: 10, width: 250 }
      case 'attack':
        return { source: require('../../sprites/warrior/Attack1.png'), cols: 4, width: 250 }
      default:
        break;
    }
  }

  render() {
    const data = this.getSpriteData();
    return (
      <SpriteSheet
        ref={ref => (this.warrior = ref)}
        source={data.source}
        columns={data.cols}
        rows={1}
        width={data.width}
        imageStyle={{resizeMode: 'contain'}}
        animations={{
          idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          attack: [0, 1, 2, 3],
        }}
      />
    );
  }
}