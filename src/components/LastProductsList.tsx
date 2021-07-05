import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

import Colors from '../constants/Colors';
import {Producto} from '../interfaces/appInterfaces';
import {LastProductCard} from './LastProductCard';

interface Props {
  products: Producto[];
}

export const LastProductsList = ({products}: Props) => {
  const lastProducts = [...products];

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>Últimos Agregados</Text>
        <Text style={styles.textShow}>Mostrar Todos</Text>
      </View>
      <FlatList
        data={lastProducts.reverse()}
        keyExtractor={item => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListStyle}
        //data={}
        renderItem={({item}) => <LastProductCard product={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  text: {
    fontWeight: 'bold',
    color: Colors.secondaryDark,
  },
  textShow: {
    color: Colors.secondaryDark,
  },
  flatListStyle: {
    paddingLeft: 20,
    marginTop: 20,
    paddingBottom: 30,
  },
});
