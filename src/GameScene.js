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
} from 'react-native';
export default class LevelScene extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Text style={styles.title}>Game Scene</Text>
      </>
    );
  }
}
