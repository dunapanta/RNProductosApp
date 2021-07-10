import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Colors';
import {Producto} from '../interfaces/appInterfaces';

interface Props {
  product: Producto;
  index: number;
  scrollX: Animated.Value;
  activeCardIndex: number;
}

export const CardProduct = ({
  product,
  index,
  scrollX,
  activeCardIndex,
}: Props) => {
  const {width, height} = useWindowDimensions();
  const {navigate} = useNavigation();
  // animate prev to current and next card
  const inputRange = [
    (index - 1) * (width / 1.9),
    index * (width / 1.9),
    (index + 1) * (width / 1.9),
  ];

  // animate opacity
  const opacity = scrollX.interpolate({inputRange, outputRange: [0.7, 0, 0.7]});

  //scale
  const scale = scrollX.interpolate({inputRange, outputRange: [0.8, 1, 0.8]});

  return (
    <TouchableOpacity
      disabled={activeCardIndex !== index}
      activeOpacity={1}
      onPress={() => navigate('ProductScreen', product)}>
      <Animated.View
        style={{
          ...styles.card,
          width: width / 1.9,
          height: height / 2.8,
          transform: [{scale}],
        }}>
        <Animated.View
          style={{
            ...styles.cardOverlay,
            width: width / 1.9,
            height: height / 2.8,
            opacity,
          }}
        />
        <View
          style={{...styles.priceTag, height: height / 16, width: width / 5}}>
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
        <View style={{...styles.cardDetails, height: height / 8}}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.productName} numberOfLines={1}>
                {product.nombre.length <= 13
                  ? product.nombre
                  : product.nombre.slice(0, 12) + '...'}
              </Text>
              <Text
                style={{...styles.categoryName, marginTop: height / 200}}
                numberOfLines={1}>
                {product.categoria.nombre.length <= 20
                  ? product.categoria.nombre
                  : product.categoria.nombre.slice(0, 19) + '...'}
              </Text>
            </View>
            <Icon name="star-outline" size={26} color={Colors.primary} />
          </View>
          <View style={{flexDirection: 'row', marginTop: height / 200}}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 'bold',
                color: Colors.secondaryDark,
              }}>
              Publicado por:{' '}
            </Text>
            <Text
              style={{fontSize: 13, color: Colors.secondaryDark}}
              numberOfLines={1}>
              {product.usuario.nombre.length < 11
                ? product.usuario.nombre
                : product.usuario.nombre.slice(0, 10) + '...'}
            </Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
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
    padding: 14,
    width: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productName: {
    color: Colors.secondaryDark,
    fontWeight: 'bold',
    fontSize: 16,
  },
  categoryName: {
    color: Colors.secondary,
    fontSize: 11,
  },
  cardOverlay: {
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 1000,
    borderRadius: 15,
  },
});
