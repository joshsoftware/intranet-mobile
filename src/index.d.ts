import {RootStackParamList} from './app/navigation/types';

declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare global {
  declare module '*.png';

  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
