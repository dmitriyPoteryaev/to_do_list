export function useSorting(somethingContent, filterSelec) {
  if (filterSelec === "all") return somethingContent;
  else {
    return somethingContent.filter((el) => el.active == !!filterSelec);
  }
}
