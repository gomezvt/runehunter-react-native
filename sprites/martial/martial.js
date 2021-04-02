const martial = {
  name:"martial",
  size: {width: 100, height: 100},
  animationTypes: ['ATTACK', 'ATTACK2', 'DIE', 'FALL', 'IDLE', 'JUMP', 'RUN', 'TAKEHIT'],
  frames: [
    require('./Attack1.png'),
    require('./Attack2.png'),
    require('./Death.png'),
    require('./Fall.png'),
    require('./Idle.png'),
    require('./Jump.png'),
    require('./Run.png'),
    require('./Take hit.png')
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'ATTACK':
        return [0,1,2,3];
      case 'ATTACK2':
        return [0];
      case 'DIE':
        return [0];
      case 'FALL':
        return [0];
      case 'IDLE':
        return [0];
      case 'JUMP':
        return [0];
      case 'RUN':
        return [0];
      case 'TAKEHIT':
        return [0];
    }
  },
};

export default martial;