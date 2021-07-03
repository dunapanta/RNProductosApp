import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import Colors from '../constants/Colors';

import {Producto} from '../interfaces/appInterfaces';

interface Props {
  product: Producto;
}

export const LastProductCard = ({product}: Props) => {
  return (
    <View style={styles.card}>
      {product.img ? (
        <Image source={{uri: product.img}} style={styles.image} />
      ) : (
        <Image source={require('../assets/noImage.png')} style={styles.image} />
      )}
      <View style={styles.textContainer}>
        {product.nombre.length < 16 ? (
          <Text style={styles.text}>{product.nombre}</Text>
        ) : (
          <Text style={styles.text}>{product.nombre.substr(0, 15) + '..'}</Text>
        )}

        {/* Categoria */}
        {product.categoria.nombre.length < 18 ? (
          <Text style={styles.smallText}>{product.categoria.nombre}</Text>
        ) : (
          <Text style={styles.smallText}>
            {product.categoria.nombre.substr(0, 20) + '..'}
          </Text>
        )}
      </View>
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
  image: {
    height: 80,
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  textContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.secondaryDark,
  },
  smallText: {
    fontSize: 8,
    paddingTop: 2,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
});
