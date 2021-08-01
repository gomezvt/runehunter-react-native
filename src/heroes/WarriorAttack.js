import React, { Component } from "react";
import { View, Animated, Dimensions} from "react-native";
import { array, object, string } from 'prop-types';
import SpriteSheet from 'rn-sprite-sheet';
const { height } = Dimensions.get('window')
const { width } = Dimensions.get('window')
export default class WarriorAttack extends Component {

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
    this.play('attack');
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
      return { source: require('../../sprites/warrior/AttackRight.png'), cols: 4, width: 225 }
    }
    return { source: require('../../sprites/warrior/AttackLeft.png'), cols: 4, width: 225 }
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
        attack: [0, 1, 2, 3],
      }}
    />
  }

  render() {
    // const { left, width, top, height } = this.props.renderer.props;

    const x = this.offsetX.__getValue();
    // const y = this.props.body && this.props.body.position.y - height / 2;
    const y = this.offsetY
    return (
      <Animated.View style={{
        transform: [{ translateX: this.offsetX }, { perspective: 1000 }],
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

WarriorAttack.propTypes = {
  size: array,
  body: object,
  color: string
}