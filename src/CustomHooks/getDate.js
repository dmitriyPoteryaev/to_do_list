export const getDate = () => {
  const currentTime = new Date();


  return `Year-${currentTime.getFullYear()},Month-${currentTime.getMonth()+1},Day-${currentTime.getDate()}`
};
