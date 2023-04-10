import React from 'react';
import {StyleSheet, View} from 'react-native';

import Modal from '../../../components/modal';
import Typography from '../../../components/typography';
import UpdateSkillForm from '../../../components/profile/cardDetails/updateSkillForm';

import colors from '../../../constant/colors';
import fonts from '../../../constant/fonts';

import {skillsType} from '../../../types';

type Props = {
  isVisible: boolean;
  toggleModal: (value: boolean) => void;
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
      contentStyle={styles.modal}>
      <View style={styles.main}>
        <View>
          <Typography type="title" style={styles.title}>
            Update Skills
          </Typography>

          <UpdateSkillForm
            toggleModal={toggleModal}
            defaultData={data}
            refresh={refresh}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    height: '100%',
  },
  main: {
    width: '100%',
    backgroundColor: colors.WHITE,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: '10%',
    justifyContent: 'space-between',
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
