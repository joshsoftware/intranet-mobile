import React from 'react';
import {StyleSheet, Text} from 'react-native';

import ScreenWrapper from '../component/ScreenWrapper';
import Card from '../component/Card';
import DetailRow from '../component/DetailRow';

import {IDeploymentDetails} from '../interface/deployments';

interface Props {
  data: IDeploymentDetails;
}

const Deployments = ({data}: Props) => {
  const {
    availableFrom,
    cvLink,
    deploymentOwnerEmails,
    ownedByEmails,
    OETA: oeta,
    NETA: neta,
    availableHours,
    interviewRejected,
    remark,
    deploymentNote,
  } = data;

  console.log(data);

  return (
    <ScreenWrapper>
      <Card title="Deployment Details">
        <DetailRow label="Available From" value={availableFrom} />
        <DetailRow label="CV Link" value={cvLink} />
        <DetailRow
          label="Deployment Owner Emails"
          value={deploymentOwnerEmails}
        />
        <DetailRow label="Owned by Emails" value={ownedByEmails} />
        <DetailRow label="OETA" value={oeta} />
        <DetailRow label="NETA" value={neta} />
        <DetailRow label="Available Hours" value={`${availableHours}`} />
      </Card>

      {interviewRejected && (
        <Card title="Interview Rejected">
          <Text>{interviewRejected}</Text>
        </Card>
      )}

      {deploymentNote && (
        <Card title="Deployment Note">
          <Text>{deploymentNote}</Text>
        </Card>
      )}

      {remark && (
        <Card title="Remark">
          <Text>{remark}</Text>
        </Card>
      )}
    </ScreenWrapper>
  );
};

export default React.memo(Deployments);
