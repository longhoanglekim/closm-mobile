import {StyleSheet} from 'react-native';


const globalStyle = StyleSheet.create({
  messageIcon: {
    padding : 12,
    borderRadius: 20,
    backgroundColor: 'lightblue',
  },
  messageNumberContainer: {
    backgroundColor: '#F35BAC',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 10,
    height: 10,
    borderRadius: 10,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  messageNumber: {
    color: '#FFFFFF',
    fontSize: 6,
  },
});

export default globalStyle;