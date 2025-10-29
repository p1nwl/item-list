import { generateCraftableSeries } from "../generators/craftable";
import { generateDroppableSeries } from "../generators/droppable";
import {
  trophyUpgradeRecipes,
  paragonDrop,
} from "../components/CustomRecipeComponents";
import type { Item } from "../types/Item";

export const dynamicItems: Item[] = [
  ...generateCraftableSeries({
    baseId: "trophy_upgrade",
    baseName: "Улучшение трофея",
    count: trophyUpgradeRecipes.length,
    icon: "trophy.png",
    recipeIcon: "shaman_recipe.png",
    descriptionTemplate: (level) => `Улучшение трофея до ${level + 1} уровня `,
    getComponents: (level) => trophyUpgradeRecipes[level - 1] || [],
  }),

  ...generateDroppableSeries({
    baseId: "paragon_scroll",
    baseName: "Свиток улучшения парагонов",
    count: paragonDrop.length,
    icon: "paragon.png",
    droppedBy: (level) => {
      const bossName = paragonDrop[level - 1];
      return bossName ? [bossName] : [];
    },
    descriptionTemplate: (level) => `Улучшает парагон до ${level + 1} уровня`,
  }),
];
