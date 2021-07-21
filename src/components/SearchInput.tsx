import React, {useEffect, useState} from 'react';

import {
  View,
  StyleSheet,
  useWindowDimensions,
  TextInput,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import {useDebounce} from '../hooks/useDebounce';

const {width} = Dimensions.get('window');

interface Props {
  onDebounce: (value: string) => void;
}

export const SearchInput = ({onDebounce}: Props) => {
  const [text, setText] = useState('');

  const debouncedText = useDebounce(text);

  useEffect(() => {
    onDebounce(debouncedText);
  }, [debouncedText]);

  return (
    <View style={{...styles.searchInput, width: width - 50}}>
      <Icon
        name="search"
        size={30}
        style={{marginLeft: 20, color: Colors.secondaryDark}}
      />
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Buscar"
        style={styles.textInput}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginTop: 15,
    marginBottom: 5,
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
    flex: 1,
  },
});
