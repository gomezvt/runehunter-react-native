import React, { Component } from "react";
import { View } from "react-native";
import { array, object, string } from 'prop-types';

export default class LeftWall extends Component {
  render() {
    const width = 50;
    const height = 100
    const x = 0;
    const y = this.props.body.position.y - height / 2;

    return (
      <View
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: width,
          height: height,
          backgroundColor: this.props.color || "pink"
        }} />
    );
  }
}

LeftWall.propTypes = {
  size: array,
  body: object,
  color: string
}