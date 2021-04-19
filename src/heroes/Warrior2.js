// import React, { PureComponent } from "react";
// import { StyleSheet, View, Dimensions } from "react-native";
// import SpriteSheet from 'rn-sprite-sheet';
// import { EventRegister } from 'react-native-event-listeners'

// const { height } = Dimensions.get('window')
// const { width } = Dimensions.get('window')

// export class Warrior extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       // loop: true,
//       // fps: 16,
//       // resetAfterFinish: false,
//       x: -width / 3,
//       y: height / 3,
//       // type: 'idle',
//     };
//     this.type = 'idle';
//   }

//   componentDidMount() {
//     this.play('idle');
//     this.listener = EventRegister.addEventListener('type', (data) => {
//       // this.setState({ 'type': data });
//       this.play(data);
//     })
//   }

//   // componentDidUpdate(prevProps) {
//   //   if (prevProps.type !== this.props.type) {

//   //   }
//   // }

//   componentWillUnmount() {
//     EventRegister.removeEventListener(this.listener)
//   }

//   play = type => {
//     const data = this.getSpriteData(type);
//     if (this.warrior && data) {
//       // this.warrior = <SpriteSheet
//       //   ref={ref => (this.warrior = ref)}
//       //   source={data.source}
//       //   columns={data.cols}
//       //   rows={1}
//       //   width={data.width}
//       //   imageStyle={{ resizeMode: 'contain' }}
//       //   animations={{
//       //     idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//       //     attack: [0, 1, 2, 3],
//       //   }}
//       // />
//       this.warrior.props.source = data.source;
//       this.warrior.props.columns = data.cols;
//       this.warrior.props.width = data.width;
//     }

//     if (this.warrior) {
//     this.warrior.play({
//       type,
//       fps: Number(16),
//       loop: true,
//       resetAfterFinish: false,
//       // source: data.source,
//       // columns: data.cols,
//       // width: data.width,
//       onFinish: () => console.log('finished')
//     });
//     }
//   };

//   stop = () => {
//     this.warrior.stop(() => console.log('stopped'));
//   };

//   getSpriteData = (type) => {
//     const t = type || this.type;
//     switch (t) {
//       case 'idle':
//         return { source: require('../../sprites/warrior/Idle.png'), cols: 10, width: 250 }
//       case 'attack':
//         return { source: require('../../sprites/warrior/Attack1.png'), cols: 4, width: 250 }
//       default:
//         break;
//     }
//   }

//   render() {
//     const data = this.getSpriteData();
//     return (
//       <SpriteSheet
//         ref={ref => (this.warrior = ref)}
//         source={data.source}
//         columns={data.cols}
//         rows={1}
//         width={data.width}
//         imageStyle={{ resizeMode: 'contain' }}
//         animations={{
//           idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//           attack: [0, 1, 2, 3],
//         }}
//       />
//     );
//   }
// }


import React, { PureComponent, Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import SpriteSheet from 'rn-sprite-sheet';
import { array, object, string } from 'prop-types';



export class WarriorIdle extends Component {
  constructor(props) {
    super(props);
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

  render() {
    // const width = this.props.size[0];
    // const height = this.props.size[1];
    // const x = this.props.body.position.x - width / 2;
    // const y = this.props.body.position.y - height / 2;

    const idleright = require('../../sprites/warrior/IdleRight.png');
    const idleleft = require('../../sprites/warrior/IdleLeft.png');
    const source = this.props.direction == "idleleft" ? idleleft : idleright;
    return (
      <SpriteSheet
        ref={ref => (this.warrior = ref)}
        source={require('../../sprites/warrior/IdleRight.png')}
        columns={10}
        rows={1}
        viewStyle={{ position: 'relative' }}
        imageStyle={{ backgroundColor: 'red' }}
        style={{ position: 'relative' }}
        width={225}
        animations={{
          idle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        }}
      />
    );
  }
}

// WarriorIdle.propTypes = {
//   size: array,
//   body: object,
//   color: string
// }

// export class WarriorAttack extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loop: false,
//       resetAfterFinish: true,
//       fps: '16',
//       hero: 'warrior',
//     };
//   }

//   componentDidMount() {
//     this.play('attack');
//   }

//   play = type => {
//     const { fps, loop, resetAfterFinish } = this.state;

//     if (this.warrior) {
//       this.warrior.play({
//         type,
//         fps: Number(fps),
//         loop: loop,
//         resetAfterFinish: resetAfterFinish,
//         onFinish: () => console.log('hi')
//       });
//     }
//   };

//   stop = () => {
//     this.warrior.stop(() => console.log('stopped'));
//   };

//   render() {
//     const { x, y } = this.state;
//     const attackright = require('../../sprites/warrior/AttackRight.png');
//     const attackleft = require('../../sprites/warrior/AttackLeft.png');
//     const source = this.props.direction == "attackright" ? attackright : attackleft;
//     return (
//       // <View style={{ left: x, top: y }}>
//       <SpriteSheet
//         ref={ref => (this.warrior = ref)}
//         source={source}
//         columns={4}
//         rows={1}
//         width={225}
//         animations={{
//           attack: [0, 1, 2, 3],
//         }}
//       />
//       // </View>
//     );
//   }
// }

// export class WarriorRun extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loop: true,
//       resetAfterFinish: true,
//       fps: '16',
//       hero: 'warrior',
//     };
//   }

//   componentDidMount() {
//     this.play('run');
//   }

//   play = type => {
//     const { fps, loop, resetAfterFinish } = this.state;

//     if (this.warrior) {
//       this.warrior.play({
//         type,
//         fps: Number(fps),
//         loop: loop,
//         resetAfterFinish: resetAfterFinish,
//         onFinish: () => console.log('hi')
//       });
//     }
//   };

//   stop = () => {
//     this.warrior.stop(() => console.log('stopped'));
//   };

//   render() {
//     const { x, y } = this.state;
//     const right = require('../../sprites/warrior/RunRight.png');
//     const left = require('../../sprites/warrior/RunLeft.png');
//     const dir = this.props.direction == 'runright' ? right : left;
//     return (
//       // <View style={{ left: x, top: y }}>
//       <SpriteSheet
//         ref={ref => (this.warrior = ref)}
//         source={dir}
//         columns={6}
//         rows={1}
//         width={225}
//         animations={{
//           run: [0, 1, 2, 3, 4, 5],
//         }}
//       />
//       // </View>
//     );
//   }
// }