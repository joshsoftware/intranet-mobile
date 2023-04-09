import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import {View} from 'react-native-animatable';

import CardDetails from '../../components/profile/cardDetails';
import DetailsView from '../../components/profile/cardDetails/detailsView';
import CustomChip from '../../components/customChip';

import {skillsType} from '../../types';
import UpdateSkills from './components/updateSkills';
import FloatingActionButton from '../../components/button/floatingActionButton';
import Button from '../../components/button/button';
import skillsFormatter from '../../utils/userProfile/skillsFormatter';

type Props = {
  data: skillsType;
};

const Skills = ({data}: Props) => {
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
              (skill: string, index: number) => (
                <CustomChip key={index} label={skill} mode="view" />
              ),
            )}
          </View>
        </CardDetails>
      </ScrollView>
      <View style={styles.updateContainer}>
        <Button
          title="Update skills"
          onPress={() => toggleModal(true)}
          style={styles.update}
          textStyle={styles.updateTextStyle}
        />
        <UpdateSkills
          data={data}
          toggleModal={toggleModal}
          isVisible={shouldShowModal}
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
  update: {
    width: '50%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#3069F6',
    borderWidth: 1,
    borderRadius: 20,
  },
  updateTextStyle: {
    color: '#3069F6',
  },
  updateContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});
export default Skills;
