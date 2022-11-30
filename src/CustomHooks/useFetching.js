

export const useFetching = (callback, ind) => {


  const fetch = async () => {
    try {
      await callback(ind);
    } catch (e) {
      setError(e.message);
    } 
  };

  return [fetch, error];
};
