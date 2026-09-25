import { apiCall } from '../api';
import { TALK_IT_OUT_ROUTE } from '../../constant/apiRoutes';
import { TalkItOutResponse } from './types';

export const getTalkItOut = async () => {
    return apiCall<undefined, TalkItOutResponse>({
        method: 'GET',
        url: TALK_IT_OUT_ROUTE,
    });
}