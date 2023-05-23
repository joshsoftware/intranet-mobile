import React from 'react';

import ScreenWrapper from '../component/ScreenWrapper';
import Card from '../component/Card';
import DetailRow from '../component/DetailRow';
import Typography from '../../../components/typography';

import {IDeploymentDetails} from '../interface/deployments';

const Deployments = ({
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
}: IDeploymentDetails) => {
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
          <Typography type="text">{interviewRejected}</Typography>
        </Card>
      )}

      {deploymentNote && (
        <Card title="Deployment Note">
          <Typography type="text">{deploymentNote}</Typography>
        </Card>
      )}

      {remark && (
        <Card title="Remark">
          <Typography type="text">{remark}</Typography>
        </Card>
      )}
    </ScreenWrapper>
  );
};

export default React.memo(Deployments);
