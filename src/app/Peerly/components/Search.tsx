import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import colors from '../constants/colors';
import {SearchIcon} from '../constants/icons';

interface SearchProps {
  onChange?: (value: string) => void;
  value?: string;
  placeholder: string;
  editable?: boolean;
  autoFocus?: boolean;
}
const Search: React.FC<SearchProps> = ({
  onChange,
  value,
  placeholder,
  editable,
  autoFocus,
}) => {
  return (
    <View style={styles.searchContainer}>
      <SearchIcon name="ios-search" size={20} style={styles.icon} />
      <TextInput
        onChangeText={onChange}
        style={styles.searchInput}
        placeholder={placeholder}
        value={value}
        editable={editable}
        autoFocus={autoFocus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingLeft: 40,
    backgroundColor: colors.SECONDARY_BACKGROUND_FIRST,
    paddingVertical: 10,
    borderRadius: 10,
  },
  icon: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
});
export default Search;
