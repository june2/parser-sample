export interface IInfo {
  name?: IName;
  addrs?: Array<IAddr>;
}

export interface IAddr {
  addr1?: string;
  addr2?: string;
}

export interface IName {
  family?: string;
  given?: string;
  middle?: string;
}

export interface IMembership {
  grade?: string;
  id?: string;
}

export class UserDto {
  info?: IInfo;
  membership?: IMembership;
}
