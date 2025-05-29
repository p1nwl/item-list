import { levelCoreRecipes } from "../components/CustomRecipeComponents";

export interface Item {
  id: string;
  name: string;
  icon: string;
  description?: string;
  components?: string[];
  craftsInto?: string[];
  droppedBy?: string[];
  boughtFrom?: string;
}

interface GeneratorConfig {
  baseId: string;
  baseName: string;
  baseDescription?: string;
  icon: string;
  count: number;
  getComponents?: (level: number) => string[];
}

export function generateItems(config: GeneratorConfig): Item[] {
  const items: Item[] = [];

  for (let i = 1; i <= config.count; i++) {
    items.push({
      id: `${config.baseId}_${i}`,
      name: `${config.baseName} ${i}`,
      description: config.baseDescription
        ? `${config.baseDescription} ${i + 1}`
        : undefined,
      icon: config.icon,
      components: config.getComponents ? config.getComponents(i) : [],
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
    count: 29,
    getComponents: (level) => levelCoreRecipes[level - 1] || [],
  }),
  //   ...generateItems({
  //     baseId: "sketch_boost",
  //     baseName: "Эскиз усиления",
  //     icon: "/icons/sketch.png",
  //     count: 10,
  //     getComponents: (level) => [`component-${level}`, "ink"]
  //   })
];
