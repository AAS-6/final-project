import { AccountModel } from "../model/account";

export type LoadAccountByToken = (
  accessToken: string
) => LoadAccountByToken.Response;
export namespace LoadAccountByToken {
  export type Response = Promise<AccountModel>;
}
