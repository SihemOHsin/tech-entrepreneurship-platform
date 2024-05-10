export class BusinessDTO {
  id: number;
  user: User;
  bizname: string;
  dateOfBizCreation: Date;
  industry: string;
  location: string;
  businessLogo: string;
}

export class User {
  id: number;
  firstname: string;
  lastname: string;
  roles: Role[];
}

export class Role {
  id: number;
  name: string;
}
