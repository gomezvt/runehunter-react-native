import React, { Component } from "react";
import { View } from "react-native";
import { array, object, string } from 'prop-types';
import SpriteSheet from 'rn-sprite-sheet';

export default class WarriorFall extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loop: true,
      resetAfterFinish: false,
      fps: '16',
      direction: 'right',
    };
  }

  componentDidMount() {
    this.play('fall');
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

  getSpriteData = () => {
    const dir = this.props.renderer.props.direction || this.state.direction;
    if (dir == 'right') {
      return { source: require('../../sprites/warrior/FallRight.png'), cols: 2, width: 225 }
    }
    return { source: require('../../sprites/warrior/FallLeft.png'), cols: 2, width: 225 }
  }

  renderHero = () => {
    const data = this.getSpriteData();
    const { left, width, top, height } = this.props.renderer.props;
    return <View
      style={{
        left: left,
        top: top,
        width: width,
        height: height,
      }}>
      <SpriteSheet
        ref={ref => (this.warrior = ref)}
        source={data.source}
        columns={data.cols}
        imageStyle={{ resizeMode: 'contain' }}
        rows={1}
        width={data.width}
        animations={{
          fall: [0, 1]
        }}
      />
    </View>
  }

  render() {
    return (
      this.renderHero()
    );
  }
}

WarriorFall.propTypes = {
  size: array,
  body: object,
  color: string
}