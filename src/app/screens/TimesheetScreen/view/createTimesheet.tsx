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
import {convertFailedTimesheetsResponse} from '../../../utils/timesheet';
import toast from '../../../utils/toast';

import {ITimesheetSectionListItem, Timesheet} from '../interface';
import colors from '../../../constant/colors';
import fonts from '../../../constant/fonts';
import strings from '../../../constant/strings';
import {ArrowUp, ArrowDown} from '../../../constant/icons';
import {ISO_DATE_FROMAT} from '../../../constant/date';

type Props = {
  isVisible: boolean;
  toggleModal: () => void;
  userId: string;
  userName?: string;
  defaultDate?: string;
};

const CreateTimesheet = ({
  toggleModal,
  isVisible,
  userId,
  userName,
  defaultDate,
}: Props) => {
  const [addedTimesheet, setAddedTimesheet] = useState<
    ITimesheetSectionListItem[]
  >([]);
  const [formDefaultData, setFormDefaultData] = useState<Timesheet | undefined>(
    undefined,
  );
  const [isFormVisible, setIsFormVisible] = useState<boolean>(true);
  const [isShowToast, setIsShowToast] = useState<Boolean>(false);
  const {isKeyboardShown} = useIsKeyboardShown();

  const {
    mutate,
    isSuccess,
    isLoading,
    isPartiallyFailed,
    failedTimesheets,
    message,
    reset: resetAddTimesheet,
  } = useAddTimesheet();

  // mutation function
  const mutationFunc = useCallback(
    (data: ITimesheetSectionListItem[]) => {
      const timesheetsData = data.flatMap(section =>
        section.data.map(value => ({
          project_id: value.project_id,
          date: dateFormate(value.date, ISO_DATE_FROMAT),
          duration: convertToMins(value.work_in_hours),
          description: value.description,
        })),
      );

      return {
        time_sheets_attributes: timesheetsData,
        user_id: userId,
      };
    },
    [userId],
  );

  // handle on save action and request to create timesheet
  const onSave = () => {
    mutate(mutationFunc(addedTimesheet));
  };

  const toggleForm = useCallback(() => setIsFormVisible(v => !v), []);

  // helps to add a timesheet item to addedTimesheet state
  const onAddTimesheet = useCallback((data: Timesheet) => {
    const isDuplicateEntry = (section: ITimesheetSectionListItem) => {
      return section.data.some(item => item.timesheet_id === data.timesheet_id);
    };

    const updateSections = (sections: ITimesheetSectionListItem[]) => {
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
      setFormDefaultData(undefined);
      return sections;
    };
    Keyboard.dismiss();
    setAddedTimesheet(sections => updateSections([...sections]));
  }, []);

  // handles the delete timesheet
  const onDelete = useCallback((timesheetData: Timesheet) => {
    setAddedTimesheet(sections => {
      const updatedSections = sections.reduce(
        (prevVal: ITimesheetSectionListItem[], currVal) => {
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

  // handles edit a timesheet by removing from addedTimesheet to formDefaultData
  const onEdit = (timesheetData: Timesheet) => {
    setAddedTimesheet(sections => {
      const updatedSections = sections.reduce(
        (prevVal: ITimesheetSectionListItem[], currVal) => {
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

  // resets all the states
  const resetStates = useCallback(() => {
    setAddedTimesheet([]);
    setFormDefaultData(undefined);
    setIsFormVisible(true);
    toggleModal();
  }, [toggleModal]);

  const onModalHide = () => {
    if (isShowToast) {
      toast(message!);
      setIsShowToast(v => !v);
    }
  };

  // if add timesheet is succeed then reset all the states
  useEffect(() => {
    if (isSuccess) {
      resetStates();
      setIsShowToast(v => !v);
    }
  }, [isSuccess, resetStates]);

  useEffect(() => {
    if (isPartiallyFailed && failedTimesheets) {
      setAddedTimesheet(sections =>
        convertFailedTimesheetsResponse(sections, failedTimesheets),
      );
    }
  }, [isPartiallyFailed, failedTimesheets]);

  useEffect(() => {
    if (!isVisible && isPartiallyFailed) {
      resetAddTimesheet();
    }
  }, [isVisible, isPartiallyFailed, resetAddTimesheet]);

  return (
    <Modal
      isVisible={isVisible}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={500}
      animationOutTiming={500}
      onBackButtonPress={resetStates}
      onBackdropPress={resetStates}
      onModalHide={onModalHide}
      contentStyle={styles.main}>
      <View style={styles.form}>
        <Typography type="title" style={styles.title}>
          Add Timesheet {userName && `for ${userName}`}
        </Typography>

        <TimesheetForm
          onSubmit={onAddTimesheet}
          isFormVisible={isFormVisible}
          defaultData={formDefaultData}
          defaultDate={defaultDate}
          toggleForm={toggleForm}
          userId={userId}
        />
      </View>
      <Touchable type="opacity" onPress={toggleForm} style={styles.arrow}>
        {isFormVisible ? (
          <ArrowUp width={22} height={22} />
        ) : (
          <ArrowDown width={22} height={22} />
        )}
      </Touchable>

      {isPartiallyFailed && (
        <Typography type="error" style={styles.errorText}>
          {message}
        </Typography>
      )}

      <View style={styles.list}>
        <SectionListTimesheet
          isLoading={false}
          showEmptyListIcon={false}
          sections={addedTimesheet}
          onEdit={onEdit}
          onDelete={onDelete}
          emptyListMessage={strings.NO_TIMESHEET_ADDED}
        />
      </View>

      {!isKeyboardShown && (
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
    width: 48,
    height: 48,
    elevation: 3,
    shadowColor: colors.SECONDARY,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
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
    shadowColor: colors.SECONDARY,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
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
  errorText: {
    paddingHorizontal: 16,
  },
});

export default memo(CreateTimesheet);
