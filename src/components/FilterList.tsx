import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import Colors from '../constants/Colors';

const categorias = ['Todos', 'Populares', 'Más Vendidos', 'Mejor Puntuados'];
export const FilterList = () => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}>
      {categorias.map((item, index) => {
        return (
          <TouchableOpacity
            style={{paddingHorizontal: 10}}
            key={index + item}
            activeOpacity={0.7}
            onPress={() => setSelectedCategoryIndex(index)}>
            <View>
              <Text
                style={{
                  ...styles.categoryListText,
                  color:
                    selectedCategoryIndex === index
                      ? Colors.primary
                      : Colors.secondaryDark,
                }}>
                {item}
              </Text>
              {selectedCategoryIndex === index && (
                <View style={styles.selectedLine} />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  categoryListText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedLine: {
    height: 3,
    width: 30,
    backgroundColor: Colors.primary,
    marginTop: 2,
  },
});
