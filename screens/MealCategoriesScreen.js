import React from 'react';
import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList'; 
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import DefaultText from '../components/DefaultText';

const MealCategoriesScreen = props => {

  const availMeals = useSelector(state => state.meals.filteredMeals);
  const catId = props.navigation.getParam('categoryId');
  const displayedMeals = availMeals.filter(meal => meal.catIds.indexOf(catId) >= 0);
 
  if(displayedMeals.length === 0) {
    return (
     <View style={styles.content}> 
       <DefaultText> No meals found. Check your filters </DefaultText>
     </View>
    );
  }

  return <MealList listData={displayedMeals} navigation={props.navigation} /> 
};

MealCategoriesScreen.navigationOptions = navData => {
  const catId = navData.navigation.getParam('categoryId');
  const selectedCat = CATEGORIES.find(cat => cat.id === catId);
  return {
    headerTitle: selectedCat.title
  };
};

const styles = StyleSheet.create({
   content: {
     flex: 1, 
     justifyContent: 'center', 
     alignItems: 'center'
   }
});


export default MealCategoriesScreen;
