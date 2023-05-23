import {ToastAndroid} from 'react-native';
import {useMutation, useQuery, useQueryClient} from 'react-query';

import {
  getAllSkillRequest,
  getUserRequest,
  updateSkillRequest,
} from '../../services/api/userProfile';
import toast from '../../utils/toast';

import strings from '../../constant/strings';

function useProfileData() {
  const {data, refetch, isError, isRefetchError, isLoading} = useQuery({
    queryKey: ['user'],
    queryFn: getUserRequest,
  });

  return {
    data: data?.data?.data,
    refetch,
    isError,
    isRefetchError,
    isLoading,
  };
}

export function useSkillList() {
  const {data} = useQuery({
    queryKey: ['getSkills'],
    queryFn: getAllSkillRequest,
  });

  const skillList =
    data?.data.data?.map(value => ({
      label: value,
      value: value,
    })) || [];

  return skillList;
}

export function useUpdateSkills(closeModal: () => void) {
  const queryClient = useQueryClient();

  const {isSuccess, isLoading, mutate, isError} = useMutation(
    updateSkillRequest,
    {
      onSuccess: () => {
        closeModal();
        ToastAndroid.showWithGravity(
          strings.UPDATE_SKILLS_SUCCESS,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );

        queryClient.invalidateQueries(['user']);
      },
      retry: false,
      onError: error => {
        if (error) {
          toast(strings.UPDATE_SKILLS_ERROR, 'error');
        }
      },
    },
  );

  return {
    updateSkills: mutate,
    isLoading,
    isSuccess,
    isError,
  };
}

export default useProfileData;
