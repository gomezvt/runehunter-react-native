import React, {Component} from 'react';
import {styles} from '../styles';
import {ImageBackground, TouchableOpacity, Image} from 'react-native';

export default class GameScene extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // TODO: Change path to GameScene bg after it's decided
    // render controls component here at bottom left corner of screen
    // render pause button at top right corner to go back to menu etc.
    const background = require('../img/menu.png');
    const startButton = require('../img/start.png');
    return (
      <>
        <ImageBackground source={background} style={styles.bg} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.setStartState(false)}>
          <Image source={startButton} style={styles.button} />
        </TouchableOpacity>
      </>
    );
  }
}
