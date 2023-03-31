import React from 'react';
import {View, StyleSheet} from 'react-native';

import CircleView from '../../views/circleView';

import urlHandler from '../../../utils/userProfile/urlHandler';

import {socialDetailsType} from '../../../types';

const handlePress = (uri: string) => urlHandler(uri);

type Props = {
  data: socialDetailsType;
};

const ProfileView = ({data}: Props) => {
  return (
    <View style={styles.profileContainer}>
      {data.map(
        (item, index) =>
          item.uri && (
            <CircleView
              key={index}
              data={{name: item.name}}
              uri={item.uri}
              handlePress={handlePress}
            />
          ),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
});
export default ProfileView;
