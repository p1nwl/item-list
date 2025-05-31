export interface Item {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  level?: number;
  type?: string;
  boughtFrom?: string;
  droppedBy?: string[];
  components?: string[];
  craftsInto?: string[];
  bonus?: {
    stat: string;
    value: number;
  }[];
}
