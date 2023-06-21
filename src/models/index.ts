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
}

export interface IChangePassword {
  EmployeeID: string;
  OldPassword: string;
  NewPassword: string;
}
