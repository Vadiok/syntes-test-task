export class Food {
  title: string;

  calories: number;

  fat: number;

  carbs: number;

  protein: number;

  ironPercent: number;

  constructor(
    title: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
    ironPercent: number,
  ) {
    this.title = title;
    this.calories = calories;
    this.fat = fat;
    this.carbs = carbs;
    this.protein = protein;
    this.ironPercent = ironPercent;
  }
}
