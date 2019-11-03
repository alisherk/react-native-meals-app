import React, { useEffect, useCallback } from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderBtn from '../components/HeaderBtn';
import DefaultText from '../components/DefaultText';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFav } from '../store/actions/meals';

function ListItem(props) {
  return (
    <View style={styles.listItem}>
      <DefaultText style={styles.text}> {props.children} </DefaultText>
    </View>
  );
}

const MealDetailScreen = props => {

  const availMeals = useSelector(state => state.meals.meals);
  const mealId = props.navigation.getParam('mealId');
  const selectedMeal = availMeals.find(meal => meal.id === mealId);
  const currMealFav = useSelector(state =>
    state.meals.favMeals.some(meal => meal.id === mealId)
  );
  const dispatch = useDispatch();

  const toggleFavHandler = useCallback(() => {
    dispatch(toggleFav(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    //props.navigation.setParams({ mealTitle: selectedMeal.title });
    props.navigation.setParams({ toggleFav: toggleFavHandler });
  }, [selectedMeal]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currMealFav });
  }, [currMealFav]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imgUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText> {selectedMeal.duration} m </DefaultText>
        <DefaultText> {selectedMeal.complexity.toUpperCase()} </DefaultText>
        <DefaultText> {selectedMeal.affordability.toUpperCase()} </DefaultText>
      </View>
      <Text style={styles.title}> Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient => (
        <ListItem key={ingredient}> {ingredient} </ListItem>
      ))}
      <Text style={styles.title}> Steps</Text>
      {selectedMeal.steps.map(step => (
        <ListItem key={step}> {step} </ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = navData => {
  //const mealId = navData.navigation.getParam('mealId');
  const toggleFav = navData.navigation.getParam('toggleFav');
  const mealTitle = navData.navigation.getParam('mealTitle');
  //const selectedMeal = MEALS.find(meal => meal.id === mealId);
  const isFavorite = navData.navigation.getParam('isFav');  
  return {
    headerTitle: mealTitle,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderBtn}>
        <Item title='Fav' iconName={isFavorite ? 'ios-star' : 'ios-star-outline'} onPress={toggleFav} />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center'
  },
  listItem: {
    margin: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    flex: 1
  },
  text: {
    textAlign: 'auto'
  }
});
export default MealDetailScreen;
