import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import ScreenWrapper from '../component/ScreenWrapper';
import Card from '../component/Card';
import DetailRow from '../component/DetailRow';
import Button from '../../../components/button';
import UpdateSkillModal from '../component/UpdateSkillModal';
import CustomChip from '../../../components/customChip';

import {ISkillsData} from '../interface/skills';

const Skills = (data: ISkillsData) => {
  const [modalVisible, setModalVisible] = useState(false);

  const otherSkills = data.otherSkills
    ? data.otherSkills
        .split(',')
        .filter(e => e !== '')
        .map(skill => <CustomChip label={skill} mode="view" />)
    : [];

  const toggleModal = () => setModalVisible(!modalVisible);

  return (
    <View style={styles.container}>
      <ScreenWrapper>
        <Card title="Details">
          <DetailRow
            label="Primary Technical Skill"
            value={data.primarySkill}
          />
          <DetailRow
            label="Secondary Technical Skill"
            value={data.secondarySkill}
          />
          <DetailRow
            label="Ternary Technical Skill"
            value={data.ternarySkill}
          />
        </Card>

        <Card title="Other Skills">
          <View style={styles.otherSkillsContainer}>{otherSkills}</View>
        </Card>
      </ScreenWrapper>

      <View style={styles.buttonContainer}>
        <Button title="Update Skills" type="secondary" onPress={toggleModal} />
      </View>

      <UpdateSkillModal
        isVisible={modalVisible}
        closeModal={toggleModal}
        skillsData={data}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  otherSkillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonContainer: {
    padding: 16,
  },
});

export default React.memo(Skills);
