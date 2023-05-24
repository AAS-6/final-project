import { AccountModel } from "../model/account";

export type LoadAccountByEmail = (email: string) => LoadAccountByEmail.Response;

export namespace LoadAccountByEmail {
  export type Response = Promise<AccountModel>;
}
