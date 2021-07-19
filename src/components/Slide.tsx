import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Colors from '../constants/Colors';
import slides from '../constants/OnboardSlides';

type Props = {
  item: {id: string; image: any; title: string; subtitle: string};
  currentSliceIndex: number;
  nextSlide: () => void;
  skip: () => void;
};
const {width} = Dimensions.get('window');

export const Slide = ({item, currentSliceIndex, nextSlide, skip}: Props) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.secondaryLigth,
      }}>
      <View style={{flex: 6, backgroundColor: 'white'}}>
        <Image
          source={item.image}
          style={{height: '100%', width, resizeMode: 'contain'}}
        />
      </View>
      <View style={{flex: 4}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
      {/* Indicator */}
      <View
        style={{
          flex: 1,
          //marginVertical: 1,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSliceIndex === index && {
                  backgroundColor: Colors.primary,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>
      </View>
      {/* Buttons */}
      <View style={{flex: 3}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={skip}
            style={[
              styles.btn,
              {
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: 'white',
              },
            ]}>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 16}}>
              Saltar
            </Text>
          </TouchableOpacity>
          <View style={{width: 15}} />
          <TouchableOpacity
            style={[styles.btn]}
            activeOpacity={0.7}
            onPress={nextSlide}>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 16}}>
              Siguiente
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
    marginTop: 25,
    maxWidth: 300,
    textAlign: 'center',
    lineHeight: 20,
  },
  indicator: {
    height: 4,
    width: 14,
    backgroundColor: 'white',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    width: 150,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
