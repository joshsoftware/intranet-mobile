import {StyleSheet, Text, View} from 'react-native';

import Detail from '../atoms/detail';

const data = [
  {label: 'First Name', data: 'sushant'},
  {label: 'Last Name', data: 'patil'},
  {label: 'Gender', data: 'male'},
  {label: 'Mobile Number', data: '9075674610'},
  {label: 'Blood Group', data: 'B+'},
  {label: 'Date of Birth', data: '16-12-2001'},
];

const DetailsView = () => {
  return (
    <View style={styles.detailsContainer}>
      {data.map((detail, index) => (
        <Detail key={index} detail={detail} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
});

export default DetailsView;
