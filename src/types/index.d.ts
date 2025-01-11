declare type SignUpParams = {
  fullName: string;
  email: string;
  password: string;
};

declare type SignInParams = {
  email: string;
  password: string;
};

declare type User = {
  id: number;
  fullName: string;
  email: string;
  role: $Enums.UserRole;
  createdAt: Date;
};
