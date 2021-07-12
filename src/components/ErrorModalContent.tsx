import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image} from 'react-native';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';

import {ModalPopup} from './ModalPopup';

interface Props {
  visible: boolean;
  titleHead?: string;
}

export const ErrorModalContent = ({visible, titleHead}: Props) => {
  return (
    <View style={styles.container}>
      <ModalPopup visible={visible}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={{fontSize: 28}}>Producto</Text>
          </View>
          <Image
            source={require('../assets/error.png')}
            style={{height: 150, width: 150}}
          />
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={() => {}}>
            <Text style={styles.btnText}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </ModalPopup>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    alignItems: 'center',
  },
  header: {},

  btn: {
    marginTop: 20,
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
