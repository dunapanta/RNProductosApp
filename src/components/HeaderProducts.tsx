import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {useContext} from 'react';
import {ModalContext} from '../context/ModalContext';

export const HeaderProducts = () => {
  const {navigate} = useNavigation();
  const {hideModal} = useContext(ModalContext);
  return (
    <View style={styles.header}>
      <View style={styles.textCointainer}>
        <Text style={styles.headerText}>Tus Productos</Text>
        <View style={styles.row}>
          <Text style={styles.headerText}>en </Text>
          <Text style={{...styles.headerText, color: Colors.primary}}>
            Quito
          </Text>
        </View>
      </View>
      {/* Buttons */}
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{marginTop: 10, marginRight: 5}}
          activeOpacity={0.7}
          onPress={() => {
            //Para no cambiar en login ni register cambio modal en falso desde aqui
            hideModal();
            navigate('AddingProductScreen', {});
          }}>
          <Icon name="add-outline" size={46} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop: 10}}
          activeOpacity={0.7}
          onPress={() => {
            navigate('ProtectedScreen');
          }}>
          <Icon name="person-outline" size={40} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  textCointainer: {
    paddingBottom: 6,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.secondaryDark,
  },
  row: {
    flexDirection: 'row',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
