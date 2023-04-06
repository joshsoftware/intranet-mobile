import React, {useEffect, useState} from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Modal from '../../../components/modal';
import TimesheetForm from '../components/timesheetForm';
import Typography from '../../../components/typography';
import SectionListTimesheet from '../components/sectionListTimesheet';
import Button from '../../../components/button/button';

import {dateFormater} from '../../../utils/dateFormater';

import {TimesheetFormData, Timesheet} from '../interfaces';

import colors from '../../../constant/colors';
import fonts from '../../../constant/fonts';
import strings from '../../../constant/strings';
import {RightArrow} from '../../../constant/icons';

import {flexStyles} from '../../../../styles';

type Props = {
  isVisible: boolean;
  toggleModal: (value: boolean) => void;
};

const CreateTimesheet = ({toggleModal, isVisible}: Props) => {
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
    const reset = () => {
      setFormDefaultData(undefined);

      if (typeof resetField !== 'undefined') {
        resetField('project');
        resetField('date');
        resetField('workHours');
        resetField('description');
      }
    };

    if (data) {
      let isCategoryFound = false;
      setAddedTimesheet(sections => {
        sections.forEach(section => {
          if (section.title === data.project) {
            let isPresent = false;
            isCategoryFound = true;

            section.data.forEach(item => {
              if (
                item.timesheet_id ===
                data.project + dateFormater(data.date)
              ) {
                isPresent = true;
              }
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
  };

  const onDelete = (timesheetData: Timesheet) => {
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
  };

  const onEdit = (timesheetData: Timesheet) => {
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
            return false;
          }
        });

        if (data.length !== 0) {
          prevVal.push({title: currVal.title, data: data});
        }
        return prevVal;
      }, list),
    );
  };

  const onSave = () => {
    setAddedTimesheet([]);
    toggleModal(false);
  };

  const handlePress = () => setIsHidden(v => !v);

  return (
    <Modal
      isVisible={isVisible}
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

          <TouchableOpacity onPress={handlePress} style={styles.arrow}>
            <View>
              <RightArrow />
            </View>
          </TouchableOpacity>
        </View>

        <SectionListTimesheet
          timesheetListData={addedTimesheet}
          onEdit={onEdit}
          onDelete={onDelete}
        />

        {!keyboardIsVisible && (
          <View style={[flexStyles.horizontal, styles.btns]}>
            <Button
              title="Cancel"
              onPress={() => toggleModal(false)}
              textStyle={styles.btnText}
              style={styles.cancel}
            />
            <Button title="Save" onPress={onSave} style={styles.save} />
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
    width: 48,
    height: 48,
    elevation: 4,
    backgroundColor: colors.WHITE,
    borderRadius: 24,
  },
  btns: {
    height: '5%',
    alignSelf: 'flex-end',
    justifyContent: 'space-around',
    paddingBottom: 20,
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
