import {User} from '../../screens/PeerlyScreens/types';

interface Data {
  User: User;
  NewUserCreated: boolean;
  AuthToken: string;
}

export interface IPeerlyLoginResponse {
  data: Data;
}

export type PeerlyError = {
  status: string;
  message: string;
};
