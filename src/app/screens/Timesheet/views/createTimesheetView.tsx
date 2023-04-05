import React, {useEffect, useState} from 'react';
import {Keyboard, StyleSheet, TouchableOpacity, View} from 'react-native';

import Modal from '../../../components/modal';
import TimesheetForm from '../components/timesheetForm';
import Typography from '../../../components/typography';
import SectionListTimesheet from '../components/sectionListTimesheet';
import Button from '../../../components/button/button';

import {dateFormater} from '../../../utils/dateFormater';

import TimesheetContext from '../../../contexts/timesheetContext';

import {TimesheetFormData, Timesheet} from '../interfaces';

import colors from '../../../constant/colors';
import fonts from '../../../constant/fonts';
import {RightArrow} from '../../../constant/icons';

import {flexStyles} from '../../../../styles';

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
};

const CreateTimesheet = ({onChange, value}: Props) => {
  const [addedTimesheet, setAddedTimesheet] = useState<
    Array<{
      title: string;
      data: Timesheet[];
    }>
  >([]);
  const [isHidden, setIsHidden] = useState<boolean>(false);

  const [keyboardIsVisible, setKeyboardIsVisible] = useState<boolean>(false);

  const [formDefaultData, setFormDefaultData] = useState<TimesheetFormData>();

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

  const onAdd = (data?: TimesheetFormData, resetField?: Function) => {
    setFormDefaultData(undefined);

    if (data) {
      let found = false;
      setAddedTimesheet(val => {
        val.forEach(item => {
          if (item.title === data.project) {
            item.data.push({
              timesheet_id: data.project + dateFormater(data.date),
              date: dateFormater(data.date),
              work_in_hours: data.workHours,
              description: data.description,
            });
            found = true;
          }
        });

        if (!found) {
          val.push({
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
        }
        return val;
      });
    }
    if (typeof resetField !== 'undefined') {
      resetField('project');
      resetField('date');
      resetField('workHours');
      resetField('description');
    }
  };

  const onDelete = (timesheet_id: string) => {
    setAddedTimesheet(val => {
      const tempVal: {
        title: string;
        data: Timesheet[];
      }[] = [];

      return val.reduce((prevVal, currVal) => {
        const tempItems: Timesheet[] = [];

        currVal.data.reduce((prev, curr) => {
          if (curr.timesheet_id !== timesheet_id) {
            prev.push(curr);
          }
          return prev;
        }, tempItems);

        if (tempItems.length !== 0) {
          prevVal.push({title: currVal.title, data: tempItems});
        }
        return prevVal;
      }, tempVal);
    });
  };

  const onEdit = (timesheet_id: string) => {
    setAddedTimesheet(val => {
      const tempVal: {
        title: string;
        data: Timesheet[];
      }[] = [];

      return val.reduce((prevVal, currVal) => {
        const tempItems: Timesheet[] = [];

        currVal.data.reduce((prev, curr) => {
          if (curr.timesheet_id !== timesheet_id) {
            prev.push(curr);
          } else {
            setFormDefaultData({
              project: currVal.title,
              date: new Date(curr.date),
              workHours: curr.work_in_hours,
              description: curr.description,
            });
          }
          return prev;
        }, tempItems);

        if (tempItems.length !== 0) {
          prevVal.push({title: currVal.title, data: tempItems});
        }
        return prevVal;
      }, tempVal);
    });
  };

  const handlePress = () => setIsHidden(v => !v);

  return (
    <Modal
      isVisible={value}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={500}
      animationOutTiming={500}
      contentStyle={styles.modal}>
      <View style={styles.main}>
        <View>
          <Typography type="title" style={styles.title}>
            Add Timesheet
          </Typography>

          <TimesheetForm
            onSubmit={onAdd}
            isHidden={isHidden}
            defaultData={formDefaultData}
          />

          <TouchableOpacity onPress={handlePress}>
            <View style={styles.arrow}>
              <RightArrow />
            </View>
          </TouchableOpacity>
        </View>
        <TimesheetContext.Provider value={{onDelete: onDelete, onEdit: onEdit}}>
          <SectionListTimesheet data={addedTimesheet} />
        </TimesheetContext.Provider>

        {!keyboardIsVisible && (
          <View style={[flexStyles.horizontal, styles.btns]}>
            <Button
              title="Cancel"
              onPress={() => onChange(false)}
              textStyle={styles.btnText}
              style={styles.cancel}
            />
            <Button
              title="Save"
              onPress={() => onChange(false)}
              style={styles.save}
            />
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-start',
    height: '100%',
  },
  main: {
    width: '100%',
    backgroundColor: colors.WHITE,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    paddingHorizontal: 16,
    marginTop: '10%',
    height: '95%',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.SECONDARY,
    fontFamily: fonts.ARIAL_BOLD,
    marginVertical: 24,
  },
  arrow: {
    transform: [{rotate: '-90 deg'}],
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 4,
    backgroundColor: colors.WHITE,
    borderRadius: 20,
  },
  btns: {
    height: '5%',
    alignSelf: 'flex-end',
    justifyContent: 'space-around',
  },
  cancel: {
    backgroundColor: colors.WHITE,
    borderWidth: 2,
    width: '45%',
  },
  btnText: {
    color: colors.PRIMARY,
  },
  save: {
    width: '45%',
  },
});

export default CreateTimesheet;
