import React, { Component } from "react";
import { View } from "react-native";
import { array, object, string } from 'prop-types';
import SpriteSheet from 'rn-sprite-sheet';
import { EventRegister } from 'react-native-event-listeners'

export default class Warrior extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loop: true,
      resetAfterFinish: false,
      fps: '16',
      type: 'idle',
      direction: 'right',
    };
    this.listener = EventRegister.addEventListener('type', (data) => {
      this.setState({
        'type': data,
      })
    })
  }

  componentDidMount() {
    this.play(this.state.type);
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

  // componentDidUpdate(prevProps) {
  //   const incomingType = this.props.renderer.props.type;
  //   if (this.state.type !== incomingType) {
  //     if (incomingType === 'attack') {
  //       this.setState({
  //         type: incomingType,
  //         direction: 'right',
  //         loop: false
  //       }, () => setTimeout(() => {
  //         this.setState({
  //           type: 'idle',
  //           direction: 'right',
  //           loop: true
  //         })
  //       }, 1000));
  //     }
  //   }
  // }

  getSpriteData = () => {
    const { type, direction } = this.props;
    const t = type || this.state.type;
    const d = direction || this.state.direction;
    switch (t) {
      case 'idle':
        if (d == 'right') {
          return { source: require('../../sprites/warrior/IdleRight.png'), cols: 10, width: 225 }
        }
        return { source: require('../../sprites/warrior/IdleLeft.png'), cols: 10, width: 225 };
      case 'attack':
        if (d == 'right') {
          return { source: require('../../sprites/warrior/AttackRight.png'), cols: 4, width: 250 }
        }
        return { source: require('../../sprites/warrior/AttackLeft.png'), cols: 4, width: 250 }
      default:
        break;
    }
  }

  renderHeroSelect = () => {
    return <SpriteSheet
      ref={ref => (this.warrior = ref)}
      source={require('../../sprites/warrior/IdleRight.png')}
      columns={10}
      rows={1}
      width={225}
      animations={{
        idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      }}
    />
  }

  renderHero = () => {
    const data = this.getSpriteData();
    const width = this.props.size && this.props.size[0];
    const height = this.props.size && this.props.size[1];
    const x = this.props.body && this.props.body.position.x - width / 2;
    const y = this.props.body && this.props.body.position.y - height / 2;

    return <View
      style={{
        left: x,
        top: y,
        width: width,
        height: height,
      }}>
      <SpriteSheet
        ref={ref => (this.warrior = ref)}
        source={data.source}
        columns={data.cols}
        imageStyle={{resizeMode: 'contain'}}
        rows={1}
        width={data.width}
        animations={{
          idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          attack: [0, 1, 2, 3],
        }}
      />
    </View>
  }

  render() {
    return (
      this.props.isHeroSelect ? this.renderHeroSelect() : this.renderHero()
    );
  }
}

Warrior.propTypes = {
  size: array,
  body: object,
  color: string
}