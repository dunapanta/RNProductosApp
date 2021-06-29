import React from 'react';

import {View, StyleSheet, useWindowDimensions, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

export const SearchInput = () => {
  const {width, height} = useWindowDimensions();
  return (
    <View style={{...styles.searchInput, width: width - 50}}>
      <Icon
        name="search"
        size={30}
        style={{marginLeft: 20, color: Colors.secondaryDark}}
      />
      <TextInput placeholder="Buscar" style={styles.textInput} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginTop: 15,
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
    marginLeft: 22,
    borderRadius: 30,
  },
  textInput: {
    fontSize: 21,
    paddingLeft: 12,
    color: Colors.secondaryDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
