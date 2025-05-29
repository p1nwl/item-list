import { dynamicItems } from "../data/dynamicGenerators";
import type { Item } from "../types/Item";

// Автоматически импортируем все файлы вида items_*.json из папки data
const modules = import.meta.glob("../data/items_*.json", { eager: true });

const staticItems: Item[] = [];

for (const path in modules) {
  const mod = modules[path] as { default: Item[] };
  staticItems.push(...mod.default);
}

// Объединяем со сгенерированными предметами
const allItems: Item[] = [...staticItems, ...dynamicItems];

export function getAllItems(): Item[] {
  return allItems;
}

export function getItemById(id: string): Item | undefined {
  return allItems.find((i) => i.id === id);
}
