import type { Item } from "../types/Item";

interface BaseGeneratorConfig {
  baseId: string;
  baseName: string;
  count: number;
  icon: string;
  descriptionTemplate?: (level: number) => string;
  customizeItem?: (item: Item, level: number) => Item;
}

export function generateBaseItems(config: BaseGeneratorConfig): Item[] {
  const items: Item[] = [];

  for (let level = 1; level <= config.count; level++) {
    const id = `${config.baseId}_${level}`;
    const name = `${config.baseName} ${level}`;
    const description = config.descriptionTemplate
      ? config.descriptionTemplate(level)
      : undefined;

    let item: Item = {
      id,
      name,
      icon: config.icon,
      description,
    };

    if (config.customizeItem) {
      item = config.customizeItem(item, level);
    }

    items.push(item);
  }

  return items;
}
