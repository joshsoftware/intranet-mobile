import {IPublicProfileData} from './publicProfile';
import {IPersonalDetailsData} from './personalDetails';
import {IEmployeeDetailData} from './employeeDetail';
import {ISkillsData} from './skills';
import {IAssetData} from './assets';
import {IDeploymentDetails} from './deployments';

export interface IUserProfileData {
  publicProfile: IPublicProfileData;
  privateProfile: IPersonalDetailsData;
  employeeDetail: IEmployeeDetailData;
  skills: ISkillsData;
  assets: IAssetData;
  deployment: IDeploymentDetails;
}
