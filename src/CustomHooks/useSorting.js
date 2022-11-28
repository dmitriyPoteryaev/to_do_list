export function useSorting(somethingContent, filterSelec) {
  if (filterSelec === "all") {
    return somethingContent;
  } else if (filterSelec === "Невыполненна" || filterSelec === "Выполненна") {
    return somethingContent.filter((el) => el.active === filterSelec);
  } else if (filterSelec === "Просрочено") {
    return somethingContent.filter((el) => !el.overdue);
  }
}
