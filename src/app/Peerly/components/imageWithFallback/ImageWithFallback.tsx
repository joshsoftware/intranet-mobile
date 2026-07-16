import React, {memo, ReactNode} from 'react';
import {Image, StyleProp, ImageStyle} from 'react-native';
import {useValidateImageUrl} from '../../hooks/validateImageUrl.hook';

interface ImageWithFallbackProp {
  imageUrl: string;
  initials: ReactNode;
  imageStyle: StyleProp<ImageStyle>;
}

const ImageWithFallback: React.FC<ImageWithFallbackProp> = ({
  imageUrl,
  initials,
  imageStyle,
}) => {
  const {isValidImage} = useValidateImageUrl(imageUrl);
  return (
    <>
      {isValidImage ? (
        <Image source={{uri: imageUrl}} style={[imageStyle]} />
      ) : (
        <>{initials}</>
      )}
    </>
  );
};

export default memo(ImageWithFallback);
