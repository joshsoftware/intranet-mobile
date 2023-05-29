import {DEPLOYMENT_GROUP, MANAGEMENT_GROUP} from '../../constant/roles';
import {UserRole} from '../../context/user.context';

export const isManagement = (userRole: UserRole = 'Employee') =>
  MANAGEMENT_GROUP.includes(userRole);

export const isDeployment = (userRole: UserRole = 'Employee') =>
  DEPLOYMENT_GROUP.includes(userRole);
