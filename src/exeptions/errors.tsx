export class UserAlreadyExist extends Error {
  public code: number;
  public message: string;
  constructor(message: string) {
    super();
    this.code = 400;
    this.message = message;
  }
}

export class InvalidData extends Error {
  public code: number;
  public message: string;
  constructor(message: string) {
    super();
    this.code = 400;
    this.message = message;
  }
}

export class PasswordNotMatch extends Error {
  public code: number;
  public message: string;
  constructor(message: string) {
    super();
    this.code = 400;
    this.message = message;
  }
}
