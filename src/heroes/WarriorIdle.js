import React, { Component } from "react";
import { View, Animated } from "react-native";
import { array, object, string } from 'prop-types';
import SpriteSheet from 'rn-sprite-sheet';
import { EventRegister } from 'react-native-event-listeners'

export default class WarriorIdle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loop: true,
      resetAfterFinish: false,
      fps: '16',
      direction: 'right',
    };
    this.offsetX = new Animated.Value(0)
  }

  componentDidMount() {
    this.play('idle');
    this.listener = EventRegister.addEventListener('offsetX', (value) => {
      //TODO: set hero location at the same position where run animation left off
      // if (value) {
      //   const offsetX = this.offsetX.__getValue() + value;
      //   this.offsetX.setValue(offsetX);
      // }
    })
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
      return { source: require('../../sprites/warrior/IdleRight.png'), cols: 10, width: 225 }
    }
    return { source: require('../../sprites/warrior/IdleLeft.png'), cols: 10, width: 225 };
  }

  renderHeroSelect = () => {
    return <SpriteSheet
      ref={ref => (this.warrior = ref)}
      source={require('../../sprites/warrior/IdleRight.png')}
      columns={10}
      imageStyle={{ resizeMode: 'contain' }}
      rows={1}
      width={225}
      animations={{
        idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      }}
    />
  }

  render() {
    // const { left, width, top, height } = this.props.renderer.props;
    const data = this.props.renderer && this.getSpriteData();
    const width = this.props.size && this.props.size[0];
    const height = this.props.size && this.props.size[1];
    const x = this.props.body && this.props.body.position.x - width / 2;
    const y = this.props.body && this.props.body.position.y - height / 2;

    return (
      this.props.isHeroSelect ? this.renderHeroSelect() : <Animated.View style={{
        transform: [{ translateX: this.offsetX }],
        left: x,
        top: y,
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
            idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          }}
        />
      </Animated.View >
    );
  }
}

WarriorIdle.propTypes = {
  size: array,
  body: object,
  color: string
}