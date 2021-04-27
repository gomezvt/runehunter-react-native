import React, { Component } from "react";
import { View, Animated, Dimensions } from "react-native";
import { array, object, string } from 'prop-types';
import SpriteSheet from 'rn-sprite-sheet';
import { EventRegister } from 'react-native-event-listeners'
const { width } = Dimensions.get('window')

export default class WarriorFall extends Component {

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
    // this.offsetY = new Animated.Value(0);
  }

  componentDidMount() {
    this.play('fall');
    this.listener = EventRegister.addEventListener('direction', (value) => {
      // const offsetX = this.offsetX.__getValue();
      // let runValue = 0;
      // if (value == 'left' && offsetX > -25) {
      //   runValue = offsetX - 15
      // } else if (value == 'left' && offsetX <= -25) {
      //   runValue = offsetX
      // }

      // if (value == 'right' && offsetX < width / 2 - 100) {
      //   runValue = offsetX + 15
      // } else if (value == 'right' && offsetX >= width / 2 - 100) {
      //   runValue = offsetX
      // }

      // Animated.spring(
      //   this.offsetY,
      //   {
      //     toValue: 0,
      //     useNativeDriver: false,
      //   },
      // ).start();
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
      return { source: require('../../sprites/warrior/FallRight.png'), cols: 2, width: 225 }
    }
    return { source: require('../../sprites/warrior/FallLeft.png'), cols: 2, width: 225 }
  }

  renderHero = () => {
    const data = this.getSpriteData();
    return <SpriteSheet
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
  }

  render() {
    // const { left, width, top, height } = this.props.renderer.props;
    const width = this.props.size && this.props.size[0];
    const height = this.props.size && this.props.size[1];
    const x = this.offsetX.__getValue();
    const y = this.props.body && this.props.body.position.y - height / 2;
    // const y = this.offsetY.__getValue(); //this.props.body && this.props.body.position.y - height / 2;
    return (
      <Animated.View style={{
        transform: [{ translateX: this.offsetX }],
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

WarriorFall.propTypes = {
  size: array,
  body: object,
  color: string
}