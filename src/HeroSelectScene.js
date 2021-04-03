import React, { Component } from 'react';
import { styles } from '../styles';
import {
  Platform,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Button,
  Animated,
  Easing,
  LogBox,
} from 'react-native';
import sample from 'lodash.sample';

const { height } = Dimensions.get('window')
const { width } = Dimensions.get('window')

import SpriteSheet from 'rn-sprite-sheet';

export default class HeroSelectScene extends Component {
  constructor() {
    super();
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

    this.wizard.play({
      type,
      fps: Number(fps),
      loop: loop,
      resetAfterFinish: resetAfterFinish,
      onFinish: () => console.log('hi')
    });

    this.huntress.play({
      type,
      fps: Number(fps),
      loop: loop,
      resetAfterFinish: resetAfterFinish,
      onFinish: () => console.log('hi')
    });

    this.martial.play({
      type,
      fps: Number(fps),
      loop: loop,
      resetAfterFinish: resetAfterFinish,
      onFinish: () => console.log('hi')
    });

    this.warrior.play({
      type,
      fps: Number(fps),
      loop: loop,
      resetAfterFinish: resetAfterFinish,
      onFinish: () => console.log('hi')
    });
  };

  stop = () => {
    this.wizard.stop(() => console.log('stopped'));
    this.huntress.stop(() => console.log('stopped'));
    this.martial.stop(() => console.log('stopped'));
    this.warrior.stop(() => console.log('stopped'));
  };

  render() {
    const { fps, loop, resetAfterFinish, hero } = this.state;
    const huntressBg = hero == 'huntress' ? 'red' : null;
    const warriorBg = hero == 'warrior' ? 'blue' : null;
    const martialBg = hero == 'martial' ? 'green' : null;
    const wizardBg = hero == 'wizard' ? 'magenta' : null;
    return (
      <View style={{ height: 150, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.8)', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
        <View style={{width: 200, height: 200, backgroundColor: warriorBg, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => this.setState({ hero: 'warrior' })}>
            <SpriteSheet
              ref={ref => (this.warrior = ref)}
              source={require('../sprites/warrior/Idle.png')}
              columns={10}
              rows={1}
              width={175}
              animations={{
                idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{width: 200, height: 200, backgroundColor: martialBg, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => this.setState({ hero: 'martial' })}>
            <SpriteSheet
              ref={ref => (this.martial = ref)}
              source={require('../sprites/martial/Idle.png')}
              columns={4}
              rows={1}
              animations={{
                idle: [0, 1, 2, 3],
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{width: 200, height: 200, backgroundColor: wizardBg, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => this.setState({ hero: 'wizard' })}>
            <SpriteSheet
              ref={ref => (this.wizard = ref)}
              source={require('../sprites/wizard/Idle.png')}
              columns={8}
              rows={1}
              animations={{
                idle: [0, 1, 2, 3, 4, 5, 6, 7],
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{width: 200, height: 200, backgroundColor: huntressBg, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => this.setState({ hero: 'huntress' })}>
            <SpriteSheet
              ref={ref => (this.huntress = ref)}
              source={require('../sprites/huntress/Idle.png')}
              columns={10}
              rows={1}
              width={125}
              animations={{
                idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
