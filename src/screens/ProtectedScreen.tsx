import React, {useContext} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Colors from '../constants/Colors';
import {AuthContext} from '../context/AuthContext';

export const ProtectedScreen = () => {
  const {user, token, logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Protected Screen</Text>
      <Button title="Logout" onPress={logout} color={Colors.secondary} />
      <Text>{JSON.stringify(user, null, 5)}</Text>
      <Text style={styles.token}>{token}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  token: {
    marginTop: 15,
    marginHorizontal: 12,
  },
});
