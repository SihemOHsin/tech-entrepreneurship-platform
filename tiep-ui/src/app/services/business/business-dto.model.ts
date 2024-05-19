export class BusinessDTO {
  id: number;
  user: User ; // Modify the user field to include userId directly
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
