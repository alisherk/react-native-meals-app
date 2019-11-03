function Meal(
  id,
  catIds,
  title,
  affordability,
  complexity,
  imgUrl,
  duration,
  ingredients,
  steps,
  isGlutenFree,
  isVegan,
  isVegeterian,
  isLactoseFree
) {
  this.id = id;
  this.catIds = catIds; 
  this.title = title; 
  this.affordability = affordability;
  this.complexity = complexity;
  this.imgUrl = imgUrl; 
  this.duration = duration; 
  this.ingredients = ingredients; 
  this.steps = steps; 
  this.isGlutenFree = isGlutenFree; 
  this.isVegan = isVegan; 
  this.isVegetarian = isVegeterian; 
  this.isLactoseFree = isLactoseFree;
};

export default Meal;
