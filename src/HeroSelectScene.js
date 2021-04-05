import React, { PureComponent } from 'react';
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
import { WarriorIdle } from './heroes/Warrior';
import { MonkIdle } from './heroes/Monk';
import { WizardIdle } from './heroes/Wizard';
import { HuntressIdle } from './heroes/Huntress';

export default class HeroSelectScene extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loop: true,
      resetAfterFinish: false,
      fps: '16',
      hero: 'warrior',
    };
  }

  setHero = (hero) => {
    this.setState({ hero });
    this.props.setHero(hero);
  }

  render() {
    const { fps, loop, resetAfterFinish, hero } = this.state;
    const huntressBg = hero == 'huntress' ? 'red' : null;
    const warriorBg = hero == 'warrior' ? 'blue' : null;
    const monkBg = hero == 'monk' ? 'green' : null;
    const wizardBg = hero == 'wizard' ? 'magenta' : null;
    return (
      <>
        <View style={{ height: 180, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.8)', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <View style={{ width: 150, height: 150, backgroundColor: warriorBg, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => this.setHero('warrior')}>
              <WarriorIdle />
            </TouchableOpacity>
          </View>
          <View style={{ width: 150, height: 150, backgroundColor: monkBg, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => this.setHero('monk')}>
              <MonkIdle />
            </TouchableOpacity>
          </View>
          <View style={{ width: 150, height: 150, backgroundColor: wizardBg, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => this.setHero('wizard')}>
              <WizardIdle />
            </TouchableOpacity>
          </View>
          <View style={{ width: 150, height: 150, backgroundColor: huntressBg, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => this.setHero('huntress')}>
              <HuntressIdle />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.8)', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <View style={{ width: 150, marginBottom: 15, justifyContent: 'space-evenly', alignItems: 'center' }}><Text style={{ color: '#fff' }}>Warrior</Text></View>
          <View style={{ width: 150, marginBottom: 15, justifyContent: 'space-evenly', alignItems: 'center' }}><Text style={{ color: '#fff' }}>Monk</Text></View>
          <View style={{ width: 150, marginBottom: 15, justifyContent: 'space-evenly', alignItems: 'center' }}><Text style={{ color: '#fff' }}>Wizard</Text></View>
          <View style={{ width: 150, marginBottom: 15, justifyContent: 'space-evenly', alignItems: 'center' }}><Text style={{ color: '#fff' }}>Huntress</Text></View>
        </View>
      </>
    );
  }
}
