import React, { Component } from "react";
import { View, Animated, Dimensions } from "react-native";
import { array, object, string } from 'prop-types';
import SpriteSheet from 'rn-sprite-sheet';
import { EventRegister } from 'react-native-event-listeners'
const { width } = Dimensions.get('window')

export default class WarriorJump extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loop: true,
      resetAfterFinish: false,
      fps: '16',
      direction: 'right',
    };
    const value = props && props.renderer ? props.renderer.props.offsetX : 0;
    this.offsetX = new Animated.Value(value);
    this.offsetY = new Animated.Value(0);
  }

  componentDidMount() {
    this.play('jump');
    this.listener = EventRegister.addEventListener('direction', (value) => {
      // TODO: figure out correct way to SMOOTHLY animate jump
    })
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener)
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
      return { source: require('../../sprites/warrior/JumpRight.png'), cols: 2, width: 225 }
    }
    return { source: require('../../sprites/warrior/JumpLeft.png'), cols: 2, width: 225 }
  }

  renderHero = () => {
    const data = this.getSpriteData();
    return (
      <SpriteSheet
        ref={ref => (this.warrior = ref)}
        source={data.source}
        columns={data.cols}
        imageStyle={{ resizeMode: 'contain' }}
        rows={1}
        width={data.width}
        animations={{
          jump: [0, 1]
        }}
      />
    )
  }

  render() {
    // const { left, width, top, height } = this.props.renderer.props;
    const width = this.props.size && this.props.size[0];
    const height = this.props.size && this.props.size[1];
    const x = this.offsetX.__getValue();
    const y = this.offsetY.__getValue(); //this.props.body && this.props.body.position.y - height / 2;
    return (
      <Animated.View style={{
        transform: [{ translateX: this.offsetX }, { translateY: this.offsetY }, { perspective: 1000 }],
        left: x,
        top: y,
        width: width,
        height: height,
      }}>
        {this.renderHero()}
      </Animated.View>
    );
  }
}

WarriorJump.propTypes = {
  size: array,
  body: object,
  color: string
}