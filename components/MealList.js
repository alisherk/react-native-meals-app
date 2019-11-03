import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import MealItem from './Mealtem';
import { useSelector } from 'react-redux';

const MealList = props => {
  const favMeals = useSelector(state => state.meals.favMeals);

  function renderMealItem(itemData) {
    const isFav = favMeals.some(meal => meal.id === itemData.item.id);

    return (
      <MealItem
        title={itemData.item.title}
        image={itemData.item.imgUrl}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        onSelectMeal={() => {
          props.navigation.navigate({
            routeName: 'MealDetail',
            params: {
              mealId: itemData.item.id,
              mealTitle: itemData.item.title,
              isFavorite: isFav
            }
          });
        }}
      />
    );
  }
  return (
    <FlatList
      data={props.listData}
      keyExtractor={(item, index) => item.id}
      renderItem={renderMealItem}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    margin: 10
  }
});

export default MealList;
