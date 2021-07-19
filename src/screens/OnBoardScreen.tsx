import React, {useState, useRef} from 'react';
import {View, FlatList, Dimensions, StatusBar, StyleSheet} from 'react-native';

import Colors from '../constants/Colors';
import slides from '../constants/OnboardSlides';
import {Slide} from '../components/Slide';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');
export const OnBoardScreen = () => {
  const {top} = useSafeAreaInsets();
  const ref = useRef<any>(null);
  const [currentSliceIndex, setCurrentSliceIndex] = useState(0);

  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;

    const currentIndex = Math.round(contentOffsetX / width);
    //console.log(currentIndex);
    setCurrentSliceIndex(currentIndex);
  };

  const goNextSlide = () => {
    const nextSlideIndex = currentSliceIndex + 1;
    const offset = nextSlideIndex * width;
    if (ref.current.scrollToOffset) {
      ref.current.scrollToOffset({offset});
    }
    setCurrentSliceIndex(nextSlideIndex);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white', top: top + 10}}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={updateCurrentSlideIndex}
        ref={ref}
        //contentContainerStyle={{height: height * 0.6}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Slide
            item={item}
            currentSliceIndex={currentSliceIndex}
            nextSlide={goNextSlide}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
