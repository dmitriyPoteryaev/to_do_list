import { useState } from "react";

export const useFetching = (callback, ind) => {
  const [error, setError] = useState("");

  const fetch = async () => {
    try {
      await callback(ind);
    } catch (e) {
      setError(e.message);
    } finally {
    }
  };

  return [fetch, error];
};
