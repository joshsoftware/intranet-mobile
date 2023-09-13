import React from 'react';

import AbsentInstructionCard from './AbsentInstructionCard';
import AppleLoginInstructionCard from './AppleInstructionCard';
import GoogleInstructionCard from './GoogleInstructionCard';

import {AuthType, IntranetErrorCode} from '../../../services/api/login';

interface IProps {
  type: AuthType;
  code: IntranetErrorCode;
}

function InstructionCard(props: IProps) {
  const {code, type} = props;

  switch (code) {
    case IntranetErrorCode.ABSENT_IN_DATABASE:
      return <AbsentInstructionCard />;
    case IntranetErrorCode.PRIVATE_EMAIL:
    case IntranetErrorCode.PERSONAL_EMAIL:
    default:
      switch (type) {
        case AuthType.GOOGLE:
          return <GoogleInstructionCard />;
        case AuthType.APPLE:
          return <AppleLoginInstructionCard />;
        default:
          return (
            <>
              <GoogleInstructionCard />
              <AppleLoginInstructionCard />
            </>
          );
      }
  }
}

export default InstructionCard;
