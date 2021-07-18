import {useContext, useState} from 'react';
import {ImagePickerResponse} from 'react-native-image-picker';
import productosApi from '../api/productosApi';
import {AuthContext} from '../context/AuthContext';
import {Usuario} from '../interfaces/appInterfaces';

export const useUpdateUserPhoto = () => {
  const {updateUser} = useContext(AuthContext);

  const updatePhoto = async (data: ImagePickerResponse, id: string) => {
    const photoToUpload = {
      uri: data.assets[0].uri,
      type: data.assets[0].type,
      name: data.assets[0].fileName,
    };

    const fromData = new FormData();
    fromData.append('archivo', photoToUpload);

    try {
      const resp = await productosApi.put<Usuario>(
        `/uploads/usuarios/${id}`,
        fromData,
      );
      updateUser(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    updatePhoto,
  };
};
