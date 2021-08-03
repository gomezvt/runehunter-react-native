import React, { Component } from "react";
import { View, Animated, Dimensions} from "react-native";
import { array, object, string } from 'prop-types';
import SpriteSheet from 'rn-sprite-sheet';
import { EventRegister } from 'react-native-event-listeners'
const { height } = Dimensions.get('window')
const { width } = Dimensions.get('window')
export default class WarriorIdle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loop: true,
      resetAfterFinish: false,
      fps: '16',
      direction: 'right',
    };
    const value = props && props.renderer ? props.renderer.props.offsetX : 0;
    this.offsetY = props && props.renderer && props.renderer.props ? props.renderer.props.offsetY : 0;
    this.offsetX = new Animated.Value(value);
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
        onFinish: () => { }
      });
    }
  };

  // componentWillUnmount() {
  //   EventRegister.removeEventListener(this.listener)
  // }

  stop = () => {
    this.warrior.stop(() => { });
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
    // const width = this.props.size && this.props.size[0];
    // const height = this.props.size && this.props.size[1];
    const x = this.offsetX.__getValue();
    // const y = this.props.body && this.props.body.position.y - height / 2;
    const y = this.offsetY


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