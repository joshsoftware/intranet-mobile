import {StyleSheet} from 'react-native';

export const cardStyles = StyleSheet.create({
  container: {
    marginTop: 16,
    padding: 10,
    borderRadius: 4,
    flexDirection: 'row',
  },
  iconContainer: {
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
});

export const warningStyles = StyleSheet.create({
  container: {
    // backgroundColor: '#e5f6fd',
    borderWidth: 1,
    borderColor: '#ff9800',
  },
  text: {
    color: '#663c00',
  },
  icon: {
    color: '#ed6c02',
  },
});

export const infoStyles = StyleSheet.create({
  container: {
    // backgroundColor: '#e5f6fd',
    borderWidth: 1,
    borderColor: '#03a9f4',
  },
  text: {
    color: '#014361',
  },
  icon: {
    color: '#0288d1',
  },
});

export const successStyles = StyleSheet.create({
  container: {
    // backgroundColor: '#edf7ed',
    borderWidth: 1,
    borderColor: '#4caf50',
  },
  text: {
    color: '#1e4620',
  },
  icon: {
    color: '#2e7d32',
  },
});
