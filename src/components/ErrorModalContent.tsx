import React, {useContext} from 'react';
import {Image} from 'react-native';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Colors from '../constants/Colors';
import {ModalContext} from '../context/ModalContext';

import {ModalPopup} from './ModalPopup';

interface Props {
  visible?: boolean;
  titleHead?: string;
  errorMessage?: string;
  statusBarColor: string;
  hideModal?: () => void;
  removeError?: () => void;
}

export const ErrorModalContent = ({
  titleHead,
  errorMessage,
  removeError,
  statusBarColor,
}: Props) => {
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
            source={require('../assets/error.png')}
            style={{height: 150, width: 150}}
          />
          <Text style={{fontSize: 15, paddingVertical: 6}}>{errorMessage}</Text>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={() => {
              hideModal();

              if (removeError) {
                setTimeout(() => {
                  removeError();
                }, 400);
              }
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
