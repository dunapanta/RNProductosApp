import React, {useRef} from 'react';
import {useWindowDimensions} from 'react-native';
import {Animated, FlatList, View} from 'react-native';
import {Producto} from '../interfaces/appInterfaces';
import {CardProduct} from './CardProduct';

interface Props {
  products: Producto[];
}

export const ProductsList = ({products}: Props) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const {width} = useWindowDimensions();
  return (
    <View>
      <Animated.FlatList
        keyExtractor={product => product._id}
        horizontal
        data={products}
        contentContainerStyle={{
          paddingVertical: 30,
          paddingLeft: 20,
          paddingRight: width / 2 - 120,
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <CardProduct product={item} index={index} scrollX={scrollX} />
        )}
        //Animation
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        snapToInterval={width / 1.9}
      />
    </View>
  );
};
