import React from 'react';
import {StyleSheet} from 'react-native';

import Modal from '../../../components/modal';
import Typography from '../../../components/typography';
import UpdateSkillForm from './updateSkillsForm';

import colors from '../../../constant/colors';
import fonts from '../../../constant/fonts';

import {skillsType} from '../../../types';
import {ScrollView} from 'react-native-gesture-handler';

type Props = {
  isVisible: boolean;
  toggleModal: () => void;
  data: skillsType;
  refresh: () => void;
};

const UpdateSkills = ({toggleModal, isVisible, data, refresh}: Props) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={500}
      animationOutTiming={500}
      contentStyle={styles.modal}
      onBackButtonPress={toggleModal}
      onBackdropPress={toggleModal}>
      <ScrollView style={{}}>
        <Typography type="title" style={styles.title}>
          Update Skills
        </Typography>

        <UpdateSkillForm
          toggleModal={toggleModal}
          userSkills={data}
          refresh={refresh}
        />
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
  },
  main: {
    backgroundColor: colors.PRIMARY,
  },
  title: {
    color: colors.SECONDARY,
    fontFamily: fonts.ARIAL_BOLD,
    marginVertical: 24,
  },
  arrow: {
    transform: [{rotate: '-90 deg'}],
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 48,
    height: 48,
    elevation: 4,
    backgroundColor: colors.WHITE,
    borderRadius: 24,
  },
});

export default UpdateSkills;
