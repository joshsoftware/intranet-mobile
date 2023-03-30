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
  signIn: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
}

const LoginForm = (props: Props) => {
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

  const onSubmitHandler = async (data: FormData) => {
    props.signIn(data.email, data.password);
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
        disabled={props.isLoading}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={props.isLoading}
        style={[
          styles.loginButton,
          props.isLoading ? styles.loginButtonDisabled : {},
        ]}
        activeOpacity={0.5}
        onPress={handleSubmit(onSubmitHandler)}>
        {props.isLoading ? (
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
    color: '#000000',
  },
  forgotPasswordText: {
    color: '#6A6A6A',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 24,
    alignSelf: 'flex-end',
  },
  loginButton: {
    backgroundColor: '#3069F6',
    padding: 9,
    borderRadius: 4,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
});
