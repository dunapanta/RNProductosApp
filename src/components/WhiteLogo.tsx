import React from 'react';
import {View, Image, ImageSourcePropType} from 'react-native';

interface Props {
  image: ImageSourcePropType;
}

export const WhiteLogo = ({image}: Props) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Image
        source={image}
        style={{
          width: 130,
          height: 130,
          borderRadius: 200,
        }}
      />
    </View>
  );
};
