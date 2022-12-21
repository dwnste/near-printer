import { Near, connect, KeyPair } from "near-api-js";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import useKeyStore from "../hooks/useKeyStore";

const NEAR_NOT_INITIALIZED = Error("Near is not initialized");

interface NearContextInterface {
  loading: boolean;
  error: unknown;
  createDevAccount(accountId: string): Promise<string>;
  deleteAccount(
    accountId: string,
    benificiaryAccountId: string
  ): Promise<string>;
}

export const NearContext = React.createContext<NearContextInterface>({
  loading: false,
  error: null,
  createDevAccount: async () => "",
  deleteAccount: async () => "",
});

const NearProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const keyStore = useKeyStore();

  const [near, setNear] = useState<Near>();
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const createDevAccount = useCallback(createDevAccountCallback, [
    keyStore,
    near,
  ]);
  const deleteAccount = useCallback(deleteAccountCallback, [keyStore, near]);

  useEffect(() => {
    load();

    async function load() {
      setLoading(true);

      try {
        const result = await connect({
          keyStore,
          networkId: "testnet",
          nodeUrl: "https://rpc.testnet.near.org",
          helperUrl: "https://helper.testnet.near.org",
        });
        setNear(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  }, [keyStore]);

  return (
    <NearContext.Provider
      value={{
        error,
        loading,
        createDevAccount,
        deleteAccount,
      }}
    >
      {children}
    </NearContext.Provider>
  );

  async function createDevAccountCallback(accountId: string) {
    if (!near) {
      throw NEAR_NOT_INITIALIZED;
    }

    const keyPair = KeyPair.fromRandom("ed25519");
    await near.accountCreator.createAccount(accountId, keyPair.getPublicKey());

    await keyStore?.setKey(near.connection.networkId, accountId, keyPair);

    return accountId;
  }

  async function deleteAccountCallback(
    accountId: string,
    beneficiaryAccountId: string
  ): Promise<string> {
    if (!near) {
      throw NEAR_NOT_INITIALIZED;
    }

    const account = await near.account(accountId);
    const result = await account.deleteAccount(beneficiaryAccountId);

    keyStore?.removeKey(near.connection.networkId, accountId);

    return result.transaction_outcome.id;
  }
};

export default NearProvider;
