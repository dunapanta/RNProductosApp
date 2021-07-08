import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ProductStackParams} from '../navigation/ProductsNavigator';
import Colors from '../constants/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {Image} from 'react-native';

interface Props
  extends StackScreenProps<ProductStackParams, 'AddingProductScreen'> {}

export const AddingProductScreen = ({route, navigation}: Props) => {
  const {top} = useSafeAreaInsets();
  const product = route.params;
  return (
    <View style={{...styles.container, top: top}}>
      <Text style={styles.productText}>
        {product.name ? product.name : 'Nuevo Producto'}
      </Text>
      <ScrollView>
        <Text style={styles.label}>Nombre del producto:</Text>
        <View style={styles.searchInput}>
          <TextInput placeholder="Nombre Producto" style={styles.textInput} />
        </View>

        <Text style={styles.label}>Categoría:</Text>
        <Text style={styles.label}>Imagen Producto:</Text>

        {/*  Preview Image */}
        <View style={styles.previewImage}>
          <Image
            style={{height: '100%', width: '100%'}}
            source={
              product.img
                ? {uri: product.img}
                : require('../assets/noImage.png')
            }
          />
        </View>

        {/* Image upload Buttons */}
        <View style={styles.imgButtons}>
          <TouchableOpacity style={styles.uploadButtons} activeOpacity={0.8}>
            <Icon
              size={22}
              style={{marginRight: 10}}
              color="white"
              name="image-outline"
            />
            <Text style={styles.btnText}>Galería</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadButtons} activeOpacity={0.8}>
            <Icon
              size={22}
              style={{marginRight: 10}}
              color="white"
              name="camera-outline"
            />
            <Text style={styles.btnText}>Cámara</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
          <Text style={styles.btnText}>
            {product.id ? 'Actualizar Producto' : 'Crear Producto'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    marginHorizontal: 30,
  },
  productText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Colors.primary,
  },
  label: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: 'bold',
  },

  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginTop: 15,
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
    borderRadius: 30,
  },
  textInput: {
    fontSize: 17,
    paddingLeft: 12,
    color: Colors.secondaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  previewImage: {
    marginTop: 20,
    height: 200,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 20,
    overflow: 'hidden',
  },
  imgButtons: {
    flexDirection: 'row',
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

  uploadButtons: {
    flexDirection: 'row',
    marginTop: 20,
    height: 45,
    minWidth: 110,
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
