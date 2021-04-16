import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  gameContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'grey'
  },
  menubutton: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inGameButton: {
    height: 40,
    width: 40,
  },
  startbutton: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  worldButton: {
    height: 150,
    width: 75,
  },
  bg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 46,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
  },
});
