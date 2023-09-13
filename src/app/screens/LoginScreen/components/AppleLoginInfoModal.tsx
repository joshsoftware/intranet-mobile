import React from 'react';
import {StyleSheet, View} from 'react-native';

import Button from '../../../components/button';
import BottomModal from '../../../components/BottomModal';
import Typography from '../../../components/typography';

import {Info} from '../../../constant/icons';

import {cardStyles, infoStyles} from '../styles';

interface IProps {
  isVisible: boolean;
  closeModal: () => void;
  continueAppleLogin: () => void;
}

function AppleLoginInfoModal(props: IProps) {
  const {isVisible, closeModal, continueAppleLogin} = props;

  return (
    <BottomModal isVisible={isVisible} closeModal={closeModal}>
      <View style={styles.modalContent}>
        <Typography type="header" style={styles.title}>
          Login with Apple
        </Typography>
        <View style={[cardStyles.container, infoStyles.container]}>
          <View style={cardStyles.iconContainer}>
            <Info fill={infoStyles.icon.color} />
          </View>
          <View style={cardStyles.contentContainer}>
            <Typography style={infoStyles.text}>
              1. Please use Apple ID with josh software email.
            </Typography>
            <Typography />
            <Typography style={infoStyles.text}>
              2. Do select the "Share my email" option when using Apple login.
            </Typography>
            <Typography />
            <Typography style={infoStyles.text}>
              3. Email id is mandatory for login process.
            </Typography>
          </View>
        </View>
        <Button title="Continue" type="primary" onPress={continueAppleLogin} />
      </View>
    </BottomModal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    paddingHorizontal: 16,
    gap: 16,
    paddingBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AppleLoginInfoModal;
