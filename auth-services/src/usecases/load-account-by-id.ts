import { AccountModel } from "../model/account";

export type LoadAccountById = (id: string) => LoadAccountById.Response;

export namespace LoadAccountById {
  export type Response = Promise<AccountModel>;
}
