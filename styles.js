import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menubutton: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startbutton: {
    height: 80,
    width: 80,
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
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
  },
});
