import React from 'react';
import {Image, useWindowDimensions} from 'react-native';

interface EventBannerProps {
  uri: string;
}

const EventBanner = (props: EventBannerProps) => {
  const {uri} = props;

  const {width} = useWindowDimensions();

  const height = width / 3;

  return <Image style={{height: height, width: width}} source={{uri}} />;
};

export default EventBanner;
