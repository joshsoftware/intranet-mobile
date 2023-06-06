import React from 'react';

import ScreenWrapper from '../component/ScreenWrapper';
import Card from '../component/Card';
import DetailRow from '../../../components/DetailRow';
import ProjectAccordion from '../component/ProjectAccordion';
import Typography from '../../../components/typography';

import {IEmployeeDetailData} from '../interface/employeeDetail';

const EmployeeDetails = (props: IEmployeeDetailData) => {
  const {
    employeeDetail,
    designationDetails,
    assessmentDetails,
    otherDetails,
    currentProjects,
    previousProjects,
  } = props || {};

  const {employeeId, emailId, employeeLocation} = employeeDetail || {};
  const {designation, designationTrack} = designationDetails || {};
  const {assessmentPlatform, assessmentMonths} = assessmentDetails || {};
  const {
    grade,
    company,
    businessUnit,
    subBusinessUnit,
    dateOfRelieving,
    notificationEmails,
    defaultLeaveApprover,
    source,
    project,
    description,
  } = otherDetails || {};

  return (
    <ScreenWrapper>
      <Card title="Employee Details">
        <DetailRow label="Employee Id" value={employeeId} />
        <DetailRow label="Email Id" value={emailId} />
        <DetailRow label="Employee Location" value={employeeLocation} />
      </Card>
      <Card title="Designation Details">
        <DetailRow label="Designation" value={designation} />
        <DetailRow label="Designation Track" value={designationTrack} />
      </Card>
      <Card title="Assessment Details">
        <DetailRow label="Assessment Platform" value={assessmentPlatform} />
        <DetailRow
          label="Assessment Months"
          value={assessmentMonths?.join(',')}
        />
      </Card>
      <Card title="Other Details">
        <DetailRow label="Grade" value={grade} />
        <DetailRow label="Company" value={company} />
        <DetailRow label="Business Unit" value={businessUnit} />
        <DetailRow label="Sub Business Unit" value={subBusinessUnit} />
        <DetailRow label="Function" value={otherDetails.function} />
        <DetailRow label="Date of Relieving" value={dateOfRelieving} />
        <DetailRow
          label="Notification Emails"
          value={notificationEmails?.join(',')}
        />
        <DetailRow
          label="Default Leave Approver"
          value={defaultLeaveApprover}
        />
        <DetailRow label="Source" value={source} />
        <DetailRow label="Project" value={project} />
      </Card>
      {description && (
        <Card title="Description">
          <Typography type="text">{description}</Typography>
        </Card>
      )}
      <Card title="Current Projects">
        <ProjectAccordion data={currentProjects} />
      </Card>
      <Card title="Previous Projects">
        <ProjectAccordion data={previousProjects} />
      </Card>
    </ScreenWrapper>
  );
};

export default React.memo(EmployeeDetails);
