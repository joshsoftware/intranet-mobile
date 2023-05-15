import React, {memo, useCallback, useState} from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useMutation} from 'react-query';

import {useIsKeyboardShown} from '../../../hooks/useIsKeyboardShown';
import Modal from '../../../components/modal';
import TimesheetForm from '../component/timesheetForm';
import Typography from '../../../components/typography';
import SectionListTimesheet from '../component/sectionListTimesheet';
import Button from '../../../components/button';

import {createTimesheetRequest} from '../../../services/timesheet/createTimesheet';
import bottomToast from '../../../utils/toast';

import {Timesheet} from '../interface';

import colors from '../../../constant/colors';
import fonts from '../../../constant/fonts';
import strings from '../../../constant/strings';
import {Arrow} from '../../../constant/icons';
import {timeConversion} from '../../../constant/timesheet';

import {flexStyles} from '../../../../styles';

type Props = {
  isVisible: boolean;
  toggleModal: () => void;
  userId: string;
  current_user: string;
};

type CreateTimesheetDataprop = {
  title: string;
  data: Timesheet[];
}[];

const CreateTimesheet = ({
  toggleModal,
  isVisible,
  userId,
  current_user,
}: Props) => {
  const [addedTimesheet, setAddedTimesheet] = useState<
    Array<{
      title: string;
      data: Timesheet[];
    }>
  >([]);
  const [formDefaultData, setFormDefaultData] = useState<Timesheet>();
  const [isFormVisible, setIsFormVisible] = useState<boolean>(true);
  const isKeyboardVisible = useIsKeyboardShown();

  const handlePress = useCallback(
    (value?: boolean) =>
      value ? setIsFormVisible(value) : setIsFormVisible(v => !v),
    [],
  );

  const mutationFunc = useCallback(
    (data: CreateTimesheetDataprop) => {
      const time_sheets_data: any = {};
      data.forEach(section =>
        section.data.map((value, index) => {
          time_sheets_data[index + value.project_id] = {
            project_id: value.project_id,
            date: value.date,
            duration:
              timeConversion[
                value.work_in_hours as keyof typeof timeConversion
              ],
            description: value.description,
          };
        }),
      );

      return createTimesheetRequest({
        user: {
          time_sheets_attributes: time_sheets_data,
          user_id: userId,
          current_user: current_user,
        },
      });
    },
    [current_user, userId],
  );

  const mutation = useMutation({
    mutationFn: mutationFunc,
    onSuccess: data => {
      bottomToast(data.data.message);
      setAddedTimesheet(data.data.data ? data.data.data : []);
      if (!data.data.data) {
        toggleModal();
      }
    },
    onError: () => bottomToast(strings.CREATE_ERROR, true),
  });

  const onSave = () => {
    mutation.mutate(addedTimesheet);
  };

  const onAdd = useCallback(
    (data: Timesheet, resetField?: Function) => {
      const reset = () => {
        setFormDefaultData(undefined);

        if (typeof resetField !== 'undefined') {
          resetField('project');
          resetField('date');
          resetField('work_in_hours');
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
              isCategoryFound = true;

              const isPresent = section.data.find(
                item => item.timesheet_id === data.timesheet_id,
              );
              if (isPresent) {
                Alert.alert(strings.NOT_ALLOWED, strings.DUBLICATE_ENTRY_ERROR);
              } else {
                section.data.push(data);
                reset();
              }
            }
          });

          if (!isCategoryFound) {
            sections.push({
              title: data.project + '',
              data: [data],
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

  const onEdit = (timesheetData: Timesheet) => {
    const list: {title: string; data: Timesheet[]}[] = [];

    setAddedTimesheet(sections =>
      sections.reduce((prevVal, currVal) => {
        const data = currVal.data.filter(item => {
          if (item.timesheet_id !== timesheetData.timesheet_id) {
            return true;
          } else {
            setFormDefaultData({
              ...item,
              project: item.project_id,
              work_in_hours: item.work_in_hours,
              description: item.description,
              date: item.date,
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
  };

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
      <View style={[styles.horizontalPad, styles.form]}>
        <Typography type="title" style={styles.title}>
          Add Timesheet
        </Typography>

        <TimesheetForm
          onSubmit={onAdd}
          isFormVisible={isFormVisible}
          toggleForm={handlePress}
          defaultData={formDefaultData}
          userId={userId}
        />
      </View>
      <TouchableOpacity onPress={() => handlePress()} style={styles.arrow}>
        <Arrow width={22} height={22} />
      </TouchableOpacity>

      <SectionListTimesheet
        sections={addedTimesheet}
        timesheetListData={addedTimesheet}
        onEdit={onEdit}
        onDelete={onDelete}
        style={styles.horizontalPad}
        emptyListMessage={strings.NO_TIMESHEET_ADDED}
      />

      {!isKeyboardVisible && (
        <View
          style={[flexStyles.horizontal, styles.btns, styles.horizontalPad]}>
          <Button title="Cancel" type="secondary" onPress={toggleModal} />

          <Button
            title="Save"
            type="primary"
            onPress={onSave}
            isLoading={mutation.isLoading}
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
    width: '100%',
  },
});

export default memo(CreateTimesheet);
