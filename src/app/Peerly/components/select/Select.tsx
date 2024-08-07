import Typography from '../../../components/typography';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import colors from '../../constants/colors';

interface SelectProp {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  items: {label: string; value: string}[];
  search?: boolean;
  error?: string;
  disable?: boolean;
}

const Select: React.FC<SelectProp> = ({
  value,
  onChange,
  placeholder,
  items,
  search = false,
  disable,
  error,
}) => {
  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={items}
        search={search}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          onChange(item.value);
        }}
        disable={disable}
      />
      {error && (
        <Typography style={styles.errorText} type="description">
          {error}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderRadius: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: colors.WHITE,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  errorText: {
    color: colors.ERROR_RED,
    paddingTop: 5,
  },
  error: {
    borderBottomColor: colors.ERROR_RED,
  },
});

export default memo(Select);
