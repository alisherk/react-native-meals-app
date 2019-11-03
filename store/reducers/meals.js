import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAV, SET_FILTERS } from '../actions/meals';

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favMeals: []
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAV:
      const existIndex = state.favMeals.findIndex(
        meal => meal.id === action.mealId
      );
      if (existIndex >= 0) {
        const updateFavMeals = [...state.favMeals];
        updateFavMeals.splice(existIndex, 1);
        return { ...state, favMeals: updateFavMeals };
      } else {
        const meal = state.meals.find(meal => meal.id === action.mealId);
        return { ...state, favMeals: state.favMeals.concat(meal) };
      }
      case SET_FILTERS: 
          const appliedFilters = action.filters; 
          const updatedFilteredMeals = state.meals.filter(meal => {
            if(appliedFilters.glutenFree && !meal.isGlutenFree){
              return false; 
            }
            if(appliedFilters.lactoseFree && !meal.isLactoseFree){
              return false;
            }
            if(appliedFilters.vegetarian && !meal.isVegetarian){
              return false;
            }
            if(appliedFilters.vegan && !meal.isVegan){
              return false;
            }
            return true; 
          });
          return { ...state, filteredMeals: updatedFilteredMeals }
    default:
      return state;
  }
};

export default mealsReducer;
