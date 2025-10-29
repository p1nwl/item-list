import { generateBaseItems } from "../utils/generateItems";
import type { Item } from "../types/Item";

type DroppedBySource = string[] | ((level: number) => string[]);

export function generateDroppableSeries(baseConfig: {
  baseId: string;
  baseName: string;
  baseDecription?: string;
  count: number;
  icon: string;
  droppedBy: DroppedBySource;
  descriptionTemplate?: (level: number) => string;
}): Item[] {
  return generateBaseItems({
    ...baseConfig,
    customizeItem: (item, level) => {
      let droppedBy: string[];

      if (typeof baseConfig.droppedBy === "function") {
        droppedBy = baseConfig.droppedBy(level);
      } else {
        droppedBy = baseConfig.droppedBy;
      }

      return {
        ...item,
        droppedBy,
      };
    },
  });
}
