export const getDate = () => {
  const currentTime = new Date();

  let seconds = PlusZero(Math.floor(currentTime) % 60);
  let minutes = PlusZero(Math.floor(currentTime / 60) % 60);
  let hours = PlusZero(Math.floor((currentTime / 3600) % 24));
  let days = PlusZero(Math.floor(currentTime / 3600 / 24));
  let years = Math.floor(currentTime / 3600 );

  function PlusZero(time) {
    return time < 10 ? `0${time}` : time;
  }

  return `Year-${currentTime.getFullYear()},Month-${currentTime.getMonth()+1},Day-${currentTime.getDate()}`
};
