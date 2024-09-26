export type RecipesApiRange =
  | `${number}`
  | `${number}-${number}`
  | `${number}+`;

export type RecipesApiOptions = {
  type: "public" | "user" | "any";
  beta?: boolean;
  q?: string;
  ingr?: RecipesApiRange;
  diet?: (
    | "balanced"
    | "high-fiber"
    | "high-protein"
    | "low-carb"
    | "low-fat"
    | "low-sodium"
  )[];
  health?: (
    | "alcohol-cocktail"
    | "alcohol-free"
    | "celery-free"
    | "crustacean-free"
    | "dairy-free"
    | "DASH"
    | "egg-free"
    | "fish-free"
    | "fodmap-free"
    | "gluten-free"
    | "immuno-supportive"
    | "keto-friendly"
    | "kidney-friendly"
    | "kosher"
    | "low-fat-abs"
    | "low-potassium"
    | "low-sugar"
    | "lupine-free"
    | "Mediterranean"
    | "mollusk-free"
    | "mustard-free"
    | "no-oil-added"
    | "paleo"
    | "peanut-tree"
    | "pescatarian"
    | "pork-free"
    | "red-meat-free"
    | "sesame-free"
    | "shellfish-free"
    | "soy-free"
    | "sugar-conscious"
    | "sulfite-free"
    | "tree-nut-free"
    | "vegan"
    | "vegetarian"
    | "wheat-free"
  )[];
  mealType?: ("Breakfast" | "Dinner" | "Lunch" | "Snack" | "Teatime")[];
  calories?: RecipesApiRange;
  excluded?: string[];
};

export type EdamamSuccessResponse = {
  from: number;
  to: number;
  count: number;
  _links: EdamamSuccessResponseLinks;
  hits: Hit[];
};

export type EdamamSuccessResponseLinks = Record<never, never>;

export type Hit = {
  recipe: Recipe;
  _links: HitLinks;
};

export type HitLinks = {
  self: Self;
};

export type Self = {
  title: Title;
  href: string;
};

export enum Title {
  Self = "Self",
}

export type Recipe = {
  uri: string;
  label: string;
  image: string;
  images: Images;
  source: string;
  url: string;
  shareAs: string;
  yield: number;
  dietLabels: string[];
  healthLabels: string[];
  cautions: Caution[];
  ingredientLines: string[];
  ingredients: Ingredient[];
  calories: number;
  totalWeight: number;
  totalTime: number;
  cuisineType: string[];
  mealType: MealType[];
  dishType: string[];
  totalNutrients: { [key: string]: Total };
  totalDaily: { [key: string]: Total };
  digest: Digest[];
};

export enum Caution {
  Fodmap = "FODMAP",
  Gluten = "Gluten",
  Shellfish = "Shellfish",
  Sulfites = "Sulfites",
  Wheat = "Wheat",
}

export type Digest = {
  label: string;
  tag: string;
  schemaOrgTag: SchemaOrgTag | null;
  total: number;
  hasRDI: boolean;
  daily: number;
  unit: Unit;
  sub?: Digest[];
};

export enum SchemaOrgTag {
  CarbohydrateContent = "carbohydrateContent",
  CholesterolContent = "cholesterolContent",
  FatContent = "fatContent",
  FiberContent = "fiberContent",
  ProteinContent = "proteinContent",
  SaturatedFatContent = "saturatedFatContent",
  SodiumContent = "sodiumContent",
  SugarContent = "sugarContent",
  TransFatContent = "transFatContent",
}

export enum Unit {
  Empty = "%",
  G = "g",
  Kcal = "kcal",
  Mg = "mg",
  Μg = "µg",
}

export type Images = {
  THUMBNAIL: Large;
  SMALL: Large;
  REGULAR: Large;
  LARGE?: Large;
};

export type Large = {
  url: string;
  width: number;
  height: number;
};

export type Ingredient = {
  text: string;
  quantity: number;
  measure: null | string;
  food: string;
  weight: number;
  foodCategory: string;
  foodId: string;
  image: string;
};

export enum MealType {
  Breakfast = "breakfast",
  LunchDinner = "lunch/dinner",
  Snack = "snack",
  Teatime = "teatime",
}

export type Total = {
  label: string;
  quantity: number;
  unit: Unit;
};

export type EdamamError = {
  errorCode: string;
  message: string;
  params: string[];
};

export type EdamamErrorResponse = EdamamError[];
