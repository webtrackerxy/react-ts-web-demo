export interface User {
  name: string
}

export interface DataItem {
    title: string;
    attributes: Attribute[];
  }
  
export interface Attribute {
  name: string;
  value: number;
  unit: string;
}
  