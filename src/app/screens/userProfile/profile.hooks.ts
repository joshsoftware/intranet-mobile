import {useMutation, useQuery} from 'react-query';
import strings from '../../constant/strings';
import {
  getAllSkillRequest,
  updateSkillRequest,
} from '../../services/api/userProfile';
import bottomToast from '../../utils/toast';

export function useSkillList() {
  const {data} = useQuery({
    queryKey: ['getskills'],
    queryFn: getAllSkillRequest,
    initialData: [],
  });

  const skillList =
    data?.map(value => ({
      label: value,
      value: value,
    })) || [];

  return skillList;
}

export function useUpdateSkills(toggleModal: () => void, refresh: () => void) {
  const mutation = useMutation(updateSkillRequest, {
    onSuccess: () => {
      toggleModal();
      refresh();
      bottomToast(strings.UPDATE_SKILLS_SUCCESS);
    },
    retry: false,
    onError: error => {
      if (error) {
        toggleModal();
        bottomToast(strings.UPDATE_SKILLS_ERROR, true);
      }
    },
  });

  return {
    updateSkills: mutation.mutate,
    isLoading: mutation.isLoading,
  };
}
