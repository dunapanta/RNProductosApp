import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../constants/Colors';

export const HeaderProducts = () => {
  return (
    <View style={styles.header}>
      <View style={styles.textCointainer}>
        <Text style={styles.headerText}>Tus Productos</Text>
        <View style={styles.row}>
          <Text style={styles.headerText}>en </Text>
          <Text style={{...styles.headerText, color: Colors.primary}}>
            Quito
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity style={{marginTop: 10}} activeOpacity={0.7}>
          <Icon name="person-outline" size={50} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  textCointainer: {
    paddingBottom: 6,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.secondaryDark,
  },
  row: {
    flexDirection: 'row',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
