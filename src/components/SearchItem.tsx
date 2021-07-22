import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Colors';
import {SearchResult} from '../interfaces/appInterfaces';

interface Props {
  product: SearchResult;
}

const {width, height} = Dimensions.get('window');

export const SearchItem = ({product}: Props) => {
  const {navigate} = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigate('ProductScreen', product)}>
      <View style={{...styles.card, width: width / 2.185}}>
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
            style={{...styles.cardImg, height: height / 3.5}}
          />
        ) : (
          <Image
            source={require('../assets/noImage.png')}
            style={{...styles.cardImg, height: height / 3.5}}
          />
        )}
        <View style={{...styles.cardDetails, height: height / 10}}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.productName} numberOfLines={1}>
                {product.nombre.length <= 12
                  ? product.nombre
                  : product.nombre.slice(0, 11) + '..'}
              </Text>
              <Text
                style={{...styles.categoryName, marginTop: height / 200}}
                numberOfLines={1}>
                {product.categoria.nombre.length <= 20
                  ? product.categoria.nombre
                  : product.categoria.nombre.slice(0, 19) + '..'}
              </Text>
            </View>
            <Icon name="star-outline" size={20} color={Colors.primary} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,

    marginRight: 10,
    marginTop: 14,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  cardImg: {
    width: '100%',
    borderRadius: 15,
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
    fontSize: 14,
  },
  categoryName: {
    color: Colors.secondary,
    fontSize: 10,
  },
  cardOverlay: {
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 1000,
    borderRadius: 15,
  },
});
