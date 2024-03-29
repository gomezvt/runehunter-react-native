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
} from 'react-native';
export default class MenuScene extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const infoButton = require('../img/info.png');
    const settingsButton = require('../img/settings.png');
    const fbButton = require('../img/fb.png');

    return (
      <>
        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', height: 70, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <TouchableOpacity
            style={styles.menubutton}
            onPress={() => {}}>
            <Image source={infoButton} style={styles.menubutton} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menubutton}
            onPress={() => {}}>
            <Image source={settingsButton} style={styles.menubutton} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menubutton}
            onPress={() => {}}>
            <Image source={fbButton} style={styles.menubutton} />
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
