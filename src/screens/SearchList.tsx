import React from 'react';
import {FlatList, View, Dimensions} from 'react-native';

import {SearchItem} from '../components/SearchItem';
import {SearchResult} from '../interfaces/appInterfaces';

interface Props {
  searchProducts: SearchResult[];
}

const {width, height} = Dimensions.get('window');

export const SearchList = ({searchProducts}: Props) => {
  return (
    <View
      style={{
        marginTop: 20,
        marginHorizontal: 10,
      }}>
      <FlatList
        data={searchProducts}
        keyExtractor={product => product._id}
        showsVerticalScrollIndicator={false}
        style={{marginBottom: height / 4}}
        numColumns={2}
        renderItem={({item, index}) => <SearchItem product={item} />}
      />
    </View>
  );
};
