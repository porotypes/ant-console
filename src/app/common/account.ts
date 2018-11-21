import { Role } from './role';

export class Account {
  id: number;
  username: string;
  password: string;
  nickname: string;
  address: string;
  email: string;
  phoneNumber: number;
  companyId: number;
  companyName: string;
  salt: string;
  roles: Role[];
  display: boolean;
  state: boolean;
  creator: string;
  updator: string;
  createTime: Date;
  updateTime: Date;
}
