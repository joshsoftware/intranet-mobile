import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import InputBox from '../../components/InputBox';

import {CHECK_EMAIL, CHECK_JOSHSOFTWARE_EMAIL} from '../../constant/regex';
import {
  INVALID_EMAIL_ERROR,
  INVALID_JOSHSOFTWARE_EMAIL_ERROR,
} from '../../constant/message';
import colors from '../../constant/colors';

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(CHECK_EMAIL, INVALID_EMAIL_ERROR)
    .matches(CHECK_JOSHSOFTWARE_EMAIL, INVALID_JOSHSOFTWARE_EMAIL_ERROR)
    .required(),
  password: yup.string().min(8).max(32).required(),
});

interface Props {
  signIn: (email: string, password: string) => void;
  isLoading: boolean;
}

const LoginForm = (props: Props) => {
  const {signIn, isLoading} = props;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: FormData) => {
    signIn(data.email, data.password);
  };

  const forgotPasswordHandler = async () => {
    // TODO
  };

  return (
    <View>
      <Text style={styles.labelText}>User Email</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <InputBox
            placeholder="Email"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={errors.email?.message}
          />
        )}
        name="email"
      />

      <Text style={styles.labelText}>Password</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <InputBox
            placeholder="Password"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            secureTextEntry={true}
            error={errors.password?.message}
          />
        )}
        name="password"
      />

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={forgotPasswordHandler}
        disabled={isLoading}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={isLoading}
        style={[
          styles.loginButton,
          isLoading ? styles.loginButtonDisabled : {},
        ]}
        activeOpacity={0.5}
        onPress={handleSubmit(onSubmitHandler)}>
        {isLoading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  labelText: {
    marginTop: 13,
    fontSize: 12,
    color: colors.SECONDARY,
  },
  forgotPasswordText: {
    color: colors.QUATERNARY_TEXT,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 24,
    alignSelf: 'flex-end',
  },
  loginButton: {
    backgroundColor: colors.PRIMARY,
    padding: 9,
    borderRadius: 4,
    alignItems: 'center',
  },
  loginButtonText: {
    color: colors.WHITE,
    fontSize: 14,
    fontWeight: '600',
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
});
