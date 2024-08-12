import {useQuery} from 'react-query';
import {getValidateImage} from '../services/validateImageUrl';

export const useValidateImageUrl = (imageUrl: string) => {
  const {data, refetch} = useQuery(
    ['checkImageUrl', imageUrl],
    () => getValidateImage(imageUrl),
    {
      enabled: !!imageUrl,
      retry: false,
    },
  );
  return {
    isValidImage: data || false,
    refetch,
  };
};
