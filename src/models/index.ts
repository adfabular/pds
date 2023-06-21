export interface ILogin {
  Email: string;
  PasswordPds: string;
}

export interface IEmployeeInfo {
  EmployeeID?: string;
  LName?: string;
  FName?: string;
  MName?: string;
  Nick?: string;
  Barangay?: string;
  Address?: string;
  Province?: string;
  Municipality?: string;
  ZipCode?: string;
  Citizenship?: string;
  CivilStatus?: string;
  Gender?: string;
  BirthDate?: Date;
  BPlace?: string;
  TelNo?: string;
  MobileNo?: string;
  Religion?: string;
  EmerName?: string;
  ERelation?: string;
  EAddr?: string;
  ETetlNo?: string;
  ESpouse?: string;
  FatherName?: string;
  MotherName?: string;
  BloodType?: string;
  Height?: string;
  Weight?: string;
  Email?: string;
  ATM_No?: string;
  PRCNo?: string;
  StreetNo: string;
}

export interface IChangePassword {
  EmployeeID: string;
  OldPassword: string;
  NewPassword: string;
}

export interface IDependents {
  ID: number;
  Name: string;
  Relations: string;
  BDate?: Date;
  EmpID: string;
  MedicalAid?: boolean;
  EducAid?: boolean;
  LastName: string;
  FirstName: string;
  MiddleName: string;
  IsQualifiedITR: boolean;
}

export interface IPayrollFinSummary {
  Id: number;
  EmployeeId: string;
  PayrollPeriod: string;
  DateCovered: string;
}
