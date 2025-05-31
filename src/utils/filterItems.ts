import type { Item } from "../types/Item";

interface FilterOptions {
  search: string;
  dropFilter: string;
  componentFilter: string;
  sortBy: "name" | "id";
}

export function filterItems(items: Item[], options: FilterOptions): Item[] {
  const { search, dropFilter, componentFilter, sortBy } = options;

  const itemMap: Record<string, Item> = Object.fromEntries(
    items.map((item) => [item.id, item])
  );

  return items
    .filter((item) =>
      search ? item.name.toLowerCase().includes(search.toLowerCase()) : true
    )
    .filter((item) =>
      dropFilter
        ? item.droppedBy?.some((src) =>
            src.toLowerCase().includes(dropFilter.toLowerCase())
          ) ?? false
        : true
    )
    .filter((item) =>
      componentFilter
        ? item.components?.some((compId) =>
            itemMap[compId]?.name
              .toLowerCase()
              .includes(componentFilter.toLowerCase())
          ) ?? false
        : true
    )
    .sort((a, b) =>
      a[sortBy].localeCompare(b[sortBy], undefined, {
        numeric: true,
        sensitivity: "base",
      })
    );
}
