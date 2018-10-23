export class Role {
  id: number;
  roleName: string;
  permissions: number[];
  companyId: number;
  users: any[];
  display: string;
  state: boolean;
  createTime: Date;
  updateTime: Date;
  creator: string;
  updator: string;
}
