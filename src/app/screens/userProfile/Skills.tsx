import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import {View} from 'react-native-animatable';

import CardDetails from '../../components/profile/cardDetails';
import DetailsView from '../../components/profile/cardDetails/detailsView';
import CustomChip from '../../components/customChip';
import UpdateSkills from './components/updateSkills';
import {SecondaryButton} from '../../components/button';

import skillsFormatter from '../../utils/userProfile/skillsFormatter';

import {skillsType} from '../../types';

type Props = {
  data: skillsType;
  refresh: () => void;
};

const Skills = ({data, refresh}: Props) => {
  const [shouldShowModal, setShouldShowModal] = useState<boolean>(false);
  const toggleModal = (value: boolean) => setShouldShowModal(value);

  return (
    <>
      <ScrollView>
        <CardDetails title="Details">
          <DetailsView
            data={{primary: data.primarySkill, secondary: data.secondarySkill}}
          />
        </CardDetails>
        <CardDetails title="Other Skills">
          <View style={styles.containerStyle}>
            {skillsFormatter(data.otherSkills as string).map(
              (skill: string, index: number) =>
                skill !== '' ? (
                  <CustomChip key={index} label={skill} mode="view" />
                ) : null,
            )}
          </View>
        </CardDetails>
      </ScrollView>
      <View style={styles.updateContainer}>
        <SecondaryButton
          title="Update skills"
          isLoading={false}
          onPress={() => toggleModal(true)}
        />
        <UpdateSkills
          data={data}
          toggleModal={toggleModal}
          isVisible={shouldShowModal}
          refresh={refresh}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  updateContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});
export default Skills;
