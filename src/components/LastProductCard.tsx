import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Producto} from '../interfaces/appInterfaces';

interface Props {
  product: Producto;
}

export const LastProductCard = ({product}: Props) => {
  return (
    <View style={styles.card}>
      <Text>LastProductCard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 120,
    width: 120,
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 15,
  },
});
