import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';

export const LastProductsList = () => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>Últimos Agregados</Text>
        <Text style={styles.textShow}>Mostrar Todos</Text>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListStyle}
        data={}
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
