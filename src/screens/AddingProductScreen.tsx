import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ProductStackParams} from '../navigation/ProductsNavigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import {Picker} from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import Colors from '../constants/Colors';
import {useCategories} from '../hooks/useCategories';
import {useForm} from '../hooks/useForm';
import {ProductContext} from '../context/ProductContext';
import {SuccessModalContent} from '../components/SuccessModalContent';
import {ModalContext} from '../context/ModalContext';
import {ErrorModalContent} from '../components/ErrorModalContent';

interface Props
  extends StackScreenProps<ProductStackParams, 'AddingProductScreen'> {}

export const AddingProductScreen = ({route, navigation}: Props) => {
  const {top} = useSafeAreaInsets();
  const product = route.params;

  /* Context para obtener info del producto */
  const {loadProductById, addProduct, updateProduct} =
    useContext(ProductContext);

  const {isLoading, categories} = useCategories();
  const {visible, openModal} = useContext(ModalContext);

  const {
    id,
    categoriaId,
    nombre,
    img,
    precio,
    descripcion,
    form,
    onChange,
    setFormValue,
  } = useForm({
    id: product.id || '',
    categoriaId: '',
    nombre: product.name || '',
    img: product.img || '',
    precio: product.precio || 1,
    descripcion: product.description || '',
  });

  const [validForm, setvalidForm] = useState(false);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    if (id.length === 0) {
      return;
    }
    const product = await loadProductById(id);
    setFormValue({
      id,
      nombre,
      categoriaId: product.categoria._id,
      descripcion,
      img,
      precio,
    });
  };

  const takePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      resp => {
        console.log(resp);
      },
    );
  };

  const saveOrUpdate = () => {
    openModal();

    const validNombre = nombre.trim();
    const validDescription = descripcion.trim();

    if (categories.length === 0) {
      return;
    }
    // Si usuario no movio picker seleciona el id de la primera categoria
    const temCatId = categoriaId || categories[0]._id;

    if (id.length > 0) {
      if (
        validNombre.length > 0 &&
        validDescription.length > 0 &&
        categoriaId !== '' &&
        categoriaId !== undefined
      ) {
        setvalidForm(true);
        updateProduct(
          categoriaId,
          validNombre,
          id,
          Number(precio),
          validDescription,
        );
      }

      return;
    } else {
      if (
        validNombre.length > 0 &&
        validDescription.length > 0 &&
        temCatId !== '' &&
        temCatId !== undefined
      ) {
        setvalidForm(true);
        addProduct(temCatId, validNombre, Number(precio), validDescription);
      }
    }
  };

  return (
    <View style={{...styles.container, top: top}}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{marginRight: 10}}
          activeOpacity={0.7}
          onPress={navigation.goBack}>
          <Icon name="chevron-back-outline" size={42} color={Colors.primary} />
        </TouchableOpacity>

        <Text style={styles.productText}>
          {product.name ? product.name : 'Nuevo Producto'}
        </Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Nombre Producto */}
          <Text style={styles.label}>Nombre del producto:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Nombre Producto"
              style={styles.textInput}
              value={nombre}
              onChangeText={value => onChange(value, 'nombre')}
            />
          </View>

          {/* Picker Categorias */}
          <Text style={styles.label}>Categoría del Producto:</Text>
          {isLoading ? (
            <ActivityIndicator size={40} color={Colors.primary} />
          ) : (
            <View style={{flex: 1}}>
              <Picker
                selectedValue={categoriaId}
                //style={{color: Colors.secondaryDark}}
                dropdownIconColor={Colors.secondaryDark}
                onValueChange={itemValue => onChange(itemValue, 'categoriaId')}>
                {categories.map(category => (
                  <Picker.Item
                    key={category._id}
                    label={category.nombre}
                    value={category._id}
                    //style={{color: Colors.secondaryDark}}
                  />
                ))}
              </Picker>
              {/* Toca poner este text porque en android crashea en esta version del picker */}
              <Text
                style={{
                  width: '100%',
                  height: 60,
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                }}>
                {' '}
              </Text>
            </View>
          )}
          <Text style={styles.label}>Imagen del Producto:</Text>

          {/*  Preview Image */}
          <View style={styles.previewImage}>
            <Image
              style={{height: '100%', width: '100%'}}
              source={img ? {uri: img} : require('../assets/noImage.png')}
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
            <TouchableOpacity
              style={styles.uploadButtons}
              activeOpacity={0.8}
              onPress={takePhoto}>
              <Icon
                size={22}
                style={{marginRight: 10}}
                color="white"
                name="camera-outline"
              />
              <Text style={styles.btnText}>Cámara</Text>
            </TouchableOpacity>
          </View>
          {/* Precio */}
          <Text style={styles.label}>Precio del Producto:</Text>
          <View style={{...styles.inputContainer, marginRight: 140}}>
            <TextInput
              placeholder="$"
              keyboardType="decimal-pad"
              style={styles.textInput}
              value={precio.toString()}
              maxLength={5}
              onChangeText={value =>
                onChange(value.replace(/[^0-9]/g, ''), 'precio')
              }
            />
          </View>

          {/* Descripcion */}
          <Text style={styles.label}>Descripción del Producto:</Text>
          <View style={{...styles.inputContainer, height: 200}}>
            <TextInput
              multiline
              numberOfLines={4}
              placeholder="Ingrese la descripción del producto"
              style={styles.textInput}
              value={descripcion}
              onChangeText={value => onChange(value, 'descripcion')}
            />
          </View>

          {/* Modal */}
          {visible &&
            (validForm ? (
              <SuccessModalContent
                titleHead={id.length === 0 ? 'Producto Creado' : 'Actualizado'}
                statusBarColor="rgba(0,0,0,0.5)"
              />
            ) : (
              <ErrorModalContent
                titleHead="Error de Campos"
                errorMessage="Ingrese los datos del producto"
                statusBarColor="rgba(0,0,0,0.5)"
              />
            ))}

          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={saveOrUpdate}>
            <Text style={styles.btnText}>
              {product.id ? 'Actualizar Producto' : 'Crear Producto'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    marginHorizontal: 26,
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

  inputContainer: {
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
    marginBottom: 120,
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
