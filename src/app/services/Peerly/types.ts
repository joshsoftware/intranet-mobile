import {User} from '../../screens/PeerlyScreen/types';

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





