import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Modal from '../../../components/modal';
import TimesheetForm from '../component/timesheetForm';
import Typography from '../../../components/typography';
import SectionListTimesheet from '../component/sectionListTimesheet';
import Button from '../../../components/button';

import {dateFormater} from '../../../utils/dateFormater';

import {TimesheetFormData, Timesheet} from '../interface';

import colors from '../../../constant/colors';
import fonts from '../../../constant/fonts';
import strings from '../../../constant/strings';
import {Arrow} from '../../../constant/icons';

import {flexStyles} from '../../../../styles';

type Props = {
  isVisible: boolean;
  toggleModal: () => void;
};

const CreateTimesheet = ({toggleModal, isVisible}: Props) => {
  const [addedTimesheet, setAddedTimesheet] = useState<
    Array<{
      title: string;
      data: Timesheet[];
    }>
  >([]);

  const [keyboardIsVisible, setKeyboardIsVisible] = useState<boolean>(false);

  const [formDefaultData, setFormDefaultData] = useState<TimesheetFormData>();

  const [isFormVisible, setIsFormVisible] = useState<boolean>(true);

  const handlePress = useCallback(
    (value?: boolean) =>
      value ? setIsFormVisible(value) : setIsFormVisible(v => !v),
    [],
  );

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsVisible(true);
    });
    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsVisible(false);
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const onAdd = useCallback(
    (data?: TimesheetFormData, resetField?: Function) => {
      const reset = () => {
        setFormDefaultData(undefined);

        if (typeof resetField !== 'undefined') {
          resetField('project');
          resetField('date');
          resetField('workHours');
          resetField('description');
        }
        handlePress(false);

        Keyboard.dismiss();
      };

      if (data) {
        let isCategoryFound = false;
        setAddedTimesheet(sections => {
          sections.forEach(section => {
            if (section.title === data.project) {
              let isPresent = false;
              isCategoryFound = true;

              const isTimesheetPresent = section.data.find(item => {
                return (
                  item.timesheet_id ===
                  data.project + dateFormater(data.date)
                )
              });
              if (isPresent) {
                Alert.alert(strings.NOT_ALLOWED, strings.DUBLICATE_ENTRY_ERROR);
              } else {
                section.data.push({
                  timesheet_id: data.project + dateFormater(data.date),
                  date: dateFormater(data.date),
                  work_in_hours: data.workHours,
                  description: data.description,
                });

                reset();
              }
            }
          });

          if (!isCategoryFound) {
            sections.push({
              title: data.project,
              data: [
                {
                  timesheet_id: data.project + dateFormater(data.date),
                  date: dateFormater(data.date),
                  work_in_hours: data.workHours,
                  description: data.description,
                },
              ],
            });

            reset();
          }
          return sections;
        });
      }
    },
    [handlePress],
  );

  const onDelete = useCallback((timesheetData: Timesheet) => {
    const list: {title: string; data: Timesheet[]}[] = [];
    setAddedTimesheet(sections =>
      sections.reduce((prevVal, currVal) => {
        const data = currVal.data.filter(
          item => item.timesheet_id !== timesheetData.timesheet_id,
        );

        if (data.length !== 0) {
          prevVal.push({title: currVal.title, data: data});
        }
        return prevVal;
      }, list),
    );
  }, []);

  const onEdit = useCallback(
    (timesheetData: Timesheet) => {
      const list: {title: string; data: Timesheet[]}[] = [];

      setAddedTimesheet(sections =>
        sections.reduce((prevVal, currVal) => {
          const data = currVal.data.filter(item => {
            if (item.timesheet_id !== timesheetData.timesheet_id) {
              return true;
            } else {
              setFormDefaultData({
                project: currVal.title,
                date: new Date(item.date),
                workHours: item.work_in_hours,
                description: item.description,
              });
              handlePress(true);
              return false;
            }
          });

          if (data.length !== 0) {
            prevVal.push({title: currVal.title, data: data});
          }
          return prevVal;
        }, list),
      );
    },
    [handlePress],
  );

  const onSave = () => {
    // TO DO API CALL
    setAddedTimesheet([]);
    toggleModal();
  };

  return (
    <Modal
      isVisible={isVisible}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={500}
      animationOutTiming={500}
      contentStyle={styles.main}>
      <View style={[styles.horizontalPad, styles.form]}>
        <Typography type="title" style={styles.title}>
          Add Timesheet
        </Typography>

        <TimesheetForm
          onSubmit={onAdd}
          isFormVisible={isFormVisible}
          defaultData={formDefaultData}
        />
      </View>
      <TouchableOpacity onPress={() => handlePress()} style={styles.arrow}>
        <Arrow width={22} height={22} />
      </TouchableOpacity>

      <SectionListTimesheet
        timesheetListData={addedTimesheet}
        onEdit={onEdit}
        onDelete={onDelete}
        style={styles.horizontalPad}
      />

      {!keyboardIsVisible && (
        <View
          style={[flexStyles.horizontal, styles.btns, styles.horizontalPad]}>
          <Button title="Cancel" type="secondary" onPress={toggleModal} />
          <Button
            title="Save"
            type="primary"
            onPress={onSave}
            disabled={addedTimesheet.length === 0}
          />
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  main: {
    marginTop: '10%',
    height: '95%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    color: colors.SECONDARY,
    fontFamily: fonts.ARIAL_BOLD,
    marginVertical: 24,
  },
  arrow: {
    transform: [{rotate: '-90 deg'}],
    width: 48,
    height: 48,
    elevation: 3,
    backgroundColor: colors.WHITE,
    borderRadius: 24,
    zIndex: 1,
    position: 'relative',
    top: -24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    elevation: 4,
    borderRadius: 30,
    zIndex: 1,
    backgroundColor: colors.WHITE,
    paddingBottom: 40,
    width: '100%',
  },
  btns: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  btnText: {
    color: colors.PRIMARY,
  },
  horizontalPad: {
    paddingHorizontal: 16,
    // flex: 1
    width: '100%',
  },
});

export default memo(CreateTimesheet);
