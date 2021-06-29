import React from 'react';

import {StyleSheet, View, Text, useWindowDimensions, Image} from 'react-native';
import Colors from '../constants/Colors';
import {Producto} from '../interfaces/appInterfaces';

interface Props {
  product: Producto;
  index: number;
}

export const CardProduct = ({product, index}: Props) => {
  const {width, height} = useWindowDimensions();
  return (
    <View style={{...styles.card, width: width / 1.9, height: height / 2.8}}>
      <View style={{...styles.priceTag, height: height / 16, width: width / 5}}>
        <Text
          style={{
            ...styles.priceTagText,
          }}>
          ${product.precio}
        </Text>
      </View>
      {product.img ? (
        <Image
          source={{uri: product.img}}
          style={{...styles.cardImg, height: height / 3.8}}
        />
      ) : (
        <Image
          source={require('../assets/noImage.png')}
          style={{...styles.cardImg, height: height / 3.8}}
        />
      )}
      <View style={{...styles.cardDetails, height: height / 8}}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 15,

    marginRight: 20,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  cardImg: {
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  priceTag: {
    backgroundColor: Colors.primary,
    position: 'absolute',
    zIndex: 999,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceTagText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardDetails: {
    borderRadius: 15,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    paddingLeft: 20,
    width: '100%',
  },
});
