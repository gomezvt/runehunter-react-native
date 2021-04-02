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


export default class HeroSelectScene extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const startButton = require('../img/start.png');
    return (
      <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-evenly' }}>
        {/* <Button title="press" onPress={() => this.showAnimation()} /> */}
      </View>
    );
  }
}
