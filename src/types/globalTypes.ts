// API DATA TYPES
export interface WidgetData {
  loading: boolean;
  id: number;
  action: string;
  active: boolean;
  amount: number;
  linked: boolean;
  selectedColor: string;
  type: string;
}

export interface BoxColorData {
  colorID: number;
  color: string;
  setFocus: boolean;
}

export interface WidgetState {
  widgetData: WidgetData[];
  boxColors: BoxColorData[];
  loading: boolean;
}

// UI SPECIFIC TYPES
// BTN TYPES
type BtnType = {
  id: number;
  active: boolean;
  boxColors?: BoxColorData[];
};

export interface BtnProps {
  widgetData: BtnType;
  updateColor: (id: number, boxColor: string, colorID: number) => void;
  boxColor: string;
  colorID: number;
}

// INPUT TYPES
type InputType = {
  id: number;
  active: boolean;
  linked: boolean;
  type: string;
  amount: number;
  selectedColor: string;
};

export interface InputProps {
  widgetData: InputType;
  updateInput: (id: number) => void;
  checkedState: boolean;
  toggleStyles: boolean;
}

// SKELETON LOAD TYPES
export interface SkeletonTypeProps {
  type: string;
}
