import React, { PureComponent } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import SpriteSheet from 'rn-sprite-sheet';

const { height } = Dimensions.get('window')
const { width } = Dimensions.get('window')

export class WizardIdle extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loop: true,
      resetAfterFinish: false,
      fps: '16',
      hero: 'wizard',
      x: -width / 3,
      y: height / 3,
    };
  }

  componentDidMount() {
    this.play('idle');
  }

  play = type => {
    const { fps, loop, resetAfterFinish } = this.state;

    if (this.wizard) {
      this.wizard.play({
        type,
        fps: Number(fps),
        loop: loop,
        resetAfterFinish: resetAfterFinish,
        onFinish: () => console.log('hi')
      });
    }
  };

  stop = () => {
    this.wizard.stop(() => console.log('stopped'));
  };

  render() {
    const { x, y } = this.state;
    return (
      // <View style={{ left: x, top: y }}>
      <SpriteSheet
        ref={ref => (this.wizard = ref)}
        source={require('../../sprites/wizard/Idle.png')}
        columns={8}
        rows={1}
        width={350}
        animations={{
          idle: [0, 1, 2, 3, 4, 5, 6, 7],
        }}
      />
      // </View>
    );
  }
}
