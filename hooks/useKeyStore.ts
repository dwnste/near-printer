import { useEffect, useState } from "react";
import { keyStores } from "near-api-js";
import { BrowserLocalStorageKeyStore } from "near-api-js/lib/key_stores";

const useKeyStore = () => {
  const [keyStore, setKeyStore] = useState<BrowserLocalStorageKeyStore>();

  useEffect(() => {
    setKeyStore(
      new keyStores.BrowserLocalStorageKeyStore(
        window.localStorage,
        "near_printer_"
      )
    );
  }, []);

  return keyStore;
};

export default useKeyStore;
