import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import ScreenWrapper from '../component/ScreenWrapper';
import Card from '../component/Card';
import DetailRow from '../component/DetailRow';
import Button from '../../../components/button';
import UpdateSkillModal from '../component/UpdateSkillModal';

import colors from '../../../constant/colors';
import {ISkillsData} from '../interface/skills';

interface Props {
  data: ISkillsData;
  refresh: () => void;
}

const Skills = ({data, refresh}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

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
          <Text style={styles.otherSkillsText}>{data.otherSkills}</Text>
        </Card>
      </ScreenWrapper>

      <View style={styles.buttonContainer}>
        <Button
          title="Update Skills"
          type="secondary"
          onPress={() => setModalVisible(true)}
        />
      </View>

      <UpdateSkillModal
        isVisible={modalVisible}
        closeModal={() => setModalVisible(false)}
        refresh={refresh}
        skillsData={data}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  otherSkillsText: {
    color: colors.SECONDARY,
  },
  buttonContainer: {
    padding: 16,
  },
});

export default React.memo(Skills);
