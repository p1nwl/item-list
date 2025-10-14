import {
  paragonScrollRecipes,
  trophyUpgradeRecipes,
} from "../components/CustomRecipeComponents";

export interface Item {
  id: string;
  name: string;
  icon: string;
  description?: string;
  components?: string[];
  droppedBy?: string[];
  boughtFrom?: string;
}

interface GeneratorConfig {
  baseId: string;
  baseName: string;
  baseDescription?: string;
  icon: string;
  count: number;
  recipeIcon: string;
  getComponents?: (level: number) => string[];
}

export function generateItems(config: GeneratorConfig): Item[] {
  const items: Item[] = [];

  for (let i = 1; i <= config.count; i++) {
    const id = `${config.baseId}_${i}`;
    const name = `${config.baseName} ${i}`;
    const description = config.baseDescription
      ? `${config.baseDescription} ${i + 1}`
      : undefined;
    const components = config.getComponents ? config.getComponents(i) : [];

    items.push({
      id,
      name,
      description,
      icon: config.icon,
      components,
    });

    items.push({
      id: `${id}_recipe`,
      name: `${name} (рецепт)`,
      icon: config.recipeIcon || "/icons/recipe.png",
      description: `Рецепт для ${name}`,
    });
  }

  return items;
}

export const dynamicItems: Item[] = [
  ...generateItems({
    baseId: "trophy_upgrade",
    baseName: "Улучшение трофея",
    baseDescription: "Улучшение трофея до уровня",
    icon: "/icons/trophy.png",
    recipeIcon: "/icons/shaman_recipe.png",
    count: trophyUpgradeRecipes.length,
    getComponents: (level) => trophyUpgradeRecipes[level - 1] || [],
  }),
  ...generateItems({
    baseId: "paragon_scroll",
    baseName: "Свиток улучшения парагонов",
    baseDescription: "Улучшает парагон до уровня",
    icon: "/icons/paragon.png",
    recipeIcon: "/icons/magic_recipe.png",
    count: paragonScrollRecipes.length,
    getComponents: (level) => paragonScrollRecipes[level - 1] || [],
  }),
];
