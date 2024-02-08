import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

import colors from '../../../constant/colors';
import {Search} from '../../../constant/icons';

interface IProps {
  userText: string;
  onUserTextChange: (txt: string) => void;
  projectText: string;
  onProjectTextChange: (txt: string) => void;
}

const UserProjectSearchBox = (props: IProps) => {
  const {userText, projectText, onUserTextChange, onProjectTextChange} = props;

  return (
    <View style={styles.container}>
      <Search />
      <TextInput
        style={styles.textInput}
        placeholder="Search User"
        value={userText}
        onChangeText={onUserTextChange}
      />
      <Text style={styles.seperatorText}>-</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Search Project"
        value={projectText}
        onChangeText={onProjectTextChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.TEXT_INPUT_BORDER,
  },
  seperatorText: {
    fontWeight: 'bold',
  },
  textInput: {
    flex: 1,
  },
});

export default UserProjectSearchBox;
