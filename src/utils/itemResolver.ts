// src/data/itemResolver.ts
import { dynamicItems } from "../data/dynamicGenerators";
import type { Item } from "../types/Item";

const modules = import.meta.glob("../data/items_*.json", { eager: true });

const staticItems: Item[] = [];
for (const path in modules) {
  const mod = modules[path] as { default: Item[] };
  staticItems.push(...mod.default);
}

const allItems: Item[] = [...staticItems, ...dynamicItems];

const craftsIntoIndex: Record<string, string[]> = {};
allItems.forEach((item) => {
  if (!item.components) return;

  item.components.forEach((compId) => {
    if (!craftsIntoIndex[compId]) {
      craftsIntoIndex[compId] = [];
    }
    craftsIntoIndex[compId].push(item.id);
  });
});

const enrichedItems: Item[] = allItems.map((item) => {
  const existing = item.craftsInto || [];
  const fromIndex = craftsIntoIndex[item.id] || [];
  return {
    ...item,
    craftsInto: Array.from(new Set([...existing, ...fromIndex])),
  };
});

export function getAllItems(): Item[] {
  return enrichedItems;
}

export function getItemById(id: string): Item | undefined {
  return enrichedItems.find((i) => i.id === id);
}
