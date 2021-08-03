import React, { Component } from "react";
import { View, Animated, Dimensions, Easing } from "react-native";
import { array, object, string } from 'prop-types';
import SpriteSheet from 'rn-sprite-sheet';
import { EventRegister } from 'react-native-event-listeners'
const { height } = Dimensions.get('window')
const { width } = Dimensions.get('window')
export default class WarriorJump extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loop: false,
      resetAfterFinish: false,
      fps: '16',
      direction: 'right',
    };

    const valueY = props && props.renderer && props.renderer.props ? props.renderer.props.offsetY : 0;
    this.offsetY = new Animated.Value(valueY);

    const valueX = props && props.renderer && props.renderer.props ? props.renderer.props.offsetX : 0;
    this.offsetX = new Animated.Value(valueX);
  }

  componentDidMount() {
    this.play('jump');
    Animated.spring(
      this.offsetY,
      {
        toValue: this.offsetY.__getValue() - 75,
        useNativeDriver: true,
      },
    )
    this.offsetY = new Animated.Value(this.offsetY.__getValue() - 75);
  }

  play = type => {
    const { fps, loop, resetAfterFinish } = this.state;
    if (this.warrior) {
      this.warrior.play({
        type,
        fps: Number(fps),
        loop: loop,
        resetAfterFinish: resetAfterFinish,
        onFinish: () => { }
      });
    }
  };

  stop = () => {
    this.warrior.stop(() => { });
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
    const x = this.offsetX.__getValue();
    const y = this.offsetY.__getValue();
    return (
      <Animated.View style={{
        transform: [{ translateY: this.offsetY }, { translateX: this.offsetX }, { perspective: 1000 }],
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