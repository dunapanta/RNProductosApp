import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import Colors from '../constants/Colors';

export const Background = () => {
  const {width, height} = useWindowDimensions();
  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: Colors.primary,
        top: -width,
        width: width * 2,
        height: height * 1.7,
        transform: [{rotate: '-70deg'}],
      }}
    />
  );
};
