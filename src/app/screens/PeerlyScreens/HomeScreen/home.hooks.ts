import {useMutation, useQueryClient} from 'react-query';
import {AxiosError} from 'axios';

import {loginPeerlySystemRequest} from '../../../services/Peerly';
import toast from '../../../utils/toast';
import {PeerlyError} from '../../../services/Peerly/types';

export const loginPeerlySystem = () => {
  const queryClient = useQueryClient();

  const {mutate, isLoading} = useMutation(
    (payload: any) => loginPeerlySystemRequest(),
    {
      onSuccess: (successData, variables) => {
        toast(successData.data.message);
      },
      onError: (err: AxiosError) => {
        const error = err.response?.data as PeerlyError;
        //toast(error.message || 'Failed to delete timesheet.', 'error');
      },
    },
  );

  return {mutate, isLoading};
};
