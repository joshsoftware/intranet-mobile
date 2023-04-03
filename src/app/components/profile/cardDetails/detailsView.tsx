import {StyleSheet, View} from 'react-native';

import CardDetailsRow from './cardDetailsRow';

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
        <CardDetailsRow key={index} detail={detail} />
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
