import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Colors';
import {AuthContext} from '../context/AuthContext';

export const ProtectedScreen = () => {
  const [temUserPhoto, setTemUserPhoto] = useState<string>('');
  const [photoButtonLoading, setphotoButtonLoading] = useState(false);

  const {user, logout} = useContext(AuthContext);
  const {top} = useSafeAreaInsets();
  const {goBack} = useNavigation();

  return (
    <View style={{top: top + 10, marginHorizontal: 30}}>
      <View>
        <TouchableOpacity
          style={{marginRight: 10}}
          activeOpacity={0.7}
          onPress={goBack}>
          <Icon name="chevron-back-outline" size={42} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.previewImage}>
          {temUserPhoto ? (
            <Image
              style={{height: '100%', width: '100%'}}
              source={{uri: temUserPhoto}}
            />
          ) : (
            <Image
              style={{height: '100%', width: '100%'}}
              source={
                user?.img ? {uri: user.img} : require('../assets/avatar.png')
              }
            />
          )}
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
            <Icon name="add-outline" color="white" size={30} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Icon name="person-outline" color="black" size={30} />
          <Text style={{fontSize: 18}}>{user?.nombre}</Text>
        </View>

        <View style={styles.infoCard}>
          <Icon name="mail-outline" color="black" size={30} />
          <Text style={{fontSize: 18}}>{user?.correo}</Text>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          disabled={photoButtonLoading}
          activeOpacity={0.8}
          onPress={logout}>
          <Icon name="log-out-outline" color="white" size={30} />
          <Text style={styles.btnText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingBottom: 20,
    marginHorizontal: 26,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  token: {
    marginTop: 15,
    marginHorizontal: 12,
  },
  previewImage: {
    marginTop: 20,
    height: 200,
    width: 200,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 100,
    overflow: 'hidden',
  },
  iconContainer: {
    position: 'absolute',
    height: 60,
    width: 60,
    backgroundColor: Colors.primary,
    top: 160,
    right: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    marginTop: 20,
    height: 55,
    minWidth: 170,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryDark,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  infoCard: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 300,
    height: 100
  },
});
