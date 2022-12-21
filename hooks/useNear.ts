import { useContext } from "react";

import { NearContext } from "../providers/NearProvider";

const useNear = () => {
  return useContext(NearContext);
};

export default useNear;
