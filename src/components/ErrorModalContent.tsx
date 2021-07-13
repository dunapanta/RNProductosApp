import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {Image} from 'react-native';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import {ModalContext} from '../context/ModalContext';

import {ModalPopup} from './ModalPopup';

interface Props {
  visible: boolean;
  titleHead?: string;
  errorMessage?: string;
  //hideModal?: () => void;
  removeError: any;
}

export const ErrorModalContent = ({
  visible,
  titleHead,
  errorMessage,
  //hideModal,
  removeError,
}: Props) => {
  const {openModal, hideModal} = useContext(ModalContext);
  return (
    <View style={styles.container}>
      <ModalPopup>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={{fontSize: 28}}>{titleHead}</Text>
          </View>
          <Image
            source={require('../assets/error.png')}
            style={{height: 150, width: 150}}
          />
          <Text>{errorMessage}</Text>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={() => {
              hideModal();
              setTimeout(() => {
                removeError();
              }, 300);
            }}>
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
