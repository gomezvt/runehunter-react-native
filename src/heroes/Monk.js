import React, { PureComponent } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import SpriteSheet from 'rn-sprite-sheet';

const { height } = Dimensions.get('window')
const { width } = Dimensions.get('window')

export class MonkIdle extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loop: true,
      resetAfterFinish: false,
      fps: '16',
      hero: 'monk',
      x: -width / 3,
      y: height / 3,
    };
  }

  componentDidMount() {
    this.play('idle');
  }

  play = type => {
    const { fps, loop, resetAfterFinish } = this.state;

    if (this.monk) {
      this.monk.play({
        type,
        fps: Number(fps),
        loop: loop,
        resetAfterFinish: resetAfterFinish,
        onFinish: () => console.log('hi')
      });
    }
  };

  stop = () => {
    this.monk.stop(() => console.log('stopped'));
  };

  render() {
    const { x, y } = this.state;
    return (
      // <View style={{ left: x, top: y }}>
      <SpriteSheet
        ref={ref => (this.monk = ref)}
        source={require('../../sprites/monk/Idle.png')}
        columns={4}
        rows={1}
        animations={{
          idle: [0, 1, 2, 3],
        }}
      />
      // </View>
    );
  }
}
