// Menu feature types

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  imageUrl?: string;
  isAvailable: boolean;
  isVegetarian?: boolean;
  isVegan?: boolean;
  allergens?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type MenuCategory =
  | "appetizer"
  | "main_course"
  | "dessert"
  | "beverage"
  | "coffee"
  | "smoothie"
  | "snack";

export interface CreateMenuItemInput {
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  imageUrl?: string;
  isAvailable?: boolean;
  isVegetarian?: boolean;
  isVegan?: boolean;
  allergens?: string[];
}

export interface UpdateMenuItemInput extends Partial<CreateMenuItemInput> {
  id: string;
}
