export const getValidateImage = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl, {method: 'HEAD'});
    return response.ok;
  } catch (error) {
    return false;
  }
};
