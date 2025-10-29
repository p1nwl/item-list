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
  isTrash?: boolean;
  trashInfo?: {
    goldRange: [number, number];
    markRange: [number, number];
    xpRange: [number, number];
    dropItemId?: string;
  };
  bonus?: {
    stat: string;
    value: number;
    percent?: boolean;
  }[];
  aura?: string;
  ability?: string;
  effects?: string[];
  attention?: string;
  additionalInfo?: string[];
  additionalInfoTitle?: string[];
}
