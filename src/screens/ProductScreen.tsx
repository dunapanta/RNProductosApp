import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Producto} from '../interfaces/appInterfaces';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

interface Props extends StackScreenProps<any, any> {}
export const ProductScreen = ({navigation, route}: Props) => {
  const product = route.params as Producto;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />
      <ImageBackground
        style={styles.headerImage}
        source={
          product.img ? {uri: product.img} : require('../assets/noImage.png')
        }>
        <View style={styles.header}>
          <Icon
            name="chevron-back-outline"
            size={50}
            color={Colors.primary}
            onPress={navigation.goBack}
          />
          <Icon name="checkbox-outline" size={40} color={Colors.primary} />
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  headerImage: {
    height: 400,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    overflow: 'hidden',
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    justifyContent: 'space-between',
  },
});
