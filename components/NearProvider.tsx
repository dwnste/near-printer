import { Near, connect, KeyPair, keyStores } from "near-api-js";
import { NearConfig } from "near-api-js/lib/near";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const NEAR_NOT_INITIALIZED = Error("Near is not initialized");

enum State {
  INIT,
  LOADING,
  ERROR,
  READY,
}

interface NearContextInterface {
  loading: boolean;
  createDevAccount(accountId: string): Promise<string>;
  deleteAccount(
    accountId: string,
    benificiaryAccountId: string,
  ): Promise<string>;
  checkAccount(accountId: string): Promise<void>;
}

export const NearContext = React.createContext<NearContextInterface>({
  loading: false,
  createDevAccount: async () => "",
  deleteAccount: async () => "",
  checkAccount: async () => {},
});

export const NearProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState(State.INIT);
  const nearRef = useRef<Near>();
  const createDevAccount = useCallback(createDevAccountCallback, []);
  const deleteAccount = useCallback(deleteAccountCallback, []);
  const checkAccount = useCallback(checkAccountCallback, []);

  useEffect(() => {
    (async () => {
      setState(State.LOADING);
      try {
        nearRef.current = await connect({
          keyStore: new keyStores.BrowserLocalStorageKeyStore(),
          networkId: "testnet",
          nodeUrl: "https://rpc.testnet.near.org",
          walletUrl: "https://testnet.mynearwallet.com",
          helperUrl: "https://helper.testnet.near.org",
        });
        setState(State.READY);
      } catch {
        setState(State.ERROR);
      }
    })();
  }, []);

  return (
    <NearContext.Provider
      value={{
        loading: state === State.LOADING,
        createDevAccount,
        deleteAccount,
        checkAccount,
      }}
    >
      {children}
    </NearContext.Provider>
  );

  async function createDevAccountCallback(accountId: string) {
    if (!nearRef.current) {
      throw NEAR_NOT_INITIALIZED;
    }

    const keyPair = KeyPair.fromRandom("ed25519");
    await nearRef.current.accountCreator.createAccount(
      accountId,
      keyPair.getPublicKey(),
    );
    (nearRef.current.config as NearConfig).keyStore?.setKey(
      nearRef.current.connection.networkId,
      accountId,
      keyPair,
    );
    return accountId;
  }

  async function deleteAccountCallback(
    accountId: string,
    beneficiaryAccountId: string,
  ): Promise<string> {
    if (!nearRef.current) {
      throw NEAR_NOT_INITIALIZED;
    }

    const account = await nearRef.current.account(accountId);
    const result = await account.deleteAccount(beneficiaryAccountId);
    (nearRef.current.config as NearConfig).keyStore?.removeKey(
      nearRef.current.connection.networkId,
      accountId,
    );
    return result.transaction_outcome.id;
  }

  async function checkAccountCallback(accountId: string) {
    if (!nearRef.current) {
      throw NEAR_NOT_INITIALIZED;
    }

    await nearRef.current.connection.provider.query({
      request_type: "view_account",
      account_id: accountId,
      finality: "final",
    });
  }
};
