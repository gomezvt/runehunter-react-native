import React, { Component } from "react";
import { View } from "react-native";
import { array, object, string } from 'prop-types';
import SpriteSheet from 'rn-sprite-sheet';

export default class Warrior extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loop: true,
      resetAfterFinish: false,
      fps: '16',
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
    const idleright = require('../../sprites/warrior/IdleRight.png');
    const idleleft = require('../../sprites/warrior/IdleLeft.png');
    const source = this.props.direction == "idleleft" ? idleleft : idleright;
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;
    return (
      <View
        style={{
          left: x,
          top: y,
          width: width,
          height: height,
        }}>
        <SpriteSheet
          ref={ref => (this.warrior = ref)}
          source={source}
          columns={10}
          rows={1}
          width={225}
          animations={{
            idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          }}
        />
      </View>
    );
  }
}

Warrior.propTypes = {
  size: array,
  body: object,
  color: string
}