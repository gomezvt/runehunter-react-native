import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  menu_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  game_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 60,
    width: 50,
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
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
    marginTop: 40,
  },
});
