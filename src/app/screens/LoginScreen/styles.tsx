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
    borderWidth: 1,
    borderColor: '#ff9800',
  },
  text: {
    color: '#663c00',
  },
  boldText: {
    fontWeight: 'bold',
  },
  icon: {
    color: '#ed6c02',
  },
});

export const infoStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#03a9f4',
  },
  text: {
    color: '#014361',
  },
  boldText: {
    fontWeight: 'bold',
  },
  icon: {
    color: '#0288d1',
  },
});

export const successStyles = StyleSheet.create({
  container: {
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

export const errorStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ef5350',
  },
  text: {
    color: '#5f2120',
  },
  icon: {
    color: '#d32f2f',
  },
});
