import React, { PureComponent } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import SpriteSheet from 'rn-sprite-sheet';

const { height } = Dimensions.get('window')
const { width } = Dimensions.get('window')

export class HuntressIdle extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loop: true,
      resetAfterFinish: false,
      fps: '16',
      hero: 'huntress',
      x: -width / 3,
      y: height / 3,
    };
  }

  componentDidMount() {
    this.play('idle');
  }

  play = type => {
    const { fps, loop, resetAfterFinish } = this.state;

    if (this.huntress) {
      this.huntress.play({
        type,
        fps: Number(fps),
        loop: loop,
        resetAfterFinish: resetAfterFinish,
        onFinish: () => console.log('hi')
      });
    }
  };

  stop = () => {
    this.huntress.stop(() => console.log('stopped'));
  };

  render() {
    const { x, y } = this.state;
    return (
      // <View style={{ left: x, top: y }}>
      <SpriteSheet
        ref={ref => (this.huntress = ref)}
        source={require('../../sprites/huntress/Idle.png')}
        columns={10}
        rows={1}
        width={175}
        animations={{
          idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        }}
      />
      // </View>
    );
  }
}
