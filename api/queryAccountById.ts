import { providers } from "near-api-js";

const queryAccountById = (accountId?: string) => {
  return new providers.JsonRpcProvider({
    url: "https://rpc.testnet.near.org",
  }).query(`account/${accountId}`, "");
};

export default queryAccountById;
