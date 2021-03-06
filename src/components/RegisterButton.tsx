import React from 'react';
import {Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';

import Colors from '../constants/Colors';
import {loginStyles} from '../theme/loginTheme';

interface Props {
  onRegister: () => void;
  loadingButton: boolean;
  errorTrigger: () => void;
}
export const RegisterButton = ({
  onRegister,
  loadingButton,
  errorTrigger,
}: Props) => {
  return (
    <View style={loginStyles.buttonContainer}>
      <TouchableOpacity
        disabled={loadingButton}
        activeOpacity={0.8}
        style={
          loadingButton
            ? loginStyles.registerButtonDisabled
            : loginStyles.button
        }
        onPress={() => {
          onRegister();
          errorTrigger();
        }}>
        <Text style={loginStyles.buttonText}>
          {loadingButton ? (
            <ActivityIndicator size={30} color={Colors.primary} />
          ) : (
            'Crear Cuenta'
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
