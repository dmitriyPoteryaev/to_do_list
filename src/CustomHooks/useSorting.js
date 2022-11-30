/**
 *Кастомный хук, который предназначен для сортировки всех тасок
 * @param  {Array} somethingContent массив со всеми тасками
 * @param  {string} filterSelec значение , по которому сортируем такски
 *  @return {Array}  функция возращает тот же самый массив или отсортированный
 */

export function useSorting(somethingContent, filterSelec) {
  if (filterSelec === "all") {
    return somethingContent;
  } else if (filterSelec === "Невыполненна" || filterSelec === "Выполненна") {
    return somethingContent.filter((el) => el.active === filterSelec);
  } else if (filterSelec === "Просрочено") {
    return somethingContent.filter((el) => !el.overdue);
  }
}
