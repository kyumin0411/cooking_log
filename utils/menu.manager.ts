export function stringifyIngredients(ingredients: string | string[]) {
  if (typeof ingredients === 'string') {
    return ingredients;
  } else {
    return ingredients.join(',');
  }
}
