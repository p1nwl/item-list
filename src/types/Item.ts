export interface Item {
  id: string;
  name: string;
  description?: string;
  droppedBy?: string[];
  components?: string[];
  craftsInto?: string[];
  boughtFrom?: string;
  icon?: string;
}
