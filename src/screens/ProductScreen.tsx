import React, {useContext, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Producto} from '../interfaces/appInterfaces';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import {TouchableOpacity} from 'react-native';
import {ProductStackParams} from '../navigation/ProductsNavigator';
import {ProductContext} from '../context/ProductContext';
import {useEffect} from 'react';
import {useProductData} from '../hooks/useProductData';
import {ModalContext} from '../context/ModalContext';
import {AuthContext} from '../context/AuthContext';

interface Props extends StackScreenProps<ProductStackParams, 'ProductScreen'> {}
export const ProductScreen = ({navigation, route}: Props) => {
  const product = route.params as Producto;
  const {hideModal} = useContext(ModalContext);
  const {producto} = useProductData(product);
  const {user} = useContext(AuthContext);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />
      <ImageBackground
        style={styles.headerImage}
        source={
          producto.img ? {uri: producto.img} : require('../assets/noImage.png')
        }>
        <View style={styles.header}>
          <Icon
            name="chevron-back-outline"
            size={50}
            color={Colors.primary}
            onPress={navigation.goBack}
          />
          <Icon name="checkbox-outline" size={40} color={Colors.primary} />
        </View>
      </ImageBackground>
      <View>
        {user?.uid === producto.usuario._id && (
          <View style={styles.iconContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                //Para no cambiar en login ni register cambio modal en falso desde aqui
                hideModal();
                navigation.navigate('AddingProductScreen', {
                  id: producto._id,
                  name: producto.nombre,
                  img: producto.img,
                  precio: producto.precio,
                  description: producto.descripcion,
                });
              }}>
              <Icon name="pencil-outline" color="white" size={30} />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{producto.nombre}</Text>
          <Text style={styles.categoryName}>{producto.categoria.nombre}</Text>

          {/* User and availability */}
          <View style={styles.userAvailavilityContainer}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.publish}>Publicado por:</Text>
              <Text style={styles.user}> {producto.usuario.nombre}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon name="checkbox-outline" size={18} color={Colors.primary} />
              <Text style={styles.user}> Disponible</Text>
            </View>
          </View>
          {/* Details Producto */}
          <View style={styles.detailsProduct}>
            <Text style={styles.detailsText}>{producto.descripcion}</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>Precio por Producto</Text>
          <View style={styles.priceTag}>
            <Text style={styles.price}>${producto.precio}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
          <Text style={styles.btnText}>Ordenar Producto</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  headerImage: {
    height: 400,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    overflow: 'hidden',
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    justifyContent: 'space-between',
  },
  iconContainer: {
    position: 'absolute',
    height: 60,
    width: 60,
    backgroundColor: Colors.primary,
    top: -35,
    right: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.secondaryDark,
    marginTop: 5,
  },
  userAvailavilityContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  publish: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  user: {
    fontSize: 15,
  },
  detailsProduct: {
    marginTop: 20,
  },
  detailsText: {
    lineHeight: 20,
    color: Colors.secondaryLigth,
  },
  priceContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    alignItems: 'center',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceTag: {
    height: 40,
    alignItems: 'center',
    marginLeft: 30,
    paddingLeft: 30,
    flex: 1,
    backgroundColor: Colors.primaryLigth,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  btn: {
    marginTop: 40,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
