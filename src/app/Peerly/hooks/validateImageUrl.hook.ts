import { useQuery } from '@tanstack/react-query';
import { getValidateImage } from '../services/validateImageUrl';

export const useValidateImageUrl = (imageUrl: string) => {
  const { data, refetch } = useQuery({
    queryKey: ['checkImageUrl', imageUrl],
    queryFn: () => getValidateImage(imageUrl),
    enabled: !!imageUrl,
    retry: false,
  });
  return {
    isValidImage: data || false,
    refetch,
  };
};
