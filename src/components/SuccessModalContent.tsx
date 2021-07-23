import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';

import Colors from '../constants/Colors';
import {ModalContext} from '../context/ModalContext';

import {ModalPopup} from './ModalPopup';

interface Props {
  titleHead?: string;
  statusBarColor?: string;
}

export const SuccessModalContent = ({titleHead, statusBarColor}: Props) => {
  const {goBack} = useNavigation();
  const {hideModal} = useContext(ModalContext);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={statusBarColor} />
      <ModalPopup>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={{fontSize: 28}}>{titleHead}</Text>
          </View>
          <Image
            source={require('../assets/success.png')}
            style={{height: 150, width: 150}}
          />
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={() => {
              hideModal();
              goBack();
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
