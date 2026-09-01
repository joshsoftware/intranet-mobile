import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Touchable from '../../../components/touchable';
import colors from '../../../constant/colors';
import fonts from '../../../constant/fonts';

export type OptionVisualState =
  | 'default'
  | 'selected'
  | 'correct'
  | 'incorrect'
  | 'muted';

type Props = {
  label: string;
  state: OptionVisualState;
  disabled?: boolean;
  onPress: () => void;
};

const OptionRow = ({label, state, disabled = false, onPress}: Props) => {
  const isCorrect = state === 'correct';
  const isIncorrect = state === 'incorrect';
  const isSelected = state === 'selected';
  const isMuted = state === 'muted';

  return (
    <Touchable
      type="opacity"
      opacity={0.85}
      disabled={disabled}
      onPress={onPress}>
      <View
        style={[
          styles.row,
          isSelected && styles.rowSelected,
          isCorrect && styles.rowCorrect,
          isIncorrect && styles.rowIncorrect,
          isMuted && styles.rowMuted,
        ]}>
        <View
          style={[
            styles.radio,
            isSelected && styles.radioSelected,
            isCorrect && styles.radioCorrect,
            isIncorrect && styles.radioIncorrect,
            isMuted && styles.radioMuted,
          ]}>
          {(isSelected || isCorrect) && (
            <View
              style={[styles.radioDot, isCorrect && styles.radioDotCorrect]}
            />
          )}
          {isIncorrect && <View style={styles.radioDotIncorrect} />}
        </View>

        <Text
          style={[
            styles.label,
            isMuted && styles.labelMuted,
            isIncorrect && styles.labelIncorrect,
          ]}>
          {label}
        </Text>

        {isCorrect && (
          <View style={[styles.badge, styles.badgeCorrect]}>
            <Text style={styles.badgeMark}>✓</Text>
          </View>
        )}
        {isIncorrect && (
          <View style={[styles.badge, styles.badgeIncorrect]}>
            <Text style={styles.badgeMark}>✕</Text>
          </View>
        )}
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.BORDER,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: colors.WHITE,
    gap: 12,
  },
  rowSelected: {
    borderColor: colors.PRIMARY,
    backgroundColor: colors.PRIMARY_DIVIDER,
  },
  rowCorrect: {
    borderColor: '#86EFAC',
    backgroundColor: '#ECFDF3',
  },
  rowIncorrect: {
    borderColor: '#FCA5A5',
    backgroundColor: '#FEF2F2',
  },
  rowMuted: {
    opacity: 0.55,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.BORDER,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.PRIMARY,
  },
  radioCorrect: {
    borderColor: '#22C55E',
  },
  radioIncorrect: {
    borderColor: '#EF4444',
  },
  radioMuted: {
    borderColor: colors.SECONDARY_TEXT,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.PRIMARY,
  },
  radioDotCorrect: {
    backgroundColor: '#22C55E',
  },
  radioDotIncorrect: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444',
  },
  label: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    color: colors.SECONDARY,
    fontFamily: fonts.ARIAL,
    fontWeight: '600',
  },
  labelMuted: {
    color: colors.SECONDARY_TEXT,
    fontWeight: '500',
  },
  labelIncorrect: {
    color: '#EF4444',
  },
  badge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeCorrect: {
    backgroundColor: '#22C55E',
  },
  badgeIncorrect: {
    backgroundColor: '#EF4444',
  },
  badgeMark: {
    color: colors.WHITE,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 14,
  },
});

export default memo(OptionRow);
