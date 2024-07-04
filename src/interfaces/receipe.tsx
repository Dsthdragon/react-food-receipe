export interface RecipeListResponse {
  status: string;
  results: number;
  data: RecipeListData;
}

export interface RecipeListData {
  recipes: Recipe[];
}

export interface Recipe {
  publisher: string;
  image_url: string;
  title: string;
  id: string;
}

export interface RecipeResponse {
  status: string;
  data: RecipeData;
}

export interface RecipeData {
  recipe: FullRecipe;
}

export interface FullRecipe extends Recipe {
  ingredients: Ingredient[];
  source_url: string;
  servings: number;
  cooking_time: number;
}

export interface Ingredient {
  quantity?: number;
  unit: string;
  description: string;
}
