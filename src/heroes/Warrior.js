import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import SpriteSheet from 'rn-sprite-sheet';

const RADIUS = 20;

export class Finger extends PureComponent {
  render() {
    const x = this.props.position[0] - RADIUS / 2;
    const y = this.props.position[1] - RADIUS / 2;
    return (
      <View style={[styles.finger, { left: x, top: y }]} />
    );
  }
}

export class WarriorIdle extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loop: true,
      resetAfterFinish: false,
      fps: '16',
      hero: 'warrior',
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
    const x = this.props.position[0] - RADIUS / 2;
    const y = this.props.position[1] - RADIUS / 2;
    return (
      <View style={{ left: x, top: y }}>
        <SpriteSheet
          ref={ref => (this.warrior = ref)}
          source={require('../../sprites/warrior/Idle.png')}
          columns={10}
          rows={1}
          width={175}
          animations={{
            idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  finger: {
    borderColor: "#CCC",
    borderWidth: 4,
    borderRadius: RADIUS * 2,
    width: RADIUS * 2,
    height: RADIUS * 2,
    backgroundColor: "pink",
    position: "absolute"
  }
});
