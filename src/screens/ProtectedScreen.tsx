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
import {launchImageLibrary} from 'react-native-image-picker';

import Colors from '../constants/Colors';
import {AuthContext} from '../context/AuthContext';
import {useUpdateUserPhoto} from '../hooks/useUpdateUserPhoto';

export const ProtectedScreen = () => {
  const [temUserPhoto, setTemUserPhoto] = useState<string>('');
  const [photoButtonLoading, setphotoButtonLoading] = useState(false);

  const {user, updateUser, logout} = useContext(AuthContext);
  const {updatePhoto} = useUpdateUserPhoto()
  const {top} = useSafeAreaInsets();
  const {goBack} = useNavigation();

  const takePhotoFromLibrary = () => {
    setphotoButtonLoading(true);
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      resp => {
        console.log(resp);
        if (resp.didCancel) {
          setphotoButtonLoading(false);
          return;
        }
        if (!resp.assets[0].uri) {
          setphotoButtonLoading(false);
          return;
        }
        setTemUserPhoto(resp.assets[0].uri);
        if (user?.uid) {
          updatePhoto(resp, user.uid)
        }
        setphotoButtonLoading(false);
      },
    );
  };

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
        <View
          style={{
            ...styles.iconContainer,
            backgroundColor: photoButtonLoading
              ? Colors.primaryLigth
              : Colors.primary,
          }}>
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={photoButtonLoading}
            onPress={takePhotoFromLibrary}>
            {photoButtonLoading ? (
              <ActivityIndicator size={28} color="white" />
            ) : (
              <Icon name="add-outline" color="white" size={30} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <View style={{flex: 1}}>
            <Icon name="person-outline" color={Colors.secondary} size={30} />
          </View>
          <View style={{flex: 2}}>
            <Text style={{fontSize: 18, marginTop: 10}}>{user?.nombre}</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={{flex: 1}}>
            <Icon name="mail-outline" color={Colors.secondary} size={30} />
          </View>
          <View style={{flex: 2}}>
            <Text style={{fontSize: 18, marginTop: 3}}>{user?.correo}</Text>
          </View>
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
    marginBottom: 60,
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
    top: 160,
    right: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    marginTop: 60,
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
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
