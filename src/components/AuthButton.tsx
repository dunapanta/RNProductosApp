import React from 'react';
import {Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';

import Colors from '../constants/Colors';
import {loginStyles} from '../theme/loginTheme';

interface Props {
  onLogin: () => void;
  errorTrigger: () => void;
  loadingButton: boolean;
}
export const AuthButton = ({onLogin, loadingButton, errorTrigger}: Props) => {
  return (
    <View style={loginStyles.buttonContainer}>
      <TouchableOpacity
        disabled={loadingButton}
        activeOpacity={0.8}
        style={loadingButton ? loginStyles.buttonDisabled : loginStyles.button}
        onPress={() => {
          onLogin();
          errorTrigger();
        }}>
        <Text style={loginStyles.buttonText}>
          {loadingButton ? (
            <ActivityIndicator size={30} color={Colors.primary} />
          ) : (
            'Login'
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
