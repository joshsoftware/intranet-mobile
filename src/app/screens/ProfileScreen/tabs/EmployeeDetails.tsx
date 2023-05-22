import React from 'react';
import {StyleSheet, Text} from 'react-native';

import ScreenWrapper from '../component/ScreenWrapper';
import Card from '../component/Card';
import DetailRow from '../component/DetailRow';
import ProjectAccordion from '../component/ProjectAccordion';

import colors from '../../../constant/colors';
import {IEmployeeDetailData} from '../interface/employeeDetail';

interface Props {
  data: IEmployeeDetailData;
}

const EmployeeDetails = ({data}: Props) => {
  const {employeeId, emailId, employeeLocation} = data.employeeDetail;
  const {designation, designationTrack} = data.designationDetails;
  const {assessmentPlatform, assessmentMonths} = data.assessmentDetails;
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
  } = data.otherDetails;

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
        <DetailRow label="Function" value={data.otherDetails.function} />
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
      <Card title="Description">
        <Text style={styles.descriptionText}>{description}</Text>
      </Card>
      <Card title="Current Projects">
        <ProjectAccordion data={data.currentProjects} />
      </Card>
      <Card title="Previous Projects">
        <ProjectAccordion data={data.previousProjects} />
      </Card>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  descriptionText: {
    color: colors.SECONDARY,
  },
});

export default React.memo(EmployeeDetails);
