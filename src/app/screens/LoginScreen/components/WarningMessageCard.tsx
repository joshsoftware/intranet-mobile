import React from 'react';

import PrivateEmailCard from './PrivateEmailCard';
import PersonalEmailCard from './PersonalEmailCard';
import AccountNotPresentCard from './AccountNotPresentCard';

import {AuthType, IntranetErrorCode} from '../../../services/api/login';

interface IProps {
  type: AuthType;
  code: IntranetErrorCode;
  email: string;
}

function WarningMessageCard(props: IProps) {
  switch (props.code) {
    case IntranetErrorCode.PRIVATE_EMAIL:
      return <PrivateEmailCard email={props.email} />;
    case IntranetErrorCode.PERSONAL_EMAIL:
      return <PersonalEmailCard email={props.email} type={props.type} />;
    case IntranetErrorCode.ABSENT_IN_DATABASE:
    default:
      return <AccountNotPresentCard email={props.email} />;
  }
}

export default WarningMessageCard;
