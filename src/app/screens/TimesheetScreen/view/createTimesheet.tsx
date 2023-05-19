import React, {memo, useCallback, useEffect, useState} from 'react';
import {Alert, Keyboard, StyleSheet, View} from 'react-native';

import {useIsKeyboardShown} from '../../../hooks/useIsKeyboardShown';
import Modal from '../../../components/modal';
import TimesheetForm from '../component/timesheetForm';
import Typography from '../../../components/typography';
import SectionListTimesheet from '../component/sectionListTimesheet';
import Button from '../../../components/button';
import Touchable from '../../../components/touchable';
import {useAddTimesheet} from '../timesheet.hooks';

import {convertToMins, dateFormate} from '../../../utils/date';

import {Timesheet} from '../interface';
import colors from '../../../constant/colors';
import fonts from '../../../constant/fonts';
import strings from '../../../constant/strings';
import {Arrow} from '../../../constant/icons';
import {ISO_DATE_FROMAT} from '../../../constant/date';

type Props = {
  isVisible: boolean;
  toggleModal: () => void;
  userId: string;
};

type CreateTimesheetDataprop = {
  title: string;
  data: Timesheet[];
};

const CreateTimesheet = ({toggleModal, isVisible, userId}: Props) => {
  const [addedTimesheet, setAddedTimesheet] = useState<
    CreateTimesheetDataprop[]
  >([]);
  const [formDefaultData, setFormDefaultData] = useState<Timesheet | undefined>(
    undefined,
  );
  const [isFormVisible, setIsFormVisible] = useState<boolean>(true);
  const isKeyboardVisible = useIsKeyboardShown();

  const {mutate, isSuccess, isLoading} = useAddTimesheet();

  // This logic need to more optimize with changing API structure
  const mutationFunc = useCallback(
    (data: CreateTimesheetDataprop[]) => {
      const time_sheets_data: any = {};
      data.forEach(section =>
        section.data.map((value, index) => {
          time_sheets_data[index + 1] = {
            project_id: value.project_id,
            date: dateFormate(value.date, ISO_DATE_FROMAT),
            duration: convertToMins(value.work_in_hours),
            description: value.description,
          };
        }),
      );

      return {
        user: {
          time_sheets_attributes: time_sheets_data,
          user_id: userId,
        },
      };
    },
    [userId],
  );

  const onSave = () => {
    mutate(mutationFunc(addedTimesheet));
  };

  const toggleForm = useCallback(() => setIsFormVisible(v => !v), []);

  const onAddTimesheet = useCallback((data: Timesheet, reset?: Function) => {
    const isDuplicateEntry = (section: CreateTimesheetDataprop) => {
      return section.data.some(item => item.timesheet_id === data.timesheet_id);
    };

    const updateSections = (sections: CreateTimesheetDataprop[]) => {
      const foundSection = sections.find(
        section => section.title === data.project,
      );

      if (foundSection) {
        if (isDuplicateEntry(foundSection)) {
          Alert.alert(strings.NOT_ALLOWED, strings.DUBLICATE_ENTRY_ERROR);
          return sections;
        } else {
          foundSection.data.push(data);
        }
      } else {
        sections.push({
          title: data.project + '',
          data: [data],
        });
      }
      setIsFormVisible(v => !v);
      reset?.();
      setFormDefaultData(undefined);
      return sections;
    };
    Keyboard.dismiss();
    setAddedTimesheet(sections => updateSections([...sections]));
  }, []);

  const onDelete = useCallback((timesheetData: Timesheet) => {
    setAddedTimesheet(sections => {
      const updatedSections = sections.reduce(
        (prevVal: CreateTimesheetDataprop[], currVal) => {
          const data = currVal.data.filter(
            item => item.timesheet_id !== timesheetData.timesheet_id,
          );
          if (data.length !== 0) {
            prevVal.push({title: currVal.title, data: data});
          }
          return prevVal;
        },
        [],
      );
      return updatedSections;
    });
  }, []);

  const onEdit = (timesheetData: Timesheet) => {
    setAddedTimesheet(sections => {
      const updatedSections = sections.reduce(
        (prevVal: CreateTimesheetDataprop[], currVal) => {
          const data = currVal.data.filter(
            item => item.timesheet_id !== timesheetData.timesheet_id,
          );
          if (data.length !== 0) {
            prevVal.push({title: currVal.title, data: data});
          }
          return prevVal;
        },
        [],
      );

      const updatedTimesheet = sections.find(section =>
        section.data.some(
          item => item.timesheet_id === timesheetData.timesheet_id,
        ),
      );

      if (updatedTimesheet) {
        setFormDefaultData({
          ...timesheetData,
          project: timesheetData.project_id,
          work_in_hours: timesheetData.work_in_hours,
          description: timesheetData.description,
          date: timesheetData.date,
        });
        !isFormVisible && toggleForm();
      }

      return updatedSections;
    });
  };

  const resetStates = useCallback(() => {
    setAddedTimesheet([]);
    setFormDefaultData(undefined);
    setIsFormVisible(true);
    toggleModal();
  }, [toggleModal]);

  useEffect(() => {
    if (isSuccess) {
      resetStates();
    }
  }, [isSuccess, resetStates]);

  return (
    <Modal
      isVisible={isVisible}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={500}
      animationOutTiming={500}
      onBackButtonPress={toggleModal}
      onBackdropPress={toggleModal}
      contentStyle={styles.main}>
      <View style={styles.form}>
        <Typography type="title" style={styles.title}>
          Add Timesheet
        </Typography>

        <TimesheetForm
          onSubmit={onAddTimesheet}
          isFormVisible={isFormVisible}
          defaultData={formDefaultData}
          toggleForm={toggleForm}
          userId={userId}
        />
      </View>
      <Touchable type="opacity" onPress={toggleForm} style={styles.arrow}>
        <Arrow width={22} height={22} />
      </Touchable>

      <View style={styles.list}>
        <SectionListTimesheet
          sections={addedTimesheet}
          onEdit={onEdit}
          onDelete={onDelete}
          emptyListMessage={strings.NO_TIMESHEET_ADDED}
        />
      </View>

      {!isKeyboardVisible && (
        <View style={styles.btns}>
          <Button title="Cancel" type="secondary" onPress={resetStates} />
          <Button
            title="Save"
            type="primary"
            onPress={onSave}
            isLoading={isLoading}
            disabled={!addedTimesheet.length}
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
    marginRight: 2,
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
    paddingHorizontal: 16,
  },
  btns: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 10,
    paddingHorizontal: 16,
    width: '100%',
  },
  btnText: {
    color: colors.PRIMARY,
  },
  list: {
    flex: 1,
    width: '100%',
  },
});

export default memo(CreateTimesheet);
