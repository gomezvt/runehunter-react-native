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
import martial from '../sprites/martial/martial'
import sample from 'lodash.sample';
import Sprite from 'rn-sprite'

const { height } = Dimensions.get('window')
const { width } = Dimensions.get('window')


export default class HeroSelectScene extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  showAnimation = () => {
    return (
      <Sprite
      sequence={[0.04, 0.125, 0.20815, 0.2913, 0.37445, 0.4576, 0.54075, 0.6239, 0.70705, 0.7902, 0.87335, 0.9565, 0.04]}
      move={'vertical'}
      loop
      fps={10}
      isPlaying={false}
      source={'https://github.com/adhbh/rn-sprite/raw/master/vertical.jpg'}
      width={width / 2}
      height={height / 2}
      onTouchStart={() => true}
      onTouchMove={() => true}
      onTouchEnd={() => true} />
    );
  }

  render() {
    const startButton = require('../img/start.png');
    return (
      <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-evenly' }}>
        {/* <Button title="press" onPress={() => this.showAnimation()} /> */}
        <Sprite
      sequence={[0.04, 0.125, 0.20815, 0.2913, 0.37445, 0.4576, 0.54075, 0.6239, 0.70705, 0.7902, 0.87335, 0.9565, 0.04]}
      move={'vertical'}
      loop
      fps={10}
      isPlaying={false}
      source={'https://github.com/adhbh/rn-sprite/raw/master/vertical.jpg'}
      width={width / 2}
      height={height / 2}
      onTouchStart={() => true}
      onTouchMove={() => true}
      onTouchEnd={() => true} />
      </View>
    );
  }
}
