import type { Item } from "../types/Item";

export function generateCraftableSeries(baseConfig: {
  baseId: string;
  baseName: string;
  count: number;
  icon: string;
  recipeIcon: string;
  getComponents: (level: number) => string[];
  descriptionTemplate?: (level: number) => string;
}): Item[] {
  const {
    baseId,
    baseName,
    count,
    icon,
    recipeIcon,
    getComponents,
    descriptionTemplate,
  } = baseConfig;

  const items: Item[] = [];

  for (let level = 1; level <= count; level++) {
    const id = `${baseId}_${level}`;
    const name = `${baseName} ${level}`;
    const description = descriptionTemplate?.(level);

    items.push({
      id,
      name,
      icon,
      description,
      components: getComponents(level),
    });

    items.push({
      id: `${id}_recipe`,
      name: `${name} (рецепт)`,
      icon: recipeIcon,
      description: `Рецепт для ${name}`,
    });
  }

  return items;
}
