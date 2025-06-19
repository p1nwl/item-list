import type { Item } from "../types/Item";

interface FilterOptions {
  search: string;
  dropFilter: string;
  componentFilter: string;
  sortBy: "name" | "id";
}

export function filterItems(items: Item[], options: FilterOptions): Item[] {
  const {
    search = "",
    dropFilter = "",
    componentFilter = "",
    sortBy = "name",
  } = options;

  const normSearch = search.trim().toLowerCase();
  const normDrop = dropFilter.trim().toLowerCase();
  const normComponent = componentFilter.trim().toLowerCase();

  const itemMap: Record<string, Item> = Object.fromEntries(
    items.map((it) => [it.id, it])
  );

  const includes = (str: string | undefined, needle: string) =>
    (str ?? "").toLowerCase().includes(needle);

  const safeName = (it?: Item) => it?.name ?? "";

  return (
    items
      /* --- поиск по названию --- */
      .filter((item) => (normSearch ? includes(item.name, normSearch) : true))

      /* --- фильтр по дропу --- */
      .filter((item) => {
        if (!normDrop) return true;
        const sources = (item.droppedBy ?? []).filter(Boolean) as string[];
        return sources.some((src) => includes(src, normDrop));
      })

      /* --- фильтр по компонентам --- */
      .filter((item) => {
        if (!normComponent) return true;
        return (item.components ?? []).some((compId) =>
          includes(safeName(itemMap[compId]), normComponent)
        );
      })

      /* --- сортировка по sortBy --- */
      .sort((a, b) => {
        const keyA = sortBy === "id" ? a.id : a.name;
        const keyB = sortBy === "id" ? b.id : b.name;
        const strA = keyA ?? "";
        const strB = keyB ?? "";
        return strA.localeCompare(strB, undefined, {
          numeric: true,
          sensitivity: "base",
        });
      })
  );
}
