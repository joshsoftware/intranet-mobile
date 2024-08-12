import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import colors from '../../constants/colors';
import {SvgProps} from 'react-native-svg';

interface FallbackUIProp {
  message: string;
  icon?: React.FC<SvgProps>;
}

const FallbackUI: React.FC<FallbackUIProp> = ({message, icon: SvgIcon}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {SvgIcon ? (
          <View style={styles.imageWrapper}>
            <SvgIcon width={120} height={120} />
          </View>
        ) : null}
        <View style={styles.messageWrapper}>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
  },
  container: {
    alignitems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    alignSelf: 'center',
  },
  messageWrapper: {
    marginTop: 30,
  },
  message: {
    fontSize: 18,
    color: colors.LIGHT_GRAY,
    fontWeight: '600',
  },
});

export default FallbackUI;
