/**
 *Функция предназначена для сравнения текущей даты и даты завершения таски .
 * @param  {string} DateTask Крайний срок, когда нужно завершить такску
 *  @return {boolean} Больше или меньше крайний срок сегодняшней даты
 */
export function CompareDate(DateTask) {
  let cur_time = new Date();

  let year = PlusZero(cur_time.getFullYear());
  let month = PlusZero(cur_time.getMonth() + 1);
  let data = PlusZero(cur_time.getDate());

  function PlusZero(time) {
    return time < 10 ? `0${time}` : time;
  }

  return new Date(DateTask) >= new Date(`${year}-${month}-${data}`);
}
